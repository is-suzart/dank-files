// View primitive · <View> → Rectangle (transparent) in QML.
// bridge-qml maps View → Rectangle { color: "transparent" } so that
// children can be laid out using anchors/fill modes that Rectangle
// supports but bare Item does not.
import type { SpecNode } from './types.js';

export interface ViewProps {
  children?: unknown;
  class?: string;
  style?: Record<string, string>;
}

export function View(props: ViewProps = {}): SpecNode {
  return {
    __spec: true,
    kind: 'View',
    props: { ...props },
  };
}
