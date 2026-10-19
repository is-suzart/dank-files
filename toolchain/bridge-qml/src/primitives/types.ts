// Shared SpecNode shape used by all bridge-qml primitives.
// Identical to @nandomo/bridge-web/primitives/types so that component code
// written against one bridge is portable to the other (the JSX runtime /
// spec tree shape is the cross-stack contract).
export interface SpecNode {
  readonly __spec: true;
  readonly kind: string;
  readonly props: Record<string, unknown>;
}

export function isSpecNode(value: unknown): value is SpecNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as { __spec?: unknown }).__spec === true &&
    typeof (value as { kind?: unknown }).kind === 'string'
  );
}
