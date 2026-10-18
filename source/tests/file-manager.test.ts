import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFileManager } from '../src/application/createFileManager.js';
import type { FileManagerServices } from '../src/application/ports.js';
import type { Entry } from '../src/domain/files.js';

function deferred<T>() {let resolve!:(value:T)=>void;const promise=new Promise<T>(done=>{resolve=done;});return {promise,resolve};}
function services(list:(path:string)=>Promise<Entry[]>) {
  let stops=0;
  const adapters:FileManagerServices={
    files:{list,resolve:path=>path,parent:()=>'/home',child:(parent,name)=>parent+'/'+name,url:path=>'file://'+path,create:async()=>{},rename:async()=>{},open:async()=>{throw new Error('cannot open');}},
    locations:{volumes:async()=>[],games:async()=>[]},
    desktop:{theme:async()=>({palette:{primary:'#123456'},icons:{}}),watchTheme:()=>()=>{stops++;}},
  };
  return {adapters,stops:()=>stops};
}
test('application owns history and rejects stale navigation without Node or Quickshell adapters',async()=>{
  const older=deferred<Entry[]>(), newer=deferred<Entry[]>();
  const dependencies=services(path=>path==='/older'?older.promise:path==='/newer'?newer.promise:
    path==='/missing'?Promise.reject(new Error('missing')):Promise.resolve([]));
  const manager=createFileManager('/home',dependencies.adapters);
  await manager.initialize();
  const first=manager.navigate('/older'),second=manager.navigate('/newer');
  newer.resolve([]);await second;older.resolve([]);await first;
  assert.equal(manager.path(),'/newer');
  await manager.navigate('/missing');assert.equal(manager.path(),'/newer');assert.equal(manager.error(),'missing');
  await manager.back();assert.equal(manager.path(),'/home');assert.equal(manager.navigation().forward,true);
  await manager.forward();assert.equal(manager.path(),'/newer');
  await manager.open('/file');assert.equal(manager.error(),'cannot open');
  manager.dispose();manager.dispose();assert.equal(dependencies.stops(),1);
});
test('closing the application fences pending directory and theme results',async()=>{
  const pending=deferred<Entry[]>(), theme=deferred<{palette:Record<string,string>;icons:Record<string,string>}>();
  const dependencies=services(path=>path==='/pending'?pending.promise:Promise.resolve([]));
  dependencies.adapters.desktop.theme=()=>theme.promise;
  const manager=createFileManager('/home',dependencies.adapters);
  const start=manager.initialize();const navigation=manager.navigate('/pending');
  manager.dispose();pending.resolve([]);theme.resolve({palette:{primary:'#abcdef'},icons:{}});
  await Promise.all([start,navigation]);
  assert.equal(manager.path(),'/home');assert.equal(dependencies.stops(),1);
});


test('details open explicitly, follow selection and close without deselecting',async()=>{
  const items=['a','b'].map(name=>({name,path:'/home/'+name,directory:false,symlink:false,size:1,modified:1,icon:'text'}));
  const dependencies=services(async()=>items);
  const manager=createFileManager('/home',dependencies.adapters);
  await manager.initialize();manager.select('/home/a');
  assert.equal(manager.snapshot().detailsOpen,false);
  manager.openDetails();manager.select('/home/b');
  assert.equal(manager.detailsOpen(),true);assert.equal(manager.selected()?.name,'b');
  manager.closeDetails();assert.equal(manager.selected()?.name,'b');
  manager.openDetails();await manager.navigate('/other');assert.equal(manager.detailsOpen(),false);
  manager.dispose();
});

test('trash refreshes on success and preserves selection on failure',async()=>{
  let items=[{name:'a',path:'/home/a',directory:false,symlink:false,size:1,modified:1,icon:'text'}];
  const dependencies=services(async()=>items);
  const manager=createFileManager('/home',dependencies.adapters);await manager.initialize();
  manager.select('/home/a');manager.openDetails();manager.copy();
  dependencies.adapters.files.trash=async()=>{throw new Error('trash unavailable');};
  await manager.trashSelected();assert.equal(manager.selected()?.name,'a');assert.equal(manager.error(),'trash unavailable');
  dependencies.adapters.files.trash=async target=>{assert.equal(target,'/home/a');items=[];};
  await manager.trashSelected();assert.equal(manager.selected(),null);assert.equal(manager.detailsOpen(),false);assert.equal(manager.snapshot().clipboard,null);
  manager.dispose();
});


test('pinned details survive deselection and navigation, and preference restores on launch',async()=>{
  const item={name:'a',path:'/home/a',directory:false,symlink:false,size:1,modified:1,icon:'text'};
  const dependencies=services(async()=>[item]);
  let saved:unknown={detailsAlwaysVisible:true};
  dependencies.adapters.desktop.readPreferences=async()=>saved;
  dependencies.adapters.desktop.writePreferences=async value=>{saved=value;};
  const manager=createFileManager('/home',dependencies.adapters);await manager.initialize();
  assert.equal(manager.snapshot().detailsVisible,true);assert.equal(manager.selected(),null);
  manager.select(item.path);manager.closeDetails();assert.equal(manager.snapshot().detailsVisible,true);
  manager.select(null);await manager.navigate('/other');assert.equal(manager.snapshot().detailsVisible,true);
  manager.setPreference('detailsAlwaysVisible',false);assert.equal(manager.snapshot().detailsVisible,false);
  manager.openDetails(item.path);assert.equal(manager.snapshot().detailsVisible,true);
  manager.closeDetails();assert.equal(manager.snapshot().detailsVisible,false);
  manager.setPreference('detailsAlwaysVisible',true);manager.dispose();
  const restored=createFileManager('/home',dependencies.adapters);await restored.initialize();
  assert.equal(restored.snapshot().detailsVisible,true);restored.dispose();
});
