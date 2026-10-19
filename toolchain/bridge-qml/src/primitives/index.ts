// Re-export the primitives so examples can import them via the
// `bridge-qml/src/primitives` subpath without pulling in render.ts
// (which has node:fs / node:child_process imports that Vite would
// fail to bundle for a V4 target).

export type { SpecNode } from './types.js';
export { View, type ViewProps } from './view.js';
export { Container, type ContainerProps } from './container.js';
export { Button, type ButtonProps } from './button.js';
export { Text, type TextProps } from './text.js';
export { Input, type InputProps } from './input.js';
export { Image, type ImageProps } from './image.js';
