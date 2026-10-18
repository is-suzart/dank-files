import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const controls = importQml("QtQuick.Controls");
const layouts = importQml("QtQuick.Layouts");
const dms = importQml("qs.DCommon.Widgets");
const qml = importQml("QtQuick");
declare let visible: any, Style: any;
type Binding<T> = T | (() => T);
export type ContextActionProps = Parameters<typeof controls.MenuItem>[0] & {
  hint?: Binding<string>;
};
export const ContextAction = component<ContextActionProps>(
  "ContextAction",
  (props) => {
    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    return (
      <controls.MenuItem
        qmlImports={["Quickshell", "qs.DCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          hint: { type: "string", value: "" },
        }}
        implicitHeight={qmlExpression(scope, ($qml) => (visible ? 36 : 0))}
        indicator={<qml.Item width={0} height={0} />}
        leftPadding={12}
        rightPadding={12}
        contentItem={
          <layouts.RowLayout
            opacity={qmlExpression(scope, ($qml) =>
              $qml.root.enabled ? 1 : 0.35,
            )}
          >
            <dms.StyledText
              text={qmlExpression(scope, ($qml) => $qml.root.checked ? "✓" : "")}
              visible={qmlExpression(scope, ($qml) => $qml.root.checkable)}
              {...{"Layout.minimumWidth":16,"Layout.maximumWidth":16}}
              color={qmlExpression(scope, () => Style.primary)}
            />
            <dms.StyledText
              text={qmlExpression(scope, ($qml) => $qml.root.text)}
              color={qmlExpression(scope, ($qml) => Style.surfaceText)}
              {...{ "font.pixelSize": 14 }}
              {...{ "Layout.fillWidth": true }}
            />
            <dms.StyledText
              text={qmlExpression(scope, ($qml) => $qml.root.hint)}
              color={qmlExpression(scope, ($qml) => Style.surfaceVariantText)}
              {...{ "font.pixelSize": 12 }}
            />
          </layouts.RowLayout>
        }
        background={
          <qml.Rectangle
            radius={7}
            color={qmlExpression(scope, ($qml) =>
              $qml.root.highlighted
                ? Style.withAlpha(Style.primary, 0.15)
                : "transparent",
            )}
          />
        }
        {...props}
      />
    );
  },
);
