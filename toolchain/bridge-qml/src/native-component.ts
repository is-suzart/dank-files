import type { SpecNode } from './primitives/types.js';

/** Explicit native contract. Signal arguments are read from named object properties. */
export interface NativeQmlType {
  readonly signalArguments?: boolean;
  readonly type: string;
  readonly module: string;
  readonly properties: readonly string[];
  readonly events?: Readonly<Record<string, readonly string[]>>;
}
export interface NativeQmlNode extends SpecNode { readonly nativeQmlType: NativeQmlType; }
const identifier = /^[A-Za-z_][A-Za-z0-9_]*$/;
const path = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/;

/** References an existing QML type; neither copies nor recreates its visual implementation. */
export function defineQmlComponent<P extends object>(definition: NativeQmlType): (props: P) => NativeQmlNode {
  if (!identifier.test(definition.type) || !path.test(definition.module)) throw new TypeError('Invalid QML type or module');
  for (const property of definition.properties) if (!path.test(property)) throw new TypeError('Invalid QML property');
  for (const [event, args] of Object.entries(definition.events ?? {})) {
    if (!/^(?:[A-Za-z_][A-Za-z0-9_]*\.)*on[A-Z][A-Za-z0-9_]*$/.test(event) || args.some(arg => !path.test(arg))) throw new TypeError('Invalid QML event contract');
  }
  const nativeQmlType = Object.freeze({ ...definition, properties: Object.freeze([...definition.properties]),
    events: Object.freeze(Object.fromEntries(Object.entries(definition.events ?? {}).map(([key, args]) => [key, Object.freeze([...args])]))),
  });
  return props => ({ __spec: true, kind: `qml:${nativeQmlType.type}`, props: { ...props } as Record<string,unknown>, nativeQmlType });
}
