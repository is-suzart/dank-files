import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,mkdir,writeFile,readFile,rm,lstat } from 'node:fs/promises';
import { join } from 'node:path';
import { createFileManager } from '../src/application/createFileManager.js';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import { virtualLocations } from '../src/infrastructure/virtualLocations.js';
const desktop={theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}};
const locations={volumes:async()=>[],games:async()=>[]};
test('destination navigation stays independent and copies to the chosen folder',async()=>{
  const root=await mkdtemp('/tmp/nandomo-picker-');const manager=createFileManager(root,{files:nodeFiles,locations,desktop});
  try{
    await mkdir(join(root,'Destination'));await writeFile(join(root,'source.txt'),'content');await manager.initialize();
    manager.select(join(root,'source.txt'));manager.requestTransfer('copy');
    await manager.browseDestination(join(root,'Destination'));
    assert.equal(manager.path(),root);assert.equal(manager.destinationPath(),join(root,'Destination'));
    assert.equal(await manager.confirmDestination(),true);
    assert.equal(await readFile(join(root,'Destination/source.txt'),'utf8'),'content');
  }finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});
test('drag collisions pause without losing sources, allow rename and explicit replace',async()=>{
  const root=await mkdtemp('/tmp/nandomo-conflicts-');const manager=createFileManager(root,{files:nodeFiles,locations,desktop});
  try{
    await mkdir(join(root,'Dest'));await writeFile(join(root,'a.txt'),'new');await writeFile(join(root,'Dest/a.txt'),'old');await manager.initialize();
    assert.equal(await manager.dropFiles([nodeFiles.url(join(root,'a.txt'))],join(root,'Dest'),'move'),false);
    assert.ok(manager.conflict());assert.equal(manager.mutating(),false);
    assert.equal(await readFile(join(root,'Dest/a.txt'),'utf8'),'old');
    await manager.resolveConflict('rename','b.txt');
    assert.equal(await readFile(join(root,'Dest/b.txt'),'utf8'),'new');await assert.rejects(lstat(join(root,'a.txt')),{code:'ENOENT'});
    await writeFile(join(root,'a.txt'),'replacement');
    await manager.dropFiles([nodeFiles.url(join(root,'a.txt'))],join(root,'Dest'),'copy');await manager.resolveConflict('replace');
    assert.equal(await readFile(join(root,'Dest/a.txt'),'utf8'),'replacement');assert.equal(manager.conflict(),null);
    await writeFile(join(root,'later.txt'),'next item');
    await manager.dropFiles([nodeFiles.url(join(root,'a.txt')),nodeFiles.url(join(root,'later.txt'))],join(root,'Dest'),'copy');
    await manager.resolveConflict('skip');
    assert.equal(await readFile(join(root,'Dest/later.txt'),'utf8'),'next item');
    assert.equal(await readFile(join(root,'Dest/a.txt'),'utf8'),'replacement');
    await mkdir(join(root,'Folder'));await mkdir(join(root,'Dest/Folder'));
    await manager.dropFiles([nodeFiles.url(join(root,'Folder'))],join(root,'Dest'),'move');await manager.resolveConflict('replace');
    assert.ok(manager.conflict());assert.equal((await lstat(join(root,'Folder'))).isDirectory(),true);
  }finally{manager.dispose();await rm(root,{recursive:true,force:true});}
});
test('virtual locations stay in-app, participate in history and launch only listed applications',async()=>{
  let launched='';let external=0;
  const manager=createFileManager('/home/test',{files:{...nodeFiles,list:async()=>[]},locations,desktop:{...desktop,special:async()=>{external++;},virtualEntries:async()=>[],applications:async()=>[{id:'/apps/test.desktop',name:'Test'}],launch:async id=>{launched=id;}}});
  try{
    await manager.initialize();await manager.special('trash:///');assert.equal(manager.path(),'trash:///');assert.equal(external,0);
    await manager.special('recent:///');await manager.back();assert.equal(manager.path(),'trash:///');
    await manager.showApplications();assert.equal(manager.visibleEntries()[0]?.name,'Test');assert.equal(manager.visibleEntries()[0]?.icon,'package-x-generic');await manager.open('/apps/test.desktop');assert.equal(launched,'/apps/test.desktop');
    await manager.open('/apps/unknown.desktop');assert.ok(manager.error());assert.equal(launched,'/apps/test.desktop');
  }finally{manager.dispose();}
});
test('trash reads original display names without changing trash contents',async()=>{
  const root=await mkdtemp('/tmp/nandomo-trash-');const prior=process.env.XDG_DATA_HOME;
  try{
    process.env.XDG_DATA_HOME=root;await mkdir(join(root,'Trash/files'),{recursive:true});await mkdir(join(root,'Trash/info'));
    await writeFile(join(root,'Trash/files/name.2'),'keep');await writeFile(join(root,'Trash/info/name.2.trashinfo'),'[Trash Info]\nPath=/home/test/Original%20Name.txt\nDeletionDate=2026-10-12T12:00:00\n');
    const result=await virtualLocations(root)('trash:///');assert.equal(result.find(item=>item.path===join(root,'Trash/files/name.2'))?.name,'Original Name.txt');
    assert.equal(await readFile(join(root,'Trash/files/name.2'),'utf8'),'keep');
  }finally{if(prior===undefined)delete process.env.XDG_DATA_HOME;else process.env.XDG_DATA_HOME=prior;await rm(root,{recursive:true,force:true});}
});

test('recent files decode XML entities and file URIs, skipping missing and remote items',async()=>{
  const root=await mkdtemp('/tmp/nandomo-recents-');const prior=process.env.XDG_DATA_HOME;
  try{
    process.env.XDG_DATA_HOME=root;const path=join(root,'image & photo.txt');await writeFile(path,'read');
    const url=nodeFiles.url(path).replaceAll('&','&amp;');
    await writeFile(join(root,'recently-used.xbel'),`<xbel><bookmark href="${url}" modified="2026-10-12T10:00:00Z"/><bookmark href="file:///missing-nandomo-test-file"/><bookmark href="https://example.com/remote"/></xbel>`);
    const result=await virtualLocations(root)('recent:///');assert.equal(result.length,1);assert.equal(result[0]!.path,path);
  }finally{if(prior===undefined)delete process.env.XDG_DATA_HOME;else process.env.XDG_DATA_HOME=prior;await rm(root,{recursive:true,force:true});}
});

test('folder appearances survive restart and ignore unsupported values',async()=>{
  const {desktopActions}=await import('../src/infrastructure/desktopActions.js');
  const root=await mkdtemp('/tmp/nandomo-folder-styles-');const prior=process.env.NANDOMO_FM_CONFIG_DIR;
  try{
    process.env.NANDOMO_FM_CONFIG_DIR=join(root,'config');await mkdir(join(root,'Folder'));
    const actions=desktopActions(root);const manager=createFileManager(root,{files:nodeFiles,locations,desktop:{...desktop,...actions}});
    await manager.initialize();manager.select(join(root,'Folder'));manager.customizeFolder();
    await manager.saveFolderAppearance({color:'#448aff',emblem:'emblem-favorite',icon:'javascript:invalid'});
    assert.equal(manager.appearanceOpen(),false);assert.equal(manager.visibleEntries().find(item=>item.directory)?.folderColor,'#448aff');manager.dispose();
    const restored=await desktopActions(root).readFolderAppearances();assert.deepEqual(restored[join(root,'Folder')],{color:'#448aff',emblem:'emblem-favorite'});
  }finally{if(prior===undefined)delete process.env.NANDOMO_FM_CONFIG_DIR;else process.env.NANDOMO_FM_CONFIG_DIR=prior;await rm(root,{recursive:true,force:true});}
});

test('remote preview policy follows the longest mount, including escaped paths',async()=>{
  const {isRemoteMount}=await import('../src/infrastructure/mountPolicy.js');
  const mounts='1 0 8:1 / / rw - ext4 /dev/root rw\n2 1 0:2 / /home/user/GoogleDrive rw - fuse.rclone gdrive: rw\n3 2 8:2 / /home/user/GoogleDrive/local rw - xfs /dev/data rw\n4 1 0:3 / /Cloud\\040Drive rw - nfs server:/share rw';
  assert.equal(isRemoteMount('/home/user/GoogleDrive/file.pdf',mounts),true);
  assert.equal(isRemoteMount('/home/user/GoogleDriveBackup/file.pdf',mounts),false);
  assert.equal(isRemoteMount('/home/user/GoogleDrive/local/file.pdf',mounts),false);
  assert.equal(isRemoteMount('/Cloud Drive/file.pdf',mounts),true);
});

test('slow remote transfers expose status while application actions remain responsive',async()=>{
  let finish!:()=>void;
  const waiting=new Promise<void>(resolve=>{finish=resolve;});
  const manager=createFileManager('/source',{locations,desktop,files:{...nodeFiles,list:async()=>[],exists:async()=>false,remote:async()=>true,transfer:async()=>waiting}});
  try{
    await manager.initialize();assert.equal(manager.snapshot().remote,true);
    const operation=manager.dropFiles(['file:///source/a.txt'],'/destination','copy');
    await new Promise(resolve=>setImmediate(resolve));
    assert.match(manager.snapshot().transferStatus,/Copiando: a.txt/);assert.equal(manager.mutating(),true);
    manager.toggleHidden();assert.equal(manager.hidden(),true);
    finish();assert.equal(await operation,true);assert.equal(manager.snapshot().transferStatus,'');
  }finally{finish();manager.dispose();}
});

test('hiding applications persists locally and preserves the original launcher',async()=>{
  const {desktopActions}=await import('../src/infrastructure/desktopActions.js');
  const root=await mkdtemp('/tmp/nandomo-hide-app-');
  const prior={config:process.env.NANDOMO_FM_CONFIG_DIR,data:process.env.XDG_DATA_HOME,dirs:process.env.XDG_DATA_DIRS};
  try{
    process.env.NANDOMO_FM_CONFIG_DIR=join(root,'config');process.env.XDG_DATA_HOME=root;process.env.XDG_DATA_DIRS=join(root,'empty');
    await mkdir(join(root,'applications'));const launcher=join(root,'applications','test.desktop');const content='[Desktop Entry]\nType=Application\nName=Test\nExec=true\n';await writeFile(launcher,content);
    const actions=desktopActions(root);assert.equal((await actions.applications()).length,1);await actions.hideApplication(launcher);
    assert.equal((await desktopActions(root).applications()).length,0);assert.equal(await readFile(launcher,'utf8'),content);
  }finally{
    for(const [key,value] of [['NANDOMO_FM_CONFIG_DIR',prior.config],['XDG_DATA_HOME',prior.data],['XDG_DATA_DIRS',prior.dirs]] as const)if(value===undefined)delete process.env[key];else process.env[key]=value;
    await rm(root,{recursive:true,force:true});
  }
});

test('bookmark changes preserve labels and unrelated GTK entries',async()=>{
  const {updateBookmark}=await import('../src/infrastructure/bookmarks.js');const root=await mkdtemp('/tmp/nandomo-bookmark-edit-');const prior=process.env.XDG_CONFIG_HOME;
  try{
    process.env.XDG_CONFIG_HOME=join(root,'config');await mkdir(join(root,'config/gtk-3.0'),{recursive:true});await mkdir(join(root,'Added folder'));
    const target=join(root,'config/gtk-3.0/bookmarks');await writeFile(target,'smb://server/share Network\nfile:///original Custom label\n');
    await updateBookmark(root,join(root,'Added folder'));const text=await readFile(target,'utf8');assert.match(text,/smb:\/\/server\/share Network/);assert.match(text,/file:\/\/\/original Custom label/);assert.match(text,/Added%20folder/);
    await updateBookmark(root,join(root,'Added folder'),true);assert.equal(await readFile(target,'utf8'),'smb://server/share Network\nfile:///original Custom label\n');
  }finally{if(prior===undefined)delete process.env.XDG_CONFIG_HOME;else process.env.XDG_CONFIG_HOME=prior;await rm(root,{recursive:true,force:true});}
});

test('permission edits change only requested access bits and refuse symbolic links',async()=>{
  const {symlink}=await import('node:fs/promises');const root=await mkdtemp('/tmp/nandomo-permissions-');
  try{
    const path=join(root,'file');await writeFile(path,'preserve');await nodeFiles.setPermissions!(path,0o640);
    assert.equal((await lstat(path)).mode & 0o777,0o640);assert.equal(await readFile(path,'utf8'),'preserve');
    await symlink(path,join(root,'link'));await assert.rejects(nodeFiles.setPermissions!(join(root,'link'),0o777));
    assert.equal((await lstat(path)).mode & 0o777,0o640);await assert.rejects(nodeFiles.setPermissions!(path,0o1000));
  }finally{await rm(root,{recursive:true,force:true});}
});

test('open-with passes the target to association lookup and keeps recommended app icons',async()=>{
  let target='';const manager=createFileManager('/home/test',{files:{...nodeFiles,list:async()=>[]},locations,desktop:{...desktop,applications:async path=>{target=path ?? '';return [{id:'/apps/editor.desktop',name:'Editor',associated:true,icon:'editor'}];}}});
  try{await manager.chooseApplication('/home/test/file.txt');assert.equal(target,'/home/test/file.txt');assert.equal(manager.applications()[0]?.associated,true);assert.equal(manager.applications()[0]?.icon,'editor');}finally{manager.dispose();}
});
