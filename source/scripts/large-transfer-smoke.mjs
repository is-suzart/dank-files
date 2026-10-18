// Opt-in disk/RAM exercise: 1 GiB plus small files; never runs against user files.
import {tsImport} from 'tsx/esm/api';
import {mkdtemp,mkdir,writeFile,readFile,readdir,readlink,lstat,symlink,rm,stat,statfs} from 'node:fs/promises';
import {createReadStream,createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';
import {Readable} from 'node:stream';
import {createHash,randomBytes} from 'node:crypto';
import {join} from 'node:path';
import {tmpdir,homedir} from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {findDmsSource} from './dms-source.mjs';
const bytes=1024**3;
const diskParent=join(homedir(),'.cache');await mkdir(diskParent,{recursive:true});
for(const dir of [diskParent,tmpdir()]){const fs=await statfs(dir);assert.ok(fs.bavail*fs.bsize>bytes*2,'Need at least 2 GiB free in '+dir);}
assert.notEqual((await stat(diskParent)).dev,(await stat(tmpdir())).dev,'This exercise requires /tmp and HOME on different filesystems.');
const disk=await mkdtemp(join(diskParent,'nandomo-large-')),memory=await mkdtemp(join(tmpdir(),'nandomo-large-'));
try {
 const source=join(disk,'game-fixture');await mkdir(join(source,'data'),{recursive:true});
 const chunk=randomBytes(1024**2);const started=performance.now();
 await pipeline(Readable.from((async function*(){for(let i=0;i<1024;i++)yield chunk;})()),createWriteStream(join(source,'data/payload.bin'),{flags:'wx'}));
 for(let i=0;i<256;i++)await writeFile(join(source,'data',`asset-${i}.txt`),'temporary asset '+i+'\n'+chunk.toString('hex',0,512));
 await symlink('data/payload.bin',join(source,'payload-link'));
 async function manifest(dir){const result=[];async function walk(path,relative){const info=await lstat(path);if(info.isDirectory()){for(const name of (await readdir(path)).sort())await walk(join(path,name),relative+'/'+name);}else if(info.isSymbolicLink())result.push([relative,'link',await readlink(path)]);else{const hash=createHash('sha256');for await(const data of createReadStream(path))hash.update(data);result.push([relative,info.size,hash.digest('hex')]);}}await walk(dir,'');return result;}
 const expected=await manifest(source);
 const {renderLargeTransferShell}=await tsImport('../tests/large-transfer-native-fixture.tsx',{parentURL:import.meta.url,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
 const layout=await mountDmsSource(await findDmsSource(),memory);
 await writeFile(join(memory,'shell.qml'),adaptDmsQml(renderLargeTransferShell(),layout.legacy));
 async function exercise(source,start,destination,cancel){
  const child=spawn('qs',['--path',join(memory,'shell.qml')],{env:{...process.env,NANDOMO_FM_DMS_LEGACY:layout.legacy?'1':'0',HOME:disk,XDG_DATA_HOME:join(disk,'xdg-data'),XDG_CONFIG_HOME:join(disk,'config'),XDG_CACHE_HOME:join(disk,'cache'),NANDOMO_FM_CONFIG_DIR:join(disk,'preferences'),LC_ALL:'en_US.UTF-8',LANG:'en_US.UTF-8',LANGUAGE:'',
   QT_QPA_PLATFORM:'offscreen',QT_QUICK_BACKEND:'software',NANDOMO_FM_DESKTOP_INTEGRATION:'0',NANDOMO_FM_NODE:process.execPath,NANDOMO_FM_BACKEND:fileURLToPath(new URL('../dist/dankFiles/app/backend.mjs',import.meta.url)),NANDOMO_FM_START_PATH:start,
   TRANSFER_SOURCE_URL:pathToFileURL(source).href,TRANSFER_START:start,TRANSFER_DESTINATION:destination,TRANSFER_CANCEL:cancel?'1':'0'},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',d=>{logs+=d;});child.stderr.on('data',d=>{logs+=d;});const timer=setTimeout(()=>child.kill('SIGTERM'),70000);
  try{const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});assert.equal(code,0,logs.slice(-7000));assert.doesNotMatch(logs,/Syntax error|ReferenceError|TypeError/);const result=logs.match(/LARGE_TRANSFER_NATIVE_PASS (\{[^\n]+\})/);assert.ok(result,logs.slice(-7000));return JSON.parse(result[1]);}finally{clearTimeout(timer);}
 }
 const moved=await exercise(source,disk,memory,false),destination=join(memory,'game-fixture');
 assert.deepEqual(await manifest(destination),expected);await assert.rejects(lstat(source),{code:'ENOENT'});
 const cancelled=await exercise(destination,memory,disk,true);
 assert.deepEqual(await manifest(destination),expected);await assert.rejects(lstat(source),{code:'ENOENT'});
 assert.deepEqual((await readdir(disk)).filter(n=>n.startsWith('.nandomo-transfer-')),[]);
 assert.deepEqual((await readdir(memory)).filter(n=>n.startsWith('.nandomo-transfer-')),[]);
 console.log(JSON.stringify({pass:true,payloadBytes:bytes,smallFiles:256,sha256Verified:true,symlinkVerified:true,moved,cancelled,totalSeconds:Math.round((performance.now()-started)/100)/10},null,2));
}finally{await rm(disk,{recursive:true,force:true});await rm(memory,{recursive:true,force:true});}
