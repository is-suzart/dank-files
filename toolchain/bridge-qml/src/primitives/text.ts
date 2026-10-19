// Text primitive · <Text> → Text from QtQuick.
// `value` or `children` becomes the `text:` binding (reactive via the
// dirty-counter pattern — see spec-to-qml.ts).
import type { SpecNode } from './types.js';

export interface TextProps {
  value?: string | (() => string);
  children?: unknown;
  class?: string;
  style?: Record<string, string>;
}

export function Text(props: TextProps = {}): SpecNode {
  return {
    __spec: true,
    kind: 'Text',
    props: { ...props },
  };
}
