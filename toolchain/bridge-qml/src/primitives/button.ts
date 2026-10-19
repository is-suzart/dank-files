// Button primitive · <Button> → Button from QtQuick.Controls.
// `label` becomes the `text:` binding. `onTap` becomes the `onClicked`
// handler. `disabled` can be static or reactive.
import type { SpecNode } from './types.js';

export interface ButtonProps {
  label?: string | (() => string);
  onTap?: (e?: unknown) => void;
  disabled?: boolean | (() => boolean);
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: unknown;
}

export function Button(props: ButtonProps = {}): SpecNode {
  return {
    __spec: true,
    kind: 'Button',
    props: { ...props },
  };
}
