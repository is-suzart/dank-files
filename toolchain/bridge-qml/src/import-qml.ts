import { defineQmlComponent, type NativeQmlNode } from './native-component.js';
import type { QmlCompositionProps } from './native-composition.js';

type DynamicProps = Record<string, unknown>;
type QmlFactory<P extends object = DynamicProps> = (props: P & QmlCompositionProps) => NativeQmlNode;
export type QmlModule<T = Record<string, DynamicProps>> = {
  readonly [K in keyof T]: QmlFactory<Extract<T[K], object>>;
};

/** Augmented by automatically discovered native module declarations. */
export interface QmlModules {}

/** Import native types lazily. Supply generated module types for strict JSX checking.
 * Without metadata, property names are checked syntactically and Qt validates their existence.
 * Event handlers receive native signal arguments; named property forwarding remains available
 * through defineQmlComponent for existing contracts.
 */
export function importQml<M extends keyof QmlModules>(module:M):QmlModule<QmlModules[M]>;
export function importQml<T extends { [K in keyof T]: object } = Record<string, DynamicProps>>(module:string):QmlModule<T>;
export function importQml<T extends { [K in keyof T]: object } = Record<string, DynamicProps>>(module: string): QmlModule<T> {
  if (!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/.test(module)) {
    throw new TypeError(`Invalid QML module: ${module}`);
  }
  const factories = new Map<string, QmlFactory>();
  return new Proxy(Object.create(null), {
    get(_target, type: string | symbol) {
      if (typeof type !== 'string' || type === 'then') return undefined;
      if (!/^[A-Z][A-Za-z0-9_]*$/.test(type)) throw new TypeError(`Invalid QML type: ${module}.${type}`);
      let factory = factories.get(type);
      if (!factory) {
        factory = props => {
          const properties: string[] = [];
          const events: Record<string, readonly string[]> = {};
          for (const key of Object.keys(props)) {
            if (['children', 'objectName', 'width', 'height', 'grow', 'ref'].includes(key)) continue;
            if (/(^|\.)on[A-Z]/.test(key)) events[key] = [];
            else properties.push(key);
          }
          const node = defineQmlComponent<DynamicProps>({type, module, properties, events})(props);
          return {...node, nativeQmlType: {...node.nativeQmlType, signalArguments: true}};
        };
        factories.set(type, factory);
      }
      return factory;
    },
  }) as QmlModule<T>;
}
