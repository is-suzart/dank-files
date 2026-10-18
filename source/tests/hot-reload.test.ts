import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PassThrough } from 'node:stream';
import { component, effect, signal } from '@nandomo/core';
import { qml } from '@nandomo/bridge-qml';
import { createFileManager } from '../src/application/createFileManager.js';
import { runQuickshell } from '../src/infrastructure/quickshell.js';

test('region reload preserves application state and releases old scopes, including failed replacements',async()=>{
  const state=signal(0), clicks:number[]=[];
  let mounts=0,unmounts=0,rejectNext=false;
  const Probe=component<{version:number}>('ReloadProbe',({version},{onMount,onUnmount})=>{
    effect(()=>{state();});onMount(()=>{mounts++;});onUnmount(()=>{unmounts++;});
    return qml.Button({text:()=>version+':'+state(),onClicked:()=>{clicks.push(version);state.update(value=>value+1);}});
  });
  const regions=(version:number)=>({toolbar:Probe({version}),sidebar:qml.Item({}),details:qml.Item({}),dialogs:qml.Item({})});
  const manager=createFileManager('/fixture',{
    files:{list:async()=>[],resolve:path=>path,parent:()=>'/fixture',child:(path,name)=>path+'/'+name,url:path=>path,create:async()=>{},rename:async()=>{},open:async()=>{}},
    locations:{volumes:async()=>[],games:async()=>[]},desktop:{theme:async()=>({palette:{},icons:{}}),watchTheme:()=>()=>{}},
  });
  const input=new PassThrough();
  const send=(action:string,value?:unknown)=>input.write(JSON.stringify({action,value})+'\n');
  const runtime=runQuickshell(manager,regions(1),{input,send:message=>{
    const patch=(message as {uiPatch?:{request:number}}).uiPatch;
    if(patch)queueMicrotask(()=>send('uiResult',{request:patch.request,error:rejectNext?'native compilation failed':undefined}));
  }});
  try {
    send('uiMounted','toolbar');assert.equal(mounts,1);
    manager.toggleHidden();const baseline=state.subscriberCount;
    await runtime.replaceRegions(regions(2));
    assert.equal(manager.hidden(),true);assert.equal(mounts,2);assert.equal(unmounts,1);
    assert.equal(state.subscriberCount,baseline);
    send('uiEvent',{scene:'toolbar',handler:'h0',args:[]});assert.deepEqual(clicks,[2]);
    rejectNext=true;await assert.rejects(runtime.replaceRegions(regions(3)),/native compilation failed/);
    assert.equal(state.subscriberCount,baseline);assert.equal(mounts,2);
    send('uiEvent',{scene:'toolbar',handler:'h0',args:[]});assert.deepEqual(clicks,[2,2]);
    rejectNext=false;await runtime.replaceRegions(regions(4));
    send('uiEvent',{scene:'toolbar',handler:'h0',args:[]});assert.deepEqual(clicks,[2,2,4]);
    assert.equal(state(),3);
  }finally{runtime.dispose();input.destroy();manager.dispose();}
  assert.equal(state.subscriberCount,0);
});
