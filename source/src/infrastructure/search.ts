import { readdir,lstat } from 'node:fs/promises';
import { join } from 'node:path';
import type { Entry } from '../domain/files.js';
import { entryIcon } from './filesystem.js';
export const SEARCH_RESULT_LIMIT=10000;
export async function searchFiles(root:string,query:string,options:{signal?:AbortSignal;hidden?:boolean}={}):Promise<Entry[]> {
  const result:Entry[]=[],wanted=query.toLowerCase(); // case folding, not locale rules, so "I" matches "i" everywhere
  async function visit(path:string,first=false):Promise<void> {
    options.signal?.throwIfAborted();
    const children=await readdir(path,{withFileTypes:true}).catch(error=>{if(first)throw error;return [];});
    for(const child of children) {
      options.signal?.throwIfAborted();if(result.length>=SEARCH_RESULT_LIMIT)return;
      if(!options.hidden && child.name.startsWith('.'))continue;
      const target=join(path,child.name);
      if(child.name.toLowerCase().includes(wanted))try{const info=await lstat(target);result.push({path:target,name:child.name,directory:info.isDirectory(),symlink:info.isSymbolicLink(),size:info.size,modified:info.mtimeMs,icon:entryIcon(child.name,info.isDirectory())});}catch{}
      if(child.isDirectory())await visit(target); // withFileTypes never reports a symlink as a directory, so links are not followed
    }
  }
  await visit(root,true);return result;
}
