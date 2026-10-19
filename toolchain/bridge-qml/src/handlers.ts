// nandomo · bridge-qml handler registry.
//
// QML files call back into the V4 JS bundle via named functions exported
// from the JS bundle (e.g. `App.__handler_0()`, `App.__handler_1()`).
// We allocate integer IDs at spec-translation time and emit stable names;
// the registry stores the actual JS callbacks by ID. When the bundle is
// evaluated by V4, it pre-populates a `__callHandler(id)` shim that walks
// the registry — see src/bundle-shim.ts for the snippet that's
// concatenated into every generated bundle.
//
// Why integer IDs? QML cannot bind to JS function references in
// `onClicked: App.someJsFn()` if the function was registered after the
// QML scene loaded (V4 resolves names at scene-load time only). Numeric
// IDs sidestep that: the QML side never references functions by name, and
// the shim looks them up by ID at click-time.

export type HandlerId = number;

/**
 * Storage for callbacks indexed by integer ID. Bridge-internal — not
 * exported from `index.ts`. The id range starts at 0 and is dense (the
 * generated QML references `__handler_<id>` so we want predictable names).
 */
export class HandlerRegistry {
  private nextId: HandlerId = 0;
  private readonly byId = new Map<HandlerId, (...args: unknown[]) => unknown>();

  /**
   * Register a callback. Returns the integer ID used by the generated
   * QML to call back into JS via `__callHandler(<id>)`.
   */
  register(fn: (...args: unknown[]) => unknown): HandlerId {
    const id = this.nextId++;
    this.byId.set(id, fn);
    return id;
  }

  /** Invoke a registered handler. Used by the bundle shim. */
  call(id: HandlerId, ...args: unknown[]): unknown {
    const fn = this.byId.get(id);
    if (fn == null) {
      throw new Error(
        `[nandomo/bridge-qml] handler ${id} not registered (registry has ${this.byId.size} handlers)`,
      );
    }
    return fn(...args);
  }

  /** Number of registered handlers (debug aid). */
  size(): number {
    return this.byId.size;
  }

  /** Drop all handlers — used by render() on dispose so the next render() starts fresh. */
  clear(): void {
    this.byId.clear();
    this.nextId = 0;
  }
}

/**
 * Per-render handler registry. `render()` builds one of these, hands it
 * to `specToQml()`, and discards it on dispose. Tests construct one
 * directly and call `specToQml()` against it.
 */
export function createHandlerRegistry(): HandlerRegistry {
  return new HandlerRegistry();
}
