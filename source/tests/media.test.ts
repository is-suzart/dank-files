import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { previewKind } from '../src/domain/fileActions.js';
import { videoThumbnail } from '../src/infrastructure/videoThumbnail.js';
import { createFileManager } from '../src/application/createFileManager.js';
import type { FileManagerServices } from '../src/application/ports.js';

function adapters():FileManagerServices {
  return {files:{list:async()=>[],resolve:p=>p,parent:()=>'/home',child:(p,n)=>p+'/'+n,url:p=>'file://'+p,open:async()=>{},create:async()=>{},rename:async()=>{}},
    locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{background:'#101214'},icons:{}}),watchTheme:()=>()=>{}}};
}
test('first frame readiness waits for theme, including failure fallback',async()=>{
  const service=adapters();let finish!:(value:any)=>void;
  service.desktop.theme=()=>new Promise(resolve=>{finish=resolve;});
  const manager=createFileManager('/home',service);
  try {
    const initialized=manager.initialize();
    assert.equal(manager.snapshot().themeReady,false);
    finish({palette:{background:'#101214'},icons:{}});await initialized;
    assert.equal(manager.snapshot().themeReady,true);assert.equal(manager.palette().background,'#101214');
  } finally {manager.dispose();}
  const failed=adapters();failed.desktop.theme=async()=>{throw new Error('missing theme');};
  const fallback=createFileManager('/home',failed);
  try {await fallback.initialize();assert.equal(fallback.snapshot().themeReady,true);}finally{fallback.dispose();}
});
test('video thumbnails update asynchronously and stale folder results are ignored',async()=>{
  const service=adapters();let finish!:(value:string)=>void;
  service.files.list=async(path)=>path==='/home' ? [{name:'clip.MP4',path:'/home/clip.MP4',directory:false,symlink:false,size:1,modified:1,icon:'video'}] : [];
  service.files.videoThumbnail=()=>new Promise(resolve=>{finish=resolve;});
  const manager=createFileManager('/home',service);
  try {
    await manager.initialize();assert.equal(manager.busy(),false);
    manager.select('/home/clip.MP4');assert.equal(manager.selectedPreviewKind(),'video');
    await manager.navigate('/other');finish('file:///cached.png');await new Promise(resolve=>setImmediate(resolve));
    assert.deepEqual(manager.snapshot().videoThumbnails,{});
  } finally {manager.dispose();}
  for(const extension of ['mp4','mkv','webm','mov','avi','m4v','ogv','mpeg','mpg'])assert.equal(previewKind('a.'+extension.toUpperCase()),'video');
  assert.equal(previewKind('a.mp4.exe'),'none');assert.equal(previewKind('a.pdf'),'pdf');
});
let videoTools=true;
try {execFileSync('ffmpeg',['-version'],{stdio:'ignore'});execFileSync('ffmpegthumbnailer',['-v'],{stdio:'ignore'});}catch{videoTools=false;}
test('video stills use cache, invalidate on file changes, and fail without replacing files',{skip:!videoTools},async()=>{
  const root=await mkdtemp(join(tmpdir(),'nandomo-video-cache-'));
  const before=process.env.XDG_CACHE_HOME;
  process.env.XDG_CACHE_HOME=join(root,'cache');
  try {
    const video=join(root,'clip with spaces.mp4');
    execFileSync('ffmpeg',['-v','error','-f','lavfi','-i','color=c=blue:s=96x64:d=1','-c:v','mpeg4','-y',video],{stdio:'pipe'});
    const [a,b]=await Promise.all([videoThumbnail(video),videoThumbnail(video)]);
    assert.match(a,/^file:.*\.png$/);assert.equal(a,b);
    const first=await readFile(new URL(a));assert.equal(first.subarray(1,4).toString(),'PNG');
    assert.equal(await videoThumbnail(video),a);
    await writeFile(video,'not a video');assert.equal(await videoThumbnail(video),'');
    assert.equal(await readFile(video,'utf8'),'not a video');
    assert.equal(await videoThumbnail(join(root,'missing.mp4')),'');
  } finally {if(before===undefined)delete process.env.XDG_CACHE_HOME;else process.env.XDG_CACHE_HOME=before;await rm(root,{recursive:true,force:true});}
});

test('thumbnail workers cap concurrent requests and preserve successful results',async()=>{
  const service=adapters();
  service.files.list=async()=>Array.from({length:4},(_,i)=>({name:`${i}.mp4`,path:`/home/${i}.mp4`,directory:false,symlink:false,size:1,modified:1,icon:'video'}));
  const pending:Array<(value:string)=>void>=[];let running=0, maximum=0;
  service.files.videoThumbnail=()=>new Promise<string>(resolve=>{running++;maximum=Math.max(maximum,running);pending.push(value=>{running--;resolve(value);});});
  const manager=createFileManager('/home',service);
  try {
    await manager.initialize();assert.equal(pending.length,2);
    pending[0]!('file:///first.png');await new Promise(resolve=>setImmediate(resolve));
    assert.equal(pending.length,3);assert.equal(manager.snapshot().videoThumbnails['/home/0.mp4'],'file:///first.png');
    pending[1]!('');pending[2]!('');await new Promise(resolve=>setImmediate(resolve));
    pending[3]!('');await new Promise(resolve=>setImmediate(resolve));
    assert.equal(maximum,2);assert.equal(running,0);
  }finally{manager.dispose();}
});
