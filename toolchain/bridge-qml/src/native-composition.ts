/** Explicit Qt-side expressions. Ordinary closures continue to execute in TypeScript. */
let nextScope = 0;
export interface QmlScope { readonly ids: Record<string, string>; id(name: string): string; }
export function createQmlScope(stableIds: Record<string, string> = {}): QmlScope {
  const prefix = `ndScope${nextScope++}_`;
  const ids: Record<string, string> = { ...stableIds };
  if (Object.values(ids).some(id => !/^[a-z_][A-Za-z0-9_]*$/.test(id))) throw new TypeError('Invalid native id');
  return { ids, id(name) {
    if (!/^[a-z_][A-Za-z0-9_]*$/.test(name)) throw new TypeError('Invalid native id');
    return ids[name] ??= prefix + name;
  } };
}
interface NativeClosure { scope: QmlScope; fn: Function; kind: 'expression' | 'handler'; }
const closures = new WeakMap<Function, NativeClosure>();
const projected = new WeakMap<Function, readonly string[]>();
/** Snapshot native properties at signal emission, before crossing the process boundary. */
export function qmlReadEvent<T extends (...args: any[]) => unknown>(properties: readonly string[], handler: T): (...args: any[]) => ReturnType<T> {
  if (properties.some(name => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(name))) throw new TypeError('Invalid event property');
  const forwarded = ((...args: any[]) => handler(...args)) as (...args: any[]) => ReturnType<T>;
  projected.set(forwarded, properties);
  return forwarded;
}
export function projectedEvent(value: unknown): readonly string[] | undefined {
  return typeof value === 'function' ? projected.get(value) : undefined;
}
/** Native callbacks cannot capture Node variables: use the scope's ids or explicit Qt globals. */
export function qmlExpression<T>(scope: QmlScope, fn: (objects: Record<string, any>) => T): () => T {
  const expression = () => { throw new Error('A native QML expression cannot execute in Node'); };
  closures.set(expression, { scope, fn, kind: 'expression' });
  return expression;
}
export function qmlHandler(scope: QmlScope, fn: (objects: Record<string, any>, ...args: any[]) => unknown): (...args: any[]) => void {
  const handler = () => { throw new Error('A native QML handler cannot execute in Node'); };
  closures.set(handler, { scope, fn, kind: 'handler' });
  return handler;
}
export function nativeClosure(value: unknown): NativeClosure | undefined {
  return typeof value === 'function' ? closures.get(value) : undefined;
}
export function emitNativeClosure(value: Function, args = ''): string {
  const closure = closures.get(value);
  if (!closure) throw new TypeError('Expected an explicit native closure');
  const source = closure.fn.toString();
  const parameter = /^\s*(?:function[^ (]*\s*\(\s*|\(?\s*)([$A-Za-z_][\w$]*)/.exec(source)?.[1];
  const noParameters = /^\s*(?:\(\s*\)\s*=>|function[^ (]*\s*\(\s*\))/.test(source);
  if (!parameter && !noParameters) throw new TypeError('Native closures require a named scope parameter or no parameters');
  const escaped = parameter?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const used = new Set(escaped ? [...source.matchAll(new RegExp(`${escaped}\\.([A-Za-z_][A-Za-z0-9_]*)`, 'g'))].map(match => match[1]) : []);
  const objects = Object.entries(closure.scope.ids).filter(([name]) => used.has(name)).map(([name, id]) => `${JSON.stringify(name)}: ${id}`).join(', ');
  // tsx/esbuild may annotate nested functions with __name; keep this helper local.
  return `(() => { const __name = function(fn) { return fn; }; return (${source})({${objects}}${args ? ', ' + args : ''}); })()`;
}
export interface QmlDeclaration {
  type: string; value?: unknown; readonly?: boolean; required?: boolean;
}
export interface QmlCompositionProps {
  /** Native interceptor target, e.g. <qml.Behavior qmlOn="color" />. */
  qmlOn?: string;
  qmlImports?: readonly string[];
  qmlId?: string;
  qmlDeclarations?: Record<string, QmlDeclaration>;
  qmlMethods?: Record<string, ReturnType<typeof qmlHandler>>;
  qmlSignals?: Record<string, readonly { name: string; type: string }[]>;
}
