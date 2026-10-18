import * as native from '@nandomo/bridge-qml';
import { createNativeScene, createQmlScope, qmlExpression, qmlHandler } from '@nandomo/bridge-qml';
// shortcut: DMS plugin internals exceed the declaration parser; Qt validates these imports until tooling supports them.
const plugins = native.importQml('qs.Modules.Plugins');
const widgets = native.importQml('qs.Widgets');
const qt = native.importQml('QtQml');
const PluginComponent = plugins.PluginComponent!;
const DankIcon = widgets.DankIcon!;
declare const Qt: any, Quickshell: any, Theme: any;

export function renderFilesWidget() {
  const scope = createQmlScope();
  const icon = () => <qt.Component>
    <DankIcon name="folder" size={24} color={qmlExpression(scope, () => Theme.surfaceText)} />
  </qt.Component>;
  const scene = createNativeScene(
    <PluginComponent
      qmlImports={['Quickshell', 'qs.Common']}
      // DMS forwards hover activation to pillClickAction by default.
      qmlMethods={{triggerHoverPopout: qmlHandler(scope, () => {})}}
      pillClickAction={qmlExpression(scope, () => function () {
        const path = decodeURIComponent(Qt.resolvedUrl('app/launch.mjs').toString().replace(/^file:\/\//, ''));
        Quickshell.execDetached(['node', path]);
      })}
      horizontalBarPill={icon()} verticalBarPill={icon()}
    />, () => {}, undefined, undefined, {fragment:true},
  );
  try { return scene.source; } finally { scene.dispose(); }
}
