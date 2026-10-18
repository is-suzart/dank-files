import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const controls = importQml("QtQuick.Controls");
const qml = importQml("QtQuick");
const layouts = importQml("QtQuick.Layouts");
const dms = importQml("qs.DCommon.Widgets");
declare let iconName: any,
  ApplicationWindow: any,
  text: any,
  contentItem: any,
  statusIcon: any,
  hovered: any,
  availableWidth: any,
  Accessible: any,
  Style: any,
  visible: any,
  Quickshell: any,
  Qt: any,
  Image: any,
  Text: any,
  parent: any;
type Binding<T> = T | (() => T);
export type QuietButtonProps = Parameters<typeof controls.Button>[0] & {
  iconName?: Binding<string>;
  selected?: Binding<boolean>;
  statusIcon?: Binding<string>;
};
export const QuietButton = component<QuietButtonProps>(
  "QuietButton",
  (props) => {
    const { qmlDeclarations: inheritedDeclarations, ...rest } = props;
    props = rest;
    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    return (
      <controls.Button
        qmlImports={["Quickshell", "qs.DCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          iconName: { type: "string", value: "" },
          selected: { type: "bool", value: false },
          statusIcon: { type: "string", value: "" },
          actionIcon: {
            type: "string",
            readonly: true,
            value: qmlExpression(
              scope,
              ($qml) =>
                (
                  ({
                    "applications-other": "apps",
                    "list-add": "add",
                    trash: "delete",
                    recent: "history",
                    settings: "settings",
                    "edit-copy": "content_copy",
                    "edit-cut": "content_cut",
                    move: "drive_file_move",
                    "copy-to": "file_copy",
                    "visibility-off": "visibility_off",
                    visibility: "visibility",
                    sort: "sort",
                    "go-previous": "chevron_left",
                    "go-next": "chevron_right",
                    "go-up": "arrow_upward",
                    "view-refresh": "refresh",
                    search: "search",
                    "edit-undo": "undo",
                    "view-list-details": "view_list",
                    "view-grid": "grid_view",
                    "view-column": "view_column",
                    "window-close": "close",
                    "document-preview": "visibility",
                    "document-open": "open_in_new",
                    "edit-rename": "edit",
                    "applications-games": "sports_esports",
                  }) as any
                )[iconName] || "",
            ),
          },
          iconMap: {
            type: "var",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              ApplicationWindow.window ? ApplicationWindow.window.osIcons : {},
            ),
          },
          ...inheritedDeclarations,
        }}
        implicitWidth={qmlExpression(scope, ($qml) =>
          text.length ? Math.max(64, contentItem.implicitWidth + 24) : 36,
        )}
        implicitHeight={36}
        leftPadding={qmlExpression(scope, ($qml) => (text.length ? 12 : 9))}
        rightPadding={qmlExpression(
          scope,
          ($qml) => (text.length ? 12 : 9) + (statusIcon ? 24 : 0),
        )}
        topPadding={9}
        bottomPadding={9}
        activeFocusOnTab={true}
        {...{
          "Accessible.name": qmlExpression(
            scope,
            ($qml) =>
              $qml.app.tr(
                text ||
                (
                {
                  "visibility-off": "Arquivos ocultos escondidos",
                  visibility: "Arquivos ocultos visíveis",
                  sort: "Ordenar",
                  "go-previous": "Voltar",
                  "go-next": "Avançar",
                  "go-up": "Pasta acima",
                  "view-refresh": "Atualizar",
                  settings: "Preferências",
                  "list-add": "Nova aba",
                  "window-close": "Fechar detalhes",
                  "applications-other": "Aplicativos",
                  "view-list-details": "Visualização em lista",
                  "view-grid": "Visualização em grade",
                  "view-column": "Visualização em colunas",
                  "document-open": "Abrir pasta",
                  "document-preview": "Pré-visualizar",
                  "edit-rename": "Renomear",
                  "edit-copy": "Copiar",
                  "edit-cut": "Recortar",
                  "copy-to": "Copiar para…",
                  move: "Mover para…",
                  trash: "Mover para a lixeira",
                  recent: "Recentes",
                  "drive-harddisk": "Abrir pasta",
                } as any
                )[iconName] ||
                iconName,
              ),
          ),
        }}
        {...{
          "ToolTip.visible": qmlExpression(
            scope,
            ($qml) =>
              hovered &&
              (text.length === 0 || contentItem.implicitWidth > availableWidth),
          ),
        }}
        {...{ "ToolTip.text": qmlExpression(scope, ($qml) => Accessible.name) }}
        background={
          <qml.Rectangle
            radius={7}
            color={qmlExpression(scope, ($qml) =>
              $qml.root.selected
                ? Style.withAlpha(Style.primary, 0.14)
                : $qml.root.down
                  ? Style.withAlpha(Style.surfaceText, 0.16)
                  : $qml.root.hovered || $qml.root.activeFocus
                    ? Style.withAlpha(Style.surfaceText, 0.08)
                    : "transparent",
            )}
          >
            {/* Hover, focus and selection fade briefly; the preference turns it off. */}
            <qml.Behavior qmlOn="color" animation={
              <qml.ColorAnimation duration={qmlExpression(scope, () =>
                ApplicationWindow.window && ApplicationWindow.window.reduceAnimations ? 0 : 90)} />
            } />
          </qml.Rectangle>
        }
        contentItem={
          <layouts.RowLayout
            spacing={10}
            opacity={qmlExpression(scope, ($qml) =>
              $qml.root.enabled ? 1 : 0.4,
            )}
          >
            <qml.Image
              visible={qmlExpression(
                scope,
                ($qml) =>
                  $qml.root.iconName.length > 0 && !$qml.root.actionIcon,
              )}
              source={qmlExpression(scope, ($qml) =>
                visible
                  ? $qml.root.iconName.indexOf("file://") === 0
                    ? $qml.root.iconName
                    : $qml.root.iconMap && $qml.root.iconMap[$qml.root.iconName]
                      ? $qml.root.iconMap[$qml.root.iconName]
                      : Quickshell.iconPath($qml.root.iconName, "folder")
                  : "",
              )}
              {...{ "Layout.preferredWidth": 18 }}
              {...{ "Layout.preferredHeight": 18 }}
              {...{
                "Layout.alignment": qmlExpression(
                  scope,
                  ($qml) => Qt.AlignCenter,
                ),
              }}
              fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
            />
            <dms.DIcon
              visible={qmlExpression(
                scope,
                ($qml) => $qml.root.actionIcon.length > 0,
              )}
              name={qmlExpression(scope, ($qml) => $qml.root.actionIcon)}
              color={qmlExpression(scope, ($qml) => Style.surfaceText)}
              size={18}
              {...{ "Layout.preferredWidth": 18 }}
              {...{ "Layout.preferredHeight": 18 }}
              {...{
                "Layout.alignment": qmlExpression(
                  scope,
                  ($qml) => Qt.AlignCenter,
                ),
              }}
            />
            <dms.StyledText
              visible={qmlExpression(
                scope,
                ($qml) => $qml.root.text.length > 0,
              )}
              text={qmlExpression(scope, ($qml) => $qml.root.text)}
              color={qmlExpression(scope, ($qml) => Style.surfaceText)}
              elide={qmlExpression(scope, ($qml) => Text.ElideRight)}
              wrapMode={qmlExpression(scope, ($qml) => Text.NoWrap)}
              {...{ "font.pixelSize": 14 }}
              {...{ "Layout.fillWidth": true }}
              verticalAlignment={qmlExpression(
                scope,
                ($qml) => Text.AlignVCenter,
              )}
            />
          </layouts.RowLayout>
        }
        {...props}
      >
        <dms.DIcon
          {...{ "anchors.right": qmlExpression(scope, ($qml) => parent.right) }}
          {...{ "anchors.rightMargin": 8 }}
          {...{
            "anchors.verticalCenter": qmlExpression(
              scope,
              ($qml) => parent.verticalCenter,
            ),
          }}
          name={qmlExpression(scope, ($qml) => $qml.root.statusIcon)}
          size={16}
          color={qmlExpression(scope, ($qml) => Style.surfaceText)}
          visible={qmlExpression(
            scope,
            ($qml) => $qml.root.statusIcon.length > 0,
          )}
        />
        {props.children}
      </controls.Button>
    );
  },
);
