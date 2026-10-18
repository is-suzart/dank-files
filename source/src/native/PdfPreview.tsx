import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const pdf = importQml("QtQuick.Pdf");
declare let PdfDocument: any, parent: any, Image: any, Qt: any;
type Binding<T> = T | (() => T);
export type PdfPreviewProps = Parameters<typeof qml.Item>[0] & {
  source?: Binding<string>;
  expanded?: Binding<boolean>;
};
export const PdfPreview = component<PdfPreviewProps>("PdfPreview", (props) => {
  const scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  scope.id("root");
  scope.id("document");
  scope.id("view");
  return (
    <qml.Item
      qmlImports={["Quickshell", "qs.DCommon.Common"]}
      qmlId={scope.id("root")}
      qmlDeclarations={{
        source: { type: "url", value: "" },
        expanded: { type: "bool", value: false },
        previewStatus: {
          type: "string",
          readonly: true,
          value: qmlExpression(scope, ($qml) =>
            $qml.document.status === PdfDocument.Ready
              ? "ready"
              : $qml.document.status === PdfDocument.Error
                ? "error"
                : "loading",
          ),
        },
        aspectRatio: {
          type: "real",
          readonly: true,
          value: qmlExpression(scope, ($qml) =>
            $qml.document.status === PdfDocument.Ready
              ? $qml.document.pagePointSize(0).width /
                $qml.document.pagePointSize(0).height
              : 0.707,
          ),
        },
      }}
      qmlMethods={{resetView:qmlHandler(scope,$qml=>{
        $qml.view.resetScale();$qml.view.goToLocation(0,Qt.point(0,0),1);
      })}}
      {...props}
    >
      <qml.Rectangle
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        color={"white"}
        visible={qmlExpression(scope, ($qml) => !$qml.root.expanded)}
      />
      <pdf.PdfDocument
        qmlId={scope.id("document")}
        source={qmlExpression(scope, ($qml) => $qml.root.source)}
      />
      <pdf.PdfPageImage
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        document={qmlExpression(scope, ($qml) => $qml.document)}
        currentFrame={0}
        visible={qmlExpression(scope, ($qml) => !$qml.root.expanded)}
        fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
        {...{
          "sourceSize.width": qmlExpression(
            scope,
            ($qml) => $qml.root.width * 2,
          ),
        }}
      />
      <pdf.PdfMultiPageView
        qmlId={scope.id("view")} objectName="pdfPages"
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        document={qmlExpression(scope, ($qml) => $qml.document)}
        visible={qmlExpression(scope, ($qml) => $qml.root.expanded)}
      />
      {props.children}
    </qml.Item>
  );
});
