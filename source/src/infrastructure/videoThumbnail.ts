import { mkdir, mkdtemp, stat, access, rename, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';

const exec=promisify(execFile);
const pending=new Map<string,Promise<string>>();
let running=0;
const waiting:Array<()=>void>=[];

/** Cached stills, never a player per grid item; at most two decoders run at once. */
export function videoThumbnail(path:string):Promise<string> {
  const existing=pending.get(path);if(existing)return existing;
  const task=create(path).catch(()=>'').finally(()=>{pending.delete(path);});
  pending.set(path,task);return task;
}
async function create(path:string) {
  if(running>=2)await new Promise<void>(resolve=>waiting.push(resolve));else running++;
  let temporary:string|undefined;
  try {
    const info=await stat(path);
    if(!info.isFile())return '';
    const cache=join(process.env.XDG_CACHE_HOME || join(homedir(),'.cache'),'nandomo','video-thumbnails');
    const key=createHash('sha256').update(JSON.stringify([path,info.size,info.mtimeMs])).digest('hex');
    const target=join(cache,key+'.png');
    try {await access(target);return pathToFileURL(target).href;}catch{}
    await mkdir(cache,{recursive:true});
    temporary=await mkdtemp(join(cache,'.pending-'));
    const image=join(temporary,'frame.png');
    await exec('ffmpegthumbnailer',['-i',path,'-o',image,'-s','384','-q','8','-t','10%'],{timeout:10000,maxBuffer:64*1024});
    const after=await stat(path);
    if(after.size!==info.size || after.mtimeMs!==info.mtimeMs)return '';
    await rename(image,target);
    return pathToFileURL(target).href;
  } finally {
    try {if(temporary)await rm(temporary,{recursive:true,force:true});}
    finally {const next=waiting.shift();if(next)next();else running--;}
  }
}
