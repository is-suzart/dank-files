import { component } from '@nandomo/core';
import { importQml, qmlReadEvent } from '@nandomo/bridge-qml';
const dms = importQml('qs.DCommon.Widgets');
type Props = Omit<Parameters<typeof dms.DTextField>[0], 'onTextEdited' | 'onAccepted'> & {
  onTextEdited?: (text: string) => void;
  onAccepted?: (text: string) => void;
};
export const NativeTextField = component<Props>('NativeTextField', ({onTextEdited, onAccepted, ...props}) =>
  <dms.DTextField {...props}
    {...(onTextEdited ? {onTextEdited: qmlReadEvent(['text'], onTextEdited)} : {})}
    {...(onAccepted ? {onAccepted: qmlReadEvent(['text'], onAccepted)} : {})} />,
);
