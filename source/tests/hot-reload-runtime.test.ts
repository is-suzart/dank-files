import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PassThrough } from 'node:stream';
import { component, effect, signal } from '@nandomo/core';
import { qml } from '@nandomo/bridge-qml';
import { createFileManager } from '../src/application/createFileManager.js';
import { runQuickshell } from '../src/infrastructure/quickshell.js';

interface Patch { cmd: string; generation?: number; scene?: string; }

function fixture() {
  return createFileManager('/fixture', {
    files: { list: async () => [], resolve: path => path, parent: () => '/fixture', child: (path, name) => path + '/' + name, url: path => path, create: async () => {}, rename: async () => {}, open: async () => {} },
    locations: { volumes: async () => [], games: async () => [] },
    desktop: { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} },
  });
}

/** A replacement region whose handler id always restarts at h0, like a real region. */
const Probe = component<{ version: number; log: string[]; mounts: string[]; state: { (): number } }>('RuntimeProbe', ({ version, log, mounts, state }, { onMount, onUnmount }) => {
  effect(() => { state(); });
  onMount(() => { mounts.push('mount:' + version); });
  onUnmount(() => { mounts.push('unmount:' + version); });
  return qml.Button({ text: () => 'v' + version, onClicked: () => { log.push('click:' + version); } });
});

function harness(regions: (version: number) => Record<string, unknown>) {
  const manager = fixture();
  const input = new PassThrough();
  const patches: Patch[] = [], states: object[] = [];
  let failure: string | undefined, defer = false, pending: number | undefined, onPatch: ((patch: Patch) => void) | undefined;
  const acknowledge = () => {
    if (pending === undefined) return;
    const request = pending; pending = undefined;
    input.write(JSON.stringify({ action: 'uiResult', value: { request } }) + '\n');
  };
  const runtime = runQuickshell(manager as never, regions(1) as never, {
    input, send(message: object) {
      const patch = (message as { uiPatch?: { request: number; command: Patch } }).uiPatch;
      if (!patch) { states.push(message); return; }
      patches.push(patch.command);
      onPatch?.(patch.command);
      const reply = () => input.write(JSON.stringify({ action: 'uiResult', value: { request: patch.request, error: failure } }) + '\n');
      if (defer) pending = patch.request; else queueMicrotask(reply);
    },
  });
  return {
    manager, patches, states, runtime,
    send: (action: string, value?: unknown) => input.write(JSON.stringify({ action, value }) + '\n'),
    fail: (message?: string) => { failure = message; },
    deferAcks: (value: boolean) => { defer = value; },
    acknowledge,
    onPatch: (fn: (patch: Patch) => void) => { onPatch = fn; },
    stop() { runtime.dispose(); input.destroy(); manager.dispose(); },
  };
}

const probe = (version: number, log: string[], mounts: string[], state: { (): number }) => Probe({ version, log, mounts, state });
const empty = { sidebar: qml.Item({}), details: qml.Item({}), dialogs: qml.Item({}) };

test('a late event from a replaced region cannot run a handler of the new region', async () => {
  const log: string[] = [], mounts: string[] = [], state = signal(0);
  const app = harness(version => ({ toolbar: probe(version, log, mounts, state), ...empty }));
  try {
    app.send('uiMounted', 'toolbar');
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 0 });
    assert.deepEqual(log, ['click:1']);
    await app.runtime.replaceRegions({ toolbar: probe(2, log, mounts, state), ...empty } as never);
    // Still queued in the transport when the swap committed: it belongs to h0 of v1.
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 0 });
    assert.deepEqual(log, ['click:1']);
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 1 });
    assert.deepEqual(log, ['click:1', 'click:2']);
  } finally { app.stop(); }
});

test('a region reported as mounted during a reload is not mounted in the generation being replaced', async () => {
  const log: string[] = [], mounts: string[] = [], state = signal(0);
  let injected = false;
  const app = harness(version => ({ toolbar: probe(version, log, mounts, state), ...empty }));
  app.onPatch(patch => {
    if (patch.cmd === 'replace_scenes' && !injected) { injected = true; app.send('uiMounted', 'toolbar'); }
  });
  try {
    await app.runtime.replaceRegions({ toolbar: probe(2, log, mounts, state), ...empty } as never);
    await new Promise(resolve => setTimeout(resolve, 5));
    // The injected uiMounted belonged to v1, which is only disposed, never mounted.
    assert.deepEqual(mounts, ['unmount:1', 'mount:2']);
  } finally { app.stop(); }
});

test('a failed replacement discards every candidate and the next valid edit recovers', async () => {
  const log: string[] = [], mounts: string[] = [], state = signal(0);
  const regions = (version: number) => ({ toolbar: probe(version, log, mounts, state), ...empty });
  const app = harness(regions);
  try {
    app.send('uiMounted', 'toolbar');
    const baseline = state.subscriberCount;
    app.fail('native compilation failed');
    await assert.rejects(app.runtime.replaceRegions(regions(2) as never), /native compilation failed/);
    assert.equal(state.subscriberCount, baseline);
    // The discarded candidate was released instead of left alive next to the current region.
    assert.deepEqual(mounts, ['mount:1', 'unmount:2']);
    assert.deepEqual(app.patches.map(patch => patch.cmd), ['replace_scenes']);
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 0 });
    assert.deepEqual(log, ['click:1']);
    app.fail();
    await app.runtime.replaceRegions(regions(3) as never);
    assert.equal(state.subscriberCount, baseline);
    assert.deepEqual(mounts, ['mount:1', 'unmount:2', 'unmount:1', 'mount:3']);
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 0 });
    assert.deepEqual(log, ['click:1']);
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 1 });
    assert.deepEqual(log, ['click:1', 'click:3']);
  } finally { app.stop(); }
});

test('a reload suspends events and publishes exactly one state message after it commits', async () => {
  const log: string[] = [], mounts: string[] = [], state = signal(0);
  const regions = (version: number) => ({ toolbar: probe(version, log, mounts, state), ...empty });
  const app = harness(regions);
  try {
    const before = app.states.length;
    app.deferAcks(true);
    const reloading = app.runtime.replaceRegions(regions(2) as never);
    await new Promise(resolve => setTimeout(resolve, 5));
    app.send('uiEvent', { scene: 'toolbar', handler: 'h0', args: [], generation: 0 });
    assert.deepEqual(log, []);
    assert.equal(app.states.length, before);
    app.acknowledge();
    await reloading;
    assert.equal(app.states.length, before + 1);
    assert.deepEqual(log, []);
  } finally { app.stop(); }
});

test('footer handlers mount, reload and reject events from the old generation',async()=>{
  const log:string[]=[],mounts:string[]=[],state=signal(0);
  const regions=(version:number)=>({...empty,toolbar:qml.Item({}),footer:probe(version,log,mounts,state)});
  const app=harness(regions);
  try {
    app.send('uiMounted','footer');
    app.send('uiEvent',{scene:'footer',handler:'h0',args:[],generation:0});
    assert.deepEqual(log,['click:1']);
    await app.runtime.replaceRegions(regions(2));
    app.send('uiEvent',{scene:'footer',handler:'h0',args:[],generation:0});
    app.send('uiEvent',{scene:'footer',handler:'h0',args:[],generation:1});
    assert.deepEqual(log,['click:1','click:2']);
  } finally {app.stop();}
  assert.equal(state.subscriberCount,0);
});
