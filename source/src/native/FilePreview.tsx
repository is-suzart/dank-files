import { VideoPreview } from './VideoPreview.js';
const qt = importQml("QtQml");
import { PdfPreview } from "./PdfPreview.js";
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const controls = importQml("QtQuick.Controls");
declare let kind: any,
  Image: any,
  Loader: any,
  Style: any,
  parent: any,
  Quickshell: any,
  visible: any,
  Qt: any,
  item: any,
  Text: any;
type Binding<T> = T | (() => T);
export type FilePreviewProps = Parameters<typeof qml.Rectangle>[0] & {
  source?: Binding<string>;
  kind?: Binding<"none" | "folder" | "image" | "pdf" | "video">;
  expanded?: Binding<boolean>;
  zoom?: Binding<number>;
  angle?: Binding<number>;
  resetToken?: Binding<number>;
};
export const FilePreview = component<FilePreviewProps>(
  "FilePreview",
  (props) => {
    const scope = createQmlScope({...(props.qmlId ? { root: props.qmlId } : {}),app:"app"});
    scope.id("root");
    scope.id("image");
    scope.id("pdf");
    scope.id("video");
    scope.id("pan");
    return (
      <qml.Rectangle
        qmlImports={["Quickshell", "qs.DCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          source: { type: "url", value: "" },
          kind: { type: "string", value: "none" },
          expanded: { type: "bool", value: false },
          zoom: {type:"real",value:1},
          angle: {type:"real",value:0},
          resetToken: {type:"int",value:0},
          panX: {type:"real",value:0},
          panY: {type:"real",value:0},
          previewStatus: {
            type: "string",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              kind === "image"
                ? $qml.image.status === Image.Ready
                  ? "ready"
                  : $qml.image.status === Image.Error
                    ? "error"
                    : "loading"
                : kind === "pdf"
                  ? $qml.pdf.status === Loader.Error
                    ? "error"
                    : $qml.pdf.item
                      ? $qml.pdf.item.previewStatus
                      : "loading"
                  : kind === "video" ? ($qml.video.status === Loader.Error ? "error" : $qml.video.item ? $qml.video.item.previewStatus : "loading") : "unsupported",
            ),
          },
          aspectRatio: {
            type: "real",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              kind === "image" && $qml.image.implicitHeight > 0
                ? $qml.image.implicitWidth / $qml.image.implicitHeight
                : kind === "pdf" && $qml.pdf.item
                  ? $qml.pdf.item.aspectRatio
                  : kind === "video" && $qml.video.item ? $qml.video.item.aspectRatio : 1.4,
            ),
          },
        }}
        qmlMethods={{
          panTo: qmlHandler(scope, ($qml, x:number, y:number) => {
            var rotated = $qml.root.angle % 180 !== 0;
            var limitX = Math.max(0, ((rotated ? $qml.root.height : $qml.root.width) * $qml.root.zoom - $qml.root.width) / 2);
            var limitY = Math.max(0, ((rotated ? $qml.root.width : $qml.root.height) * $qml.root.zoom - $qml.root.height) / 2);
            $qml.root.panX = Math.max(-limitX, Math.min(limitX, x));
            $qml.root.panY = Math.max(-limitY, Math.min(limitY, y));
          }),
          resetView: qmlHandler(scope, ($qml) => {
            $qml.root.panX = 0; $qml.root.panY = 0;
            if ($qml.pdf.item) $qml.pdf.item.resetView();
          }),
        }}
        {...{onResetTokenChanged:qmlHandler(scope, ($qml) => {$qml.root.resetView();})}}
        {...{onSourceChanged:qmlHandler(scope, ($qml) => {$qml.root.resetView();})}}
        {...{onZoomChanged:qmlHandler(scope, ($qml) => {$qml.root.panTo($qml.root.panX, $qml.root.panY);})}}
        {...{onAngleChanged:qmlHandler(scope, ($qml) => {$qml.root.panTo($qml.root.panX, $qml.root.panY);})}}
        color={qmlExpression(scope, ($qml) => Style.surfaceContainerHigh)}
        radius={qmlExpression(scope, ($qml) => Style.cornerRadius)}
        clip={true}
        {...props}
      >
        <qml.Image
          {...{ "anchors.centerIn": qmlExpression(scope, ($qml) => parent) }}
          width={96}
          height={96}
          source={qmlExpression(scope, ($qml) =>
            $qml.root.kind === "folder" ? Quickshell.iconPath("folder") : "",
          )}
          visible={qmlExpression(scope, ($qml) => $qml.root.kind === "folder")}
          fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
        />
        <qml.Image
          qmlId={scope.id("image")}
          objectName="previewImage"
          scale={props.zoom ?? 1}
          rotation={props.angle ?? 0}
          {...{transform:<qml.Translate x={qmlExpression(scope,$qml=>$qml.root.panX)} y={qmlExpression(scope,$qml=>$qml.root.panY)} />}}
          {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
          {...{ "anchors.margins": 8 }}
          visible={qmlExpression(scope, ($qml) => $qml.root.kind === "image")}
          source={qmlExpression(scope, ($qml) =>
            visible ? $qml.root.source : "",
          )}
          asynchronous={true}
          autoTransform={true}
          fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
          sourceSize={qmlExpression(scope, ($qml) =>
            $qml.root.expanded
              ? Qt.size(-1, -1)
              : Qt.size($qml.root.width * 2, $qml.root.height * 2),
          )}
        />
        <qml.Loader
          qmlId={scope.id("pdf")}
          objectName="previewPdf"
          scale={props.zoom ?? 1}
          rotation={props.angle ?? 0}
          {...{transform:<qml.Translate x={qmlExpression(scope,$qml=>$qml.root.panX)} y={qmlExpression(scope,$qml=>$qml.root.panY)} />}}
          {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
          {...{ "anchors.margins": 8 }}
          active={qmlExpression(
            scope,
            ($qml) =>
              $qml.root.kind === "pdf" && String($qml.root.source).length > 0,
          )}
          sourceComponent={
            <qt.Component>
              <PdfPreview />
            </qt.Component>
          }
          onLoaded={qmlHandler(scope, ($qml) => {
            item.source = Qt.binding(function () {
              return $qml.root.source;
            });
            item.expanded = Qt.binding(function () {
              return $qml.root.expanded;
            });
          })}
        />
        <qml.Loader qmlId={scope.id("video")} objectName="previewVideoLoader"
          {...{"anchors.fill":qmlExpression(scope,()=>parent),"anchors.margins":8}}
          active={qmlExpression(scope,$qml=>$qml.root.visible && $qml.root.kind==='video' && String($qml.root.source).length>0)}
          sourceComponent={<qt.Component><VideoPreview /></qt.Component>}
          onLoaded={qmlHandler(scope,$qml=>{item.source=Qt.binding(function(){return $qml.root.source;});})} />
        <controls.Label
          {...{ "anchors.centerIn": qmlExpression(scope, ($qml) => parent) }}
          width={qmlExpression(scope, ($qml) => parent.width - 24)}
          wrapMode={qmlExpression(scope, ($qml) => Text.Wrap)}
          horizontalAlignment={qmlExpression(
            scope,
            ($qml) => Text.AlignHCenter,
          )}
          color={qmlExpression(scope, ($qml) => Style.surfaceText)}
          visible={qmlExpression(
            scope,
            ($qml) =>
              $qml.root.kind !== "folder" &&
              $qml.root.previewStatus !== "ready",
          )}
          text={qmlExpression(scope, ($qml) =>
            $qml.root.previewStatus === "unsupported"
              ? $qml.app.tr("Sem prévia para este formato")
              : $qml.root.previewStatus === "error"
                ? $qml.app.tr("Não foi possível carregar a prévia")
                : $qml.app.tr("Carregando prévia…"),
          )}
        />
        <qml.MouseArea qmlId={scope.id("pan")} objectName="previewPan"
          {...{"anchors.fill":qmlExpression(scope,()=>parent)}}
          enabled={qmlExpression(scope,$qml=>$qml.root.expanded && $qml.root.previewStatus==='ready' && ($qml.root.kind==='image' || $qml.root.kind==='pdf') && ($qml.root.zoom>1 || $qml.root.angle!==0))}
          cursorShape={qmlExpression(scope,$qml=>$qml.pan.pressed ? Qt.ClosedHandCursor : Qt.OpenHandCursor)}
          qmlDeclarations={{originX:{type:'real',value:0},originY:{type:'real',value:0},startX:{type:'real',value:0},startY:{type:'real',value:0}}}
          onPressed={qmlHandler(scope,($qml,mouse:any)=>{
            $qml.pan.originX=mouse.x;$qml.pan.originY=mouse.y;
            $qml.pan.startX=$qml.root.panX;$qml.pan.startY=$qml.root.panY;
          })}
          onPositionChanged={qmlHandler(scope,($qml,mouse:any)=>{
            if($qml.pan.pressed)$qml.root.panTo($qml.pan.startX+mouse.x-$qml.pan.originX,$qml.pan.startY+mouse.y-$qml.pan.originY);
          })}
        />
        {props.children}
      </qml.Rectangle>
    );
  },
);
