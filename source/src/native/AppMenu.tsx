import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const controls = importQml("QtQuick.Controls");
const qml = importQml("QtQuick");
declare let Style: any;
type Binding<T> = T | (() => T);
export type AppMenuProps = Parameters<typeof controls.Menu>[0] & {};
export const AppMenu = component<AppMenuProps>("AppMenu", (props) => {
  const scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  return (
    <controls.Menu
      qmlImports={["Quickshell", "qs.DankCommon.Common"]}
      padding={6}
      overlap={0}
      implicitWidth={260}
      background={
        <qml.Rectangle
          color={qmlExpression(scope, ($qml) => Style.surfaceContainerHigh)}
          radius={12}
          {...{ "border.width": 1 }}
          {...{
            "border.color": qmlExpression(scope, ($qml) =>
              Style.withAlpha(Style.surfaceText, 0.1),
            ),
          }}
        />
      }
      {...props}
    />
  );
});
