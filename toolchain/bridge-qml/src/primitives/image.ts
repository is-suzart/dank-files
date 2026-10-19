// Image primitive · <Image> → Image from QtQuick.
import type { SpecNode } from './types.js';

export interface ImageProps {
  src: string;
  alt?: string;
  class?: string;
  style?: Record<string, string>;
}

export function Image(props: ImageProps): SpecNode {
  return {
    __spec: true,
    kind: 'Image',
    props: { ...props },
  };
}
