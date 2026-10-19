import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNativeScene, createQmlScope } from '@nandomo/bridge-qml';
import { FileWindow } from '../src/native/FileWindow.js';
import { FileViews } from '../src/native/FileViews.js';
import { Shell } from '../src/native/Shell.js';

const ids = [
  'app', 'selectionReveal', 'osPalette', 'theme', 'backend', 'window', 'dialogsSlot', 'clipboard',
  'newMenu', 'applicationMenu', 'contextMenu', 'toolbarSlot', 'sidebarScroll', 'sidebarSlot',
  'fileViews', 'filesList', 'dragProxy', 'rowMouse', 'filesGrid', 'thumbnail', 'gridMouse',
  'filesColumns', 'columnRow', 'columnPanel', 'columnDelegate', 'detailsContainer', 'detailsScroll', 'detailsSlot',
];
function render(node: unknown) {
  const scope = createQmlScope({ app: 'app' });
  for (const id of ids) scope.id(id);
  const scene = createNativeScene(node, () => {}, undefined, undefined, { fragment: true });
  try { return scene.source; } finally { scene.dispose(); }
}
const occurrences = (source: string, needle: string) => source.split(needle).length - 1;

test('the file window wires select all, arrow navigation and the shortcut guards', () => {
  const source = render(FileWindow({ scope: createQmlScope({ app: 'app' }) }));
  assert.equal(occurrences(source, 'sequence: "Ctrl+A"'), 1);
  assert.equal(occurrences(source, '$qml.app.send("selectAll")'), 1);
  assert.equal(occurrences(source, 'Keys.onPressed:'), 1);
  assert.equal(occurrences(source, '$qml.app.send("selectStep"'), 1);
  // Home and End select a path directly; the delegates send the same command.
  assert.equal(occurrences(source, '$qml.app.send("selectPath"'), 5);
  // Every file shortcut refuses to run while a modal or a text field is open.
  for (const sequence of ['"Ctrl+C"', '"Ctrl+X"', '"Ctrl+V"', '"Ctrl+A"', '"Delete"', '"F2"', '"Space"']) {
    const start = source.indexOf('sequence: ' + sequence);
    assert.ok(start > 0, sequence);
    const enabled = source.slice(start, start + 900);
    assert.match(enabled, /enabled: .*!\$qml\.app\.state\.modalsOpen/s, sequence);
    assert.match(enabled, /cursorPosition\s*!==\s*"undefined"|activeFocusItem\.text\s*!==\s*"string"/, sequence);
  }
  // Rename, preview and trash follow the size of the selection.
  assert.equal(occurrences(source, 'state.selectionCount===1'), 2);
  assert.match(source, /state\.selectionCount>0/);
});

test('the file window owns the tab shortcuts and fades the details panel in', () => {
  const source = render(FileWindow({ scope: createQmlScope({ app: 'app' }) }));
  for (const [sequence, action] of [["Ctrl+T", 'newTab'], ["Ctrl+W", 'closeTab'], ["Ctrl+Tab", 'nextTab'], ["Ctrl+Shift+Tab", 'prevTab']]) {
    assert.equal(occurrences(source, 'sequence: "' + sequence + '"'), 1, sequence);
    assert.equal(occurrences(source, '$qml.app.send("' + action + '")'), 1, action);
  }
  assert.match(source, /Behavior/);
  assert.match(source, /Behavior on opacity \{/);
});

test('the views clear the selection on the empty area without grabbing delegates', () => {
  const source = render(FileViews({ scope: createQmlScope({ app: 'app' }) }));
  assert.equal(occurrences(source, '$qml.app.send("select",null)'), 4);
  assert.equal(occurrences(source, "z: 1"), 3);

  assert.ok(occurrences(source, '$qml.app.state.modalsOpen') >= 1);
  assert.ok(occurrences(source, '$qml.app.state.mutating') >= 1);
  // The right click on the background still opens the folder menu.
  assert.match(source, /Qt\.RightButton/);
});

test('a drag starts on movement, offers the selection and always gives the grab back', () => {
  const source = render(FileViews({ scope: createQmlScope({ app: 'app' }) }));
  assert.equal(occurrences(source, '$qml.app.dragPayload(modelData.path)'), 2);
  // Neither delegate keeps the drag bound to the raw mouse drag state anymore.
  assert.equal(occurrences(source, 'drag.active'), 0);
  assert.equal(occurrences(source, 'nbDragging=true'), 2);
  assert.equal(occurrences(source, 'onCanceled: function'), 2);
  assert.equal(source.split('\n').filter(line => line.includes('onPositionChanged: function') && line.includes('nbDragging')).length, 2);
  assert.equal(occurrences(source, 'Drag.onDragFinished: function'), 2);
  assert.equal(occurrences(source, 'Drag.onActiveChanged: function'), 2);
});

test('list and grid delegates follow the selection and map modifiers to modes', () => {
  const source = render(FileWindow({ scope: createQmlScope({ app: 'app' }) }));
  // List, grid and column delegates read the selection array, not a single entry.
  assert.equal(occurrences(source, 'state.selection.indexOf(modelData.path)>=0'), 3 + occurrences(source,'Accessible.selected:'));
  assert.equal(occurrences(source, 'state.selected&&state.selected.path===modelData.path'), 0);
  // List, grid and column delegates read the modifiers.
  assert.equal(occurrences(source, 'mouse.modifiers&Qt.ControlModifier'), 3);
  // List, grid and column delegates.
  assert.equal(occurrences(source, '"toggle"'), 3);
  assert.equal(occurrences(source, '$qml.app.send("selectPath",{path:parent.modelData.path,mode})'), 2);
  // Columns use a MouseArea: AbstractButton.pressed has no mouse argument.
  assert.equal(occurrences(source, 'property string pendingMode'), 0);
  assert.equal(occurrences(source, '$qml.fileContent.forceActiveFocus()'), 3);
});

test('the shell keeps a context menu inside the selection and stamps every event', () => {
  const source = render(Shell({}));
  assert.equal(occurrences(source, '$qml.app.send("selectPath",{path:entry?entry.path:null,mode:"context"})'), 1);
  assert.equal(occurrences(source, 'generation:$qml.app.uiGeneration'), 5);
  assert.match(source, /next\.selection/);
});
