import { readFile,mkdir,writeFile,rename,stat } from 'node:fs/promises';
import { join,dirname } from 'node:path';
import { pathToFileURL,fileURLToPath } from 'node:url';
import { discoverPlaces } from './filesystem.js';
let pending=Promise.resolve();
export function updateBookmark(home:string,path:string,remove=false){
  pending=pending.catch(()=>{}).then(async()=>{
    if(!remove && !(await stat(path)).isDirectory())throw new Error('Escolha uma pasta.');
    const config=process.env.XDG_CONFIG_HOME || join(home,'.config');let target=join(config,'gtk-3.0/bookmarks');let contents:string;
    try{contents=await readFile(target,'utf8');}catch{
      try{target=join(home,'.gtk-bookmarks');contents=await readFile(target,'utf8');}catch{
        target=join(config,'gtk-3.0/bookmarks');contents=(await discoverPlaces(home)).map(place=>pathToFileURL(place.path).href+' '+place.name).join('\n');
      }
    }
    const lines=contents.split('\n').filter(line=>{if(!line)return false;try{return fileURLToPath(line.split(/\s/)[0]!)!==path;}catch{return true;}});
    if(!remove)lines.push(pathToFileURL(path).href);
    await mkdir(dirname(target),{recursive:true});const temp=target+`.${process.pid}.tmp`;await writeFile(temp,lines.join('\n')+'\n');await rename(temp,target);
  });return pending;
}
