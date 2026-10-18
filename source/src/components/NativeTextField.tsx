import { component } from '@nandomo/core';
import { importQml, qmlReadEvent } from '@nandomo/bridge-qml';
const dms = importQml('qs.DankCommon.Widgets');
type Props = Omit<Parameters<typeof dms.DankTextField>[0], 'onTextEdited' | 'onAccepted'> & {
  onTextEdited?: (text: string) => void;
  onAccepted?: (text: string) => void;
};
export const NativeTextField = component<Props>('NativeTextField', ({onTextEdited, onAccepted, ...props}) =>
  <dms.DankTextField {...props}
    {...(onTextEdited ? {onTextEdited: qmlReadEvent(['text'], onTextEdited)} : {})}
    {...(onAccepted ? {onAccepted: qmlReadEvent(['text'], onAccepted)} : {})} />,
);
