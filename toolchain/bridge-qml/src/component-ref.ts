// ComponentRef envelope — shared by jsx-runtime and render.ts.
//
// jsx-runtime must NOT depend on render.ts (render.ts pulls in
// node:fs / node:child_process / node:path which Vite can't bundle
// for V4). So the envelope type + constructor lives here in a
// node-free module that both jsx-runtime and render.ts can import.

export const COMPONENT_REF_BRAND = '__componentRef' as const;

export interface ComponentRef {
  readonly [COMPONENT_REF_BRAND]: true;
  readonly ctor: new () => unknown;
  readonly props: Record<string, unknown>;
}

export function createComponentRef(
  ctor: new () => unknown,
  props: Record<string, unknown>,
): ComponentRef {
  return {
    [COMPONENT_REF_BRAND]: true,
    ctor,
    props,
  };
}

export function isComponentRef(value: unknown): value is ComponentRef {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as { [k: string]: unknown })[COMPONENT_REF_BRAND] === true
  );
}
