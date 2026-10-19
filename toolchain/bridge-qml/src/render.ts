// nandomo · bridge-qml · render() entry point.
//
// `render(spec, opts)` walks the spec tree once, generates an `app.qml`
// file, writes it to disk alongside the JS bundle, then spawns
// `qml app.qml` with `QT_QPA_PLATFORM=offscreen` (the default; override
// via `opts.platform` for an interactive session). The QML side
// imports the JS bundle as a namespace and the V4 engine evaluates it,
// wiring up handlers + bindings.
//
// The returned RootHandle has `dispose()` which kills the spawned
// process.
//
// Cross-stack reusability: the JS source we generate is the same
// `bridge-web`/`bridge-qml` shape. A component written against
// @nandomo/bridge-web can be ported by changing the import — the
// primitives return the same SpecNode kind strings.

import { spawn, type ChildProcess } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, accessSync, constants as fsConstants } from 'node:fs';
import { join, dirname, resolve, isAbsolute } from 'node:path';
import { isInputRef, isOutputRef, effect, isDefinedComponentRef, type EffectHandle } from '@nandomo/core';
import { renderNative, type NativeRenderOptions } from './render-native.js';
import { isSpecNode } from './primitives/types.js';
import { specToQml, drainComponentRegistry } from './spec-to-qml.js';
import { createHandlerRegistry } from './handlers.js';
import { provideQmlStorage } from './capabilities.js';
import { BUNDLE_SHIM } from './bundle-shim.js';
import { BUNDLE_HELPERS } from './bundle-helpers.js';

// Re-export from component-ref so existing call sites that import
// createComponentRef from './render.js' continue to work.
export {
  COMPONENT_REF_BRAND,
  createComponentRef,
  isComponentRef,
  type ComponentRef,
} from './component-ref.js';

export interface RenderOptions extends NativeRenderOptions {
  /**
   * Directory where `app.qml` and `bundle.js` are written.
   * Defaults to `./dist` (relative to CWD). The caller is responsible
   * for putting their built JS bundle at `<buildDir>/bundle.js` BEFORE
   * calling render() — see examples/counter-qml/vite.config.ts.
   */
  buildDir?: string;
  /**
   * Path to the `qml` (or `qml6`) binary. Defaults to looking up
   * `qml6` then `qml` on PATH. We do not shell out — this is the
   * exact path used in the spawn().
   */
  qmlBinary?: string;
  /**
   * QPA platform to pass via `QT_QPA_PLATFORM`. Defaults to
   * `offscreen` for headless. Set to `xcb`/`wayland`/`cocoa`/`windows`
   * for an interactive session.
   */
  platform?: 'offscreen' | 'xcb' | 'wayland' | 'cocoa' | 'windows' | 'minimal';
  /**
   * When true (default), render() auto-registers the bridge's default
   * capabilities (Storage) on its first call.
   */
  provideDefaults?: boolean;
  /**
   * Skip actually spawning the QML process — useful for tests that
   * want to inspect the generated `app.qml` without launching a Qt
   * runtime.
   */
  dryRun?: boolean;
  /**
   * Auto-terminate the qml process after this many milliseconds.
   * Useful for smoke tests; not for production. After the timeout
   * fires, render() returns (the dispose() is called internally).
   * Defaults to 0 = no auto-timeout.
   */
  timeoutMs?: number;
  /**
   * QML root window type.
   *
   * - `'Window'` (default): a generic QML `Window` from QtQuick. Works
   *   with the `qml` CLI AND with a custom launcher binary. Smaller
   *   surface area, fewer OS integrations (no menu bar, no system tray,
   *   no QtSingleApplication).
   *
   * - `'ApplicationWindow'`: a `QtQuick.Controls` `ApplicationWindow`.
   *   Requires the launcher to be a `QQmlApplicationEngine` (NOT the
   *   bare `qml` CLI) and the app must be registered as a `QApplication`.
   *   Gains menu bar, system tray, native OS integration, single-instance.
   *
   * Default is `'Window'` because the `qml` CLI is the simplest way to
   * launch a QML scene and the smoke-test / dev-loop benefit
   * outweighs the rare case where you need ApplicationWindow features.
   * Opt in when your launcher is a real Qt application.
   *
   * Both render identically in our reactive plumbing — the dirty
   * counter and `setQmlRoot` work the same way. The difference is
   * what the OS / launcher sees.
   */
  window?: 'Window' | 'ApplicationWindow';
}

export interface RootHandle {
  dispose(): void;
}

let __storageProvided = false;
function ensureDefaultCapabilities(): void {
  if (__storageProvided) return;
  try {
    provideQmlStorage();
  } catch (err) {
    // Outside of a QML runtime (unit tests, build pipelines), the
    // capability provider falls back to an in-memory store. Errors
    // are logged but never break render() — components that ask for
    // Storage will get the in-memory impl.
    if (typeof console !== 'undefined') {
      console.warn(
        '[nandomo/bridge-qml] default Storage provider fell back to in-memory:',
        err,
      );
    }
  }
  __storageProvided = true;
}

export async function render(spec: () => unknown, opts: RenderOptions = {}): Promise<RootHandle> {
  if (typeof spec !== 'function') {
    throw new TypeError('[nandomo/bridge-qml] render(): spec must be a function returning a spec tree');
  }

  if (opts.provideDefaults !== false) {
    ensureDefaultCapabilities();
  }

  const initialTree = spec();
  if (isDefinedComponentRef(initialTree)) {
    if (opts.dryRun) throw new Error('[nandomo/qml] Use createNativeScene for a native scene dry run');
    return renderNative(() => initialTree, opts);
  }

  const buildDir = resolve(opts.buildDir ?? './dist');
  mkdirSync(buildDir, { recursive: true });

  // Walk the spec tree once to produce a stable QML source. The
  // handler registry created here is *thrown away* — the actual
  // callbacks live in the user's bundle.js. The QML file references
  // handler IDs by name; the bundle must register matching IDs at
  // runtime. For MVP the bridge emits QML that references
  // `App.__callHandler(<id>)` and the bundle ships a stub
  // registry with all known IDs.
  const dryHandlers = createHandlerRegistry();
  const qmlSource = specToQml(initialTree, {
    handlers: dryHandlers,
    window: opts.window ?? 'Window',
  });

  // Walk the tree to collect component-class placeholders. We do
  // this in a separate pass so specToQml() can stay pure (the
  // placeholder IDs need to match between QML and bundle).
  const placeholders = drainComponentRegistry();

  const appQmlPath = join(buildDir, 'app.qml');
  writeFileSync(appQmlPath, qmlSource, 'utf8');

  // The JS bundle is expected to be at <buildDir>/bundle.js. The
  // caller (e.g. examples/counter-qml/vite.config.ts) is responsible
  // for placing it there. We then prepend `.pragma library` (must
  // be line 1 for V4) and the bridge-qml bundle shim (which defines
  // `App.__callHandler`, `App.__callBinding`, `App.setQmlRoot`, ...)
  // so the generated QML can resolve the symbols it references.
  const bundlePath = join(buildDir, 'bundle.js');
  if (existsSync(bundlePath)) {
    let userBundle = readFileSync(bundlePath, 'utf8');
    // Strip any .pragma library line that the build tool may have
    // added — we re-prepend our own to guarantee it stays on line 1.
    userBundle = userBundle.replace(/^\.pragma library\s*\n/, '');
    const composed = '.pragma library\n' + BUNDLE_SHIM + BUNDLE_HELPERS + userBundle;
    writeFileSync(bundlePath, composed, 'utf8');
  }
  // We don't fail hard if bundle.js is missing — tests and dry-runs
  // can generate QML without it. The qml CLI will fail clearly
  // when invoked with a missing import.

  // Optionally spawn `qml` to run the app.
  let child: ChildProcess | null = null;
  let childExited: Promise<void> | null = null;
  if (!opts.dryRun) {
    const qmlBin = opts.qmlBinary ?? findQmlBinary() ?? 'qml';
    const env: NodeJS.ProcessEnv = { ...process.env };
    if (opts.platform) {
      env.QT_QPA_PLATFORM = opts.platform;
    } else if (env.QT_QPA_PLATFORM === undefined) {
      env.QT_QPA_PLATFORM = 'offscreen';
    }
    if (process.env.DEBUG_QML) {
      console.error('[bridge-qml] spawning qml with env.QT_QPA_PLATFORM=', env.QT_QPA_PLATFORM);
      console.error('[bridge-qml] qmlBin:', qmlBin);
      console.error('[bridge-qml] appQmlPath:', appQmlPath);
      console.error('[bridge-qml] cwd:', buildDir);
    }
    const spawned = spawn(qmlBin, [appQmlPath], {
      cwd: buildDir,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
      // Detach so the qml process doesn't get killed when Node exits.
      // The render() promise awaits childExited which keeps Node alive
      // long enough for qml to do its thing; if the user wants to
      // exit early they call handle.dispose().
      detached: false,
    });
    child = spawned;

    // Surface stderr so QML errors don't disappear silently. Most
    // Qt warnings are noisy ("QML debugging enabled" etc.) so we
    // prefix them and let the consumer decide.
    spawned.stdout?.on('data', (b: Buffer) => {
      process.stdout.write(`[qml] ${b.toString()}`);
    });
    spawned.stderr?.on('data', (b: Buffer) => {
      process.stderr.write(`[qml] ${b.toString()}`);
    });
    spawned.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[nandomo/bridge-qml] qml process exited with code ${code}`);
      }
    });
    // Track exit so the returned promise resolves when qml finishes.
    // Without this, Node exits as soon as render() returns, killing
    // the qml child and closing the window instantly.
    childExited = new Promise<void>((resolve) => {
      spawned.on('exit', () => resolve());
    });
  }

  // The reactive plumbing. On Node we wrap `spec()` in an effect so
  // that any signal/computed read inside re-runs the spec; in a
  // full bridge the re-run would regenerate the QML and reload it.
  // For MVP we don't auto-reload (qml has no clean incremental API
  // across `import "bundle.js"`), but the effect is wired up so the
  // `dispose()` path is symmetric with bridge-web.
  const rootEffect: EffectHandle = effect(() => {
    void spec();
  });

  // Keep an eye on whether the bundle has a `__placeholderCount` —
  // we never had one, but this is the seam where component
  // placeholders would get threaded into a future reload.
  void placeholders;
  void bundlePath;

  const handle: RootHandle = {
    dispose(): void {
      rootEffect.dispose();
      if (child && child.exitCode === null) {
        try {
          child.kill('SIGTERM');
        } catch {
          // already exited
        }
      }
      child = null;
    },
  };

  // Auto-terminate after opts.timeoutMs (smoke-test aid; not for
  // production use). When the timer fires we dispose() the handle
  // which SIGTERMs the child and clears the effect.
  if (opts.timeoutMs && opts.timeoutMs > 0) {
    setTimeout(() => {
      try {
        handle.dispose();
      } catch {
        // already disposed
      }
    }, opts.timeoutMs);
  }

  // Keep Node alive until the qml child exits. Without this, Node
  // exits as soon as render() returns, killing the qml child and
  // closing the window instantly. Callers should `await render()`;
  // the await keeps Node's event loop running while we wait.
  if (childExited) {
    await childExited;
  }
  return handle;
}

// ─────────────────────────────────────────────────────────────────────────────
// Path helpers
// ─────────────────────────────────────────────────────────────────────────────

function findOnPath(name: string): string | null {
  const pathEnv = process.env.PATH ?? '';
  const sep = process.platform === 'win32' ? ';' : ':';
  for (const dir of pathEnv.split(sep)) {
    if (!dir) continue;
    const candidate = isAbsolute(name) ? name : join(dir, name);
    try {
      accessSync(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
      // not here, keep looking
    }
  }
  return null;
}

// Hard-coded fallback paths for Qt6 on Linux (the standard install
// layout puts qml6 at /usr/lib/qt6/bin/qml). The PATH often doesn't
// include this directory — and `/usr/bin/qml` on Debian/Ubuntu is
// Qt5 5.15 which silently rejects modern QML features with the
// unhelpful message "Did not load any objects, exiting." Prefer
// these over the bare `qml` lookup.
const QT6_FALLBACK_PATHS = [
  '/usr/lib/qt6/bin/qml',
  '/usr/lib/x86_64-linux-gnu/qt6/bin/qml',
  '/opt/Qt/6.11.2/gcc_64/bin/qml',
];

function findQmlBinary(): string | null {
  for (const path of QT6_FALLBACK_PATHS) {
    try {
      accessSync(path, fsConstants.X_OK);
      return path;
    } catch {
      // not here
    }
  }
  return findOnPath('qml6') ?? findOnPath('qml') ?? 'qml';
}

// Re-export so jsx-runtime can use it.
export { isInputRef, isOutputRef };
