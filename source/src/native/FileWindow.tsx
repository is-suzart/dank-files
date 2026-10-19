import { FileContextMenus } from "./FileContextMenus.js";
import { FileViews } from "./FileViews.js";
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const controls = importQml("QtQuick.Controls");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
import { QuietButton } from "./QuietButton.js";
const layouts = importQml("QtQuick.Layouts");
import { EntryIcon } from "./EntryIcon.js";
import { FilePreview } from "./FilePreview.js";
declare let parent: any, Qt: any, Style: any, availableWidth: any, Text: any;
import type { QmlScope } from "@nandomo/bridge-qml";
export const FileWindow = component<{
  scope: QmlScope;
  nativeProbe?: (scope: QmlScope) => unknown;
}>("FileWindow", ({ scope, nativeProbe }) => (
  <>
    <controls.ApplicationWindow
      qmlId={scope.id("window")}
      qmlDeclarations={{
        reduceAnimations: {type:"bool", value:qmlExpression(scope, ($qml) => !!($qml.app.state.preferences && $qml.app.state.preferences.reduceAnimations))},
        osIcons: {
          type: "var",
          value: qmlExpression(scope, ($qml) => $qml.app.state.icons || {}),
        },
      }}
      visible={qmlExpression(scope, ($qml) => $qml.app.state.themeReady === true)}
      title={qmlExpression(scope, ($qml) => $qml.app.tr("Dank Files"))}
      width={1200}
      height={800}
      minimumWidth={760}
      minimumHeight={480}
      color={qmlExpression(scope, ($qml) => $qml.theme.background)}
      {...{
        "palette.window": qmlExpression(
          scope,
          ($qml) => $qml.theme.surfaceContainer,
        ),
      }}
      {...{
        "palette.windowText": qmlExpression(
          scope,
          ($qml) => $qml.theme.surfaceText,
        ),
      }}
      {...{
        "palette.base": qmlExpression(scope, ($qml) => $qml.theme.surface),
      }}
      {...{
        "palette.text": qmlExpression(scope, ($qml) => $qml.theme.surfaceText),
      }}
      {...{
        "palette.button": qmlExpression(
          scope,
          ($qml) => $qml.theme.surfaceContainerHigh,
        ),
      }}
      {...{
        "palette.buttonText": qmlExpression(
          scope,
          ($qml) => $qml.theme.surfaceText,
        ),
      }}
      {...{
        "palette.highlight": qmlExpression(scope, ($qml) => $qml.theme.primary),
      }}
      {...{
        "palette.highlightedText": qmlExpression(
          scope,
          ($qml) => $qml.theme.primaryText,
        ),
      }}
      onClosing={qmlHandler(scope, ($qml) => {
        Qt.quit();
      })}
    >
      <qml.Shortcut
        sequence={"Alt+Left"}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("back");
        })}
      />
      <qml.Shortcut
        sequence={"Alt+Right"}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("forward");
        })}
      />
      <qml.Shortcut
        sequence={"Alt+Up"}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("up");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+H"}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("hidden");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+L"}
        onActivated={qmlHandler(scope, ($qml) => {
          var address: any = $qml.app.findUi(
            "toolbarAddress",
            $qml.app.toolbarObject,
          );
          if (address) address.forceActiveFocus();
        })}
      />
      <qml.Shortcut
        sequence={"F5"}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("refresh");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+T"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && !$qml.app.state.mutating)}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("newTab");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+W"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && !$qml.app.state.mutating)}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("closeTab");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+Tab"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && !$qml.app.state.mutating)}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("nextTab");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+Shift+Tab"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && !$qml.app.state.mutating)}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("prevTab");
        })}
      />
      <qml.Item qmlId={scope.id("dialogsSlot")} />
      <qml.TextEdit qmlId={scope.id("clipboard")} visible={false} />
      <qml.Item
        visible={qmlExpression(scope, ($qml) => !$qml.app.state.chooser)}
      >
        <FileContextMenus scope={scope} />
      </qml.Item>

      <qml.Shortcut sequence="Ctrl+F" enabled={qmlExpression(scope,q=>!q.app.state.modalsOpen)} onActivated={qmlHandler(scope,$qml=>{
        const search=$qml.app.findUi('fileSearch',$qml.app.toolbarObject);
        if(search && search.visible){search.forceActiveFocus();search.selectAll();}
        else {const button=$qml.app.findUi('toolbarSearch',$qml.app.toolbarObject);if(button)button.clicked();}
      })} />
      <qml.Shortcut sequence="Ctrl+Z" enabled={qmlExpression(scope,$qml=>!!$qml.app.state.canUndo && !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition!=='undefined'))}
        onActivated={qmlHandler(scope,$qml=>{$qml.app.send('undo');})} />
      <qml.Shortcut
        sequence={"Ctrl+C"}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.state.selectionCount && !$qml.app.state.mutating && !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("copy");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+X"}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.state.selectionCount && !$qml.app.state.mutating && !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("cut");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+V"}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.state.canPaste && !$qml.app.state.mutating && !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("paste");
        })}
      />
      <qml.Shortcut
        sequence={"Ctrl+A"}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.state.entries.length && !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("selectAll");
        })}
      />
      <qml.Shortcut
        sequence={"Delete"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && $qml.app.state.selectionCount > 0 && !$qml.app.state.mutating && $qml.app.state.path.indexOf(":///") < 0 && (!$qml.window.activeFocusItem || typeof $qml.window.activeFocusItem.text !== "string"))}
        onActivated={qmlHandler(scope, ($qml) => { $qml.app.send("trash"); })}
      />
      <qml.Shortcut sequence={"Alt+Return"} enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && !!$qml.app.state.selected && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))} onActivated={qmlHandler(scope, ($qml) => { $qml.app.send("properties"); })} />
      <qml.Shortcut
        sequence={"F2"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && $qml.app.state.selectionCount === 1 && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("rename");
        })}
      />
      <qml.Shortcut
        sequence={"Space"}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.modalsOpen && $qml.app.state.selectionCount === 1 && !!$qml.app.state.selected && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"))}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("preview");
        })}
      />
      <qml.Shortcut
        sequence={"Escape"}
        enabled={qmlExpression(
          scope,
          ($qml) => !$qml.app.state.modalsOpen && !($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined"),
        )}
        onActivated={qmlHandler(scope, ($qml) => {
          $qml.app.send("select", null);
        })}
      />
      <layouts.ColumnLayout
        qmlId={scope.id("fileContent")}
        focus={true}
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        {...{ "anchors.margins": 12 }}
        spacing={8}
        {...{
          // Arrow keys move the focus and Shift extends the selection. A modal or a
          // text field takes the keyboard first and never reaches this handler.
          "Keys.onPressed": qmlHandler(scope, ($qml, event: any) => {
            if ($qml.app.state.modalsOpen || ($qml.window.activeFocusItem && typeof $qml.window.activeFocusItem.cursorPosition !== "undefined")) return;
            var entries: any = $qml.app.state.entries || [];
            if (!entries.length) return;
            var extend: boolean = !!(event.modifiers & Qt.ShiftModifier);
            var mode: string = extend ? "range" : "replace";
            if (event.key === Qt.Key_Home) {
              $qml.app.send("selectPath", { path: entries[0].path, mode: mode });
              $qml.app.revealKeyboard();
              event.accepted = true;
              return;
            }
            if (event.key === Qt.Key_End) {
              $qml.app.send("selectPath", {
                path: entries[entries.length - 1].path,
                mode: mode,
              });
              $qml.app.revealKeyboard();
              event.accepted = true;
              return;
            }
            var view: string = $qml.app.state.view;
            var row: number =
              view === "grid" ? Math.max(1, Math.floor($qml.filesGrid.width / $qml.filesGrid.cellWidth)) : 1;
            var axis: string = "row";
            var delta: number = 0;
            if (event.key === Qt.Key_Down) delta = row;
            else if (event.key === Qt.Key_Up) delta = -row;
            else if (view === "columns" && event.key === Qt.Key_Right) {
              axis = "column";
              delta = 1;
            } else if (view === "columns" && event.key === Qt.Key_Left) {
              axis = "column";
              delta = -1;
            } else if (view === "grid" && event.key === Qt.Key_Right) {
              axis = "index";
              delta = 1;
            } else if (view === "grid" && event.key === Qt.Key_Left) {
              axis = "index";
              delta = -1;
            } else return;
            $qml.app.send("selectStep", {
              axis: axis,
              delta: delta,
              extend: extend,
            });
            $qml.app.revealKeyboard();
              event.accepted = true;
          }),
        }}
      >
        {nativeProbe?.(scope)}
        <qml.Item
          qmlId={scope.id("toolbarSlot")}
          {...{ "Layout.fillWidth": true }}
          implicitHeight={qmlExpression(scope, ($qml) =>
            $qml.app.toolbarObject ? $qml.app.toolbarObject.implicitHeight : 92,
          )}
        />
        <layouts.RowLayout
          {...{ "Layout.fillWidth": true }}
          {...{ "Layout.fillHeight": true }}
          spacing={12}
        >
          <qml.Rectangle
            {...{ "Layout.preferredWidth": 220 }}
            {...{ "Layout.fillHeight": true }}
            radius={8}
            color={qmlExpression(scope, ($qml) =>
              Qt.lighter($qml.theme.surfaceContainer, 1.2),
            )}
          >
            <controls.ScrollView
              qmlId={scope.id("sidebarScroll")}
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              {...{ "anchors.margins": 12 }}
              clip={true}
              contentWidth={qmlExpression(scope, ($qml) => availableWidth)}
            >
              <qml.Item
                qmlId={scope.id("sidebarSlot")}
                width={qmlExpression(
                  scope,
                  ($qml) => $qml.sidebarScroll.availableWidth,
                )}
                implicitHeight={qmlExpression(scope, ($qml) =>
                  $qml.app.sidebarObject
                    ? $qml.app.sidebarObject.implicitHeight
                    : 0,
                )}
              />
            </controls.ScrollView>
          </qml.Rectangle>
          <layouts.ColumnLayout
            {...{ "Layout.fillWidth": true }}
            {...{ "Layout.fillHeight": true }}
            spacing={8}
          >
            <FileViews scope={scope} />
          </layouts.ColumnLayout>
          <qml.Rectangle
            qmlId={scope.id("detailsContainer")}
            objectName={"detailsContainer"}
            visible={qmlExpression(scope, ($qml) => !!$qml.app.state.detailsVisible)}
            opacity={qmlExpression(scope, ($qml) => ($qml.app.state.detailsVisible ? 1 : 0))}
            {...{ "Layout.preferredWidth": 290 }}
            {...{ "Layout.fillHeight": true }}
            color={qmlExpression(scope, ($qml) => $qml.theme.surfaceContainer)}
            radius={qmlExpression(scope, ($qml) => Style.cornerRadius)}
          >
            <qml.Behavior qmlOn="opacity" animation={<qml.NumberAnimation duration={qmlExpression(scope, ($qml) => $qml.app.state.preferences && $qml.app.state.preferences.reduceAnimations ? 0 : 110)} />} />
            <controls.ScrollView
              qmlId={scope.id("detailsScroll")}
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              {...{ "anchors.margins": 12 }}
              clip={true}
              contentWidth={qmlExpression(scope, ($qml) => availableWidth)}
            >
              <qml.Item
                qmlId={scope.id("detailsSlot")}
                width={qmlExpression(
                  scope,
                  ($qml) => $qml.detailsScroll.availableWidth,
                )}
                implicitHeight={qmlExpression(scope, ($qml) =>
                  $qml.app.detailsObject
                    ? $qml.app.detailsObject.implicitHeight
                    : 0,
                )}
              />
            </controls.ScrollView>
          </qml.Rectangle>
        </layouts.RowLayout>

        <layouts.RowLayout visible={qmlExpression(scope,q=>!q.app.state.chooser || !!q.app.state.error)} {...{"Layout.fillWidth":true}}>
        <controls.Label
          text={qmlExpression(
            scope,
            ($qml) => {
              const state: any = $qml.app.state;
              const virtual: any = (
                {
                  "trash:///": "Lixeira",
                  "recent:///": "Recentes",
                  "applications:///": "Aplicativos",
                } as any
              )[state.path];
              return state.error ||
              state.transferStatus ||
              (state.searchBusy ? $qml.app.tr("Buscando…") : "") ||
              (state.busy
                ? $qml.app.tr("Carregando…")
                : $qml.app.tr(
                    virtual !== undefined
                      ? virtual
                      : state.path === state.home
                        ? "Pasta pessoal"
                        : state.path
                            .split("/")
                            .filter(function (p: any) {
                              return p.length;
                            })
                            .pop() || "Sistema",
                  )) +
                  " · " +
                  state.path +
                  " · " +
                  $qml.app.tr("{count} itens", { count: state.entries.length }) +
                  " · " +
                  (state.selectionCount > 1
                    ? $qml.app.tr("{count} selecionados", {
                        count: state.selectionCount,
                      }) + " · "
                    : "") +
                  $qml.app.tr(
                    (
                      {
                        name: "nome",
                        size: "tamanho",
                        modified: "data",
                        type: "tipo",
                      } as any
                    )[state.order] || "nome",
                  ) +
                  " · " +
                  $qml.app.tr(state.descending ? "decrescente" : "crescente");
            },
          )}
          color={qmlExpression(scope, ($qml) =>
            $qml.app.state.error
              ? $qml.theme.error
              : $qml.theme.surfaceVariantText,
          )}
          {...{ "Layout.fillWidth": true }}
          elide={qmlExpression(scope, ($qml) => Text.ElideMiddle)}
        />
        <QuietButton objectName="footerCancelTransfer"
          text={qmlExpression(scope,q=>q.app.tr('Cancelar'))}
          visible={qmlExpression(scope,q=>!!q.app.state.canCancelTransfer)}
          onClicked={qmlHandler(scope,q=>{q.app.send('cancelTransfer');})} />
        </layouts.RowLayout>
        <qml.Item qmlId={scope.id("footerSlot")}
          visible={qmlExpression(scope,q=>!!q.app.state.chooser)}
          {...{"Layout.fillWidth":true}}
          implicitHeight={qmlExpression(scope,q=>q.app.footerObject ? q.app.footerObject.implicitHeight : 0)} />
      </layouts.ColumnLayout>
    </controls.ApplicationWindow>
  </>
));
