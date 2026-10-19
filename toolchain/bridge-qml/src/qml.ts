import type { SpecNode } from './primitives/types.js';

type Binding<T> = T | (() => T);
export interface QmlObject {
  readonly objectName: string;
  inspect(properties: string[]): Promise<Record<string, unknown>>;
  set(property: string, value: unknown): Promise<void>;
  invoke(method: string, ...args: unknown[]): Promise<unknown>;
}
/** Typed method surface inferred from the native module metadata. */
export type QmlTypedObject<M extends { [K in keyof M]: (...args: never[]) => unknown }> =
  Omit<QmlObject, 'invoke'> & {
    invoke<K extends keyof M & string>(method: K, ...args: Parameters<M[K]>): Promise<ReturnType<M[K]>>;
  };
/** A native reference whose method types are inferred from its component factory. */
export function createQmlRef<P extends object>(_component: (props:P)=>unknown) {
  type ObjectType = P extends {ref?: (object:infer R)=>void} ? R : QmlObject | null;
  let current:ObjectType|null=null;
  return {
    get current(){return current;},
    attach(object:ObjectType){current=object;},
  };
}
interface ItemProps {
  children?: unknown;
  objectName?: string;
  width?: Binding<number | 'fill'>;
  height?: Binding<number | 'fill'>;
  visible?: Binding<boolean>;
  enabled?: Binding<boolean>;
  ref?: (object: QmlObject | null) => void;
}
interface LayoutProps extends ItemProps { spacing?: Binding<number>; }
interface TextProps extends ItemProps { text?: Binding<string>; }
interface ButtonProps extends TextProps { onClicked?: () => void; }
interface TextFieldProps extends TextProps {
  placeholderText?: string;
  onTextEdited?: (text: string) => void;
  onEditingFinished?: () => void;
}
interface DialogProps extends ItemProps {
  title?: Binding<string>;
  modal?: boolean;
  onAccepted?: () => void;
  onRejected?: () => void;
}

function tag<P extends object>(type: string) {
  return (props: P): SpecNode => ({ __spec: true, kind: `qml:${type}`, props: { ...props } as Record<string, unknown> });
}

/** Native components, authored by the application; no visual library. */
export const qml = {
  Item: tag<ItemProps>('Item'),
  ScrollView: tag<ItemProps>('ScrollView'),
  Column: tag<LayoutProps>('Column'),
  Row: tag<LayoutProps>('Row'),
  Text: tag<TextProps>('Text'),
  Label: tag<TextProps>('Label'),
  Button: tag<ButtonProps>('Button'),
  TextField: tag<TextFieldProps>('TextField'),
  Dialog: tag<DialogProps>('Dialog'),
};
