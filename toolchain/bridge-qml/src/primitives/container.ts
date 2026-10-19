// Container primitive · <Container> → Item in QML.
// Semantic alias of View but reserved for layout containers (future
// bridge parity). bridge-qml maps Container → Item so that pure
// layout containers don't accidentally get a paint background.
import type { SpecNode } from './types.js';

export interface ContainerProps {
  children?: unknown;
  class?: string;
  style?: Record<string, string>;
}

export function Container(props: ContainerProps = {}): SpecNode {
  return {
    __spec: true,
    kind: 'Container',
    props: { ...props },
  };
}
