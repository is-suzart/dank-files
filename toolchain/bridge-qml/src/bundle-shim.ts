// nandomo · bridge-qml · bundle shim.
//
// V4 (the JS engine inside Qt6 `qml`) evaluates `bundle.js` as a single
// script. The shim defines the symbols the generated QML references.
//
// IMPORTANT — QML namespace model:
//
//   When QML does `import "bundle.js" as App`, the namespace `App`
//   exposes the bundle's TOP-LEVEL declarations. It does NOT expose
//   properties of arbitrary globals like `globalThis.App` (and in
//   Qt6 6.11 V4 has no `globalThis` at all).
//
// Reactivity model — QML Timer polls JS, QML writes text:
//
//   The dirty counter pattern (JS bumps __dirty, QML binding
//   re-evaluates) only worked ONCE in Qt6 V4 — JS-set property writes
//   don't reliably trigger QML's propertyChanged signal after the
//   first time.
//
//   This shim implements the working alternative: a QML-side Timer
//   (interval 16ms = 60fps) calls App.__refresh() which iterates
//   registered reactive text widgets and writes the binding's current
//   value DIRECTLY to each widget's `text` property. Writing in QML
//   context (inside Timer.onTriggered) reliably fires the property's
//   change signal, so the screen updates on every tick.
//
//   Bridge-qml's spec-to-qml emits:
//     - `Component.onCompleted: App.__registerTextWidget(N, this)` on
//       Text widgets with reactive content (where N is the binding ID
//       assigned by spec-to-qml)
//     - A Timer at the Window level calling App.__refresh()

export const BUNDLE_SHIM = String.raw`// ---- nandomo/bridge-qml · bundle shim (auto-injected) ----

// Reactive text widgets registry: maps binding ID → widget reference.
// Populated by Component.onCompleted handlers emitted by spec-to-qml.
var __textWidgets = [];

// Exported as App.__callHandler. QML invokes it like:
//   onClicked: App.__callHandler(0)
function __callHandler(id) {
  var h = (__handlers || {})[id];
  if (typeof h !== 'function') {
    throw new Error('[nandomo/bridge-qml] handler ' + id + ' is not registered');
  }
  return h.apply(null, Array.prototype.slice.call(arguments, 1));
}

// Exposed as App.__registerHandler. bundle.ts uses this to register
// click handlers by integer ID.
var __handlers = {};
function __registerHandler(id, fn) { __handlers[id] = fn; }

// Exposed as App.__registerBinding. bundle.ts uses this to register
// a getter function for each reactive binding by integer ID.
var __bindings = {};
function __registerBinding(id, fn) { __bindings[id] = fn; }

// Exposed as App.__registerTextWidget. Called from QML's
// Component.onCompleted on each reactive Text widget to register the
// widget reference for polling.
function __registerTextWidget(id, widget) {
  __textWidgets.push({ id: id, widget: widget });
}

// Exposed as App.__refresh. Called by the QML Timer every 16ms.
// Iterates registered widgets and writes each binding's current value
// directly to its text property. The write happens in QML context
// (via the Timer's onTriggered expression), which reliably fires the
// propertyChanged signal — bypassing V4's JS-set property quirk.
function __refresh() {
  for (var i = 0; i < __textWidgets.length; i++) {
    var entry = __textWidgets[i];
    var fn = __bindings[entry.id];
    if (typeof fn === 'function' && entry.widget) {
      var v = String(fn());
      if (entry.widget.text !== v) {
        entry.widget.text = v;
      }
    }
  }
}

// Exposed as App.__init__. Called from QML's Component.onCompleted
// on the root Window.
function __init__() {}

// Exposed as App.setQmlRoot. QML passes the root window in here so
// the JS side can hold a reference.
function setQmlRoot(root) {}

// Backward-compat stubs — kept so existing bundle.ts code that
// calls bumpDirty() (the old dirty-counter pattern) doesn't crash.
// No-op in the new Timer-based model.
function bumpDirty() {}
// ---- end bridge-qml shim ----
`;
