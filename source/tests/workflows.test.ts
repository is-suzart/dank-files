import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,mkdir,writeFile,readFile,rm,readdir,stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createFileManager } from '../src/application/createFileManager.js';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import { restoreTrash,emptyTrash } from '../src/infrastructure/trashActions.js';
import type { FileManagerServices } from '../src/application/ports.js';
const wait=()=>new Promise(resolve=>setTimeout(resolve,350));
function adapters(root:string):FileManagerServices{return {files:{...nodeFiles,videoThumbnail:undefined,watch:undefined},locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}};}

test('filter, recursive search, selection and navigation work together',async()=>{
 const root=await mkdtemp(join(tmpdir(),'nandomo-search-flow-'));const manager=createFileManager(root,adapters(root));
 try{
  await mkdir(join(root,'nested'));await writeFile(join(root,'match.txt'),'a');await writeFile(join(root,'nested/match-too.txt'),'b');
  await manager.initialize();manager.setSearch('match');assert.equal(manager.snapshot().entries.length,1);
  manager.setSearchRecursive(true);await wait();assert.equal(manager.snapshot().entries.length,2);
  manager.select(join(root,'nested/match-too.txt'));assert.equal(manager.selected()?.name,'match-too.txt');
  await manager.navigate(join(root,'nested'));assert.equal(manager.searchText(),'');
 }finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});
test('native file clipboard can paste an external selection without an earlier internal copy',async()=>{
 const root=await mkdtemp(join(tmpdir(),'nandomo-clipboard-flow-'));const service=adapters(root);
 await mkdir(join(root,'target'));await writeFile(join(root,'source.txt'),'clipboard');
 service.desktop.readFileClipboard=async()=>({urls:[nodeFiles.url(join(root,'source.txt'))],mode:'copy'});
 const manager=createFileManager(root,service);
 try {await manager.initialize(join(root,'target'));manager.setExternalClipboardAvailable(true);assert.equal(manager.canPaste(),true);await manager.paste();assert.equal(await readFile(join(root,'target/source.txt'),'utf8'),'clipboard');}
 finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});
test('filesystem events refresh the active listing and disposal closes its watcher',async()=>{
 const root=await mkdtemp(join(tmpdir(),'nandomo-watch-flow-'));const service=adapters(root);let changed=()=>{},closed=0;
 service.files.watch=(_path,callback)=>{changed=callback;return()=>{closed++;};};
 const manager=createFileManager(root,service);
 try {await manager.initialize();await writeFile(join(root,'new.txt'),'event');changed();await wait();assert.equal(manager.snapshot().entries.some(item=>item.name==='new.txt'),true);}
 finally{manager.dispose();assert.ok(closed>0);await rm(root,{recursive:true,force:true});}
});
test('restore is available in trash and conflicts preserve both the item and metadata',async()=>{
 const root=await mkdtemp(join(tmpdir(),'nandomo-trash-flow-'));const originalData=process.env.XDG_DATA_HOME;process.env.XDG_DATA_HOME=root;
 const trash=join(root,'Trash');await mkdir(join(trash,'files'),{recursive:true});await mkdir(join(trash,'info'));
 const source=join(trash,'files/item.txt'),destination=join(root,'original/item.txt');
 await writeFile(source,'trashed');await writeFile(join(trash,'info/item.txt.trashinfo'),'[Trash Info]\nPath='+encodeURI(destination)+'\n');
 const service=adapters(root);service.desktop.restoreTrash=restoreTrash;service.desktop.emptyTrash=emptyTrash;
 service.desktop.virtualEntries=async()=>Promise.all((await readdir(join(trash,'files'))).map(async name=>({name,path:join(trash,'files',name),directory:false,symlink:false,size:0,modified:0,icon:'text'})));
 const manager=createFileManager(root,service);
 try{
  await manager.initialize();await manager.special('trash:///');manager.select(source);await manager.restoreSelected();assert.equal(await readFile(destination,'utf8'),'trashed');assert.equal(manager.snapshot().entries.length,0);
  await writeFile(source,'second');await writeFile(join(trash,'info/item.txt.trashinfo'),'[Trash Info]\nPath='+encodeURI(destination)+'\n');await manager.refresh();manager.select(source);await manager.restoreSelected();assert.ok(manager.error());assert.equal(await readFile(source,'utf8'),'second');assert.equal(await readFile(destination,'utf8'),'trashed');await stat(join(trash,'info/item.txt.trashinfo'));
 }finally{manager.dispose();if(originalData===undefined)delete process.env.XDG_DATA_HOME;else process.env.XDG_DATA_HOME=originalData;await rm(root,{recursive:true,force:true});}
});
