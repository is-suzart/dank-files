// nandomo · bridge-qml · bundle helpers (concatenated into bundle.js).
//
// This file is appended to the user bundle by render() AFTER the shim.
// It exposes a few convenience entry points:
//   - `tick()`: just calls `bumpDirty()` — useful for manual re-renders
//
// Like the shim, these are top-level function declarations so they
// become namespace members when QML does `import "bundle.js" as App`.

export const BUNDLE_HELPERS = String.raw`// ---- nandomo/bridge-qml · bundle helpers (auto-injected) ----

// Exposed as App.tick. Force a re-render by bumping __dirty.
function tick() {
  if (typeof bumpDirty === 'function') bumpDirty();
}
// ---- end bridge-qml helpers ----
`;
