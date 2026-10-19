import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createViewLoader, watchViewSources } from './dev-loader.mjs';

test('fresh view modules retain external runtime identity and recover from failed edits',async()=>{
  const root=await mkdtemp('/tmp/nandomo-view-loader-test-');
  let loader;
  try {
    const module=join(root,'node_modules','fixture-runtime');await mkdir(module,{recursive:true});
    await writeFile(join(module,'package.json'),JSON.stringify({name:'fixture-runtime',type:'module',exports:'./index.mjs'}));
    await writeFile(join(module,'index.mjs'),'export const state={count:0};');
    const {state}=await import(pathToFileURL(join(module,'index.mjs')).href);state.count=42;
    const entry=join(root,'view.ts');
    const source=version=>`import {state} from 'fixture-runtime'; export {state}; export const version=${version};`;
    await writeFile(entry,source(1));loader=await createViewLoader({entry});
    const first=await loader.load();assert.equal(first.state,state);
    await writeFile(entry,'export const = broken');await assert.rejects(loader.load());
    assert.equal(first.state.count,42);
    await writeFile(entry,source(2));const second=await loader.load();
    assert.equal(second.version,2);assert.equal(second.state,first.state);assert.equal(second.state.count,42);
    assert.ok(loader.dependencies().has(entry));
    await loader.dispose();await assert.rejects(loader.load(),/closed/);
  }finally{await loader?.dispose();await rm(root,{recursive:true,force:true});}
});

test('watcher serializes edits made while a reload is in progress and closes cleanly',{timeout:5000},async()=>{
  const root=await mkdtemp('/tmp/nandomo-view-watch-test-');
  let stop,release,started,finished;
  const first=new Promise(resolve=>{started=resolve;});
  const done=new Promise(resolve=>{finished=resolve;});
  let calls=0,active=0,max=0;
  try {
    await writeFile(join(root,'view.ts'),'one');
    stop=watchViewSources(root,async()=>{
      calls++;active++;max=Math.max(max,active);
      if(calls===1){started();await new Promise(resolve=>{release=resolve;});}
      active--;if(calls===2)finished();
    },error=>{throw error;},10);
    await writeFile(join(root,'view.ts'),'two');await first;
    await writeFile(join(root,'view.ts'),'three');
    await new Promise(resolve=>setTimeout(resolve,30));release();
    await done;stop();assert.equal(max,1);
    await writeFile(join(root,'view.ts'),'four');await new Promise(resolve=>setTimeout(resolve,30));assert.equal(calls,2);
  }finally{stop?.();release?.();await rm(root,{recursive:true,force:true});}
});

test('a load already in flight when the loader closes reports the closed loader',async()=>{
  const root=await mkdtemp('/tmp/nandomo-view-close-test-');
  let loader;
  try {
    await mkdir(join(root,'node_modules'),{recursive:true});
    const entry=join(root,'view.ts');
    await writeFile(entry,'export const version=1;');
    loader=await createViewLoader({entry});
    await loader.load();
    // dispose() marks the loader closed synchronously, so a pending load must
    // report that reason instead of a missing temporary module.
    const loading=loader.load();
    const disposed=loader.dispose();
    await assert.rejects(loading,/View loader closed/);
    await disposed;
  }finally{await loader?.dispose();await rm(root,{recursive:true,force:true});}
});

test('an edit debounced while a reload is in flight never produces an extra empty reload',{timeout:5000},async()=>{
  const root=await mkdtemp('/tmp/nandomo-view-dedupe-test-');
  const delay=80;
  const entry=join(root,'view.ts');
  const seen=[];
  let stop,markStarted,markFinished;
  const started=new Promise(resolve=>{markStarted=resolve;});
  try {
    await writeFile(entry,'one');
    stop=watchViewSources(root,async files=>{
      seen.push(files);
      if(seen.length===1){markStarted();await new Promise(resolve=>{markFinished=resolve;});}
    },error=>{throw error;},delay);
    await writeFile(entry,'two');
    await started;
    // The second edit arms a debounce timer whose window is still open when the
    // first reload finishes: it must be cancelled, not left pending behind a
    // freshly armed one, which would fire a second, empty reload.
    await writeFile(entry,'three');
    await new Promise(resolve=>setTimeout(resolve,20));
    markFinished();
    await new Promise(resolve=>setTimeout(resolve,delay*3));
    assert.deepEqual(seen,[[entry],[entry]]);
  }finally{stop?.();markFinished?.();await rm(root,{recursive:true,force:true});}
});
