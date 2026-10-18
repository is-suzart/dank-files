import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, chmod, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { searchFiles, SEARCH_RESULT_LIMIT } from '../src/infrastructure/search.js';

const fixture=()=>mkdtemp(join(tmpdir(),'nandomo-search-'));
const names=(entries:{path:string}[])=>entries.map(entry=>entry.path).sort();

test('search honours hidden entries, recurses and matches case-insensitively',async()=>{
  const root=await fixture();
  try{
    await mkdir(join(root,'pasta'));await mkdir(join(root,'.oculto'));await mkdir(join(root,'pasta','interno'));
    await writeFile(join(root,'Relatorio.TXT'),'x');await writeFile(join(root,'.oculto','segredo.txt'),'x');
    await writeFile(join(root,'pasta','interno','alvo.txt'),'x');await writeFile(join(root,'pasta','ignorado.md'),'x');
    assert.deepEqual(names(await searchFiles(root,'alvo')),[join(root,'pasta','interno','alvo.txt')]);
    assert.deepEqual(names(await searchFiles(root,'RELATORIO')),[join(root,'Relatorio.TXT')]);
    assert.deepEqual(names(await searchFiles(root,'segredo')),[]);
    assert.deepEqual(names(await searchFiles(root,'segredo',{hidden:true})),[join(root,'.oculto','segredo.txt')]);
    const entries=await searchFiles(root,'alvo',{hidden:true});
    assert.equal(entries[0]!.directory,false);assert.equal(entries[0]!.symlink,false);assert.ok(entries[0]!.icon);
    assert.deepEqual(names(await searchFiles(root,'')),[join(root,'Relatorio.TXT'),join(root,'pasta'),join(root,'pasta','ignorado.md'),join(root,'pasta','interno'),join(root,'pasta','interno','alvo.txt')].sort());
  }finally{await rm(root,{recursive:true,force:true});}
});

test('search aborts on demand and never recurses through symlinks',async()=>{
  const root=await fixture();
  try{
    const outside=await fixture();
    try{
      await writeFile(join(outside,'falso.txt'),'x');
      await symlink(outside,join(root,'ligada'));await symlink(join(outside,'falso.txt'),join(root,'atalho.txt'));
      assert.deepEqual(names(await searchFiles(root,'atalho')),[join(root,'atalho.txt')]); // listed as a link, never followed
      assert.equal((await searchFiles(root,'atalho'))[0]!.symlink,true);
      assert.deepEqual(names(await searchFiles(root,'falso')),[]); // "ligada" is a symlink: its target is never walked
      const abort=new AbortController();abort.abort();
      await assert.rejects(searchFiles(root,'x',{signal:abort.signal}),{name:'AbortError'});
      let checks=0;
      const midway={get aborted(){return false;},throwIfAborted(){if(++checks>=3)throw new DOMException('abort','AbortError');}} as unknown as AbortSignal;
      await assert.rejects(searchFiles(root,'x',{signal:midway}),{name:'AbortError'});
    }finally{await rm(outside,{recursive:true,force:true});}
  }finally{await rm(root,{recursive:true,force:true});}
});

test('a failing root rejects',async()=>{
  const root=await fixture();
  try{
    await assert.rejects(searchFiles(join(root,'nao-existe'),'x'),{code:'ENOENT'});
  }finally{await rm(root,{recursive:true,force:true});}
});

test('an unreadable nested directory is skipped, not fatal',{skip:process.getuid?.()===0?'root ignores permission bits':false},async()=>{
  const root=await fixture();
  try{
    await writeFile(join(root,'visivel.txt'),'x');
    const locked=join(root,'travado');await mkdir(locked);await writeFile(join(locked,'escondido.txt'),'x');
    await chmod(locked,0o000);
    try{
      assert.deepEqual(names(await searchFiles(root,'escondido')),[]); // permission failure skips only its own directory
      assert.deepEqual(names(await searchFiles(root,'visivel')),[join(root,'visivel.txt')]);
    }finally{await chmod(locked,0o755);}
  }finally{await rm(root,{recursive:true,force:true});}
});

test('search caps results at the explicit limit',async()=>{
  const root=await fixture();
  try{
    const many=join(root,'muitos');await mkdir(many);
    const files=Array.from({length:SEARCH_RESULT_LIMIT+50},(_unused,index)=>join(many,`item-${String(index).padStart(5,'0')}.txt`));
    for(let index=0;index<files.length;index+=200)await Promise.all(files.slice(index,index+200).map(path=>writeFile(path,'x')));
    const results=await searchFiles(root,'item-');
    assert.equal(results.length,SEARCH_RESULT_LIMIT);
  }finally{await rm(root,{recursive:true,force:true});}
});
