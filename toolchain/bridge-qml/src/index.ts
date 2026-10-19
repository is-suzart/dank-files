// @nandomo/bridge-qml · public surface.
//
// Primitives are pure — each returns a declarative SpecNode with the
// same shape as @nandomo/bridge-web. `render()` walks the tree once,
// generates `app.qml`, and spawns `qml app.qml` (single-process, V4 JS
// engine). Cross-stack components (e.g. a Counter authored against
// @nandomo/bridge-web) port over by changing the import — the
// SpecNode shape and the JSX runtime contract are identical.
export type { SpecNode } from './primitives/types.js';
export { qml, createQmlRef, type QmlObject, type QmlTypedObject } from './qml.js';
export { defineQmlComponent, type NativeQmlType, type NativeQmlNode } from './native-component.js';
export { createNativeScene, type NativeScene, type NativeSceneOptions } from './native-scene.js';
export { renderNative, type NativeRootHandle, type NativeRenderOptions } from './render-native.js';

export { View, type ViewProps } from './primitives/view.js';
export { Container, type ContainerProps } from './primitives/container.js';
export { Button, type ButtonProps } from './primitives/button.js';
export { Text, type TextProps } from './primitives/text.js';
export { Input, type InputProps } from './primitives/input.js';
export { Image, type ImageProps } from './primitives/image.js';

export { render, type RootHandle, type RenderOptions } from './render.js';

export { provideQmlStorage } from './capabilities.js';

export { importQml, type QmlModule, type QmlModules } from './import-qml.js';

export { qmlEnum, type QmlEnum } from './native-value.js';
export { createQmlScope, qmlExpression, qmlHandler, qmlReadEvent, type QmlScope, type QmlCompositionProps } from './native-composition.js';

export { formatQmlDiagnostic } from './diagnostics.js';
