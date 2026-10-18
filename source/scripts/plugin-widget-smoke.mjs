import { mkdtemp, mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const root = await mkdtemp(join(tmpdir(), 'nandomo-widget-smoke-'));
try {
  for (const dir of ['Modules/Plugins', 'Widgets', 'Common']) await mkdir(join(root,dir),{recursive:true});
  await copyFile(new URL('../dist/dankFiles/FilesWidget.qml',import.meta.url),join(root,'FilesWidget.qml'));
  await writeFile(join(root,'Modules/Plugins/qmldir'),'module qs.Modules.Plugins\nPluginComponent 1.0 PluginComponent.qml\n');
  // Reproduce DMS 1.6's inherited hover-to-click dispatch, without loading shell services.
  await writeFile(join(root,'Modules/Plugins/PluginComponent.qml'),`import QtQuick
Item {
  property int iconSize: 24
  property var pillClickAction
  property Component horizontalBarPill
  property Component verticalBarPill
  function triggerPopout() { if (pillClickAction) pillClickAction(); }
  function triggerHoverPopout(widgetHostId) { if (pillClickAction) { triggerPopout(); return; } }
}`);
  await writeFile(join(root,'Widgets/qmldir'),'module qs.Widgets\nDankIcon 1.0 DankIcon.qml\n');
  await writeFile(join(root,'Widgets/DankIcon.qml'),'import QtQuick\nText { property string name; property real size; }\n');
  await writeFile(join(root,'Common/qmldir'),'module qs.Common\nsingleton Theme 1.0 Theme.qml\n');
  await writeFile(join(root,'Common/Theme.qml'),'pragma Singleton\nimport QtQuick\nQtObject { property color surfaceText: "white" }\n');
  await writeFile(join(root,'shell.qml'),`import Quickshell
import QtQuick
ShellRoot {
  FilesWidget { id: widget }
  Component.onCompleted: Qt.callLater(function() {
    var calls = 0;
    widget.pillClickAction = function() { calls++; };
    for (var i=0; i<6; i++) widget.triggerHoverPopout("dankFiles");
    if (calls !== 0) { console.warn("WIDGET_HOVER_FAIL", calls); Qt.exit(1); return; }
    widget.triggerPopout();
    if (calls !== 1) { console.warn("WIDGET_CLICK_FAIL", calls); Qt.exit(1); return; }
    var horizontal = widget.horizontalBarPill.createObject(widget);
    var vertical = widget.verticalBarPill.createObject(widget);
    widget.iconSize = 31;
    if (horizontal.size !== 31 || vertical.size !== 31) { console.warn("WIDGET_SIZE_FAIL"); Qt.exit(1); return; }
    horizontal.destroy(); vertical.destroy();
    console.warn("PLUGIN_WIDGET_PASS: six hover events launch zero apps; one click launches one");
    Qt.quit();
  })
}`);
  const child=spawn(process.env.NANDOMO_QUICKSHELL_BINARY || 'qs',['--path',join(root,'shell.qml')],{
    env:{...process.env,QT_QPA_PLATFORM:'offscreen',QT_QUICK_BACKEND:'software'},stdio:['ignore','pipe','pipe'],
  });
  let logs='';
  child.stdout.on('data',data=>{logs+=data;});
  child.stderr.on('data',data=>{logs+=data;});
  const timer=setTimeout(()=>child.kill('SIGTERM'),10000);
  try {
    const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});
    assert.equal(code,0,logs);
    assert.ok(logs.includes('PLUGIN_WIDGET_PASS'),logs);
    console.log('PLUGIN_WIDGET_PASS: six hover events launch zero apps; one click launches one');
  } finally {clearTimeout(timer);}
} finally {await rm(root,{recursive:true,force:true});}
