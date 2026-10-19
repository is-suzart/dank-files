// @nandomo/bridge-qml · capability providers.
//
// `render()` calls `provideQmlStorage()` automatically on its first
// invocation so authors can `inject(Storage)` without manual wiring.
//
// The MVP impl is an in-memory key/value store. The real impl, when
// running inside the Qt6 `qml` process, would back onto `Qt.labs.settings`
// (or `Settings` from QtCore in Qt 6.5+) — a QML module that persists
// key/value pairs to a JSON file under the platform's standard config
// directory. That binding requires the bundle.js to load
// `import Qt.labs.settings` (or `import QtCore`) at scene-build time,
// which we don't do here because the bridge-qml MVP doesn't ship the
// compiled bundle inside a QML runtime — the unit-test environment is
// plain Node and the bridge is exercised via specToQml() translation
// only. A follow-up wires `Settings` in for the interactive path.

import { provideCapability } from '@nandomo/core';
import { Storage, type StorageAPI } from '@nandomo/bridge-runtime';

const memoryStore = new Map<string, string>();

export function provideQmlStorage(): void {
  const impl: StorageAPI = {
    getItem: (k) => Promise.resolve(memoryStore.has(k) ? memoryStore.get(k)! : null),
    setItem: (k, v) => {
      memoryStore.set(k, v);
      return Promise.resolve();
    },
    removeItem: (k) => {
      memoryStore.delete(k);
      return Promise.resolve();
    },
  };
  provideCapability(Storage, impl);
}

/** Test helper — clears the in-memory store between tests. */
export function __resetQmlStorageForTests(): void {
  memoryStore.clear();
}
