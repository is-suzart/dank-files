import { tsImport } from 'tsx/esm/api';
import { mkdtemp, symlink, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { findDmsSource } from './dms-source.mjs';
const root=await mkdtemp(join(tmpdir(),'nandomo-video-native-'));
try {
  const video=join(root,'test video.mp4');
  execFileSync('ffmpeg',['-v','error','-f','lavfi','-i','color=c=blue:s=96x64:d=3','-c:v','mpeg4','-y',video],{stdio:'pipe'});
  const {renderVideoFixture}=await tsImport('../tests/video-native-fixture.tsx',{parentURL:import.meta.url,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
  await writeFile(join(root,'shell.qml'),renderVideoFixture());
  await symlink(join(await findDmsSource(),'DankCommon'),join(root,'DankCommon'),'dir');
  const child=spawn('qs',['--path',join(root,'shell.qml')],{env:{...process.env,QT_QPA_PLATFORM:'offscreen',QT_QUICK_BACKEND:'software',VIDEO_FIXTURE:'file://'+video},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',data=>{logs+=data;});child.stderr.on('data',data=>{logs+=data;});
  const timer=setTimeout(()=>child.kill('SIGTERM'),20000);
  try {
    const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});
    assert.equal(code,0,logs);assert.ok(logs.includes('VIDEO_NATIVE_PASS'),logs);
    console.log('VIDEO_NATIVE_PASS: loaded, no autoplay, play, pause, seek, unload on hide');
  }finally{clearTimeout(timer);}
}finally{await rm(root,{recursive:true,force:true});}
