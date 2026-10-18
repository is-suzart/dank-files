import { component } from '@nandomo/core';
import { importQml, createQmlScope, qmlExpression } from '@nandomo/bridge-qml';

const qml = importQml('QtQuick');
declare const ApplicationWindow: any, childrenRect: any;

export interface DialogBodyProps {
  open: () => boolean;
  children?: unknown;
}

/**
 * A short fade when a dialog opens. The surface itself is provided by the
 * bridge, so the transition only lives in the content the app owns.
 */
export const DialogBody = component<DialogBodyProps>('DialogBody', ({ open, children }) => {
  const scope = createQmlScope();
  return (
    <qml.Item qmlImports={["QtQuick.Controls"]} implicitWidth={qmlExpression(scope, () => childrenRect.width)} implicitHeight={qmlExpression(scope, () => childrenRect.height)} opacity={() => (open() ? 1 : 0)}>
      <qml.Behavior qmlOn="opacity" animation={<qml.NumberAnimation duration={qmlExpression(scope, () =>
        ApplicationWindow.window && ApplicationWindow.window.reduceAnimations ? 0 : 120)} />} />
      {children}
    </qml.Item>
  );
});
