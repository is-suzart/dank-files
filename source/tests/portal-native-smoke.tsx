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
declare let ticks: number, step: number, Qt: any;
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
        if (!$qml.app.toolbarObject || $qml.app.state.busy) return;
        if (step===0 && $qml.app.state.entries.length) {
          if (!$qml.app.findUi('chooserAccept',$qml.app.toolbarObject)) throw new Error('Missing accept');
          $qml.app.send('open',$qml.app.state.path+'/sub'); step=1;
        } else if (step===1 && $qml.app.state.path.endsWith('/sub') && $qml.app.state.entries.length) {
          if ($qml.app.state.entries.length!==1 || $qml.app.state.entries[0].name!=='photo.png') throw new Error('Listing filter failed');
          $qml.app.send('select',$qml.app.state.path+'/photo.png');step=2;
        } else if(step===2) {
          const accept:any=$qml.app.findUi('chooserAccept',$qml.app.toolbarObject);
          if(!accept.enabled) return;
          accept.clicked(); console.warn('PORTAL_NATIVE_PASS'); step=3;
        }
      } catch(error) {console.warn('PORTAL_NATIVE_FAIL',error);Qt.exit(1);}
    })} />);
  await writeFile(join(app,'shell.qml'),shell);
  const child=spawn('dbus-run-session',['--','python3',fileURLToPath(new URL('./portal-frontend-client.py',import.meta.url)),join(app,'portal-backend.py'),join(app,'portal-launch.mjs')],{env:{...process.env,PORTAL_TEST_NODE:process.execPath,PORTAL_NATIVE_APP:app,PORTAL_NATIVE_FOLDER:folder,NANDOMO_FM_QT_PLATFORM:process.env.PORTAL_TEST_PLATFORM || 'offscreen',QT_QUICK_BACKEND:'software',NANDOMO_FM_CONFIG_DIR:join(root,'preferences')},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',x=>logs+=x);child.stderr.on('data',x=>logs+=x);
  const watchdog=setTimeout(()=>child.kill('SIGTERM'),28000);
  try {
    const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});
    assert.equal(code,0,logs);assert.match(logs,/PORTAL_FRONTEND_PASS/);
    assert.doesNotMatch(logs,/PORTAL_NATIVE_FAIL|ReferenceError|Unable to assign/);
    console.log('PORTAL_NATIVE_PASS: public portal → real chooser → folder/filter/selection → URI response');
  } finally {clearTimeout(watchdog);}
} finally {await rm(root,{recursive:true,force:true});}
