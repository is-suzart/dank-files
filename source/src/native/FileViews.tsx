declare const Accessible:any;
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qt = importQml("QtQml");
const qml = importQml("QtQuick");
const controls = importQml("QtQuick.Controls");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
const layouts = importQml("QtQuick.Layouts");
import { EntryIcon } from "./EntryIcon.js";
import { FilePreview } from "./FilePreview.js";
declare let parent: any,
  Qt: any,
  point: any,
  Style: any,
  GridView: any,
  ListView: any,
  modelData: any,
  Text: any,
  Drag: any,
  mapToItem: any,
  width: any,
  Layout: any,
  Loader: any,
  height: any;
import type { QmlScope } from "@nandomo/bridge-qml";
export const FileViews = component<{
  scope: QmlScope;
}>("FileViews", ({ scope }) => {
  /** Every transition is short, and the preference turns it off entirely. */
  const quick = qmlExpression(
    scope,
    ($qml) =>
      $qml.app.state.preferences &&
      $qml.app.state.preferences.reduceAnimations
        ? 0
        : 90,
  );
  return (
  <>
    <layouts.StackLayout
      qmlId={scope.id("fileViews")}
      {...{ "Layout.fillWidth": true }}
      {...{ "Layout.fillHeight": true }}
      currentIndex={qmlExpression(scope, ($qml) =>
        $qml.app.state.view === "grid"
          ? 1
          : $qml.app.state.view === "columns"
            ? 2
            : 0,
      )}
    >
      <qml.ListView
        qmlId={scope.id("filesList")}
        objectName={"filesList"}
        onWidthChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        onHeightChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        clip={true}
        model={qmlExpression(scope, ($qml) => $qml.app.state.entries)}
        {...{ "ScrollBar.vertical": <controls.ScrollBar /> }}
        delegate={
          <qml.Rectangle
            qmlDeclarations={{
              modelData: { type: "var", required: true },
              index: { type: "int", required: true },
            }}
            width={qmlExpression(scope, ($qml) => ListView.view.width)}
            height={42}
            radius={0}
            objectName={qmlExpression(
              scope,
              ($qml) => "listRow:" + modelData.path,
            )}
            {...{
              // Screen readers need the name and the kind, not the icon.
              "Accessible.role": qmlExpression(scope,()=>Accessible.ListItem),
              "Accessible.focusable": true,
              "Accessible.selected": qmlExpression(scope,q=>!!q.app.state.selection && q.app.state.selection.indexOf(modelData.path)>=0),
              "Accessible.name": qmlExpression(scope, ($qml) =>
                modelData.name +
                ", " +
                $qml.app.tr(modelData.directory ? "Pasta" : "Arquivos") +
                ", " +
                $qml.app.state.path,
              ),
            }}
            color={qmlExpression(scope, ($qml) =>
              $qml.app.state.selection &&
              $qml.app.state.selection.indexOf(modelData.path) >= 0
                ? $qml.theme.primaryContainer
                : $qml.rowMouse.containsMouse
                  ? $qml.theme.surfaceContainerHigh
                  : "transparent",
            )}
          >
            <qml.Behavior qmlOn="color" animation={<qml.ColorAnimation duration={quick} />} />
            <layouts.RowLayout
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              {...{ "anchors.margins": 8 }}
            >
              <EntryIcon
                fallbackSource={qmlExpression(scope,q=>q.app.state.path==="applications:///" ? q.app.fileIcon("package-x-generic") : "")}
                source={qmlExpression(scope, ($qml) =>
                  $qml.app.fileIcon(modelData.icon),
                )}
                tint={qmlExpression(
                  scope,
                  ($qml) => modelData.folderColor || "transparent",
                )}
                emblem={qmlExpression(scope, ($qml) =>
                  modelData.emblem ? $qml.app.fileIcon(modelData.emblem) : "",
                )}
                {...{ "Layout.preferredWidth": 24 }}
                {...{ "Layout.preferredHeight": 24 }}
              />
              <controls.Label
                text={qmlExpression(scope, ($qml) => modelData.name)}
                {...{ "font.pixelSize": 14 }}
                color={qmlExpression(scope, ($qml) => $qml.theme.surfaceText)}
                {...{ "Layout.fillWidth": true }}
                elide={qmlExpression(scope, ($qml) => Text.ElideRight)}
              />
              <controls.Label
                text={qmlExpression(scope, ($qml) =>
                  modelData.directory
                    ? $qml.app.tr("Pasta")
                    : $qml.app.sizeText(modelData.size),
                )}
                color={qmlExpression(
                  scope,
                  ($qml) => $qml.theme.surfaceVariantText,
                )}
                {...{ "Layout.preferredWidth": 100 }}
              />
              <controls.Label
                text={qmlExpression(scope, ($qml) =>
                  Qt.formatDateTime(new Date(modelData.modified), "dd/MM/yyyy"),
                )}
                elide={qmlExpression(scope, ($qml) => Text.ElideRight)}
                color={qmlExpression(
                  scope,
                  ($qml) => $qml.theme.surfaceVariantText,
                )}
                {...{ "Layout.preferredWidth": 95 }}
              />
            </layouts.RowLayout>
            <qml.Item
              qmlId={scope.id("dragProxy")}
              width={1}
              height={1}
              {...{
                // The drag only becomes active once the pointer really moved,
                // and every ending path clears it again, so a delegate can
                // never keep the mouse grabbed after an aborted drag.
                "Drag.active": qmlExpression(
                  scope,
                  ($qml) => $qml.rowMouse.nbDragging,
                ),
              }}
              {...{
                "Drag.dragType": qmlExpression(scope, ($qml) => Drag.Automatic),
              }}
              {...{
                "Drag.supportedActions": qmlExpression(
                  scope,
                  ($qml) => Qt.CopyAction | Qt.MoveAction,
                ),
              }}
              {...{
                "Drag.imageSource": qmlExpression(scope, ($qml) =>
                  $qml.app.fileIcon(modelData.icon),
                ),
              }}
              {...{ "Drag.hotSpot.x": 24 }}
              {...{ "Drag.hotSpot.y": 24 }}
              {...{
                "Drag.proposedAction": qmlExpression(
                  scope,
                  ($qml) => Qt.CopyAction,
                ),
              }}
              {...{
                "Drag.mimeData": qmlExpression(scope, ($qml) => ({
                  "text/uri-list": $qml.app.dragPayload(modelData.path),
                })),
              }}
              {...{
                "Drag.onActiveChanged": qmlHandler(scope, ($qml) => {
                  if ($qml.dragProxy.Drag.active) return;
                  $qml.rowMouse.nbDragging = false;
                  $qml.dragProxy.x = 0;
                  $qml.dragProxy.y = 0;
                }),
              }}
              {...{
                "Drag.onDragFinished": qmlHandler(
                  scope,
                  ($qml, ...args: any[]) =>
                    (
                      ((action: any) => {
                        $qml.rowMouse.nbDragging = false;
                        $qml.dragProxy.x = 0;
                        $qml.dragProxy.y = 0;
                        if (action !== Qt.IgnoreAction)
                          $qml.app.send("refresh");
                      }) as (...args: any[]) => unknown
                    )(...args),
                ),
              }}
            />
            <qml.DropArea
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              enabled={qmlExpression(
                scope,
                ($qml) => modelData.directory && !$qml.app.state.mutating,
              )}
              onEntered={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((drag: any) => {
                    if (!drag.hasUrls) drag.accepted = false;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onDropped={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((drop: any) => $qml.app.dropFiles(drop, modelData.path)) as (
                    ...args: any[]
                  ) => unknown
                )(...args),
              )}
            />
            <qml.MouseArea
              qmlId={scope.id("rowMouse")}
              qmlDeclarations={{
                nbDragging: { type: "bool", value: false },
                nbOriginX: { type: "real", value: 0 },
                nbOriginY: { type: "real", value: 0 },
              }}
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              hoverEnabled={true}
              acceptedButtons={qmlExpression(
                scope,
                ($qml) => Qt.LeftButton | Qt.RightButton,
              )}
              {...{
                "drag.target": qmlExpression(scope, ($qml) => $qml.dragProxy),
              }}
              {...{
                "drag.axis": qmlExpression(scope, ($qml) => Drag.XAndYAxis),
              }}
              onPressed={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    $qml.fileContent.forceActiveFocus();
                    $qml.rowMouse.nbDragging = false;
                    $qml.rowMouse.nbOriginX = mouse.x;
                    $qml.rowMouse.nbOriginY = mouse.y;
                    $qml.dragProxy.Drag.proposedAction =
                      mouse.modifiers & Qt.ShiftModifier
                        ? Qt.MoveAction
                        : Qt.CopyAction;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onPositionChanged={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if ($qml.rowMouse.nbDragging || !$qml.rowMouse.pressed || !(mouse.buttons & Qt.LeftButton)) return;
                    var dx: number = mouse.x - $qml.rowMouse.nbOriginX;
                    var dy: number = mouse.y - $qml.rowMouse.nbOriginY;
                    if (dx * dx + dy * dy < 36) return;
                    // The proxy sits under the pointer before the grab starts.
                    $qml.dragProxy.x = mouse.x - 24;
                    $qml.dragProxy.y = mouse.y - 24;
                    $qml.rowMouse.nbDragging = true;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onReleased={qmlHandler(scope, ($qml) => {
                $qml.rowMouse.nbDragging = false;
                $qml.dragProxy.x = 0;
                $qml.dragProxy.y = 0;
              })}
              onCanceled={qmlHandler(scope, ($qml) => {
                $qml.rowMouse.nbDragging = false;
                $qml.dragProxy.x = 0;
                $qml.dragProxy.y = 0;
              })}
              onClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if (mouse.button === Qt.RightButton) {
                      var p: any = mapToItem(
                        $qml.window.contentItem,
                        mouse.x,
                        mouse.y,
                      );
                      $qml.app.context(parent.modelData, p.x, p.y);
                    } else {
                      var mode: string =
                        mouse.modifiers & Qt.ControlModifier
                          ? "toggle"
                          : mouse.modifiers & Qt.ShiftModifier
                            ? "range"
                            : "replace";
                      $qml.app.send("selectPath", {
                        path: parent.modelData.path,
                        mode: mode,
                      });
                      if (
                        mode === "replace" &&
                        $qml.app.state.preferences &&
                        $qml.app.state.preferences.singleClick
                      )
                        $qml.app.open(parent.modelData);
                    }
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onDoubleClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if (
                      mouse.button === Qt.LeftButton &&
                      !(
                        $qml.app.state.preferences &&
                        $qml.app.state.preferences.singleClick
                      )
                    )
                      $qml.app.open(parent.modelData);
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
            />
          </qml.Rectangle>
        }
      >
        <qml.MouseArea
          parent={qmlExpression(scope, ($qml) => $qml.filesList)}
          width={qmlExpression(scope, ($qml) => $qml.filesList.width)}
          height={qmlExpression(scope, ($qml) => $qml.filesList.height)}
          z={1}
          onPressed={qmlHandler(scope, ($qml, ...args: any[]) => {
            const mouse: any = args[0];
            const view: any = $qml.filesList;
            const p: any = parent.mapToItem(view.contentItem, mouse.x, mouse.y);
            if (view.indexAt(p.x, p.y) >= 0) mouse.accepted = false;
          })}
          onClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((mouse: any) => {
                if (mouse.button !== Qt.LeftButton) return;
                if ($qml.app.state.modalsOpen || $qml.app.state.mutating) return;
                if (!($qml.app.state.selection && $qml.app.state.selection.length))
                  return;
                $qml.app.send("select", null);
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
        <qml.DropArea
          {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
          z={5}
          enabled={qmlExpression(
            scope,
            ($qml) =>
              !$qml.app.state.mutating &&
              $qml.app.state.path.indexOf(":///") < 0,
          )}
          onEntered={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drag: any) => {
                if (!drag.hasUrls) drag.accepted = false;
              }) as (...args: any[]) => unknown
            )(...args),
          )}
          onDropped={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drop: any) => {
                var point: any = mapToItem(
                  $qml.filesList.contentItem,
                  drop.x,
                  drop.y,
                );
                var index: any = $qml.filesList.indexAt(point.x, point.y);
                var entry: any =
                  index >= 0 ? $qml.app.state.entries[index] : null;
                $qml.app.dropFiles(
                  drop,
                  entry && entry.directory ? entry.path : $qml.app.state.path,
                );
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
      </qml.ListView>
      <qml.GridView
        qmlId={scope.id("filesGrid")}
        objectName={"filesGrid"}
        onWidthChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        onHeightChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        onCellWidthChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        onCellHeightChanged={qmlHandler(scope, ($qml) => {
          $qml.app.revealSelection();
        })}
        clip={true}
        model={qmlExpression(scope, ($qml) => $qml.app.state.entries)}
        cellWidth={qmlExpression(scope, ($qml) =>
          Math.max(
            150,
            width /
              Math.max(
                1,
                Math.floor(
                  width /
                    (($qml.app.state.preferences
                      ? $qml.app.state.preferences.gridSize
                      : 96) +
                      64),
                ),
              ),
          ),
        )}
        cellHeight={qmlExpression(
          scope,
          ($qml) =>
            ($qml.app.state.preferences
              ? $qml.app.state.preferences.gridSize
              : 96) + 58,
        )}
        {...{ "ScrollBar.vertical": <controls.ScrollBar /> }}
        delegate={
          <qml.Rectangle
            qmlDeclarations={{
              modelData: { type: "var", required: true },
            }}
            {...{
              // Screen readers need the name and the kind, not the icon.
              "Accessible.role": qmlExpression(scope,()=>Accessible.ListItem),
              "Accessible.focusable": true,
              "Accessible.selected": qmlExpression(scope,q=>!!q.app.state.selection && q.app.state.selection.indexOf(modelData.path)>=0),
              "Accessible.name": qmlExpression(scope, ($qml) =>
                modelData.name +
                ", " +
                $qml.app.tr(modelData.directory ? "Pasta" : "Arquivos"),
              ),
            }}
            width={qmlExpression(scope, ($qml) => GridView.view.cellWidth - 12)}
            height={qmlExpression(
              scope,
              ($qml) => GridView.view.cellHeight - 8,
            )}
            radius={qmlExpression(scope, ($qml) => Style.cornerRadius)}
            color={qmlExpression(scope, ($qml) =>
              $qml.app.state.selection &&
              $qml.app.state.selection.indexOf(modelData.path) >= 0
                ? $qml.theme.primaryContainer
                : $qml.gridMouse.containsMouse
                  ? $qml.theme.surfaceContainerHigh
                  : "transparent",
            )}
          >
            <qml.Behavior qmlOn="color" animation={<qml.ColorAnimation duration={quick} />} />
            <layouts.ColumnLayout
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              {...{ "anchors.margins": 8 }}
            >
              <qml.Item
                qmlDeclarations={{
                  hasPreview: {
                    type: "bool",
                    readonly: true,
                    value: qmlExpression(
                      scope,
                      ($qml) =>
                        !$qml.app.state.remote &&
                        (!$qml.app.state.preferences ||
                          $qml.app.state.preferences.thumbnails) &&
                        !modelData.directory &&
                        /\.(pdf|png|jpe?g|webp|gif|bmp|svg)$/i.test(
                          modelData.name,
                        ),
                    ),
                  },
                }}
                {...{
                  "Layout.alignment": qmlExpression(
                    scope,
                    ($qml) => Qt.AlignHCenter,
                  ),
                }}
                {...{
                  "Layout.preferredWidth": qmlExpression(scope, ($qml) =>
                    $qml.app.state.preferences
                      ? $qml.app.state.preferences.gridSize
                      : 96,
                  ),
                }}
                {...{
                  "Layout.preferredHeight": qmlExpression(
                    scope,
                    ($qml) => Layout.preferredWidth,
                  ),
                }}
              >
                <EntryIcon
                fallbackSource={qmlExpression(scope,q=>q.app.state.path==="applications:///" ? q.app.fileIcon("package-x-generic") : "")}
                  {...{
                    "anchors.fill": qmlExpression(scope, ($qml) => parent),
                  }}
                  source={qmlExpression(scope, ($qml) =>
                    ($qml.app.state.videoThumbnails || {})[modelData.path] || $qml.app.fileIcon(modelData.icon),
                  )}
                  tint={qmlExpression(
                    scope,
                    ($qml) => modelData.folderColor || "transparent",
                  )}
                  emblem={qmlExpression(scope, ($qml) =>
                    modelData.emblem ? $qml.app.fileIcon(modelData.emblem) : "",
                  )}
                  visible={qmlExpression(
                    scope,
                    ($qml) =>
                      !parent.hasPreview ||
                      $qml.thumbnail.status === Loader.Error,
                  )}
                />
                <qml.Loader
                  qmlId={scope.id("thumbnail")}
                  objectName={qmlExpression(
                    scope,
                    ($qml) => "thumbnail:" + modelData.path,
                  )}
                  {...{
                    "anchors.fill": qmlExpression(scope, ($qml) => parent),
                  }}
                  active={qmlExpression(scope, ($qml) => parent.hasPreview)}
                  sourceComponent={
                    <qt.Component>
                      <FilePreview
                        source={qmlExpression(
                          scope,
                          ($qml) =>
                            "file://" +
                            modelData.path
                              .split("/")
                              .map(encodeURIComponent)
                              .join("/"),
                        )}
                        kind={qmlExpression(scope, ($qml) =>
                          /\.pdf$/i.test(modelData.name) ? "pdf" : "image",
                        )}
                      />
                    </qt.Component>
                  }
                />
              </qml.Item>
              <controls.Label
                text={qmlExpression(scope, ($qml) => modelData.name)}
                {...{ "font.pixelSize": 14 }}
                color={qmlExpression(scope, ($qml) => $qml.theme.surfaceText)}
                {...{ "Layout.fillWidth": true }}
                horizontalAlignment={qmlExpression(
                  scope,
                  ($qml) => Text.AlignHCenter,
                )}
                wrapMode={qmlExpression(scope, ($qml) => Text.Wrap)}
                maximumLineCount={2}
                elide={qmlExpression(scope, ($qml) => Text.ElideRight)}
              />
            </layouts.ColumnLayout>
            <qml.Item
              qmlId={scope.id("dragProxy")}
              width={1}
              height={1}
              {...{
                // Same lifecycle as the list: the grab starts on movement and
                // is always given back.
                "Drag.active": qmlExpression(
                  scope,
                  ($qml) => $qml.gridMouse.nbDragging,
                ),
              }}
              {...{
                "Drag.dragType": qmlExpression(scope, ($qml) => Drag.Automatic),
              }}
              {...{
                "Drag.supportedActions": qmlExpression(
                  scope,
                  ($qml) => Qt.CopyAction | Qt.MoveAction,
                ),
              }}
              {...{
                "Drag.imageSource": qmlExpression(scope, ($qml) =>
                  $qml.app.fileIcon(modelData.icon),
                ),
              }}
              {...{ "Drag.hotSpot.x": 24 }}
              {...{ "Drag.hotSpot.y": 24 }}
              {...{
                "Drag.proposedAction": qmlExpression(
                  scope,
                  ($qml) => Qt.CopyAction,
                ),
              }}
              {...{
                "Drag.mimeData": qmlExpression(scope, ($qml) => ({
                  "text/uri-list": $qml.app.dragPayload(modelData.path),
                })),
              }}
              {...{
                "Drag.onActiveChanged": qmlHandler(scope, ($qml) => {
                  if ($qml.dragProxy.Drag.active) return;
                  $qml.gridMouse.nbDragging = false;
                  $qml.dragProxy.x = 0;
                  $qml.dragProxy.y = 0;
                }),
              }}
              {...{
                "Drag.onDragFinished": qmlHandler(
                  scope,
                  ($qml, ...args: any[]) =>
                    (
                      ((action: any) => {
                        $qml.gridMouse.nbDragging = false;
                        $qml.dragProxy.x = 0;
                        $qml.dragProxy.y = 0;
                        if (action !== Qt.IgnoreAction)
                          $qml.app.send("refresh");
                      }) as (...args: any[]) => unknown
                    )(...args),
                ),
              }}
            />
            <qml.DropArea
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              enabled={qmlExpression(
                scope,
                ($qml) => modelData.directory && !$qml.app.state.mutating,
              )}
              onEntered={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((drag: any) => {
                    if (!drag.hasUrls) drag.accepted = false;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onDropped={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((drop: any) => $qml.app.dropFiles(drop, modelData.path)) as (
                    ...args: any[]
                  ) => unknown
                )(...args),
              )}
            />
            <qml.MouseArea
              qmlId={scope.id("gridMouse")}
              qmlDeclarations={{
                nbDragging: { type: "bool", value: false },
                nbOriginX: { type: "real", value: 0 },
                nbOriginY: { type: "real", value: 0 },
              }}
              {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
              hoverEnabled={true}
              acceptedButtons={qmlExpression(
                scope,
                ($qml) => Qt.LeftButton | Qt.RightButton,
              )}
              {...{
                "drag.target": qmlExpression(scope, ($qml) => $qml.dragProxy),
              }}
              {...{
                "drag.axis": qmlExpression(scope, ($qml) => Drag.XAndYAxis),
              }}
              onPressed={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    $qml.fileContent.forceActiveFocus();
                    $qml.gridMouse.nbDragging = false;
                    $qml.gridMouse.nbOriginX = mouse.x;
                    $qml.gridMouse.nbOriginY = mouse.y;
                    $qml.dragProxy.Drag.proposedAction =
                      mouse.modifiers & Qt.ShiftModifier
                        ? Qt.MoveAction
                        : Qt.CopyAction;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onPositionChanged={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if ($qml.gridMouse.nbDragging || !$qml.gridMouse.pressed || !(mouse.buttons & Qt.LeftButton)) return;
                    var dx: number = mouse.x - $qml.gridMouse.nbOriginX;
                    var dy: number = mouse.y - $qml.gridMouse.nbOriginY;
                    if (dx * dx + dy * dy < 36) return;
                    $qml.dragProxy.x = mouse.x - 24;
                    $qml.dragProxy.y = mouse.y - 24;
                    $qml.gridMouse.nbDragging = true;
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onReleased={qmlHandler(scope, ($qml) => {
                $qml.gridMouse.nbDragging = false;
                $qml.dragProxy.x = 0;
                $qml.dragProxy.y = 0;
              })}
              onCanceled={qmlHandler(scope, ($qml) => {
                $qml.gridMouse.nbDragging = false;
                $qml.dragProxy.x = 0;
                $qml.dragProxy.y = 0;
              })}
              onClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if (mouse.button === Qt.RightButton) {
                      var p: any = mapToItem(
                        $qml.window.contentItem,
                        mouse.x,
                        mouse.y,
                      );
                      $qml.app.context(parent.modelData, p.x, p.y);
                    } else {
                      var mode: string =
                        mouse.modifiers & Qt.ControlModifier
                          ? "toggle"
                          : mouse.modifiers & Qt.ShiftModifier
                            ? "range"
                            : "replace";
                      $qml.app.send("selectPath", {
                        path: parent.modelData.path,
                        mode: mode,
                      });
                      if (
                        mode === "replace" &&
                        $qml.app.state.preferences &&
                        $qml.app.state.preferences.singleClick
                      )
                        $qml.app.open(parent.modelData);
                    }
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
              onDoubleClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
                (
                  ((mouse: any) => {
                    if (
                      mouse.button === Qt.LeftButton &&
                      !(
                        $qml.app.state.preferences &&
                        $qml.app.state.preferences.singleClick
                      )
                    )
                      $qml.app.open(parent.modelData);
                  }) as (...args: any[]) => unknown
                )(...args),
              )}
            />
          </qml.Rectangle>
        }
      >
        <qml.MouseArea
          parent={qmlExpression(scope, ($qml) => $qml.filesGrid)}
          width={qmlExpression(scope, ($qml) => $qml.filesGrid.width)}
          height={qmlExpression(scope, ($qml) => $qml.filesGrid.height)}
          z={1}
          onPressed={qmlHandler(scope, ($qml, ...args: any[]) => {
            const mouse: any = args[0];
            const view: any = $qml.filesGrid;
            const p: any = parent.mapToItem(view.contentItem, mouse.x, mouse.y);
            if (view.indexAt(p.x, p.y) >= 0) mouse.accepted = false;
          })}
          onClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((mouse: any) => {
                if (mouse.button !== Qt.LeftButton) return;
                if ($qml.app.state.modalsOpen || $qml.app.state.mutating) return;
                if (!($qml.app.state.selection && $qml.app.state.selection.length))
                  return;
                $qml.app.send("select", null);
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
        <qml.DropArea
          {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
          z={5}
          enabled={qmlExpression(
            scope,
            ($qml) =>
              !$qml.app.state.mutating &&
              $qml.app.state.path.indexOf(":///") < 0,
          )}
          onEntered={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drag: any) => {
                if (!drag.hasUrls) drag.accepted = false;
              }) as (...args: any[]) => unknown
            )(...args),
          )}
          onDropped={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drop: any) => {
                var point: any = mapToItem(
                  $qml.filesGrid.contentItem,
                  drop.x,
                  drop.y,
                );
                var index: any = $qml.filesGrid.indexAt(point.x, point.y);
                var entry: any =
                  index >= 0 ? $qml.app.state.entries[index] : null;
                $qml.app.dropFiles(
                  drop,
                  entry && entry.directory ? entry.path : $qml.app.state.path,
                );
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
      </qml.GridView>
      <qml.Flickable
        qmlId={scope.id("filesColumns")}
        clip={true}
        contentWidth={qmlExpression(scope, ($qml) => $qml.columnRow.width)}
        contentHeight={qmlExpression(scope, ($qml) => height)}
        {...{ "ScrollBar.horizontal": <controls.ScrollBar /> }}
      >
        <qml.MouseArea
          width={qmlExpression(scope, ($qml) => $qml.filesColumns.width)}
          height={qmlExpression(scope, ($qml) => $qml.filesColumns.height)}
          z={-1}
          onClicked={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((mouse: any) => {
                if (mouse.button !== Qt.LeftButton) return;
                if ($qml.app.state.modalsOpen || $qml.app.state.mutating) return;
                if (!($qml.app.state.selection && $qml.app.state.selection.length))
                  return;
                $qml.app.send("select", null);
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
        <qml.DropArea
          {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
          z={5}
          enabled={qmlExpression(
            scope,
            ($qml) =>
              !$qml.app.state.mutating &&
              $qml.app.state.path.indexOf(":///") < 0,
          )}
          onEntered={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drag: any) => {
                if (!drag.hasUrls) drag.accepted = false;
              }) as (...args: any[]) => unknown
            )(...args),
          )}
          onDropped={qmlHandler(scope, ($qml, ...args: any[]) =>
            (
              ((drop: any) => {
                var index: any = -1;
                var entry: any =
                  index >= 0 ? $qml.app.state.entries[index] : null;
                $qml.app.dropFiles(
                  drop,
                  entry && entry.directory ? entry.path : $qml.app.state.path,
                );
              }) as (...args: any[]) => unknown
            )(...args),
          )}
        />
        <qml.Row
          qmlId={scope.id("columnRow")}
          height={qmlExpression(scope, ($qml) => parent.height)}
          spacing={8}
        >
          <qml.Repeater
            model={qmlExpression(scope, ($qml) => $qml.app.state.columns)}
            delegate={
              <qml.Rectangle
                qmlId={scope.id("columnPanel")}
                qmlDeclarations={{
                  modelData: { type: "var", required: true },
                  index: { type: "int", required: true },
                }}
                width={260}
                height={qmlExpression(scope, ($qml) => $qml.columnRow.height)}
                radius={8}
                color={qmlExpression(scope, ($qml) =>
                  Qt.lighter($qml.theme.surfaceContainer, 1.2),
                )}
              >
                <layouts.ColumnLayout
                  {...{
                    "anchors.fill": qmlExpression(scope, ($qml) => parent),
                  }}
                  {...{ "anchors.margins": 8 }}
                >
                  <controls.Label
                    text={qmlExpression(
                      scope,
                      ($qml) => $qml.columnPanel.modelData.path,
                    )}
                    color={qmlExpression(scope, ($qml) => $qml.theme.primary)}
                    {...{ "Layout.fillWidth": true }}
                    elide={qmlExpression(scope, ($qml) => Text.ElideLeft)}
                  />
                  <qml.ListView
                    qmlId={scope.id("columnList")}
                    {...{ "Layout.fillWidth": true }}
                    {...{ "Layout.fillHeight": true }}
                    clip={true}
                    model={qmlExpression(
                      scope,
                      ($qml) => $qml.columnPanel.modelData.entries,
                    )}
                    {...{ "ScrollBar.vertical": <controls.ScrollBar /> }}
                    delegate={
                      <controls.ItemDelegate
                        qmlId={scope.id("columnDelegate")}
                        objectName={qmlExpression(scope, () => 'columnEntry:' + modelData.path)}
                        qmlDeclarations={{
                          modelData: { type: "var", required: true },
                        }}
                        width={qmlExpression(
                          scope,
                          ($qml) => ListView.view.width,
                        )}
                        text={qmlExpression(scope, ($qml) => modelData.name)}
                        contentItem={
                          <controls.Label
                            text={qmlExpression(scope, ($qml) => parent.text)}
                            color={qmlExpression(
                              scope,
                              ($qml) => $qml.theme.surfaceText,
                            )}
                            elide={qmlExpression(
                              scope,
                              ($qml) => Text.ElideRight,
                            )}
                          />
                        }
                        highlighted={qmlExpression(
                          scope,
                          ($qml) =>
                            $qml.app.state.selection &&
                            $qml.app.state.selection.indexOf(modelData.path) >= 0,
                        )}
                      >
                        <qml.MouseArea
                          {...{"anchors.fill": qmlExpression(scope, () => parent)}}
                          onClicked={qmlHandler(scope, ($qml, mouse: any) => {
                            $qml.fileContent.forceActiveFocus();
                            var mode = mouse.modifiers & Qt.ControlModifier ? "toggle"
                              : mouse.modifiers & Qt.ShiftModifier ? "range" : "replace";
                            if (modelData.directory && mode === "replace")
                              $qml.app.open(modelData, $qml.columnPanel.index);
                            else {
                              $qml.app.send("selectPath", {path:modelData.path, mode:mode});
                              if(mode === "replace" && $qml.app.state.preferences.singleClick)
                                $qml.app.open(modelData);
                            }
                          })}
                          onDoubleClicked={qmlHandler(scope, ($qml) => {
                            if(!modelData.directory && !$qml.app.state.preferences.singleClick)
                              $qml.app.open(modelData);
                          })}
                        />
                        <qml.TapHandler
                          acceptedButtons={qmlExpression(
                            scope,
                            ($qml) => Qt.RightButton,
                          )}
                          onTapped={qmlHandler(scope, ($qml) => {
                            var p: any = parent.mapToItem(
                              $qml.window.contentItem,
                              point.position.x,
                              point.position.y,
                            );
                            $qml.app.context(parent.modelData, p.x, p.y);
                          })}
                        />
                      </controls.ItemDelegate>
                    }
                  >
                    <qml.MouseArea
                      parent={qmlExpression(scope, ($qml) => $qml.columnList)}
                      width={qmlExpression(scope, ($qml) => $qml.columnList.width)}
                      height={qmlExpression(scope, ($qml) => $qml.columnList.height)}
                      z={1}
                      onPressed={qmlHandler(scope, ($qml, mouse: any) => {
                        const p: any = parent.mapToItem($qml.columnList.contentItem, mouse.x, mouse.y);
                        if ($qml.columnList.indexAt(p.x, p.y) >= 0) mouse.accepted = false;
                      })}
                      onClicked={qmlHandler(scope, ($qml) => {
                        if (!$qml.app.state.modalsOpen && !$qml.app.state.mutating)
                          $qml.app.send("select", null);
                      })}
                    />
                  </qml.ListView>
                </layouts.ColumnLayout>
              </qml.Rectangle>
            }
          />
        </qml.Row>
      </qml.Flickable>
      <qml.TapHandler
        acceptedButtons={qmlExpression(scope, ($qml) => Qt.RightButton)}
        onTapped={qmlHandler(scope, ($qml) => {
          // The background handler also observes clicks inside delegates.
          var node: any = $qml.fileViews;
          var target: any = null;
          var local: any = point.position;
          for (var depth: any = 0; node && depth < 32; depth++) {
            if (typeof node.modelData !== "undefined") target = node.modelData;
            var child: any = node.childAt(local.x, local.y);
            if (!child) break;
            local = node.mapToItem(child, local.x, local.y);
            node = child;
          }
          var p: any = $qml.fileViews.mapToItem(
            $qml.window.contentItem,
            point.position.x,
            point.position.y,
          );
          $qml.app.context(target, p.x, p.y);
        })}
      />
    </layouts.StackLayout>
  </>
  );
});
