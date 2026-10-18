import { tsImport } from 'tsx/esm/api';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signal } from '@nandomo/core';
import { createNativeScene } from '@nandomo/bridge-qml';
import { AppearancePalette } from '../src/components/AppearancePalette.js';
import type { FileManager } from '../src/application/createFileManager.js';

test('loading the icon catalog replaces rows without duplicate names or leaked subscriptions',()=>{
  const catalog=signal<{emblems:Array<{name:string;source:string}>;logos:Array<{name:string;source:string}>}>({emblems:[],logos:[]});
  const manager={iconCatalog:catalog,icons:()=>({folder:'file:///folder.svg'}),palette:()=>({})} as unknown as FileManager;
  const patches:object[]=[];
  const scene=createNativeScene(AppearancePalette({manager,colorValue:()=>'',emblemValue:()=>'',iconValue:()=>'',onColorChosen:()=>{},onEmblemChosen:()=>{},onIconChosen:()=>{}}),()=>{},async command=>{patches.push(command);},undefined,{fragment:true,dynamicFragments:true});
  assert.doesNotThrow(()=>catalog.set({emblems:Array.from({length:10},(_,i)=>({name:`emblem-${i}`,source:`file:///emblem-${i}.svg`})),logos:[]}));
  assert.ok(patches.some(command=>(command as {cmd:string}).cmd==='create_fragment'));
  scene.dispose();
  assert.equal(catalog.subscriberCount,0);
});


test('development TSX compiler supplies real source locations to the native scene',async()=>{
  const {fixtureLocation}=await tsImport('./source-fixture.tsx',{parentURL:import.meta.url,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
  const {origin,source}=fixtureLocation();
  assert.ok(origin);
  assert.ok(origin.fileName.endsWith('/tests/source-fixture.tsx'));
  assert.equal(origin.lineNumber,4);
  assert.ok(source.includes('source-fixture.tsx'));
});
