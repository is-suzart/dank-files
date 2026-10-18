import { readdir, readFile, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { Entry } from '../domain/files.js';
import { discoverDrives, entryIcon } from './filesystem.js';
const exec=promisify(execFile);
async function entry(path:string,name=basename(path)):Promise<Entry|null> {
  try{const info=await stat(path);return {path,name,directory:info.isDirectory(),symlink:false,size:info.size,modified:info.mtimeMs,icon:entryIcon(name,info.isDirectory())};}catch{return null;}
}
export function virtualLocations(home:string) {
  const data=process.env.XDG_DATA_HOME || join(home,'.local/share');
  return async function list(uri:string):Promise<Entry[]> {
    if(uri==='recent:///') {
      // Use an XML parser, rather than treating escaped XBEL attributes as paths.
      const script='import sys,json,xml.etree.ElementTree as ET\ntry:\n root=ET.parse(sys.argv[1]).getroot()\n print(json.dumps([{ "url":b.get("href"),"modified":b.get("modified","") } for b in root.findall("bookmark")]))\nexcept FileNotFoundError:\n print("[]")';
      const {stdout}=await exec('python3',['-c',script,join(data,'recently-used.xbel')],{timeout:5000,maxBuffer:8*1024*1024});
      const records=JSON.parse(stdout) as Array<{url:string;modified:string}>;
      const result=await Promise.all(records.filter(record=>record.url?.startsWith('file://')).map(async record=>{
        try{const item=await entry(fileURLToPath(record.url));if(item)item.modified=Date.parse(record.modified)||item.modified;return item;}catch{return null;}
      }));
      return [...new Map(result.filter((item):item is Entry=>!!item).map(item=>[item.path,item])).values()].sort((a,b)=>b.modified-a.modified);
    }
    if(uri==='trash:///') {
      const roots=new Set([join(data,'Trash')]);
      for(const volume of await discoverDrives().catch(()=>[]))if(volume.mounted && volume.path!=='/') {
        roots.add(join(volume.path,`.Trash-${process.getuid?.()}`));
        roots.add(join(volume.path,'.Trash',String(process.getuid?.())));
      }
      const result:Entry[]=[];
      for(const root of roots) {
        let names:string[];try{names=await readdir(join(root,'files'));}catch{continue;}
        for(const name of names){
          let display=name;
          try{const text=await readFile(join(root,'info',name+'.trashinfo'),'utf8');const original=/^Path=(.*)$/m.exec(text)?.[1];if(original)display=basename(decodeURIComponent(original));}catch{}
          const item=await entry(join(root,'files',name),display);if(item)result.push(item);
        }
      }
      return result;
    }
    throw new Error('Local virtual desconhecido.');
  };
}
