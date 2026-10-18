import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
  qmlReadEvent,
} from "@nandomo/bridge-qml";
import { QuietButton } from "./QuietButton.js";
const qml = importQml("QtQuick");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
declare let drive: any, mounted: any, hovered: any, Qt: any;
type Binding<T> = T | (() => T);
export type PlaceButtonProps = Parameters<typeof QuietButton>[0] & {
  drive?: Binding<boolean>;
  favorite?: Binding<boolean>;
  mounted?: Binding<boolean>;
  onActionChosen?: (action: string) => void;
};
export const PlaceButton = component<PlaceButtonProps>(
  "PlaceButton",
  (props) => {
    props = {
      ...props,
      onActionChosen: props.onActionChosen
        ? qmlReadEvent(["chosenAction"], props.onActionChosen)
        : undefined,
    };

    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    scope.id("menu");
    return (
      <QuietButton
        qmlImports={["Quickshell", "qs.DCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          drive: { type: "bool", value: false },
          favorite: { type: "bool", value: false },
          mounted: { type: "bool", value: true },
          chosenAction: { type: "string", value: "" },
        }}
        qmlSignals={{ actionChosen: [] }}
        statusIcon={qmlExpression(scope, ($qml) =>
          drive && !mounted ? "usb_off" : "",
        )}
        {...{
          "ToolTip.visible": qmlExpression(
            scope,
            ($qml) => hovered && drive && !mounted,
          ),
        }}
        {...{
          "ToolTip.text": qmlExpression(scope, ($qml) =>
            $qml.app.tr("Volume desmontado — botão direito para montar"),
          ),
        }}
        {...props}
      >
        <qml.TapHandler
          acceptedButtons={qmlExpression(scope, ($qml) => Qt.RightButton)}
          onTapped={qmlHandler(scope, ($qml) => {
            $qml.menu.popup();
          })}
        />
        <AppMenu qmlId={scope.id("menu")}>
          <ContextAction
            text={qmlExpression(scope, ($qml) =>
              $qml.app.tr(
                $qml.root.drive
                  ? $qml.root.mounted
                    ? "Abrir"
                    : "Montar"
                  : "Abrir pasta",
              ),
            )}
            onTriggered={qmlHandler(scope, ($qml) => {
              $qml.root.chosenAction =
                $qml.root.drive && !$qml.root.mounted ? "mount" : "open";
              $qml.root.actionChosen();
            })}
          />
          <ContextAction
            text={qmlExpression(scope, ($qml) =>
              $qml.app.tr("Adicionar pasta atual a Locais"),
            )}
            visible={qmlExpression(scope, ($qml) => $qml.root.favorite)}
            onTriggered={qmlHandler(scope, ($qml) => {
              $qml.root.chosenAction = "addCurrent";
              $qml.root.actionChosen();
            })}
          />
          <ContextAction
            text={qmlExpression(scope, ($qml) => $qml.app.tr("Remover de Locais"))}
            visible={qmlExpression(scope, ($qml) => $qml.root.favorite)}
            onTriggered={qmlHandler(scope, ($qml) => {
              $qml.root.chosenAction = "remove";
              $qml.root.actionChosen();
            })}
          />
          <ContextAction
            text={qmlExpression(scope, ($qml) => $qml.app.tr("Desmontar"))}
            visible={qmlExpression(
              scope,
              ($qml) => $qml.root.drive && $qml.root.mounted,
            )}
            onTriggered={qmlHandler(scope, ($qml) => {
              $qml.root.chosenAction = "unmount";
              $qml.root.actionChosen();
            })}
          />
        </AppMenu>
        {props.children}
      </QuietButton>
    );
  },
);
