// nandomo · bridge-qml · SpecNode → QML string translator.
//
// Walks a SpecNode tree (the same shape produced by all bridge primitives
// — `View`, `Container`, `Button`, `Text`, `Input`, `Image`) and produces
// a QML source string that uses the bundle as a JS namespace via
// `import "bundle.js" as App`. The generated QML is intentionally simple:
//   • each primitive kind maps to a single QML type (Item/Rectangle/...)
//   • function-valued props become reactive bindings; each reactive
//     Text widget registers itself with the JS bundle via
//     `Component.onCompleted: App.__registerTextWidget(N, this)` so
//     the JS side can write to its `text` directly
//   • event handlers are emitted as `onClicked: App.__callHandler(N)`
//     where N is allocated by the HandlerRegistry passed in
//
// Reactivity model (Timer-based polling):
//   - A single `Timer { interval: 16; running: true; repeat: true }`
//     is emitted at the Window level; its onTriggered calls
//     `App.__updateBindings()` which iterates registered Text widgets
//     and writes each binding's current value directly to its `text`
//   - This sidesteps Qt6 V4's unreliable JS-to-QML propertyChanged
//     propagation that broke the earlier "dirty counter" pattern
//   - Polling at 60fps has negligible cost (~1µs per tick)
//
// For v0.1 we could switch to per-binding QObject properties
// (declared dynamically in QML) and signal-based updates; this
// Timer approach is the MVP.

import { isComponentRef, type ComponentRef } from './component-ref.js';
import { isSpecNode, type SpecNode } from './primitives/types.js';
import { createHandlerRegistry, type HandlerRegistry } from './handlers.js';

export interface QmlEmitOptions {
  /** Handler registry — reuses the one render() allocated. */
  handlers?: HandlerRegistry;
  /** Optional indentation per nesting level (default: 2 spaces). */
  indent?: string;
  /**
   * Which QML root type to emit.
   * - `'Window'` (default): standalone, works with the `qml` CLI
   * - `'ApplicationWindow'`: needs `QQmlApplicationEngine`, gains
   *   menu bar / system tray / single-instance
   *
   * See RenderOptions.window in render.ts for the full rationale.
   */
  window?: 'Window' | 'ApplicationWindow';
}

// Mapping from SpecNode.kind → QML type. Keeps the v0 primitives
// honest — anything not in this table throws during translation.
//
// Note: View emits `Column` from QtQuick with explicit `width:
// parent.width` so children get the column's width by default. Plain
// `Rectangle` would leave children at (0,0) overlapping each other.
// We tried `ColumnLayout` but that requires `Layout.fillWidth: true`
// on each child, which complicates the emit logic; the explicit
// width on the Column achieves the same thing with simpler QML.
const KIND_TO_QML_TYPE: Record<string, string> = {
  View: 'Column',
  Container: 'Item',
  Button: 'Button',
  Text: 'Text',
  Input: 'TextField',
  Image: 'Image',
};

// Map from SpecNode.kind → the QtQuick module the QML type lives in.
// We emit a single set of `import` lines based on which kinds actually
// appear in the tree (see collectImports()).
const KIND_TO_MODULE: Record<string, string> = {
  View: 'QtQuick',
  Container: 'QtQuick',
  Button: 'QtQuick.Controls',
  Text: 'QtQuick',
  Input: 'QtQuick.Controls',
  Image: 'QtQuick',
};

// Renames props from bridge-web-flavored names to native QML names.
// Empty means "pass through verbatim".
const PROP_RENAME: Record<string, Record<string, string>> = {
  Image: { src: 'source' },
  Input: { placeholder: 'placeholderText' },
};

// Event handler mapping (onTap / onClick → onClicked, etc.). bridge-qml
// keeps the bridge-web names so component code is portable.
const EVENT_PROP_TO_QML: Record<string, string> = {
  onTap: 'onClicked',
  onClick: 'onClicked',
  onChange: 'onTextChanged',
  onInput: 'onTextEdited',
  onSubmit: 'onAccepted',
};

// Props whose values are pass-through to a QML property of the same name
// with a 1:1 stringification. Anything not in this table (besides
// `children`, `class`, `style`, `label`) is ignored — bridge-qml v0 is
// conservative about emitting unknown QML properties.
const KNOWN_PASS_THROUGH = new Set([
  'placeholder',
  'placeholderText', // TextField native
  'src',
  'source',
  'sourceSize',
  'fillMode',
  'horizontalAlignment',
  'verticalAlignment',
  'wrapMode',
  'fontSize',
  'font.pixelSize',
  'font.bold',
  'color',
  'width',
  'height',
  'visible',
  'enabled',
  'opacity',
  'anchors.fill',
  'anchors.centerIn',
  'anchors.margins',
  'echoMode', // TextField
  'inputMask',
  'inputMethodHints',
  'inputMode', // numeric pad
  'horizontalAlignment',
]);

const EVENT_PROP_RE = /^on[A-Z]/;

/**
 * Translate a SpecNode tree into a QML source string.
 *
 * The output is a self-contained QML file starting with `import` lines
 * (QtQuick + QtQuick.Controls + the bundle namespace). The bundle is
 * expected to be co-located at `<out-dir>/bundle.js` (the path the
 * generated `import "bundle.js" as App` resolves relative to).
 *
 * The root element is wrapped in an outer `Window` so `qml app.qml`
 * has somewhere to anchor the scene.
 */
export function specToQml(root: unknown, opts: QmlEmitOptions = {}): string {
  const handlers = opts.handlers ?? createHandlerRegistry();
  const indent = opts.indent ?? '  ';
  const windowType = opts.window ?? 'Window';

  // First pass: walk the tree to figure out which QtQuick modules we
  // need to import. We do this because importing unused modules
  // generates warnings under qmllint.
  const usedKinds = new Set<string>();
  collectKinds(root, usedKinds);

  // Second pass: emit the QML. We track depth for indentation.
  const importLines: string[] = [
    'import QtQuick',
    'import QtQuick.Controls',
  ];
  // (We always import both — most apps use at least one Item from each.
  //  Per-kind filtering would help if the tree contains only QtQuick,
  //  but the import is cheap.)

  const body: string[] = [];
  const ctx: EmitContext = { handlers, indent, depth: 0 };
  body.push(emitNode(root, ctx));

  // Compose the final file. The root scene is a `Window` so it shows
  // when invoked via `qml app.qml`. A QML-side Timer at the Window
  // level polls App.__refresh() every 16ms; __refresh iterates
  // registered text widgets and writes the binding's current value
  // directly to each widget's `text`. Writing in QML context (via
  // Timer.onTriggered expression) reliably triggers propertyChanged;
  // writing from V4 raw JS does NOT (V4 quirk). See bundle-shim.ts.
  const sceneId = 'appWindow';
  const out: string[] = [];
  out.push(...importLines);
  out.push('import "bundle.js" as App');
  out.push('');
  out.push(`${windowType} {`);
  out.push(`${indent}id: ${sceneId}`);
  out.push(`${indent}visible: true`);
  out.push(`${indent}width: 320`);
  out.push(`${indent}height: 240`);
  out.push(`${indent}title: "nandomo bridge-qml"`);
  out.push('');
  // The Item that holds the spec tree — wrapping it makes layout
  // predictable (`anchors.fill: parent`).
  out.push(`${indent}Item {`);
  out.push(`${indent}${indent}id: rootContent`);
  out.push(`${indent}${indent}anchors.fill: parent`);
  // Padding so the Column content doesn't touch the window edges.
  out.push(`${indent}${indent}anchors.margins: 12`);
  out.push('');
  // Indent the body one more level (we're inside Item).
  for (const line of body) {
    out.push(`${indent}${indent}${line}`);
  }
  out.push(`${indent}}`);
  out.push('');
  // QML-side Timer drives reactivity. Calls App.__refresh() every
  // 16ms; refresh iterates widgets registered via __registerTextWidget
  // and writes their binding's current value directly to .text.
  out.push(`${indent}Timer {`);
  out.push(`${indent}${indent}interval: 16`);
  out.push(`${indent}${indent}running: true`);
  out.push(`${indent}${indent}repeat: true`);
  out.push(`${indent}${indent}onTriggered: App.__refresh()`);
  out.push(`${indent}}`);
  out.push('}');
  out.push('');

  // Component.onCompleted wiring — runs after the scene is built.
  // Calls App.__init__() so the JS bundle can do scene-init work, and
  // App.setQmlRoot so the JS side holds a reference for any direct
  // widget manipulation (not used by the polling path).
  const onCompletedLine = `${indent}Component.onCompleted: { App.__init__(); App.setQmlRoot(${sceneId}); }`;
  // Place the onCompleted line right after `id: appWindow`. (We
  // rebuild with the same indentation conventions.)
  const withCompleted: string[] = [];
  for (const line of out) {
    withCompleted.push(line);
    if (line === `${indent}id: ${sceneId}`) {
      withCompleted.push(onCompletedLine);
    }
  }
  return withCompleted.join('\n');
}

interface EmitContext {
  handlers: HandlerRegistry;
  indent: string;
  depth: number;
}

function collectKinds(node: unknown, out: Set<string>): void {
  if (node == null || node === false || node === true) return;
  if (Array.isArray(node)) {
    for (const child of node) collectKinds(child, out);
    return;
  }
  if (isComponentRef(node)) {
    // The component's view() may use any kind; we'd need to call it
    // to know. For simplicity (and because every component eventually
    // uses Item/Text/etc.) we always import both modules anyway.
    out.add('View'); // forces imports
    return;
  }
  if (isSpecNode(node)) {
    out.add(node.kind);
    const children = (node.props as Record<string, unknown>).children;
    if (children != null) collectKinds(children, out);
  }
}

function emitNode(node: unknown, ctx: EmitContext): string {
  if (node == null || node === false || node === true) {
    return ''; // caller filters
  }

  if (Array.isArray(node)) {
    // Fragment-style array: emit each element, separated by newlines.
    return node
      .map((child) => emitNode(child, ctx))
      .filter((s) => s.length > 0)
      .join('\n');
  }

  if (isComponentRef(node)) {
    return emitComponent(node, ctx);
  }

  if (!isSpecNode(node)) {
    // Literal text. Emit a Text element so it has a visible place to
    // land. The dirty counter trick still applies — V4 will re-eval
    // the binding when __dirty ticks.
    const text = String(node).replace(/"/g, '\\"');
    return ctx.indent.repeat(ctx.depth) + `Text { text: ${ctx.indent === '  ' ? '"' + text + '"' : '"' + text + '"'} }`;
  }

  const spec = node;
  const type = KIND_TO_QML_TYPE[spec.kind];
  if (!type) {
    throw new Error(
      `[nandomo/bridge-qml] unknown spec kind: ${spec.kind} (known: ${Object.keys(KIND_TO_QML_TYPE).join(', ')})`,
    );
  }

  // Module-touch — kept for future per-module import optimization.
  void KIND_TO_MODULE[spec.kind];

  const props = spec.props as Record<string, unknown>;
  const lines: string[] = [];
  lines.push(`${ctx.indent.repeat(ctx.depth)}${type} {`);

  // Object name (debug aid — V4 scenes show up by id in tooling).
  lines.push(`${ctx.indent.repeat(ctx.depth + 1)}objectName: "${spec.kind}"`);

  // Column needs explicit width, otherwise its children get width=0
  // and only the first is visible. Anchoring to parent.width fills
  // the available horizontal space.
  if (type === 'Column') {
    lines.push(`${ctx.indent.repeat(ctx.depth + 1)}anchors.left: parent.left`);
    lines.push(`${ctx.indent.repeat(ctx.depth + 1)}anchors.right: parent.right`);
    lines.push(`${ctx.indent.repeat(ctx.depth + 1)}spacing: 8`);
  }

  // Apply known props (label/text/value/...)
  const propLines = emitProps(props, spec, ctx);
  for (const line of propLines) lines.push(line);

  // Children. bridge-qml emits children inline (default property).
  // For Text and Input, a function-typed children becomes a reactive
  // `text:` binding polled by App.__updateBindings() — that's the
  // bridge-web semantic for `<Text>{() => `Count: ${count()}`}</Text>`.
  const children = props.children;
  if (children != null && (spec.kind === 'Text' || spec.kind === 'Input')) {
    if (typeof children === 'function') {
      // Reactive text — emit a `text:` binding plus an id and
      // Component.onCompleted so the QML Timer can update the widget's
      // text directly each poll cycle. The Timer polls App.__refresh()
      // which iterates registered widgets and writes each binding's
      // current value to its text.
      const result = formatBinding(children, ctx);
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}text: ${result.expression}`);
      if (result.bindingId !== undefined) {
        lines.push(`${ctx.indent.repeat(ctx.depth + 1)}id: text_${result.bindingId}`);
        lines.push(`${ctx.indent.repeat(ctx.depth + 1)}Component.onCompleted: App.__registerTextWidget(${result.bindingId}, this)`);
      }
    } else if (typeof children === 'string' || typeof children === 'number') {
      // Static text child — push a `text:` line so it shows up as the
      // QML Text's content rather than a nested Text.
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}text: ${formatBinding(children, ctx).expression}`);
    } else if (isSpecNode(children)) {
      // SpecNode child — recurse as a nested element.
      const emitted = emitNode(children, { ...ctx, depth: ctx.depth + 1 });
      if (emitted.length > 0) {
        lines.push('');
        lines.push(emitted);
      }
    }
  } else if (children != null) {
    // Other kinds: nest as default property (children as QML objects).
    if (Array.isArray(children)) {
      const childEmits: string[] = [];
      for (const child of children) {
        const emitted = emitNode(child, { ...ctx, depth: ctx.depth + 1 });
        if (emitted.length > 0) childEmits.push(emitted);
      }
      if (childEmits.length > 0) {
        lines.push('');
        lines.push(...childEmits);
      }
    } else {
      const emitted = emitNode(children, { ...ctx, depth: ctx.depth + 1 });
      if (emitted.length > 0) {
        lines.push('');
        lines.push(emitted);
      }
    }
  }

  lines.push(`${ctx.indent.repeat(ctx.depth)}}`);
  return lines.join('\n');
}

function emitComponent(ref: ComponentRef, ctx: EmitContext): string {
  // The bridge-qml component composition model: the JS bundle's
  // `setQmlRoot` was called with the ApplicationWindow, but components
  // are instantiated in the JS bundle's component registry (see
  // bridge-qml/src/bundle-shim.ts). For MVP we emit a `Loader` whose
  // sourceComponent points to a named Component we declare in the
  // bundle. Simpler: emit a Component { id: <name> } block whose
  // contents are the result of evaluating the component class on the
  // JS side — but that requires knowing the component's spec at
  // emit time.
  //
  // For MVP we treat a ComponentRef as opaque: emit a `Component { id: __comp_<n> }`
  // placeholder whose sourceComponent is registered by the bundle when
  // the JS-side `instantiateComponents()` runs (called from
  // `setQmlRoot`).
  const id = registerComponentPlaceholder(ref, ctx.handlers);
  return [
    `${ctx.indent.repeat(ctx.depth)}Loader {`,
    `${ctx.indent.repeat(ctx.depth + 1)}id: __loader_${id}`,
    `${ctx.indent.repeat(ctx.depth + 1)}sourceComponent: __comp_${id}`,
    `${ctx.indent.repeat(ctx.depth + 1)}anchors.fill: parent`,
    `${ctx.indent.repeat(ctx.depth)}}`,
  ].join('\n');
}

// Component placeholder registration. We don't walk into @Component
// classes at translate time (they may have reactive state and would
// require instantiating them). Instead we hand the ComponentRef to the
// bundle shim, which stores it under id `__comp_<n>` and registers a
// named Component that the Loader references.
const componentRegistry = new Map<
  number,
  { ctor: new () => unknown; props: Record<string, unknown> }
>();
let nextComponentId = 0;

function registerComponentPlaceholder(
  ref: ComponentRef,
  _handlers: HandlerRegistry,
): number {
  const id = nextComponentId++;
  componentRegistry.set(id, { ctor: ref.ctor, props: ref.props });
  return id;
}

/** Exposed for the bundle shim to consume. */
export function drainComponentRegistry(): Array<{
  id: number;
  ctor: new () => unknown;
  props: Record<string, unknown>;
}> {
  const all = Array.from(componentRegistry.entries()).map(([id, v]) => ({
    id,
    ctor: v.ctor,
    props: v.props,
  }));
  componentRegistry.clear();
  nextComponentId = 0;
  return all;
}

function emitProps(
  props: Record<string, unknown>,
  spec: SpecNode,
  ctx: EmitContext,
): string[] {
  const kind = spec.kind;
  const lines: string[] = [];
  const renames = PROP_RENAME[kind] ?? {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') continue;
    if (key === 'class' || key === 'style') continue; // not used in QML v0
    if (key === 'variant') continue; // CSS-flavored; not emitted in MVP

    // Apply kind-specific rename (src → source for Image, etc.).
    const qmlKey = renames[key] ?? key;

    // Event handler — register in the handler registry and emit
    // `onClicked: App.__handler_<id>()`
    if (EVENT_PROP_RE.test(key)) {
      if (typeof value === 'function') {
        const id = ctx.handlers.register(value as (...a: unknown[]) => unknown);
        const qmlSignal = EVENT_PROP_TO_QML[key] ?? `on${key.charAt(2).toUpperCase()}${key.slice(3)}`;
        lines.push(
          `${ctx.indent.repeat(ctx.depth + 1)}${qmlSignal}: App.__callHandler(${id})`,
        );
        continue;
      }
      if (value != null) {
        throw new TypeError(
          `[nandomo/bridge-qml] event handler "${key}" must be a function, got ${typeof value}`,
        );
      }
      continue;
    }

    // `label` is special — it sets `text` for Button (QML's Button
    // uses `text:` as its label property).
    if (spec.kind === 'Button' && key === 'label') {
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}text: ${formatBinding(value, ctx).expression}`);
      continue;
    }

    // `value` on Text/Input — set `text` for Text, `text` for Input
    // (TextField uses `text:` as well). For reactive (function) values,
    // the bridge emits an `id:` line + a `Component.onCompleted:
    // App.__registerTextWidget(N, this)` so the QML Timer can find
    // the widget and write the binding's current value to its text
    // every poll cycle.
    if (key === 'value' && (kind === 'Text' || kind === 'Input')) {
      const result = formatBinding(value, ctx);
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}text: ${result.expression}`);
      if (result.bindingId !== undefined) {
        lines.push(`${ctx.indent.repeat(ctx.depth + 1)}id: text_${result.bindingId}`);
        lines.push(`${ctx.indent.repeat(ctx.depth + 1)}Component.onCompleted: App.__registerTextWidget(${result.bindingId}, this)`);
      }
      continue;
    }

    if (key === 'disabled' && (kind === 'Button' || kind === 'Input')) {
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}enabled: ${formatBinding(value, ctx).expression}`);
      continue;
    }

    // Pass-through props (placeholder, src, width, ...).
    if (KNOWN_PASS_THROUGH.has(qmlKey)) {
      lines.push(`${ctx.indent.repeat(ctx.depth + 1)}${qmlKey}: ${formatBinding(value, ctx).expression}`);
      continue;
    }

    // Unknown prop — silently drop in MVP. (Bridges intentionally
    // ignore props they don't know how to render rather than throwing;
    // throwing would block portability of cross-stack components.)
  }
  return lines;
}

/**
 * Format a prop value as a QML binding expression. Function values
 * are registered as bindings (the function lives in `__bindings[id]`
 * for the QML Timer to poll) and the expression is a direct call to
 * `App.__callBinding(N)`. The QML Timer at Window level calls
 * `App.__refresh()` every 16ms which writes each registered binding's
 * current value to its widget's `text` property directly. (Writing
 * from QML context inside Timer.onTriggered reliably fires the
 * property's change signal; writing from V4 raw JS does not.)
 *
 * Static values are stringified (booleans → true/false, numbers → raw,
 * strings → quoted).
 */
function formatBinding(
  value: unknown,
  ctx: EmitContext,
): { expression: string; bindingId?: number } {
  if (typeof value === 'function') {
    // Reactive prop. Register the function by integer ID; the QML Timer
    // calls App.__callBinding(id) on each tick and the JS bundle writes
    // the result directly to the widget's text property.
    const id = ctx.handlers.register(value as (...a: unknown[]) => unknown);
    return { expression: `App.__callBinding(${id})`, bindingId: id };
  }
  if (value == null) return { expression: 'undefined' };
  if (typeof value === 'boolean') return { expression: value ? 'true' : 'false' };
  if (typeof value === 'number') {
    return {
      expression: Number.isFinite(value) ? String(value) : '0',
    };
  }
  if (typeof value === 'string') {
    // Escape backslashes and double-quotes for QML string literals.
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return { expression: `"${escaped}"` };
  }
  // Object (style object, etc.) — not supported in MVP.
  return { expression: 'undefined' };
}
