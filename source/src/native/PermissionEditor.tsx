import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
  qmlReadEvent,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const layouts = importQml("QtQuick.Layouts");
const controls = importQml("QtQuick.Controls");
declare let modelData: any, Style: any, parent: any, mask: any, checked: any;
type Binding<T> = T | (() => T);
export type PermissionEditorProps = Parameters<typeof qml.Column>[0] & {
  mode?: Binding<number>;
  onModeChanged?: (mode: number) => void;
};
export const PermissionEditor = component<PermissionEditorProps>(
  "PermissionEditor",
  (props) => {
    props = {
      ...props,
      onModeChanged: props.onModeChanged
        ? qmlReadEvent(["mode"], props.onModeChanged)
        : undefined,
    };

    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    return (
      <qml.Column
        qmlImports={["Quickshell", "qs.DankCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          mode: { type: "int", value: 420 },
        }}
        width={440}
        spacing={10}
        {...props}
      >
        <qml.Repeater
          model={qmlExpression(scope, ($qml) => [
            { name: "Proprietário", shift: 6 },
            { name: "Grupo", shift: 3 },
            { name: "Outros", shift: 0 },
          ])}
          delegate={
            <layouts.RowLayout
              qmlDeclarations={{
                modelData: { type: "var", required: true },
              }}
              width={qmlExpression(scope, ($qml) => $qml.root.width)}
            >
              <qml.Text
                text={qmlExpression(scope, ($qml) => $qml.app.tr(modelData.name))}
                color={qmlExpression(scope, ($qml) => Style.surfaceText)}
                {...{ "Layout.preferredWidth": 100 }}
              />
              <qml.Repeater
                model={qmlExpression(scope, ($qml) => [
                  { name: "Ler", bit: 4 },
                  { name: "Alterar", bit: 2 },
                  { name: "Executar/acessar", bit: 1 },
                ])}
                delegate={
                  <controls.CheckBox
                    qmlDeclarations={{
                      modelData: { type: "var", required: true },
                      mask: {
                        type: "int",
                        readonly: true,
                        value: qmlExpression(
                          scope,
                          ($qml) => modelData.bit << parent.modelData.shift,
                        ),
                      },
                    }}
                    text={qmlExpression(scope, ($qml) => $qml.app.tr(modelData.name))}
                    checked={qmlExpression(
                      scope,
                      ($qml) => !!($qml.root.mode & mask),
                    )}
                    onClicked={qmlHandler(scope, ($qml) => {
                      $qml.root.mode = checked
                        ? $qml.root.mode | mask
                        : $qml.root.mode & ~mask;
                    })}
                  />
                }
              />
            </layouts.RowLayout>
          }
        />
        {props.children}
      </qml.Column>
    );
  },
);
