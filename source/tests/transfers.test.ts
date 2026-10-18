import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, lstat, symlink, readlink, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import { createFileManager } from '../src/application/createFileManager.js';
import { uriList } from '../src/domain/dragPayload.js';

test('a multi-selection drag offers one URI per entry, without repetition',async()=>{
  const root=await mkdtemp('/tmp/nandomo-drag-payload-');
  try{
    await writeFile(join(root,'one file.txt'),'1');
    await writeFile(join(root,'two.txt'),'2');
    const manager=createFileManager(root,{files:nodeFiles,locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}});
    await manager.initialize();
    manager.select(join(root,'one file.txt'));
    manager.selectPath(join(root,'two.txt'),'toggle');
    const snapshot=manager.snapshot();
    assert.deepEqual(snapshot.selectionUris,[nodeFiles.url(join(root,'one file.txt')),nodeFiles.url(join(root,'two.txt'))]);
    assert.ok(snapshot.selectionUris.every(url=>url.startsWith('file://')));
    assert.ok(snapshot.selectionUris[0]!.includes('%20'));
    // The same entry twice never turns into two transfers.
    assert.deepEqual(uriList([join(root,'two.txt'),join(root,'two.txt')],nodeFiles.url),[nodeFiles.url(join(root,'two.txt'))]);
    assert.deepEqual(uriList(['',join(root)],nodeFiles.url),[nodeFiles.url(join(root))]);
    manager.select(null);
    assert.deepEqual(manager.snapshot().selectionUris,[]);
    manager.dispose();
  }finally{await rm(root,{recursive:true,force:true});}
});

test('copy and move preserve conflicts, symbolic links and source files; recursive self-copy is rejected',async()=>{
  const root=await mkdtemp('/tmp/nandomo-transfers-');
  try {
    await mkdir(join(root,'src'));await mkdir(join(root,'dest'));
    await writeFile(join(root,'src','file.txt'),'source');await symlink('file.txt',join(root,'src','link'));
    await nodeFiles.transfer!(join(root,'src'),join(root,'dest','copied'),'copy');
    assert.equal(await readFile(join(root,'dest','copied','file.txt'),'utf8'),'source');
    assert.equal(await readlink(join(root,'dest','copied','link')),'file.txt');
    await assert.rejects(nodeFiles.transfer!(join(root,'src'),join(root,'dest','copied'),'copy'));
    await assert.rejects(nodeFiles.transfer!(join(root,'src'),join(root,'src','child'),'copy'));
    await assert.rejects(nodeFiles.transfer!(join(root,'src'),join(root,'dest','copied'),'move'));
    assert.equal((await lstat(join(root,'src'))).isDirectory(),true);
    await nodeFiles.transfer!(join(root,'src'),join(root,'dest','moved'),'move');
    await assert.rejects(lstat(join(root,'src')),{code:'ENOENT'});
    assert.equal(await readFile(join(root,'dest','moved','file.txt'),'utf8'),'source');
  }finally{await rm(root,{recursive:true,force:true});}
});

test('application clipboard supports copy/paste and cut/paste across directories and keeps failed transfers recoverable',async()=>{
  const root=await mkdtemp('/tmp/nandomo-clipboard-');
  const manager=createFileManager(root,{files:nodeFiles,locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}});
  try {
    await mkdir(join(root,'dest'));await writeFile(join(root,'file.txt'),'preserve');
    await manager.initialize(root);manager.select(join(root,'file.txt'));manager.copy();
    await manager.navigate(join(root,'dest'));manager.paste();
    async function settled(){for(let tick=0;tick<100 && manager.mutating();tick++)await new Promise(r=>setTimeout(r,5));assert.equal(manager.mutating(),false);}
    await settled();assert.equal(await readFile(join(root,'dest','file.txt'),'utf8'),'preserve');
    manager.paste();await settled();assert.ok(manager.error());assert.ok(manager.conflict());assert.equal(manager.editRequest(),null);manager.cancelConflict();
    manager.select(join(root,'dest','file.txt'));manager.cut();await manager.navigate(root);manager.paste();await settled();
    assert.ok(manager.error());assert.ok(manager.snapshot().clipboard);manager.cancelEdit();
    manager.requestTransfer('move');assert.equal(await manager.submitEdit(join(root,'dest')),false);
    assert.equal(await readFile(join(root,'file.txt'),'utf8'),'preserve');
  }finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});

test('dropped file URLs preserve spaces and reject unsupported protocols and conflicts',async()=>{
  const root=await mkdtemp('/tmp/nandomo-dropped-');
  const manager=createFileManager(root,{files:nodeFiles,locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}});
  try {
    const source=join(root,'image #.txt'),folder=join(root,'Target');
    await mkdir(folder);await writeFile(source,'safe');await manager.initialize(root);
    assert.equal(await manager.dropFiles([nodeFiles.url(source)],folder,'copy'),true);
    assert.equal(await readFile(join(folder,'image #.txt'),'utf8'),'safe');
    assert.equal(await manager.dropFiles([nodeFiles.url(source)],folder,'move'),false);
    assert.equal(await readFile(source,'utf8'),'safe');
    assert.equal(await manager.dropFiles(['https://example.com/file'],folder,'copy'),false);
  }finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});

for(const mode of ['copy','move','picker'] as const)test(`${mode}: an in-flight transfer keeps progress and cancel available without the destination modal`,async()=>{
  const {effect}=await import('@nandomo/core');
  const root=await mkdtemp('/tmp/nandomo-paste-modal-');
  let release!:()=>void;
  const gate=new Promise<void>(resolve=>{release=resolve;});
  let started!:()=>void;
  const entered=new Promise<void>(resolve=>{started=resolve;});
  const manager=createFileManager(root,{files:{...nodeFiles,watch:undefined,async transfer(source,destination,kind,options){
    assert.equal(manager.canCancelTransfer(),true,'preparing a transfer must already be cancellable');
    assert.equal(manager.snapshot().canCancelTransfer,true);
    options?.progress?.({completed:1,total:10});started();await gate;
    await nodeFiles.transfer!(source,destination,kind,options);
  }},locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}});
  const seen:unknown[]=[];const stop=effect(()=>{seen.push(manager.editRequest());});
  let running:Promise<unknown>|undefined;
  try {
    await mkdir(join(root,'dest'));await writeFile(join(root,'file.txt'),'preserved');await manager.initialize();manager.select(join(root,'file.txt'));
    if(mode==='picker'){
      manager.requestTransfer('copy');await manager.browseDestination(join(root,'dest'));
      assert.ok(manager.editRequest());running=manager.confirmDestination();
    }else{
      if(mode==='copy')manager.copy();else manager.cut();
      await manager.navigate(join(root,'dest'));running=manager.paste();
    }
    await entered;
    assert.equal(manager.editRequest(),null);
    if(mode!=='picker')assert.ok(seen.every(request=>request===null),'paste must never request a destination dialog, even transiently');
    assert.equal(manager.mutating(),true);assert.equal(manager.canCancelTransfer(),true);
    assert.match(manager.snapshot().transferStatus,/10%$/);
    release();await running;assert.equal(await readFile(join(root,'dest/file.txt'),'utf8'),'preserved');
    assert.equal(manager.editRequest(),null);
    if(mode==='move')await assert.rejects(lstat(join(root,'file.txt')),{code:'ENOENT'});
    else assert.equal(await readFile(join(root,'file.txt'),'utf8'),'preserved');
  }finally{release();await running;stop.dispose();manager.dispose();await rm(root,{recursive:true,force:true});}
});
