import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root=await mkdtemp('/tmp/nandomo-hmr-smoke-');
let child;
try {
  await mkdir(join(root,'views'));await writeFile(join(root,'alpha.txt'),'fixture');
  // The view loader resolves dependencies from the project's existing node_modules.
  const {symlink}=await import('node:fs/promises');
  await symlink(fileURLToPath(new URL('../node_modules',import.meta.url)),join(root,'node_modules'),'dir');
  const entry=join(root,'views','app.tsx');
  function source(version,badNative=false) {
    return `import {importQml} from '@nandomo/bridge-qml';
const qml=importQml('QtQuick'), controls=importQml('QtQuick.Controls');
export function App({manager}) {return {
 toolbar:<qml.Column width="fill" spacing={4}>
   <qml.Text objectName="hmrLabel" text="HMR version ${version}" color="white" ${badNative?'nonexistentProperty={1}':''}/>
   <controls.Button objectName="hmrAction" text={()=>manager.descending()?'updated':'original'} onClicked={manager.toggleDescending}/>
 </qml.Column>,
 sidebar:<qml.Column width="fill"><qml.Text color="white" text={()=>manager.path()}/></qml.Column>,
 details:<qml.Column width="fill"><qml.Text color="white" text={()=>manager.selected()?.name??''}/></qml.Column>,
 dialogs:<qml.Item/>
};}`;
  }
  await writeFile(entry,source(1));
  child=spawn(process.execPath,[fileURLToPath(new URL('./run.mjs',import.meta.url)),'--dev','--hmr-smoke'],{
    env:{...process.env,NANDOMO_FM_START_PATH:root,NANDOMO_FM_CONFIG_DIR:join(root,'config'),NANDOMO_FM_DEV_ENTRY:entry},stdio:['ignore','pipe','pipe'],
  });
  let log='',stage=0,editing=Promise.resolve();
  function collect(chunk) {
    process.stdout.write(chunk);log+=String(chunk);
    if(stage===0 && log.includes('FM_HMR_READY')) {
      stage=1;editing=editing.then(()=>writeFile(entry,'export function App( { BROKEN'));
    }else if(stage===1 && log.includes('Recarga falhou')) {
      stage=2;log='';editing=editing.then(()=>writeFile(entry,source(2,true)));
    }else if(stage===2 && log.includes('Recarga falhou')) {
      stage=3;log='';editing=editing.then(()=>writeFile(entry,source(2)));
    }
  }
  child.stdout.on('data',collect);child.stderr.on('data',collect);
  const timer=setTimeout(()=>child.kill('SIGTERM'),45000);
  let code;
  try {code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});}
  finally{clearTimeout(timer);}
  await editing;
  assert.equal(code,0);assert.equal(stage,3);assert.ok(log.includes('FM_HMR_SMOKE_PASS'));
}finally{if(child && child.exitCode===null)child.kill('SIGTERM');await rm(root,{recursive:true,force:true});}
