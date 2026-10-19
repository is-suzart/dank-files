// Input primitive · <Input> → TextField from QtQuick.Controls.
// `value` can be literal or reactive. `onChange` fires when the user
// edits the field (mapped to TextField's onTextChanged).
import type { SpecNode } from './types.js';

export interface InputProps {
  value?: string | (() => string);
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  disabled?: boolean | (() => boolean);
}

export function Input(props: InputProps = {}): SpecNode {
  return {
    __spec: true,
    kind: 'Input',
    props: { ...props },
  };
}
