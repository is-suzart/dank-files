import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
  qmlReadEvent,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
import { QuietButton } from "./QuietButton.js";
const qt = importQml("QtQml");
const dms = importQml("qs.DankCommon.Widgets");
declare let editing: any,
  path: any,
  home: any,
  Style: any,
  activeFocus: any,
  edit: any,
  parent: any,
  height: any,
  index: any;
type Binding<T> = T | (() => T);
export type PathBarProps = Parameters<typeof qml.Rectangle>[0] & {
  text?: Binding<string>;
  path?: Binding<string>;
  home?: Binding<string>;
  onNavigate?: (target: string) => void;
  onTextEdited?: (draft: string) => void;
  onAccepted?: (draft: string) => void;
};
export const PathBar = component<PathBarProps>("PathBar", (props) => {
  props = {
    ...props,
    onNavigate: props.onNavigate
      ? qmlReadEvent(["target"], props.onNavigate)
      : undefined,
    onTextEdited: props.onTextEdited
      ? qmlReadEvent(["draft"], props.onTextEdited)
      : undefined,
    onAccepted: props.onAccepted
      ? qmlReadEvent(["draft"], props.onAccepted)
      : undefined,
  };

  const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
  scope.id("root");
  scope.id("crumbs");
  scope.id("crumb");
  scope.id("click");
  scope.id("editor");
  return (
    <qml.Rectangle
      qmlImports={["Quickshell", "qs.DankCommon.Common"]}
      qmlId={scope.id("root")}
      qmlDeclarations={{
        text: { type: "string", value: "" },
        path: { type: "string", value: "" },
        home: { type: "string", value: "" },
        target: { type: "string", value: "" },
        draft: { type: "string", value: "" },
        editing: { type: "bool", value: false },
      }}
      qmlSignals={{ navigate: [], textEdited: [], accepted: [] }}
      qmlMethods={{
        clear: qmlHandler(scope, ($qml) => {
          editing = true;
          $qml.editor.clear();
        }),
        insertText: qmlHandler(scope, ($qml, value: any) => {
          $qml.editor.insertText(value);
        }),
        edit: qmlHandler(scope, ($qml) => {
          editing = true;
          $qml.editor.forceActiveFocus();
          $qml.editor.selectAll();
        }),
        segment: qmlHandler(scope, ($qml, destination: any) => {
          for (var i: any = 0; i < $qml.crumbs.children.length; i++) {
            var row: any = $qml.crumbs.children[i];
            for (var j: any = 0; j < row.children.length; j++)
              if (row.children[j].objectName === "breadcrumb:" + destination)
                return row.children[j];
          }
          return null;
        }),
        parts: qmlHandler(scope, ($qml) => {
          var virtualName: any = (
            {
              "trash:///": "Lixeira",
              "recent:///": "Recentes",
              "applications:///": "Aplicativos",
            } as any
          )[path];
          if (virtualName)
            return [{ name: $qml.app.tr(virtualName), path: path }];
          var inside: any = path === home || path.indexOf(home + "/") === 0;
          var base: any = inside ? home : "/";
          var result: any = [
            { name: $qml.app.tr(inside ? "Pasta pessoal" : "Sistema"), path: base },
          ];
          var remaining: any = inside ? path.slice(home.length) : path;
          remaining
            .split("/")
            .filter(function (p: any) {
              return p.length;
            })
            .forEach(function (p: any) {
              base = base === "/" ? "/" + p : base + "/" + p;
              result.push({ name: p, path: base });
            });
          return result;
        }),
      }}
      implicitWidth={300}
      implicitHeight={40}
      radius={10}
      color={qmlExpression(scope, ($qml) => Style.surfaceContainerHigh)}
      onActiveFocusChanged={qmlHandler(scope, ($qml) => {
        if (activeFocus) edit();
      })}
      {...props}
    >
      <qml.Flickable
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        {...{ "anchors.margins": 4 }}
        visible={qmlExpression(scope, ($qml) => !$qml.root.editing)}
        contentWidth={qmlExpression(scope, ($qml) => $qml.crumbs.width)}
        contentHeight={qmlExpression(scope, ($qml) => height)}
        clip={true}
      >
        <qml.Row
          qmlId={scope.id("crumbs")}
          height={qmlExpression(scope, ($qml) => parent.height)}
        >
          <qml.Repeater
            model={qmlExpression(scope, ($qml) => $qml.root.parts())}
          >
            <qml.Row
              qmlId={scope.id("crumb")}
              qmlDeclarations={{
                modelData: { type: "var", required: true },
                index: { type: "int", required: true },
              }}
              height={qmlExpression(scope, ($qml) => $qml.crumbs.height)}
            >
              <QuietButton
                objectName={qmlExpression(
                  scope,
                  ($qml) => "breadcrumb:" + $qml.crumb.modelData.path,
                )}
                height={qmlExpression(scope, ($qml) => $qml.crumb.height)}
                text={qmlExpression(scope, ($qml) => $qml.crumb.modelData.name)}
                iconName={qmlExpression(scope, ($qml) =>
                  $qml.crumb.index === 0 ? "user-home" : "",
                )}
                onClicked={qmlHandler(scope, ($qml) => {
                  if (!$qml.root.editing) {
                    $qml.click.pendingPath = $qml.crumb.modelData.path;
                    $qml.click.restart();
                  }
                })}
              >
                <qt.Timer
                  qmlId={scope.id("click")}
                  qmlDeclarations={{
                    pendingPath: { type: "string", value: "" },
                  }}
                  interval={250}
                  onTriggered={qmlHandler(scope, ($qml) => {
                    $qml.root.target = $qml.click.pendingPath;
                    $qml.root.navigate();
                  })}
                />
                <qml.TapHandler
                  onDoubleTapped={qmlHandler(scope, ($qml) => {
                    $qml.click.stop();
                    $qml.root.edit();
                  })}
                />
              </QuietButton>
              <qml.Text
                text={"/"}
                color={qmlExpression(scope, ($qml) => Style.surfaceText)}
                opacity={0.4}
                {...{
                  "anchors.verticalCenter": qmlExpression(
                    scope,
                    ($qml) => parent.verticalCenter,
                  ),
                }}
                visible={qmlExpression(
                  scope,
                  ($qml) => index < $qml.root.parts().length - 1,
                )}
              />
            </qml.Row>
          </qml.Repeater>
          <qml.MouseArea
            width={60}
            height={qmlExpression(scope, ($qml) => $qml.crumbs.height)}
            onDoubleClicked={qmlHandler(scope, ($qml) => {
              $qml.root.edit();
            })}
          />
        </qml.Row>
      </qml.Flickable>
      <dms.DankTextField
        qmlId={scope.id("editor")}
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        visible={qmlExpression(scope, ($qml) => $qml.root.editing)}
        text={qmlExpression(scope, ($qml) => $qml.root.text)}
        onTextEdited={qmlHandler(scope, ($qml) => {
          $qml.root.draft = $qml.editor.text;
          $qml.root.textEdited();
        })}
        onAccepted={qmlHandler(scope, ($qml) => {
          $qml.root.draft = $qml.editor.text;
          $qml.root.accepted();
          $qml.root.editing = false;
        })}
        {...{
          "Keys.onEscapePressed": qmlHandler(scope, ($qml) => {
            $qml.root.editing = false;
            $qml.editor.text = $qml.root.path;
          }),
        }}
        onActiveFocusChanged={qmlHandler(scope, ($qml) => {
          if (!activeFocus) $qml.root.editing = false;
        })}
      />
      {props.children}
    </qml.Rectangle>
  );
});
