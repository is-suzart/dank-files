import { createJsonLineWriter } from '@nandomo/bridge-runtime/native-updates';
import { formatQmlDiagnostic } from './diagnostics.js';
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { accessSync, constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createNativeScene, type NativeScene } from './native-scene.js';
import type { QmlObject } from './qml.js';

export interface NativeRenderOptions {
  hostBinaryPath?: string;
  platform?: string;
  startupTimeoutMs?: number;
  timeoutMs?: number;
  onWarning?: (message: string) => void;
}
export interface NativeRootHandle {
  dispose(): void;
  /** Settles on process closure, after component teardown. */
  readonly closed: Promise<void>;
  object(name: string): QmlObject;
}

function hostPath(override?: string): string {
  const explicit = override ?? process.env.NANDOMO_QML_HOST_PATH;
  if (explicit) {
    const path = resolve(explicit);
    try { accessSync(path, constants.X_OK); return path; } catch {
      throw new Error(`[nandomo/qml] Host binary is missing or not executable: ${path}`);
    }
  }
  const candidates = [
    fileURLToPath(new URL('../../bridge-qml-host/build/bridge-qml-host', import.meta.url)),
    resolve('packages/bridge-qml-host/build/bridge-qml-host')];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try { accessSync(candidate, constants.X_OK); return candidate; } catch { /* try next */ }
  }
  throw new Error('[nandomo/qml] Native host missing. Run scripts/build-qml-host.sh or set NANDOMO_QML_HOST_PATH.');
}

/** Returns while the window is alive. Application closures remain in Node. */
export async function renderNative(spec: () => unknown, options: NativeRenderOptions = {}): Promise<NativeRootHandle> {
  if (typeof spec !== 'function') throw new TypeError('[nandomo/qml] renderNative requires a spec factory');
  const binary = hostPath(options.hostBinaryPath);
  let child: ChildProcessWithoutNullStreams | null = null;
  let ready = false, disposed = false, requestId = 0;
  const startupDiagnostics: string[] = [];
  let scene: NativeScene;
  const queuedPatches: Array<{ command: object; resolve(): void; reject(error: unknown): void }> = [];
  const requests = new Map<number, { resolve(value: unknown): void; reject(error: Error): void; source?: string; timer: ReturnType<typeof setTimeout> }>();
  const writer = createJsonLineWriter(lines => new Promise<void>((resolve, reject) => {
    if (!child || disposed || !child.stdin.writable) { reject(new Error('[nandomo/qml] Host is closed')); return; }
    child.stdin.write(lines, error => error ? reject(error) : resolve());
  }));
  function send(command: object) {
    if (!child || disposed || !child.stdin.writable) throw new Error('[nandomo/qml] Host is closed');
    void writer.send(command).catch(error => { if (!disposed) fail(error instanceof Error ? error : new Error(String(error))); });
  }
  scene = createNativeScene(spec(), (key, value) => {
    if (ready && !disposed) send({ cmd: 'set', key, value });
  }, command => {
    if (disposed) return Promise.resolve();
    const operation = ready ? request(command).then(() => {}) : new Promise<void>((resolve, reject) => queuedPatches.push({ command, resolve, reject }));
    return operation.catch(error => { fail(error instanceof Error ? error : new Error(String(error))); });
  }, error => fail(error instanceof Error ? error : new Error(String(error))));
  let resolveReady!: () => void, rejectReady!: (error: Error) => void;
  const startup = new Promise<void>((resolve, reject) => { resolveReady = resolve; rejectReady = reject; });
  // A synchronous send failure can occur before the await below.
  void startup.catch(() => {});
  let resolveClosed!: () => void;
  const closed = new Promise<void>(resolve => { resolveClosed = resolve; });
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let killTimeout: ReturnType<typeof setTimeout> | undefined;
  const startupTimeout = setTimeout(() => fail(new Error('[nandomo/qml] Host startup timed out')), options.startupTimeoutMs ?? 10000);

  function teardown(error: Error) {
    if (disposed) return;
    disposed = true;
    writer.cancel(error);
    clearTimeout(startupTimeout); clearTimeout(timeout);
    for (const pending of requests.values()) { clearTimeout(pending.timer); pending.reject(error); }
    requests.clear();
    for (const patch of queuedPatches.splice(0)) patch.reject(error);
    try { scene.dispose(); } catch (cleanupError) { console.error('[nandomo/qml] cleanup:', cleanupError); }
  }
  function fail(error: Error) {
    if (ready && !disposed) console.error('[nandomo/qml] runtime error:', error);
    rejectReady(error);
    teardown(error);
    child?.kill('SIGTERM');
  }
  function request(command: object): Promise<unknown> {
    if (disposed) return Promise.reject(new Error('[nandomo/qml] Host is closed'));
    const id = requestId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { requests.delete(id); reject(new Error('[nandomo/qml] Native request timed out')); }, 5000);
      requests.set(id, { resolve, reject, timer, source: (command as {source?:string}).source });
      try { send({ ...command, request: id }); } catch (error) {
        clearTimeout(timer); requests.delete(id); reject(error);
      }
    });
  }
  const handle: NativeRootHandle = {
    closed,
    object(name) {
      return {
        objectName: name,
        inspect: properties => request({ cmd: 'inspect', object: name, properties }) as Promise<Record<string, unknown>>,
        set: async (property, value) => { await request({ cmd: 'set_property', object: name, property, value }); },
        invoke: (method, ...args) => request({ cmd: 'invoke', object: name, method, args }),
      };
    },
    dispose() {
      if (disposed) return;
      try { send({ cmd: 'quit' }); void writer.flush().catch(() => {}); } finally {
        teardown(new Error('[nandomo/qml] Root disposed'));
        child?.stdin.end();
        killTimeout = setTimeout(() => child?.kill('SIGKILL'), 1500);
      }
    },
  };

  child = spawn(binary, [], {
    env: { ...process.env, ...(options.platform ? { QT_QPA_PLATFORM: options.platform } : {}) },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  let buffer = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    buffer += chunk;
    let newline: number;
    while ((newline = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newline); buffer = buffer.slice(newline + 1);
      if (!line.trim()) continue;
      try {
        const event = JSON.parse(line) as { event: string; handler: string; args: unknown[]; request: number; value: unknown; message: string };
        if (event.event === 'ready') {
          ready = true;
          for (const [key, value] of Object.entries(scene.bindings)) send({ cmd: 'set', key, value });
          clearTimeout(startupTimeout); resolveReady();
        } else if (event.event === 'handler') {
          scene.dispatch(event.handler, event.args);
        } else if (event.event === 'result' || event.event === 'error') {
          const pending = requests.get(event.request);
          if (pending) {
            clearTimeout(pending.timer); requests.delete(event.request);
            if (event.event === 'error') pending.reject(new Error(formatQmlDiagnostic(event.message, pending.source ?? scene.source, pending.source ? 'file:///nandomo-fragment.qml' : 'file:///nandomo.qml')));
            else pending.resolve(event.value);
          } else if (event.event === 'error') {
            const message = formatQmlDiagnostic(event.message, scene.source);
            fail(new Error([message, ...(!ready ? startupDiagnostics : [])].join('\n')));
          }
        } else if (event.event === 'warning') {
          const message = formatQmlDiagnostic(event.message, scene.source);
          if(!ready && message !== event.message && startupDiagnostics.length < 20) startupDiagnostics.push(message);
          if (options.onWarning) options.onWarning(message);
          else console.warn('[nandomo/qml]', message);
        }
      } catch (error) { fail(error instanceof Error ? error : new Error(String(error))); }
    }
  });
  child.stderr.on('data', chunk => process.stderr.write(`[qml-host] ${String(chunk)}`));
  child.on('error', fail);
  child.stdin.on('error', error => fail(new Error(`[nandomo/qml] Host transport failed: ${error.message}`)));
  child.on('close', code => {
    const error = new Error(`[nandomo/qml] Host exited (${code})`);
    if (!ready) rejectReady(error);
    else if (!disposed && code !== 0) console.error(error.message);
    teardown(error); clearTimeout(killTimeout); resolveClosed();
  });
  try {
    send({ cmd: 'load', source: scene.source, bindings: scene.bindings });
    await startup;
    for (const patch of queuedPatches.splice(0)) {
      try { await request(patch.command); patch.resolve(); } catch (error) { patch.reject(error); throw error; }
    }
    scene.mount(name => handle.object(name));
    if (options.timeoutMs && options.timeoutMs > 0) timeout = setTimeout(() => handle.dispose(), options.timeoutMs);
    return handle;
  } catch (error) {
    fail(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}
