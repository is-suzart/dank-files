import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const effects = importQml("QtQuick.Effects");
declare let parent: any, Qt: any, Image: any, width: any;
type Binding<T> = T | (() => T);
export type EntryIconProps = Parameters<typeof qml.Item>[0] & {
  source?: Binding<string>;
  fallbackSource?: Binding<string>;
  tint?: Binding<string>;
  emblem?: Binding<string>;
};
export const EntryIcon = component<EntryIconProps>("EntryIcon", (props) => {
  const scope = createQmlScope(props.qmlId ? { root: props.qmlId } : {});
  scope.id("root");
  scope.id("image");
  return (
    <qml.Item
      qmlImports={["Quickshell", "qs.DankCommon.Common"]}
      qmlId={scope.id("root")}
      qmlDeclarations={{
        source: { type: "url", value: "" },
        fallbackSource: { type: "url", value: "" },
        tint: { type: "color", value: "transparent" },
        emblem: { type: "url", value: "" },
      }}
      {...props}
    >
      <qml.Image
        qmlId={scope.id("image")}
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => parent) }}
        source={qmlExpression(scope, ($qml) => $qml.root.source)}
        sourceSize={qmlExpression(scope, ($qml) => Qt.size(192, 192))}
        fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
        visible={qmlExpression(scope, ($qml) => $qml.root.tint.a === 0 && !($qml.image.status === Image.Error && String($qml.root.fallbackSource).length > 0))}
      />
      <qml.Image
        {...{"anchors.fill":qmlExpression(scope,()=>parent)}}
        source={qmlExpression(scope,q=>q.image.status===Image.Error || !String(q.root.source).length ? q.root.fallbackSource : "")}
        sourceSize={qmlExpression(scope,()=>Qt.size(192,192))}
        fillMode={qmlExpression(scope,()=>Image.PreserveAspectFit)} />
      <effects.MultiEffect
        {...{ "anchors.fill": qmlExpression(scope, ($qml) => $qml.image) }}
        source={qmlExpression(scope, ($qml) => $qml.image)}
        visible={qmlExpression(scope, ($qml) => $qml.root.tint.a > 0)}
        colorization={1}
        colorizationColor={qmlExpression(scope, ($qml) => $qml.root.tint)}
      />
      <qml.Image
        {...{ "anchors.right": qmlExpression(scope, ($qml) => parent.right) }}
        {...{ "anchors.bottom": qmlExpression(scope, ($qml) => parent.bottom) }}
        width={qmlExpression(scope, ($qml) => Math.max(14, parent.width * 0.3))}
        height={qmlExpression(scope, ($qml) => width)}
        source={qmlExpression(scope, ($qml) => $qml.root.emblem)}
        visible={qmlExpression(
          scope,
          ($qml) => String($qml.root.emblem).length > 0,
        )}
        fillMode={qmlExpression(scope, ($qml) => Image.PreserveAspectFit)}
      />
      {props.children}
    </qml.Item>
  );
});
