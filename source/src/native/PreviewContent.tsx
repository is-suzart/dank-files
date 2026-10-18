import { t } from '../infrastructure/i18n.js';
import { component, signal, effect } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const layouts = importQml("QtQuick.Layouts");
import { FilePreview } from "./FilePreview.js";
import { QuietButton } from "./QuietButton.js";
const dms = importQml("qs.DCommon.Widgets");
declare let ApplicationWindow: any,
  maxWidth: any,
  maxHeight: any,
  ratio: any,
  imageWidth: any,
  implicitWidth: any,
  implicitHeight: any,
  parent: any;
type Binding<T> = T | (() => T);
export type PreviewContentProps = Parameters<typeof qml.Item>[0] & {
  source?: Binding<string>;
  kind?: Binding<"none" | "folder" | "image" | "pdf" | "video">;
  onOpened?: () => void;
  onClosed?: () => void;
};
export const PreviewContent = component<PreviewContentProps>(
  "PreviewContent",
  (props) => {
    const scope = createQmlScope({ ...(props.qmlId ? { root: props.qmlId } : {}), app: "app" });
    scope.id("root");
    scope.id("preview");
    const zoom = signal(1), angle = signal(0), resetToken = signal(0);
    const supported = () => { const kind=typeof props.kind === "function" ? props.kind() : props.kind; return kind === "image" || kind === "pdf"; };
    effect(() => { if(typeof props.source === "function") props.source(); zoom.set(1); angle.set(0); resetToken.set(resetToken.peek()+1); });
    return (
      <qml.Item
        qmlImports={["Quickshell", "qs.DCommon.Common"]}
        qmlId={scope.id("root")}
        qmlDeclarations={{
          source: { type: "url", value: "" },
          kind: { type: "string", value: "none" },
          previewStatus: {
            type: "string",
            readonly: true,
            value: qmlExpression(scope, ($qml) => $qml.preview.previewStatus),
          },
          ratio: {
            type: "real",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              $qml.preview.aspectRatio > 0 ? $qml.preview.aspectRatio : 1.4,
            ),
          },
          maxWidth: {
            type: "real",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              Math.max(
                180,
                (ApplicationWindow.window
                  ? ApplicationWindow.window.width
                  : 1100) - 96,
              ),
            ),
          },
          maxHeight: {
            type: "real",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              Math.max(
                180,
                (ApplicationWindow.window
                  ? ApplicationWindow.window.height
                  : 720) - 240,
              ),
            ),
          },
          imageWidth: {
            type: "real",
            readonly: true,
            value: qmlExpression(scope, ($qml) =>
              Math.min(maxWidth, maxHeight * ratio, 1000),
            ),
          },
        }}
        qmlSignals={{ opened: [], closed: [] }}
        implicitWidth={qmlExpression(scope, ($qml) =>
          Math.max(360, imageWidth),
        )}
        implicitHeight={qmlExpression(
          scope,
          ($qml) => Math.min(maxHeight, imageWidth / ratio) + ($qml.root.kind === "video" ? 48 : 96),
        )}
        width={qmlExpression(scope, ($qml) => implicitWidth)}
        height={qmlExpression(scope, ($qml) => implicitHeight)}
        {...props}
      >
        <FilePreview
          qmlId={scope.id("preview")}
          objectName={"expandedPreview"}
          source={qmlExpression(scope, ($qml) => $qml.root.source)}
          kind={qmlExpression(scope, ($qml) => $qml.root.kind)}
          expanded={true}
          zoom={zoom}
          angle={angle}
          resetToken={resetToken}
          width={qmlExpression(scope, ($qml) => $qml.root.width)}
          height={qmlExpression(scope, ($qml) => $qml.root.height - ($qml.root.kind === "video" ? 48 : 96))}
        />
        <layouts.RowLayout
          visible={supported}
          width={qmlExpression(scope, ($qml) => $qml.root.width)}
          y={qmlExpression(scope, ($qml) => $qml.root.height - 88)} spacing={4}>
          <QuietButton objectName="previewZoomOut" {...{'Accessible.name':t("Diminuir zoom")}} text="−" enabled={() => supported() && zoom() > 0.25} onClicked={() => zoom.set(Math.max(0.25, zoom() / 1.25))} />
          <QuietButton objectName="previewZoomIn" {...{'Accessible.name':t("Aumentar zoom")}} text="+" enabled={() => supported() && zoom() < 8} onClicked={() => zoom.set(Math.min(8, zoom() * 1.25))} />
          <QuietButton objectName="previewZoomReset" {...{'Accessible.name':t("Restaurar visualização")}} text={() => t("Restaurar")+" · "+Math.round(zoom()*100)+"%"} enabled={supported} onClicked={() => {zoom.set(1);angle.set(0);resetToken.set(resetToken.peek()+1);}} />
          <QuietButton objectName="previewRotateLeft" {...{'Accessible.name':t("Girar à esquerda")}} text="↶" enabled={supported} onClicked={() => angle.set((angle()+270)%360)} />
          <QuietButton objectName="previewRotateRight" {...{'Accessible.name':t("Girar à direita")}} text="↷" enabled={supported} onClicked={() => angle.set((angle()+90)%360)} />
        </layouts.RowLayout>
        <QuietButton
          text={t('Abrir no app padrão')}
          {...{
            "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom),
          }}
          {...{ "anchors.left": qmlExpression(scope, ($qml) => parent.left) }}
          onClicked={qmlHandler(scope, ($qml) => {
            $qml.root.opened();
          })}
        />
        <dms.DButton
          objectName="previewClose"
          text={t('Fechar')}
          {...{
            "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom),
          }}
          {...{ "anchors.right": qmlExpression(scope, ($qml) => parent.right) }}
          onClicked={qmlHandler(scope, ($qml) => {
            $qml.root.closed();
          })}
        />
        {props.children}
      </qml.Item>
    );
  },
);
