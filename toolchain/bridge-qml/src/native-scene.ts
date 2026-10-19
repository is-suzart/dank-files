import { createWireValueCache } from '@nandomo/bridge-runtime/native-updates';
import { sourceOrigin, sourceError, type SourceOrigin } from '@nandomo/core';
import { isQmlEnum } from './native-value.js';
import { nativeClosure, emitNativeClosure, projectedEvent, type QmlCompositionProps } from './native-composition.js';
import { effect, isDefinedComponentRef, isResponsive, isDynamicNode, mountDynamicRegion, isDialogNode, requestDialogClose, type DialogNode, type LayoutProps } from '@nandomo/core';
import { isSpecNode } from './primitives/types.js';
import type { QmlObject } from './qml.js';
import type { NativeQmlNode } from './native-component.js';

export interface NativeSceneOptions {
  /** Extra native imports used by explicit Qt-side expressions. */
  imports?: readonly string[];
  /** Appearance supplied by the target application, without a shared visual design system. */
  dialogAppearance?: { background: unknown; foreground: unknown; radius?: number; padding?: number };
  /** Emit an embeddable object instead of an ApplicationWindow. */
  fragment?: boolean;
  /** The embedding transport implements create/order/destroy_fragment commands. */
  dynamicFragments?: boolean;
  /** QML object providing binding properties and dispatch(handler, args). */
  context?: string;
}

export interface NativeScene {
  readonly source: string;
  readonly bindings: Record<string, unknown>;
  dispatch(handler: string, args: unknown[]): void;
  mount(resolve: (name: string) => QmlObject): void;
  dispose(): void;
}

const primitives: Record<string, string> = {
  View: 'Column', Container: 'Item', Text: 'Text', Input: 'TextField', Button: 'Button', Image: 'Image',
};
const types = new Set(['ScrollView', 'Item', 'Column', 'Row', 'Text', 'Label', 'Button', 'TextField', 'Dialog', 'Image']);
const events: Record<string, string> = {
  onTap: 'onClicked', onClicked: 'onClicked', onAccepted: 'onAccepted', onRejected: 'onRejected',
  onTextEdited: 'onTextEdited', onEditingFinished: 'onEditingFinished', onChange: 'onTextEdited',
};
const properties = new Set(['width', 'height', 'visible', 'enabled', 'spacing', 'text', 'title', 'modal', 'placeholderText', 'source']);

/** All closures stay in Node. QML binds to QQmlPropertyMap properties. */
export function createNativeScene(tree: unknown, update: (key: string, value: unknown) => void, patch: (command: object) => Promise<void> = async () => {}, onError: (error: unknown) => void = console.error, options: NativeSceneOptions = {}) : NativeScene {
  const context = options.context ?? 'Nandomo';
  if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(context)) throw new TypeError('Invalid QML binding context');
  const imports = new Set(['QtQuick', 'QtQuick.Controls', 'QtQuick.Layouts']);
  for (const module of options.imports ?? []) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module)) throw new TypeError('Invalid QML module');
    imports.add(module);
  }
  const bindings: Record<string, unknown> = {};
  const previousValues = createWireValueCache();
  const handlers = new Map<string, (...args: unknown[]) => unknown>();
  type Frame = { cleanups: Array<() => void>; mounts: Array<() => void>; refs: Array<{ name: string; fn: (object: QmlObject | null) => void }>; disposed: boolean; mounted: boolean; ready: boolean };
  const makeFrame = (): Frame => ({ cleanups: [], mounts: [], refs: [], disposed: false, mounted: false, ready: true });
  const rootFrame = makeFrame();
  let frame = rootFrame;
  let resolver: ((name: string) => QmlObject) | undefined;
  const freeBindings: string[] = [];
  function inFrame<T>(next: Frame, fn: () => T): T {
    const previous = frame; frame = next;
    try { return fn(); } finally { frame = previous; }
  }
  function disposeFrame(target: Frame) {
    if (target.disposed) return;
    target.disposed = true;
    const errors: unknown[] = [];
    for (const cleanup of target.cleanups.splice(0).reverse()) { try { cleanup(); } catch (error) { errors.push(error); } }
    for (const ref of target.refs.splice(0)) { try { ref.fn(null); } catch (error) { errors.push(error); } }
    target.mounts.length = 0;
    if (errors.length) throw new AggregateError(errors, 'QML frame cleanup failed');
  }
  function mountFrame(target: Frame) {
    if (target.disposed || target.mounted || !target.ready || !resolver) return;
    target.mounted = true;
    try {
      for (const ref of target.refs) ref.fn(resolver(ref.name));
      for (const fn of target.mounts) fn();
    } catch (error) { try { disposeFrame(target); } catch {} throw error; }
  }
  const names = new Set<string>(['appWindow']);
  let bindingId = 0, handlerId = 0, nodeId = 0;
  let mounted = false, disposed = false;

  let currentOrigin: SourceOrigin | undefined;
  function value(raw: unknown, property?: string): string {
    const origin = currentOrigin;
    if (nativeClosure(raw)) return emitNativeClosure(raw as Function);
    if (isQmlEnum(raw)) return raw.__qmlEnum;
    if (typeof raw !== 'function') return JSON.stringify(raw ?? null);
    const key = freeBindings.pop() ?? `b${bindingId++}`;
    const handle = effect(() => {
      let next: unknown;
      try { next = (raw as () => unknown)(); }
      catch(error) { throw sourceError(error, origin, property); }
      try {
        const changed = previousValues.changed(key, next);
        bindings[key] = next;
        if (changed) update(key, next);
      } catch (error) { throw sourceError(error, origin, property); }
    });
    frame.cleanups.push(() => { handle.dispose(); delete bindings[key]; previousValues.forget(key); freeBindings.push(key); });
    return `${context}.${key}`;
  }

  function layoutValue(raw: unknown, width: string): string {
    if (nativeClosure(raw)) return value(raw);
    if (typeof raw === 'function') {
      // Responsive shape may depend on signals; QML chooses the breakpoint natively.
      const resolve = (pick: (v: unknown) => unknown) => value(() => pick((raw as () => unknown)()));
      const initial = (raw as () => unknown)();
      if (!isResponsive(initial)) return value(raw);
      let expression = resolve(v => isResponsive(v) ? v.base : v);
      for (const point of Object.keys(initial.minWidth).map(Number).sort((a, b) => a - b)) {
        expression = `(${width} >= ${point} ? ${resolve(v => isResponsive(v) ? v.minWidth[point] : v)} : ${expression})`;
      }
      return expression;
    }
    if (!isResponsive(raw)) return value(raw);
    let expression = value(raw.base);
    for (const point of Object.keys(raw.minWidth).map(Number).sort((a, b) => a - b)) {
      expression = `(${width} >= ${point} ? ${value(raw.minWidth[point])} : ${expression})`;
    }
    return expression;
  }

  function sizing(props: Record<string, unknown>, grid?: string): string[] {
    const lines: string[] = [];
    if (grid) {
      const grow = Number(props.grow ?? 0);
      lines.push(`property real ndGrow: ${grow}`);
      const row = `${grid}.ndDirection === "row"`;
      const align = `${grid}.ndAlign`;
      lines.push(`Layout.fillWidth: (${row} ? ${grow > 0} : ${align} === "stretch")`);
      lines.push(`Layout.fillHeight: (${row} ? ${align} === "stretch" : ${grow > 0})`);
      if (grow > 0) {
        lines.push(`Layout.horizontalStretchFactor: ${grow}`, `Layout.verticalStretchFactor: ${grow}`);
        lines.push(`Layout.preferredWidth: (${row} ? 0 : implicitWidth)`, `Layout.preferredHeight: (${row} ? implicitHeight : 0)`);
        lines.push('Layout.minimumWidth: 0', 'Layout.minimumHeight: 0');
      }
      lines.push(`Layout.alignment: (${row} ? (${align} === "center" ? Qt.AlignVCenter : ${align} === "end" ? Qt.AlignBottom : Qt.AlignTop) : (${align} === "center" ? Qt.AlignHCenter : ${align} === "end" ? Qt.AlignRight : Qt.AlignLeft))`);
    }
    for (const key of ['width', 'height']) {
      const raw = props[key];
      if (raw == null) continue;
      if (grid) {
        if (raw === 'fill') lines.push(`Layout.fill${key === 'width' ? 'Width' : 'Height'}: true`);
        else lines.push(`Layout.preferred${key === 'width' ? 'Width' : 'Height'}: ${value(raw)}`);
      } else lines.push(`${key}: ${raw === 'fill' ? `(parent ? parent.${key} : 0)` : value(raw)}`);
    }
    return [...new Map(lines.map(line => [line.slice(0, line.indexOf(':')), line])).values()];
  }

  function emitLayout(kind: string, props: LayoutProps, parentGrid?: string): string {
    const id = (props as QmlCompositionProps).qmlId ?? `n${nodeId++}`;
    const name = props.objectName ?? id;
    if (names.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names.add(name);
    frame.cleanups.push(() => names.delete(name));
    const lines = ['Item {', `id: ${id}`, `objectName: ${JSON.stringify(name)}`, ...sizing(props as Record<string, unknown>, parentGrid)];
    if (kind === 'ui:Div') {
      if (typeof props.children === 'function') throw new Error('[nandomo/qml] Dynamic structural children are not implemented');
      lines.push(emit(props.children), '}');
      return lines.join('\n');
    }
    const grid = `g${nodeId++}`;
    lines.push(`implicitWidth: ${grid}.implicitWidth`, `implicitHeight: ${grid}.implicitHeight`);
    lines.push('GridLayout {', `id: ${grid}`);
    lines.push(`property string ndDirection: ${layoutValue(props.direction ?? 'column', `${id}.width`)}`);
    lines.push(`property string ndAlign: ${layoutValue(props.align ?? 'stretch', `${id}.width`)}`);
    lines.push(`property string ndJustify: ${layoutValue(props.justify ?? 'start', `${id}.width`)}`);
    lines.push(`property bool ndHasGrow: { for (var i = 0; i < children.length; i++) { if (children[i].ndGrow > 0) return true; } return false; }`);
    lines.push(`columns: ndDirection === "row" ? Math.max(1, children.length) : 1`);
    const gap = layoutValue(props.gap ?? 0, `${id}.width`);
    lines.push(`rowSpacing: ${gap}`, `columnSpacing: ${gap}`);
    lines.push(`width: ndDirection === "column" || ndHasGrow ? ${id}.width : implicitWidth`);
    lines.push(`height: ndDirection === "row" || ndHasGrow ? ${id}.height : implicitHeight`);
    lines.push(`x: ndDirection === "row" ? (ndJustify === "center" ? (${id}.width - width) / 2 : ndJustify === "end" ? ${id}.width - width : 0) : 0`);
    lines.push(`y: ndDirection === "column" ? (ndJustify === "center" ? (${id}.height - height) / 2 : ndJustify === "end" ? ${id}.height - height : 0) : 0`);
    if (typeof props.children === 'function') throw new Error('[nandomo/qml] Dynamic structural children are not implemented');
    lines.push(emit(props.children, grid), '}', '}');
    return lines.join('\n');
  }

  function emit(node: unknown, parentGrid?: string): string {
    const previous = currentOrigin;
    const location = sourceOrigin(node);
    const origin = location ? {...location, component: location.component ?? (isSpecNode(node) ? node.kind : undefined)} : previous;
    currentOrigin = origin;
    try {
      const result = emitNode(node, parentGrid);
      return origin ? `\n// @nandomo-source ${JSON.stringify(origin)}\n${result}` : result;
    } catch(error) { throw sourceError(error, origin); }
    finally { currentOrigin = previous; }
  }
  function emitNode(node: unknown, parentGrid?: string): string {
    if (node == null || typeof node === 'boolean') return '';
    if (Array.isArray(node)) return node.map(child => emit(child, parentGrid)).join('\n');
    if (isDialogNode(node)) return emitDialog(node);
    if (isDynamicNode(node)) {
      if (options.fragment && !options.dynamicFragments) throw new Error('[nandomo/qml] Fragment transport requires dynamicFragments support');
      const id = `r${nodeId++}`;
      const owner = frame;
      let initial = true;
      type Fragment = { name: string; source: string; frame: Frame };
      let ordered: readonly Fragment[] = [];
      const region = mountDynamicRegion(node, {
        mount(tree): Fragment {
          const name = `fragment${nodeId++}`;
          const childFrame = makeFrame();
          childFrame.ready = initial;
          let source: string;
          try {
            source = inFrame(childFrame, () => `Column { objectName: ${JSON.stringify(name)}; width: parent ? parent.width : 0; ${options.fragment ? "onHeightChanged: { if (parent && parent.ndReflow) parent.ndReflow(); }" : ""} ${emit(tree)} }`);
          } catch (error) { try { disposeFrame(childFrame); } catch {} throw error; }
          const fragment = { name, source, frame: childFrame };
          if (!initial) {
            const compiled = options.fragment ? `${[...imports].map(module => `import ${module}`).join('\n')}\n${source}` : source;
            void patch({ cmd: 'create_fragment', parent: id, source: compiled, bindings: { ...bindings } }).then(() => { childFrame.ready = true; mountFrame(childFrame); }).catch(onError);
          }
          return fragment;
        },
        order(handles) {
          const changed = ordered.length !== handles.length || ordered.some((handle, index) => handle !== handles[index]);
          ordered = handles;
          if (!initial && changed) void patch({ cmd: 'order_fragments', parent: id, objects: handles.map(handle => handle.name) }).catch(onError);
        },
        remove(handle) {
          try { disposeFrame(handle.frame); }
          finally { if (!disposed) void patch({ cmd: 'destroy_fragment', object: handle.name }).catch(onError); }
        },
      });
      initial = false;
      owner.cleanups.push(() => region.dispose());
      owner.mounts.push(() => { for (const fragment of ordered) mountFrame(fragment.frame); });
      const positioning = options.fragment ? `property var ndItems: []
function ndReflow() { var offset = 0; for (var i = 0; i < ndItems.length; i++) { var item = ndItems[i]; if (item && item.parent === this) { item.y = offset; offset += item.height; } } implicitHeight = offset; }
Component.onCompleted: { ndItems = Array.prototype.slice.call(children); ndReflow(); }` : '';
      return `${options.fragment ? 'Item' : 'Column'} { id: ${id}; objectName: ${JSON.stringify(id)}; ${(parentGrid ? sizing({}, parentGrid) : ['width: parent ? parent.width : 0']).join('\n')}
${positioning}
${ordered.map(handle => handle.source).join('\n')}
}`;
    }
    if (isDefinedComponentRef(node)) {
      const instance = node.instantiate('qml');
      frame.cleanups.push(() => instance.dispose());
      const source = emit(instance.view(), parentGrid);
      // Child refs/mounts finish before their parent's onMount.
      frame.mounts.push(() => instance.mount());
      return source;
    }
    if (typeof node === 'string' || typeof node === 'number') return emit({ __spec: true, kind: 'qml:Text', props: { text: String(node) } }, parentGrid);
    if (!isSpecNode(node)) throw new TypeError('[nandomo/qml] Expected a component or SpecNode');
    if (node.kind.startsWith('ui:')) return emitLayout(node.kind, node.props as LayoutProps, parentGrid);
    const type = node.kind.startsWith('qml:') ? node.kind.slice(4) : primitives[node.kind];
    const native = (node as NativeQmlNode).nativeQmlType;
    if (!type || (!native && !types.has(type))) throw new Error(`[nandomo/qml] Unsupported native type: ${node.kind}`);
    if (native) imports.add(native.module);
    const props = node.props;
    const autoName = `n${nodeId++}`;
    const id = (props as QmlCompositionProps).qmlId ?? autoName;
    const name = typeof props.objectName === 'string' ? props.objectName : autoName;
    if (names.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names.add(name);
    frame.cleanups.push(() => names.delete(name));
    const composition = props as QmlCompositionProps;
    for (const module of composition.qmlImports ?? []) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module)) throw new TypeError('Invalid QML module');
      imports.add(module);
    }
    const nativeId = composition.qmlId ?? id;
    if (!/^[a-z_][A-Za-z0-9_]*$/.test(nativeId)) throw new TypeError('Invalid native id');
    const on = composition.qmlOn;
    if(on !== undefined && (!native || typeof on !== 'string' || !/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(on)))
      throw new TypeError('Invalid native property target');
    const lines = [`${type}${on ? ' on ' + on : ''} {`, `id: ${nativeId}`, ...(type === 'Component' ? [] : [`objectName: ${typeof props.objectName === 'function' ? value(props.objectName) : JSON.stringify(name)}`]), ...sizing(props, parentGrid)];
    for (const [key, declaration] of Object.entries(composition.qmlDeclarations ?? {})) {
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) || !/^[A-Za-z_][A-Za-z0-9_.]*(<[^<>]+>)?$/.test(declaration.type) || declaration.type === 'alias' || (declaration.required && declaration.readonly)) throw new TypeError('Invalid native declaration');
      lines.push(`${declaration.required ? 'required ' : ''}${declaration.readonly ? 'readonly ' : ''}property ${declaration.type} ${key}${declaration.required ? '' : ': ' + value(Object.hasOwn(props, key) ? props[key] : declaration.value)}`);
    }
    for (const [key, arguments_] of Object.entries(composition.qmlSignals ?? {})) {
      if (!/^[a-z_][A-Za-z0-9_]*$/.test(key) || arguments_.some(arg => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(arg.name) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(arg.type))) throw new TypeError('Invalid native signal');
      lines.push(`signal ${key}(${arguments_.map(arg => `${arg.type} ${arg.name}`).join(', ')})`);
    }
    for (const [key, method] of Object.entries(composition.qmlMethods ?? {})) {
      if (!/^[a-z_][A-Za-z0-9_]*$/.test(key)) throw new TypeError('Invalid native method');
      lines.push(`function ${key}() { return ${emitNativeClosure(method, '...arguments')}; }`);
    }
    for (const [key, raw] of Object.entries(props)) {
      if (currentOrigin) lines.push(`// @nandomo-source ${JSON.stringify({ ...currentOrigin, property: key })}`);
      if (raw === undefined) continue;
      if (key === 'children' || key === 'objectName' || key === 'width' || key === 'height' || key === 'grow') continue;
      if (key.startsWith('qml') || composition.qmlDeclarations?.[key]) continue;
      if (/(^|\.)on[A-Z]/.test(key) && nativeClosure(raw)?.kind === 'handler') {
        lines.push(`${key}: function() { ${emitNativeClosure(raw as Function, '...arguments')}; }`);
        continue;
      }
      if (key === 'ref') {
        if (typeof raw !== 'function') throw new TypeError('[nandomo/qml] ref must be a function');
        frame.refs.push({ name, fn: raw as (object: QmlObject | null) => void });
        continue;
      }
      if (native ? Object.hasOwn(native.events ?? {}, key) : events[key]) {
        if (typeof raw !== 'function') throw new TypeError(`[nandomo/qml] ${key} must be a handler`);
        const handler = `h${handlerId++}`;
        const origin = currentOrigin;
        handlers.set(handler, (...args) => {
          try {
            const result = (raw as (...args: unknown[]) => unknown)(...args);
            if(result && typeof (result as PromiseLike<unknown>).then === 'function')
              return Promise.resolve(result).catch(error => onError(sourceError(error, origin, key)));
            return result;
          } catch(error) { throw sourceError(error, origin, key); }
        });
        frame.cleanups.push(() => handlers.delete(handler));
        const args = native ? `[${native.events![key]!.map(property => `${id}.${property}`).join(', ')}]` : events[key] === 'onTextEdited' ? `[${id}.text]` : '[]';
        const projected = projectedEvent(raw);
        if (projected) {
          lines.push(`${key}: function() { ${context}.dispatch(${JSON.stringify(handler)}, [${projected.map(property => `${id}.${property}`).join(', ')}]) }`);
        } else if (native?.signalArguments) {
          lines.push(`${key}: function() { ${context}.dispatch(${JSON.stringify(handler)}, Array.prototype.slice.call(arguments)) }`);
        } else lines.push(`${native ? key : events[key]}: ${context}.dispatch(${JSON.stringify(handler)}, ${args})`);
        continue;
      }
      const renamed = native ? key : key === 'label' || key === 'value' ? 'text' : key === 'placeholder' ? 'placeholderText' : key === 'src' ? 'source' : key;
      if (!native && key === 'disabled') {
        lines.push(`enabled: !(${value(raw)})`);
      } else if (native ? native.properties.includes(renamed) : properties.has(renamed)) {
        lines.push(`${renamed}: ${isSpecNode(raw) ? emit(raw) : value(raw, key)}`);
      } else throw new Error(`[nandomo/qml] Unsupported ${type} property: ${key}`);
    }
    if (props.children != null) {
      if (type === 'Text' || type === 'Label') lines.push(`text: ${value(props.children)}`);
      else {
        if (typeof props.children === 'function') throw new Error('[nandomo/qml] Dynamic structural children are not implemented');
        lines.push(emit(props.children));
      }
    }
    lines.push('}');
    return lines.join('\n');
  }

  function emitDialog(node: DialogNode): string {
    const props = node.props;
    const id = `d${nodeId++}`;
    const name = props.objectName ?? id;
    if (names.has(name)) throw new Error(`[nandomo/qml] Duplicate objectName: ${name}`);
    names.add(name);
    frame.cleanups.push(() => names.delete(name));
    const handler = `h${handlerId++}`;
    handlers.set(handler, reason => requestDialogClose(props, reason as 'escape' | 'outside' | 'dismiss'));
    frame.cleanups.push(() => handlers.delete(handler));
    // Popup is controlled: native input reports intent, never breaks visible's binding.
    return `Dialog {
      id: ${id}
      objectName: ${JSON.stringify(name)}
      parent: Overlay.overlay
      anchors.centerIn: parent
      modal: true
      focus: true
      closePolicy: Popup.NoAutoClose
      property bool ndControlledOpen: ${value(props.open)}
      visible: ndControlledOpen
      title: ${value(props.title)}
      ${options.dialogAppearance ? `padding: ${options.dialogAppearance.padding ?? 20}
      background: Rectangle { radius: ${options.dialogAppearance.radius ?? 16}; color: ${value(options.dialogAppearance.background)}; border.width: 1; border.color: "#1fffffff" }
      header: Text { text: ${id}.title; font.pixelSize: 20; font.weight: Font.DemiBold; color: ${value(options.dialogAppearance.foreground)}; leftPadding: 20; topPadding: 16; bottomPadding: 12 }` : ''}
      property var ndOpener: null
      property var ndWindow: ApplicationWindow.window
      property bool ndDestroying: false
      function ndInside(item) { while (item) { if (item === contentItem) return true; item = item.parent; } return false; }
      function ndFind(item, name) {
        if (name && item.objectName === name) return item;
        if (!name && item.activeFocusOnTab && item.visible && item.enabled) return item;
        for (var i = 0; i < item.children.length; i++) { var found = ndFind(item.children[i], name); if (found) return found; }
        return null;
      }
      function ndEscape() { ${context}.dispatch(${JSON.stringify(handler)}, ["escape"]); }
      function ndOutside() { ${context}.dispatch(${JSON.stringify(handler)}, ["outside"]); }
      function ndDismiss() { ${context}.dispatch(${JSON.stringify(handler)}, ["dismiss"]); }
      function ndTab(forward) {
        var current = (ndWindow ? ndWindow.activeFocusItem : null) || contentItem;
        var next = current.nextItemInFocusChain(forward);
        for (var n = 0; next && n < 1000; n++) {
          if (ndInside(next) && next.activeFocusOnTab && next.visible && next.enabled) { next.forceActiveFocus(Qt.TabFocusReason); return; }
          next = next.nextItemInFocusChain(forward);
          if (next === current) break;
        }
        contentItem.forceActiveFocus();
      }
      onAboutToShow: { if (ndWindow && !ndInside(ndWindow.activeFocusItem)) ndOpener = ndWindow.activeFocusItem; }
      onOpened: {
        var target = ndFind(contentItem, ${JSON.stringify(props.initialFocus ?? '')}) || ndFind(contentItem, "");
        if (target) target.forceActiveFocus(); else contentItem.forceActiveFocus();
      }
      onClosed: {
        if (ndDestroying) return;
        if (ndControlledOpen) { ndDismiss(); visible = Qt.binding(function() { return ndControlledOpen; }); return; }
        if (ndOpener && ndOpener.visible && ndOpener.enabled) ndOpener.forceActiveFocus(); ndOpener = null;
      }
      Component.onDestruction: { ndDestroying = true; if (visible && ndOpener && ndOpener.visible && ndOpener.enabled) ndOpener.forceActiveFocus(); }
      Overlay.onPressed: { if (visible && ndWindow && ndInside(ndWindow.activeFocusItem)) ndOutside(); }
      Shortcut { sequence: "Escape"; enabled: ${id}.visible && ${id}.ndWindow && ${id}.ndInside(${id}.ndWindow.activeFocusItem); context: Qt.WindowShortcut; onActivated: ${id}.ndEscape() }
      contentItem: FocusScope {
        implicitWidth: ndContent${id}.implicitWidth
        implicitHeight: ndContent${id}.implicitHeight
        Keys.onPressed: function(event) {
          if (event.key === Qt.Key_Tab || event.key === Qt.Key_Backtab) {
            event.accepted = true; ${id}.ndTab(event.key !== Qt.Key_Backtab && !(event.modifiers & Qt.ShiftModifier));
          }
        }
        Column { id: ndContent${id}; spacing: 12; ${emit(props.children)} }
      }
    }`;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    handlers.clear();
    disposeFrame(rootFrame);
  }

  try {
    const body = emit(tree);
    return {
      source: `${[...imports].map(module => `import ${module}`).join('\n')}\n${options.fragment ? body : `ApplicationWindow {\nid: appWindow\nobjectName: "appWindow"\nvisible: true\nwidth: 640\nheight: 480\ntitle: "Nandomo"\n${body}\n}`}`,
      bindings,
      dispatch(handler, args) {
        if (disposed) return;
        const fn = handlers.get(handler);
        if (!fn) {
          // Ignore in-flight events from a fragment that was just removed.
          if (/^h\d+$/.test(handler) && Number(handler.slice(1)) < handlerId) return;
          throw new Error(`[nandomo/qml] Unknown handler: ${handler}`);
        }
        fn(...args);
      },
      mount(resolve) {
        if (mounted || disposed) return;
        mounted = true;
        try {
          resolver = resolve;
          mountFrame(rootFrame);
        } catch (error) { try { dispose(); } catch { /* preserve mount failure */ } throw error; }
      },
      dispose,
    };
  } catch (error) { try { dispose(); } catch { /* preserve scene failure */ } throw error; }
}
