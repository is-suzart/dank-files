import { tsImport } from 'tsx/esm/api';
import { mkdtemp,mkdir,writeFile,readFile,symlink,rm,stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { findDmsSource } from './dms-source.mjs';
const root=await mkdtemp(join(tmpdir(),'nandomo-workflows-'));
try {
 await mkdir(join(root,'nested'));await mkdir(join(root,'data/Trash/files'),{recursive:true});await mkdir(join(root,'data/Trash/info'));
 await writeFile(join(root,'needle.txt'),'search');await writeFile(join(root,'nested/needle-too.txt'),'deep search');await writeFile(join(root,'item.txt'),'preserved original');
 await writeFile(join(root,'data/Trash/files/restored.txt'),'restored content');await writeFile(join(root,'data/Trash/info/restored.txt.trashinfo'),'[Trash Info]\nPath='+encodeURI(join(root,'restored/restored.txt'))+'\n');
 const {renderWorkflowsShell}=await tsImport('../tests/workflows-native-fixture.tsx',{parentURL:import.meta.url,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
 await writeFile(join(root,'shell.qml'),renderWorkflowsShell());await symlink(join(await findDmsSource(),'DankCommon'),join(root,'DankCommon'),'dir');
 const lang=process.argv.includes('--zh')?'zh_CN.UTF-8':process.argv.includes('--pt')?'pt_BR.UTF-8':'en_US.UTF-8';
 const expectedLocale=process.argv.includes('--zh')?'zh-Hans':process.argv.includes('--pt')?'pt-BR':'en';
 const child=spawn('qs',['--path',join(root,'shell.qml')],{env:{...process.env,HOME:root,XDG_DATA_HOME:join(root,'data'),XDG_CONFIG_HOME:join(root,'config'),XDG_CACHE_HOME:join(root,'cache'),LC_ALL:lang,LANG:lang,LANGUAGE:'',
  QT_QPA_PLATFORM:'offscreen',QT_QUICK_BACKEND:'software',NANDOMO_FM_DESKTOP_INTEGRATION:'0',NANDOMO_FM_NODE:process.execPath,NANDOMO_FM_BACKEND:fileURLToPath(new URL('../dist/dankFiles/app/backend.mjs',import.meta.url)),NANDOMO_FM_START_PATH:root,
  WORKFLOW_ROOT:root,EXPECTED_LOCALE:expectedLocale},stdio:['ignore','pipe','pipe']});
 let logs='';child.stdout.on('data',data=>{logs+=data;});child.stderr.on('data',data=>{logs+=data;});const watchdog=setTimeout(()=>child.kill('SIGTERM'),30000);
 try {const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});assert.equal(code,0,logs.slice(-6000));assert.ok(logs.includes('WORKFLOWS_NATIVE_PASS'),logs.slice(-6000));assert.doesNotMatch(logs,/Syntax error|ReferenceError|TypeError/);}
 finally{clearTimeout(watchdog);}
 assert.equal(await readFile(join(root,'item.txt'),'utf8'),'preserved original');assert.equal(await readFile(join(root,'unpacked/item.txt'),'utf8'),'preserved original');assert.equal(await readFile(join(root,'restored/restored.txt'),'utf8'),'restored content');await assert.rejects(stat(join(root,'data/Trash/files/restored.txt')),{code:'ENOENT'});
 console.log('WORKFLOWS_NATIVE_PASS '+lang+': search, undo, archive, extract, restore and runtime locale');
}finally{await rm(root,{recursive:true,force:true});}
