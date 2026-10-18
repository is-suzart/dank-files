import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, symlink, lstat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import { createFileManager } from '../src/application/createFileManager.js';
import { validateName } from '../src/domain/fileActions.js';

test('creating and renaming preserve conflicts, directory contents and symbolic links',async()=>{
  const root=await mkdtemp(join(tmpdir(),'nandomo-actions-'));
  try {
    const source=join(root,'source.txt'),destination=join(root,'existing.txt');
    await writeFile(source,'source');await writeFile(destination,'existing');
    await assert.rejects(nodeFiles.create(destination,'file'));
    await assert.rejects(nodeFiles.rename(source,destination));
    assert.equal(await readFile(source,'utf8'),'source');assert.equal(await readFile(destination,'utf8'),'existing');
    await nodeFiles.create(join(root,'folder'),'folder');
    await mkdir(join(root,'occupied'));await writeFile(join(root,'folder','child'),'preserved');
    await assert.rejects(nodeFiles.rename(join(root,'folder'),join(root,'occupied')));
    assert.equal(await readFile(join(root,'folder','child'),'utf8'),'preserved');
    await nodeFiles.rename(source,join(root,'new # name.txt'));
    assert.equal(await readFile(join(root,'new # name.txt'),'utf8'),'source');
    await symlink(join(root,'folder'),join(root,'link'));
    await nodeFiles.rename(join(root,'link'),join(root,'renamed-link'));
    assert.equal((await lstat(join(root,'renamed-link'))).isSymbolicLink(),true);
  } finally {await rm(root,{recursive:true,force:true});}
});
test('application keeps failed edits open, validates names, and selects the successfully created item',async()=>{
  const root=await mkdtemp(join(tmpdir(),'nandomo-actions-model-'));
  const manager=createFileManager(root,{files:nodeFiles,locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}}});
  try {
    await writeFile(join(root,'existing.txt'),'untouched');await manager.initialize();
    manager.requestCreate('file');assert.equal(await manager.submitEdit('../escape'),false);
    assert.ok(manager.editRequest());
    assert.equal(await manager.submitEdit('existing.txt'),false);assert.ok(manager.editRequest());
    assert.equal(await manager.submitEdit('new.txt'),true);assert.equal(manager.editRequest(),null);
    assert.equal(manager.selected()?.name,'new.txt');
    manager.requestRename();assert.equal(await manager.submitEdit('existing.txt'),false);
    assert.equal(await readFile(join(root,'existing.txt'),'utf8'),'untouched');
    assert.equal(await manager.submitEdit('renamed.txt'),true);assert.equal(manager.selected()?.name,'renamed.txt');
    manager.select(null);assert.equal(manager.snapshot().selected,null);
    for(const name of ['','..','.','a/b','a\\b','a\0b'])assert.throws(()=>validateName(name));
  } finally {manager.dispose();await rm(root,{recursive:true,force:true});}
});
