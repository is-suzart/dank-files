import { EntryIcon } from '../src/native/EntryIcon.js';
import { renderShell } from '../src/native/renderShell.js';
import { importQml,qmlHandler,type QmlScope } from '@nandomo/bridge-qml';
const qt=importQml('QtQml'),qml=importQml('QtQuick');
declare const Quickshell:any, Qt:any, Image:any;
declare let step:number,ticks:number,fixture:string;
function Probe({scope}:{scope:QmlScope}) {
 return <qml.Item><EntryIcon qmlId={scope.id('fallbackProbe')} width={16} height={16}
  source="file:///__nandomo_missing_icon_for_test__.png"
  fallbackSource={'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="blue"/></svg>')} />
 <qt.Timer interval={100} repeat={true} running={true}
  qmlDeclarations={{step:{type:'int',value:0},ticks:{type:'int',value:0},fixture:{type:'string',value:''}}}
  onTriggered={qmlHandler(scope,q=>{
   try {
    if(++ticks>220)throw new Error('Workflow timeout step '+step+' '+q.app.state.error);
    if(!q.app.toolbarObject || !q.app.dialogsObject || q.app.state.busy)return;
    if(q.app.state.error)throw new Error('Workflow error step '+step+': '+q.app.state.error);
    if(step===0){
     if(q.fallbackProbe.children[0].status!==Image.Error || q.fallbackProbe.children[1].status!==Image.Ready)throw new Error('Broken image did not load its fallback');
     if(q.app.fileIcon('__nandomo_unavailable_icon__').indexOf('__nandomo_unavailable_icon__')>=0)throw new Error('Missing theme icon was sent to the provider');
     if(q.app.findUi('toolbarSearch',q.app.toolbarObject).actionIcon!=='search')throw new Error('Search did not use the DMS glyph');
     fixture=Quickshell.env('WORKFLOW_ROOT');if(q.app.state.path!==fixture)throw new Error('Unsafe path');
     if(q.app.locale!==Quickshell.env('EXPECTED_LOCALE'))throw new Error('Locale came from build instead of runtime: '+q.app.locale);
     const zero=q.app.locale==='pt-BR'?'0 item':q.app.locale==='en'?'0 items':'共 0 个项目';
     if(q.app.tr('{count} itens',{count:0})!==zero)throw new Error('Native plural disagrees with core');
     if(q.app.findUi('fileSearch',q.app.toolbarObject).visible || !q.app.findUi('toolbarAddress',q.app.toolbarObject).visible)throw new Error('Search must start collapsed');
     if(q.app.findUi('fileToolsMenu',q.app.toolbarObject) || q.app.findUi('searchRecursive',q.app.toolbarObject))throw new Error('Obsolete toolbar controls are still present');
     q.app.findUi('toolbarSearch',q.app.toolbarObject).clicked();
     const search=q.app.findUi('fileSearch',q.app.toolbarObject);search.clear();search.insertText('needle');search.textEdited();step=1;
    }else if(step===1 && q.app.state.searchText==='needle' && q.app.state.entries.length===1){
     if(!q.app.findUi('fileSearch',q.app.toolbarObject).visible || q.app.findUi('toolbarAddress',q.app.toolbarObject).visible)throw new Error('Search did not replace the path');
     q.app.findUi('toolbarSearch',q.app.toolbarObject).clicked();step=3;
    }else if(step===3 && q.app.state.searchText===''){
     if(q.app.findUi('fileSearch',q.app.toolbarObject).visible || !q.app.findUi('toolbarAddress',q.app.toolbarObject).visible)throw new Error('Closing search did not restore the path');
     q.app.send('select',fixture+'/item.txt');q.app.send('rename');step=4;
    }else if(step===4 && q.app.findUi('nameDialog',q.app.dialogsObject).visible){
     const field=q.app.findUi('editName',q.app.dialogsObject);field.clear();field.insertText('renamed.txt');q.app.findUi('editSave',q.app.dialogsObject).clicked();step=5;
    }else if(step===5 && !q.app.state.mutating && q.app.state.entries.some(function(e:any){return e.name==='renamed.txt';})){
     q.app.findUi('undoContext',q.window).triggered();step=6;
    }else if(step===6 && !q.app.state.mutating && q.app.state.entries.some(function(e:any){return e.name==='item.txt';})){
     q.app.send('select',fixture+'/item.txt');q.app.send('fileTool','archive');step=7;
    }else if(step===7 && q.app.findUi('fileToolsDialog',q.app.dialogsObject).visible){
     const field=q.app.findUi('fileToolName',q.app.dialogsObject);field.clear();field.insertText('archive.zip');field.textEdited();step=8;
    }else if(step===8){q.app.findUi('fileToolSubmit',q.app.dialogsObject).clicked();step=9;
    }else if(step===9 && !q.app.state.mutating && q.app.state.entries.some(function(e:any){return e.name==='archive.zip';})){
     q.app.send('select',fixture+'/archive.zip');q.app.send('fileTool','extract');step=10;
    }else if(step===10 && q.app.findUi('fileToolsDialog',q.app.dialogsObject).visible){
     const field=q.app.findUi('fileToolName',q.app.dialogsObject);field.clear();field.insertText('unpacked');field.textEdited();step=11;
    }else if(step===11){q.app.findUi('fileToolSubmit',q.app.dialogsObject).clicked();step=12;
    }else if(step===12 && !q.app.state.mutating && q.app.state.entries.some(function(e:any){return e.name==='unpacked';})){
     q.app.send('special','trash:///');step=13;
    }else if(step===13 && q.app.state.path==='trash:///'){
     q.app.send('select',fixture+'/data/Trash/files/restored.txt');step=14;
    }else if(step===14 && q.app.state.selected){
     const restore=q.app.findUi('trashRestore',q.app.toolbarObject);
     if(restore.text!==q.app.tr('Restaurar'))throw new Error('Restore translation mismatch');restore.clicked();step=15;
    }else if(step===15 && !q.app.state.mutating && !q.app.state.entries.some(function(e:any){return e.path===fixture+'/data/Trash/files/restored.txt';})){
     console.warn('WORKFLOWS_NATIVE_PASS',q.app.locale,'search, undo, archive, extract and restore');Qt.quit();
    }
   }catch(error:any){console.warn('WORKFLOWS_NATIVE_FAIL',error);Qt.exit(1);}
  })} /></qml.Item>;
}
export const renderWorkflowsShell=()=>renderShell(scope=><Probe scope={scope}/>);
