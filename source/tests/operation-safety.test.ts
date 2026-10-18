import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, mkdir, writeFile, readFile, readdir, readlink, symlink, lstat, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { transferFile, renameMany, createArchive, extractArchive, withUndo } from '../src/infrastructure/fileOperations.js';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import type { FileSystem, TransferProgress } from '../src/application/ports.js';

const run=promisify(execFile);
const bsdtar=await run('bsdtar',['--version']).then(()=>true,()=>false);
const archiveSkip=bsdtar?false:'bsdtar não instalado';
const fixture=()=>mkdtemp(join(tmpdir(),'nandomo-op-'));
const leftovers=async(dir:string)=>(await readdir(dir)).filter(name=>name.startsWith('.nandomo-'));

test('a copy is staged atomically: directories, files and symlinks land whole, progress completes, nothing is left behind',async()=>{
  const root=await fixture();
  try{
    const source=join(root,'src'),target=join(root,'dest');await mkdir(source);await mkdir(target);
    await writeFile(join(source,'a.txt'),'alpha-alpha');await mkdir(join(source,'deep'));await writeFile(join(source,'deep','b.txt'),'beta-beta');
    await symlink('a.txt',join(source,'link'));
    const progress:TransferProgress[]=[];
    await transferFile(source,join(target,'copied'),'copy',{progress:value=>progress.push({...value})});
    assert.equal(await readFile(join(target,'copied','a.txt'),'utf8'),'alpha-alpha');
    assert.equal(await readFile(join(target,'copied','deep','b.txt'),'utf8'),'beta-beta');
    assert.equal(await readlink(join(target,'copied','link')),'a.txt');
    assert.ok(progress.length>=1);assert.equal(progress.at(-1)!.completed,progress.at(-1)!.total);assert.ok(progress.at(-1)!.total>=10);
    assert.deepEqual(await leftovers(target),[]);
    await assert.rejects(stat(join(root,'.nandomo-transfer-'))); // staging never survives
  }finally{await rm(root,{recursive:true,force:true});}
});

test('an aborted copy leaves no destination and no staging, and an existing destination is never replaced',async()=>{
  const root=await fixture();
  try{
    const source=join(root,'big.txt'),target=join(root,'dest.txt');
    await writeFile(source,Buffer.alloc(4*1024*1024,7));
    const abort=new AbortController();let chunks=0;
    await assert.rejects(transferFile(source,target,'copy',{signal:abort.signal,progress:({completed})=>{if(chunks++===0)abort.abort();}}),{name:'AbortError'});
    await assert.rejects(lstat(target),{code:'ENOENT'});
    assert.deepEqual(await leftovers(root),[]);
    await writeFile(target,'preserved');
    await assert.rejects(transferFile(source,target,'copy'));
    assert.equal(await readFile(target,'utf8'),'preserved');
    assert.deepEqual(await leftovers(root),[]);
  }finally{await rm(root,{recursive:true,force:true});}
});

test('a directory cannot be transferred into itself and a source mutated during the copy is refused',async()=>{
  const root=await fixture();
  try{
    const source=join(root,'src');await mkdir(join(source,'inner'),{recursive:true});
    await assert.rejects(transferFile(source,join(source,'inner','child'),'copy'),/pasta para dentro dela mesma/);
    await assert.rejects(transferFile(source,join(source,'inner','child'),'move'),/pasta para dentro dela mesma/);
    await writeFile(join(source,'a.txt'),'before');await writeFile(join(source,'payload.bin'),Buffer.alloc(2*1024*1024,1));
    const target=join(root,'target');
    let mutated=false;
    await assert.rejects(transferFile(source,target,'copy',{progress:({completed})=>{
      if(!completed||mutated)return;mutated=true;void writeFile(join(source,'a.txt'),'changed while copying');
    }}),/A origem mudou/);
    await assert.rejects(lstat(target),{code:'ENOENT'}); // refused copy publishes nothing
    assert.equal(await readFile(join(source,'a.txt'),'utf8'),'changed while copying'); // and preserves the source
    assert.deepEqual(await leftovers(root),[]);
  }finally{await rm(root,{recursive:true,force:true});}
});

test('a same-filesystem move renames the item and undo refuses a changed destination or a conflict',async()=>{
  const root=await fixture();
  try{
    const source=join(root,'note.txt'),destination=join(root,'renamed.txt');await writeFile(source,'note');
    await transferFile(source,destination,'move');
    await assert.rejects(lstat(source),{code:'ENOENT'});assert.equal(await readFile(destination,'utf8'),'note');

    const trashed:string[]=[];
    const fake:FileSystem={...nodeFiles,trash:async path=>{trashed.push(path);await rm(path,{recursive:true,force:true});}};
    const undoable=withUndo(fake);
    const copy=join(root,'copy.txt');
    await writeFile(source,'note'); // the move above consumed it
    await undoable.transfer!(source,copy,'copy');
    assert.equal(undoable.canUndo!(),true);
    assert.equal(await readFile(copy,'utf8'),'note');
    await undoable.undo!();
    assert.deepEqual(trashed,[copy]); // undo of a copy goes to the injected fake trash, never to the OS trash
    await assert.rejects(lstat(copy),{code:'ENOENT'});

    const edited=join(root,'edited.txt');
    await undoable.transfer!(source,edited,'copy');
    await writeFile(edited,'edited by the user');
    await assert.rejects(undoable.undo!(),/mudou desde a operação/); // destination changed: nothing is undone
    assert.equal(await readFile(edited,'utf8'),'edited by the user');
    assert.deepEqual(trashed,[copy]);

    const busy=withUndo({...fake,trash:async()=>{throw new Error('Lixeira ocupada.');}});
    await busy.transfer!(source,join(root,'busy.txt'),'copy');
    await assert.rejects(busy.undo!(),/Lixeira ocupada/); // conflict surfaces instead of a silent success
  }finally{await rm(root,{recursive:true,force:true});}
});

test('batch rename preflights every destination and rolls back what it already moved',async()=>{
  const root=await fixture();
  try{
    const first=join(root,'a.txt'),taken=join(root,'taken.txt');await writeFile(first,'alpha');await writeFile(taken,'kept');
    const other=join(root,'other.txt');await writeFile(other,'other');
    await assert.rejects(renameMany([{source:first,destination:join(root,'b.txt')},{source:other,destination:taken}]),/Já existe/);
    await assert.rejects(lstat(join(root,'b.txt')),{code:'ENOENT'}); // preflight moves nothing
    await assert.rejects(renameMany([{source:first,destination:join(root,'b.txt')},{source:first,destination:join(root,'b.txt')}]),/não podem ser repetidos/);
    await writeFile(join(root,'blocked'),'a file, not a directory');
    await assert.rejects(renameMany([{source:first,destination:join(root,'b.txt')},{source:join(root,'blocked','child.txt'),destination:join(root,'c.txt')}]));
    assert.equal(await readFile(first,'utf8'),'alpha'); // rolled back
    await assert.rejects(lstat(join(root,'b.txt')),{code:'ENOENT'});
    assert.equal(await readFile(taken,'utf8'),'kept');
  }finally{await rm(root,{recursive:true,force:true});}
});

test('zip and tar roundtrip, and an archive whose symlink escapes the destination is refused',{skip:archiveSkip},async()=>{
  const root=await fixture();
  try{
    const items=join(root,'items'),outside=join(root,'outside');await mkdir(items);await mkdir(outside);
    await writeFile(join(items,'one.txt'),'one');await writeFile(join(items,'two.txt'),'two');
    for(const [name,target] of [['bundle.zip','zip'],['bundle.tar.gz','tar']] as const){
      await createArchive([join(items,'one.txt'),join(items,'two.txt')],join(root,name));
      const out=join(root,'out-'+target);await mkdir(out);
      await extractArchive(join(root,name),join(out,'restored'));
      assert.equal(await readFile(join(out,'restored','one.txt'),'utf8'),'one');
      assert.equal(await readFile(join(out,'restored','two.txt'),'utf8'),'two');
      assert.deepEqual(await leftovers(out),[]);
    }
    await symlink(outside,join(items,'escape'));
    await symlink('../../outside',join(items,'relative-escape'));
    for(const name of ['escapes.zip','escapes.tar.gz']){
      await createArchive([join(items,'escape'),join(items,'relative-escape')],join(root,name));
      const out=join(root,'out-'+name);await mkdir(out);
      await assert.rejects(extractArchive(join(root,name),join(out,'restored')),/aponta para fora do destino/);
      await assert.rejects(lstat(join(out,'restored')),{code:'ENOENT'}); // nothing published
      assert.deepEqual(await readdir(outside),[]); // and nothing written outside
      assert.deepEqual(await leftovers(out),[]);
    }
  }finally{await rm(root,{recursive:true,force:true});}
});
