import { renderShell } from '../src/native/renderShell.js';
import { importQml, qmlExpression, qmlHandler } from '@nandomo/bridge-qml';
import type { QmlScope, QmlModule } from '@nandomo/bridge-qml';
// QtTest is a smoke-only module, outside the production contract scan.
const tests = importQml('QtTest') as QmlModule;
const TestEvent = tests.TestEvent!;
const qt = importQml('QtQml');
declare const Qt: any;
declare let step: number, ticks: number, savedTabButton:any;
/** Included only by the temporary native keyboard fixture. */
export function SelectionSmoke({scope}: {scope: QmlScope}) {
  if(process.env.NANDOMO_FM_SELECTION_SMOKE !== '1')return null;
  return <>
    <TestEvent qmlId={scope.id('selectionKeys')} />
    <qt.Timer interval={100} repeat={true} running={true}
      qmlDeclarations={{step:{type:'int',value:0},ticks:{type:'int',value:0},savedTabButton:{type:'var',value:null}}}
      onTriggered={qmlHandler(scope, q => {
        try {
          if(++ticks>150)throw new Error('Selection timeout at step '+step);
          if(!q.app.toolbarObject || q.app.state.busy)return;
          if(q.app.state.path.indexOf('/tmp/nandomo-selection-smoke-') !== 0)throw new Error('Unsafe fixture');
          if(step===0 && q.app.state.view !== 'list'){q.app.send('view','list');return;}
          if(step===0) {
            q.window.requestActivate();q.fileContent.forceActiveFocus();
            q.selectionKeys.keyClick(Qt.Key_Down, Qt.NoModifier, 0);step++;
          } else if(step===1 && q.app.state.selectionCount===1) {
            q.selectionKeys.keyClick(Qt.Key_Down,Qt.ShiftModifier,0);step++;
          } else if(step===2 && q.app.state.selectionCount===2) {
            q.selectionKeys.keyClick(Qt.Key_A,Qt.ControlModifier,0);step++;
          } else if(step===3 && q.app.state.selectionCount===q.app.state.entries.length) {
            q.selectionKeys.keyClick(Qt.Key_C,Qt.ControlModifier,0);step++;
          } else if(step===4 && q.app.state.clipboard && q.app.state.clipboard.entries.length===q.app.state.entries.length) {
            q.app.send('view','grid');step++;
          } else if(step===5 && q.app.state.view==='grid' && q.filesGrid.visible) {
            q.filesGrid.forceLayout();
            const tile=q.filesGrid.itemAtIndex(0);if(!tile)return;
            q.selectionKeys.mouseClick(tile,tile.width/2,tile.height/2,Qt.LeftButton,Qt.ControlModifier,0);
            step++;
          } else if(step===6 && q.app.state.selectionCount===q.app.state.entries.length-1) {
            q.app.send('view','columns');step++;
          } else if(step===7 && q.app.state.view==='columns') {
            const item=q.app.findUi('columnEntry:'+q.app.state.entries[0].path,q.window.contentItem);
            if(!item || !item.visible)return;
            q.selectionKeys.mouseClick(item,item.width/2,item.height/2,Qt.LeftButton,Qt.ControlModifier,0);
            step++;
          } else if(step===8 && q.app.state.selectionCount===q.app.state.entries.length) {
            q.selectionKeys.mouseClick(q.filesColumns,40,q.filesColumns.height-12,Qt.LeftButton,Qt.NoModifier,0);step++;
          } else if(step===9 && q.app.state.selectionCount===0) {
            q.app.send('view','grid');step++;
          } else if(step===10 && q.app.state.view==='grid') {
            q.app.send('select',q.app.state.entries[0].path);step++;
          } else if(step===11 && q.app.state.selectionCount===1) {
            q.selectionKeys.mouseClick(q.filesGrid,q.filesGrid.width-12,q.filesGrid.height-12,Qt.LeftButton,Qt.NoModifier,0);step++;
          } else if(step===12 && q.app.state.selectionCount===0) {
            q.app.send('view','list');step++;
          } else if(step===13 && q.app.state.view==='list') {
            q.app.send('select',q.app.state.entries[0].path);step++;
          } else if(step===14 && q.app.state.selectionCount===1) {
            q.selectionKeys.mouseClick(q.filesList,q.filesList.width-12,q.filesList.height-12,Qt.LeftButton,Qt.NoModifier,0);step++;
          } else if(step===15 && q.app.state.selectionCount===0) {
            const first=q.app.findUi('tab:'+q.app.state.activeTab,q.app.toolbarObject);
            if(!first || first.width<=0 || first.height<=0 || !first.visible) throw new Error('Tab is not visible');
            q.app.findUi('tabNew',q.app.toolbarObject).clicked();step++;
          } else if(step===16 && q.app.state.tabs.length===2) {
            const first=q.app.state.tabs[0];
            savedTabButton=q.app.findUi('tab:'+first.id,q.app.toolbarObject);
            savedTabButton.clicked();step++;
          } else if(step===17 && q.app.state.activeTab===q.app.state.tabs[0].id) {
            if(savedTabButton!==q.app.findUi('tab:'+q.app.state.activeTab,q.app.toolbarObject)) throw new Error('Switching recreated tab buttons');
            if(!savedTabButton.selected) return;
            q.app.findUi('tabClose:'+q.app.state.activeTab,q.app.toolbarObject).clicked();step++;
          } else if(step===18 && q.app.state.tabs.length===1) {
            console.warn('FM_SELECTION_SMOKE_PASS');Qt.quit();
          }
        }catch(error:any){console.warn('FM_SELECTION_SMOKE_FAIL',error);Qt.exit(1);}
      })} />
  </>;
}

export function renderSelectionShell(){return renderShell(scope=>SelectionSmoke({scope}));}
