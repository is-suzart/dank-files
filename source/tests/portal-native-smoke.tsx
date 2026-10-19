/** Exercises the packaged chooser with real Quickshell controls, without touching user files. */
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { importQml, qmlHandler } from '@nandomo/bridge-qml';
import { renderShell } from '../src/native/renderShell.js';
const qt = importQml('QtQml');
declare let ticks: number, step: number, Qt: any, Quickshell: any;
const root = await mkdtemp(join(tmpdir(), 'dank-portal-native-'));
try {
  const app=join(root,'app'), folder=join(root,'files');
  await cp(fileURLToPath(new URL('../dist/dankFiles/app/',import.meta.url)),app,{recursive:true});
  await mkdir(folder); await mkdir(join(folder,'sub'));
  await writeFile(join(folder,'sub','photo.png'),'fixture'); await writeFile(join(folder,'sub','hidden.txt'),'fixture');
  const shell=renderShell(scope => <qt.Timer interval={100} repeat={true} running={true}
    qmlDeclarations={{ticks:{type:'int',value:0},step:{type:'int',value:0}}}
    onTriggered={qmlHandler(scope,($qml)=>{
      try {
        if (++ticks > 180) throw new Error('Chooser timeout at '+step+': '+JSON.stringify({path:$qml.app.state.path,entries:$qml.app.state.entries,selected:$qml.app.state.selected,error:$qml.app.state.error}));
        if (!$qml.window.visible || !$qml.app.state.themeReady || !$qml.app.toolbarObject || !$qml.app.footerObject || $qml.app.state.busy || ticks<8) return;
        const saving=Quickshell.env('PORTAL_NATIVE_METHOD')==='SaveFile';
        if (step===0 && $qml.app.state.entries.length) {
          const footer:any=$qml.app.footerObject;
          const accept:any=$qml.app.findUi('chooserAccept',footer);
          const cancel:any=$qml.app.findUi('chooserCancel',footer);
          const back:any=$qml.app.findUi('toolbarBack',$qml.app.toolbarObject);
          const name:any=$qml.app.findUi('chooserName',footer);
          if (!accept || !cancel || !back || back.text!=='' || back.iconName!=='go-previous') throw new Error('Header or actions missing');
          if (!$qml.app.findUi('toolbarAddress',$qml.app.toolbarObject)) throw new Error('Missing breadcrumb');
          if (footer.mapToItem($qml.window.contentItem,0,footer.height).y < $qml.window.height-28) throw new Error('Actions are not at the bottom: '+JSON.stringify({bottom:footer.mapToItem($qml.window.contentItem,0,footer.height).y,height:footer.height,implicit:footer.implicitHeight,window:$qml.window.height,parent:footer.parent.height}));
          if (Math.abs(footer.width-$qml.app.toolbarObject.width)>2) throw new Error('Footer width mismatch');
          if (!Qt.colorEqual(accept.backgroundColor,$qml.theme.primary) || Qt.colorEqual(cancel.background.color,accept.backgroundColor)) throw new Error('Wrong primary/secondary hierarchy');
          if (saving ? !name || name.text!=='Report.pdf' : !!name) throw new Error('Wrong open/save name field');
          if(saving && name.width < footer.width-100)throw new Error('Save name does not fill the footer');
          $qml.app.send('open',$qml.app.state.path+'/sub'); step=1;
        } else if (step===1 && $qml.app.state.path.endsWith('/sub')) {
          if(!saving && ($qml.app.state.entries.length!==1 || $qml.app.state.entries[0].name!=='photo.png')) throw new Error('Listing filter failed');
          $qml.app.findUi('chooserFilter',$qml.app.footerObject).clicked();step=4;
        } else if (step===4) {
          const menu:any=$qml.app.findUi('chooserFilterPopup',$qml.app.footerObject);
          if(!menu || !menu.visible)return;
          menu.itemAt(1).triggered();menu.close();step=5;
        } else if (step===5) {
          if($qml.app.state.entries.length!==2 || $qml.app.findUi('chooserFilter',$qml.app.footerObject).text!=='All files')return;
          if(saving){const field:any=$qml.app.findUi('chooserName',$qml.app.footerObject);field.text='Edited.pdf';field.textEdited();}
          else $qml.app.send('select',$qml.app.state.path+'/photo.png');
          step=2;
        } else if(step===2) {
          const accept:any=$qml.app.findUi('chooserAccept',$qml.app.footerObject);
          if(!accept.enabled) return;
          accept.clicked(); console.warn('PORTAL_NATIVE_PASS'); step=3;
        }
      } catch(error) {console.warn('PORTAL_NATIVE_FAIL',error);Qt.exit(1);}
    })} />);
  await writeFile(join(app,'shell.qml'),shell);
  const child=spawn('dbus-run-session',['--','python3',fileURLToPath(new URL('./portal-frontend-client.py',import.meta.url)),join(app,'portal-backend.py'),join(app,'portal-launch.mjs')],{env:{...process.env,PORTAL_TEST_NODE:process.execPath,PORTAL_NATIVE_METHOD:process.argv.includes('--save')?'SaveFile':'OpenFile',PORTAL_NATIVE_APP:app,PORTAL_NATIVE_FOLDER:folder,NANDOMO_FM_QT_PLATFORM:process.env.PORTAL_TEST_PLATFORM || 'offscreen',QT_QUICK_BACKEND:'software',NANDOMO_FM_CONFIG_DIR:join(root,'preferences')},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',x=>logs+=x);child.stderr.on('data',x=>logs+=x);
  const watchdog=setTimeout(()=>child.kill('SIGTERM'),28000);
  try {
    const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});
    assert.equal(code,0,logs);assert.match(logs,/PORTAL_FRONTEND_PASS/);
    assert.doesNotMatch(logs,/PORTAL_NATIVE_FAIL|ReferenceError|Unable to assign/);
    console.log('PORTAL_NATIVE_PASS: '+(process.argv.includes('--save')?'save name':'open selection')+', toolbar, footer layout, action colors and filter menu');
  } finally {clearTimeout(watchdog);}
} finally {await rm(root,{recursive:true,force:true});}
