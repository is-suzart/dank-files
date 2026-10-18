import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, symlink, lstat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { restoreTrash, emptyTrash, TrashBatchError, defaultTrashRoots } from '../src/infrastructure/trashActions.js';

/** An isolated XDG_DATA_HOME: every fixture trash lives here and the real user trash is never reachable. */
async function fixture(){
  const root=await mkdtemp(join(tmpdir(),'nandomo-trash-'));
  const data=join(root,'data');
  const trash=join(data,'Trash');
  await mkdir(join(trash,'files'),{recursive:true});await mkdir(join(trash,'info'),{recursive:true});
  return {root,trash,data};
}
async function trashed(trash:string,name:string,original:string,content='conteudo'){
  await writeFile(join(trash,'files',name),content);
  await writeFile(join(trash,'info',name+'.trashinfo'),`[Trash Info]\nPath=${original}\nDeletionDate=2026-10-17T12:00:00\n`);
  return join(trash,'files',name);
}

test('the default trash roots follow XDG_DATA_HOME and never an arbitrary numeric directory',()=>{
  const roots=defaultTrashRoots();
  assert.ok(roots.length>=1);
  assert.ok(roots[0]!.endsWith('/Trash'));
  assert.ok(!roots.some(root=>/^\d+$/.test(root))); // no bare "123" trash root
});

test('restore reads .trashinfo, restores the original path and keeps metadata when the destination is taken',async()=>{
  const {root,trash}=await fixture();
  try{
    const original=join(root,'documentos','relatorio.txt');
    const item=await trashed(trash,'relatorio.txt',encodeURIComponent(original),'relatorio');
    assert.deepEqual(await restoreTrash([item],[trash]),[original]);
    assert.equal(await readFile(original,'utf8'),'relatorio');
    await assert.rejects(lstat(item),{code:'ENOENT'});
    await assert.rejects(lstat(join(trash,'info','relatorio.txt.trashinfo')),{code:'ENOENT'});

    const clash=await trashed(trash,'relatorio.txt',encodeURIComponent(original),'versao nova');
    await mkdir(join(root,'documentos'),{recursive:true});await writeFile(original,'o que o usuario tinha');
    await assert.rejects(restoreTrash([clash],[trash]),(error:unknown)=>{assert.ok(error instanceof TrashBatchError);return true;});
    assert.equal(await readFile(original,'utf8'),'o que o usuario tinha'); // collision never overwrites
    assert.equal(await readFile(clash,'utf8'),'versao nova'); // the item stays in the trash
    assert.ok((await lstat(join(trash,'info','relatorio.txt.trashinfo'))).isFile()); // metadata retained on failure
  }finally{await rm(root,{recursive:true,force:true});}
});

test('a failing item does not stop the batch, and partial results are reported',async()=>{
  const {root,trash}=await fixture();
  try{
    const good=await trashed(trash,'bom.txt',encodeURIComponent(join(root,'bom.txt')),'bom');
    const other=await trashed(trash,'ruim.txt',encodeURIComponent(join(root,'ruim.txt')),'ruim');
    const broken=join(trash,'files','quebrado.txt');await writeFile(broken,'sem metadados');
    await assert.rejects(restoreTrash([good,broken,other],[trash]),(error:unknown)=>{
      assert.ok(error instanceof TrashBatchError);
      assert.deepEqual(error.restored,[join(root,'bom.txt'),join(root,'ruim.txt')]);
      assert.deepEqual(error.failed.map(item=>item.path),[broken]);
      assert.match(error.failed[0]!.reason,/Metadados da lixeira invalidos|Metadados da lixeira/);
      return true;
    });
    assert.equal(await readFile(join(root,'bom.txt'),'utf8'),'bom');
    assert.equal(await readFile(join(root,'ruim.txt'),'utf8'),'ruim');
    assert.ok((await lstat(broken)).isFile());
  }finally{await rm(root,{recursive:true,force:true});}
});

test('emptyTrash removes only the confirmed items and only inside the allowed trash root',async()=>{
  const {root,trash}=await fixture();
  try{
    const confirmed=await trashed(trash,'confirmado.txt',encodeURIComponent(join(root,'confirmado.txt')));
    const arrived=await trashed(trash,'novo.txt',encodeURIComponent(join(root,'novo.txt')));
    await emptyTrash([confirmed],[trash]);
    await assert.rejects(lstat(confirmed),{code:'ENOENT'});
    await assert.rejects(lstat(join(trash,'info','confirmado.txt.trashinfo')),{code:'ENOENT'});
    assert.ok((await lstat(arrived)).isFile()); // arrived after the snapshot: untouched
  }finally{await rm(root,{recursive:true,force:true});}

  const outsider=await mkdtemp(join(tmpdir(),'nandomo-outsider-'));
  try{
    await mkdir(join(outsider,'files'));await mkdir(join(outsider,'info'));
    await writeFile(join(outsider,'files','item.txt'),'nao e lixeira');
    await writeFile(join(outsider,'info','item.txt.trashinfo'),'Path=/tmp/nada.txt\n');
    await assert.rejects(emptyTrash([join(outsider,'files','item.txt')],[trash]),(error:unknown)=>{
      assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/fora da lixeira/);return true;
    });
    assert.ok((await lstat(join(outsider,'files','item.txt'))).isFile());
  }finally{await rm(outsider,{recursive:true,force:true});}

  const numeric=await mkdtemp(join(tmpdir(),'nandomo-numeric-'));
  try{
    await mkdir(join(numeric,'files'));await mkdir(join(numeric,'info'));
    await writeFile(join(numeric,'files','falso.txt'),'falso');
    await writeFile(join(numeric,'info','falso.txt.trashinfo'),'Path=/tmp/nada.txt\n');
    await assert.rejects(emptyTrash([join(numeric,'files','falso.txt')],[trash]),(error:unknown)=>{
      assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/fora da lixeira/);return true;
    });
    assert.ok((await lstat(join(numeric,'files','falso.txt'))).isFile()); // a directory named "123" is not a trash root
  }finally{await rm(numeric,{recursive:true,force:true});}
});

test('a symlinked trash root or files directory is refused',async()=>{
  const {root,data,trash}=await fixture();
  try{
    const outside=join(root,'storage');await mkdir(join(outside,'files'),{recursive:true});await mkdir(join(outside,'info'));
    await writeFile(join(outside,'files','falso.txt'),'falso');
    await writeFile(join(outside,'info','falso.txt.trashinfo'),`Path=${encodeURIComponent(join(root,'falso.txt'))}\n`);
    const linked=join(data,'LinkedTrash');await symlink(outside,linked);
    await assert.rejects(emptyTrash([join(linked,'files','falso.txt')],[trash]),(error:unknown)=>{
      assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/fora da lixeira/);return true;
    });
    assert.ok((await lstat(join(outside,'files','falso.txt'))).isFile());

    const linkedFiles=join(data,'LinkedFiles');await mkdir(linkedFiles);await symlink(join(outside,'files'),join(linkedFiles,'files'));
    await assert.rejects(restoreTrash([join(linkedFiles,'files','falso.txt')],[linkedFiles]),(error:unknown)=>{
      assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/fora da lixeira/);return true;
    });
    assert.ok((await lstat(join(outside,'files','falso.txt'))).isFile());
    assert.deepEqual(await readdir(linkedFiles),['files']);
  }finally{await rm(root,{recursive:true,force:true});}
});

test('a path in the trashinfo that points back into the trash or escapes the mount is refused',async()=>{
  const {root,trash}=await fixture();
  try{
    const loop=await trashed(trash,'loop.txt',encodeURIComponent(join(trash,'files','loop.txt')));
    await assert.rejects(restoreTrash([loop],[trash]),(error:unknown)=>{assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/Local original/);return true;});
    const escaping=await trashed(trash,'fuga.txt','../../fuga.txt');
    await assert.rejects(restoreTrash([escaping],[trash]),(error:unknown)=>{assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/Local original/);return true;});
    const broken=await trashed(trash,'quebrado.txt','%E0%A4%A');
    await assert.rejects(restoreTrash([broken],[trash]),(error:unknown)=>{assert.ok(error instanceof TrashBatchError);assert.match(error.failed[0]!.reason,/Local original/);return true;});
  }finally{await rm(root,{recursive:true,force:true});}
});
