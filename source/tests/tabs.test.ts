import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { createFileManager } from '../src/application/createFileManager.js';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import { cycleTabIndex, emptyTabState, tabTitle } from '../src/domain/tabs.js';
import type { FileManagerServices } from '../src/application/ports.js';

function desktop() {
  let watchers = 0;
  return {
    get watchers() { return watchers; },
    theme: async () => ({ palette: {}, icons: {} }),
    watchTheme: () => { watchers += 1; return () => {}; },
  };
}

async function fixture(services?: Partial<FileManagerServices>) {
  const root = await mkdtemp('/tmp/nandomo-tabs-');
  await mkdir(join(root, 'one')); await mkdir(join(root, 'two')); await mkdir(join(root, 'three'));
  await writeFile(join(root, 'one', 'inside.txt'), 'inside');
  await writeFile(join(root, 'two', 'note.txt'), 'note');
  const environment = desktop();
  const manager = createFileManager(root, {
    files: nodeFiles,
    locations: { volumes: async () => [], games: async () => [] },
    desktop: environment,
    ...services,
  });
  await manager.initialize();
  return { root, manager, environment };
}

test('tab titles follow the folder and the virtual locations', () => {
  assert.equal(tabTitle('/home/user/Downloads'), 'Downloads');
  assert.equal(tabTitle('/'), '/');
  assert.equal(tabTitle('trash:///'), 'Lixeira');
  assert.equal(tabTitle('recent:///'), 'Recentes');
  assert.equal(tabTitle('applications:///'), 'Aplicativos');
  assert.equal(cycleTabIndex(['a', 'b', 'c'], 'a', 1), 'b');
  assert.equal(cycleTabIndex(['a', 'b', 'c'], 'c', 1), 'a');
  assert.equal(cycleTabIndex(['a', 'b', 'c'], 'a', -1), 'c');
  assert.equal(cycleTabIndex(['a'], 'a', 1), 'a');
  assert.equal(cycleTabIndex([], 'a', 1), null);
  assert.equal(cycleTabIndex(['a', 'b'], 'zz', 1), null);
  assert.equal(emptyTabState('/tmp/x', 'list').history.length, 1);
});

test('a new tab opens the current folder with its own history while the window keeps clipboard and theme', async () => {
  const { root, manager, environment } = await fixture();
  try {
    const first = manager.activeTab();
    await manager.navigate(join(root, 'one'));
    assert.equal(manager.tabs().find(tab => tab.active)?.title, 'one');
    manager.setView('list');
    await manager.newTab();
    const tabs = manager.tabs();
    assert.equal(tabs.length, 2);
    assert.equal(tabs.filter(tab => tab.active).length, 1);
    assert.notEqual(manager.activeTab(), first);
    // Same folder, but a fresh tab: no history behind it and nothing selected.
    assert.equal(manager.path(), join(root, 'one'));
    assert.equal(manager.navigation().back, false);
    assert.deepEqual(manager.selection(), []);
    assert.equal(manager.view(), 'list');
    // The clipboard and the theme watcher belong to the window, not to a tab.
    assert.equal(environment.watchers, 1);
    manager.select(join(root, 'one', 'inside.txt'));
    manager.copy();
    assert.deepEqual(manager.snapshot().clipboard?.entries.map(entry => entry.path), [join(root, 'one', 'inside.txt')]);
    await manager.selectTab(first);
    assert.equal(manager.path(), join(root, 'one'));
    assert.deepEqual(manager.snapshot().clipboard?.entries.map(entry => entry.path), [join(root, 'one', 'inside.txt')]);
    assert.equal(environment.watchers, 1);
  } finally { manager.dispose(); await rm(root, { recursive: true, force: true }); }
});

test('each tab keeps its own directory, back/forward history, selection and view', async () => {
  const { root, manager } = await fixture();
  try {
    const first = manager.activeTab();
    await manager.navigate(join(root, 'one'));
    await manager.navigate(join(root, 'two'));
    manager.select(join(root, 'two', 'note.txt'));
    manager.setView('list');

    await manager.newTab();
    const second = manager.activeTab();
    await manager.navigate(join(root, 'three'));
    manager.setView('columns');
    assert.equal(manager.path(), join(root, 'three'));

    await manager.selectTab(first);
    assert.equal(manager.path(), join(root, 'two'));
    assert.equal(manager.view(), 'list');
    assert.deepEqual(manager.selection(), [join(root, 'two', 'note.txt')]);
    assert.equal(manager.navigation().back, true);
    await manager.back();
    assert.equal(manager.path(), join(root, 'one'));
    await manager.forward();
    assert.equal(manager.path(), join(root, 'two'));
    await manager.forward();
    assert.equal(manager.path(), join(root, 'two'));

    await manager.selectTab(second);
    assert.equal(manager.path(), join(root, 'three'));
    assert.equal(manager.view(), 'columns');
    // The tab started in the folder of the previous one, so it walks back to it.
    assert.equal(manager.navigation().back, true);
    await manager.back();
    assert.equal(manager.path(), join(root, 'two'));
    assert.equal(manager.navigation().forward, true);
    // Ctrl+Tab walks the same order in both directions.
    await manager.nextTab();
    assert.equal(manager.activeTab(), first);
    await manager.prevTab();
    assert.equal(manager.activeTab(), second);
  } finally { manager.dispose(); await rm(root, { recursive: true, force: true }); }
});

test('closing a tab activates the neighbour and the last tab leaves a single fresh one', async () => {
  const { root, manager } = await fixture();
  try {
    const first = manager.activeTab();
    await manager.navigate(join(root, 'one'));
    await manager.newTab();
    const second = manager.activeTab();
    await manager.navigate(join(root, 'three'));
    await manager.closeTab();
    assert.equal(manager.tabs().length, 1);
    assert.equal(manager.activeTab(), first);
    assert.equal(manager.path(), join(root, 'one'));
    // Closing a background tab never moves the current one.
    await manager.newTab();
    const third = manager.activeTab();
    await manager.closeTab(first);
    assert.equal(manager.tabs().length, 1);
    assert.equal(manager.activeTab(), third);
    assert.notEqual(manager.activeTab(), first);
    // The window always keeps one tab, back in the folder it had.
    await manager.closeTab(third);
    assert.equal(manager.tabs().length, 1);
    assert.notEqual(manager.activeTab(), third);
    assert.equal(manager.path(), join(root, 'one'));
    assert.deepEqual(manager.selection(), []);
    assert.equal(manager.navigation().back, false);
    assert.ok(second);
  } finally { manager.dispose(); await rm(root, { recursive: true, force: true }); }
});

test('tab changes are refused while a transfer runs and while a modal is open', async () => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  const root = await mkdtemp('/tmp/nandomo-tabs-busy-');
  await mkdir(join(root, 'dest')); await writeFile(join(root, 'a.txt'), 'a');
  const manager = createFileManager(root, {
    files: { ...nodeFiles, transfer: async () => { await gate; } },
    locations: { volumes: async () => [], games: async () => [] },
    desktop: desktop(),
  });
  try {
    await manager.initialize();
    const first = manager.activeTab();
    const running = manager.dropFiles([nodeFiles.url(join(root, 'a.txt'))], join(root, 'dest'), 'copy');
    assert.equal(manager.mutating(), true);
    await manager.newTab();
    await manager.selectTab('tab-99');
    assert.equal(manager.tabs().length, 1);
    assert.equal(manager.activeTab(), first);
    release();
    await running;
    await manager.newTab();
    assert.equal(manager.tabs().length, 2);

    manager.select(join(root, 'a.txt'));
    manager.requestRename();
    assert.ok(manager.editRequest());
    await manager.newTab();
    await manager.closeTab();
    assert.equal(manager.tabs().length, 2);
    assert.ok(manager.error());
    manager.cancelEdit();
    await manager.newTab();
    assert.equal(manager.tabs().length, 3);
  } finally { manager.dispose(); await rm(root, { recursive: true, force: true }); }
});

test('dispose ends every tab and later commands become inert', async () => {
  const { manager } = await fixture();
  await manager.newTab();
  manager.dispose();
  assert.doesNotThrow(() => manager.newTab());
  assert.doesNotThrow(() => manager.selectTab('tab-1'));
  assert.doesNotThrow(() => manager.closeTab());
  assert.doesNotThrow(() => manager.dispose());
});


test('opening a target folder in a new tab preserves the source tab path', async () => {
  const {root, manager}=await fixture();
  try {
    const first=manager.activeTab();
    await manager.newTab(join(root,'one'));
    assert.equal(manager.path(),join(root,'one'));
    assert.equal(manager.tabs().find(tab=>tab.active)?.title,'one');
    await manager.selectTab(first);
    assert.equal(manager.path(),root);
  } finally {manager.dispose();await rm(root,{recursive:true,force:true});}
});

test('switching between recent tabs uses their cached listings without another filesystem read', async () => {
  let reads=0;
  const {root,manager}=await fixture({files:{...nodeFiles,list:async path=>{reads++;return nodeFiles.list(path);}}});
  try {
    const first=manager.activeTab();
    await manager.navigate(join(root,'one'));
    await manager.newTab(join(root,'two'));
    const second=manager.activeTab(), initialReads=reads;
    await manager.selectTab(first);
    assert.equal(manager.path(),join(root,'one'));
    assert.equal(manager.busy(),false);
    assert.equal(manager.snapshot().entries[0]?.name,'inside.txt');
    await manager.selectTab(second);
    assert.equal(manager.snapshot().entries[0]?.name,'note.txt');
    assert.equal(reads,initialReads);
  } finally {manager.dispose();await rm(root,{recursive:true,force:true});}
});

test('a pending read cannot replace a cached tab after switching to it', async () => {
  let release!:()=>void;
  const gate=new Promise<void>(resolve=>{release=resolve;});
  const {root,manager}=await fixture({files:{...nodeFiles,list:async path=>{if(path.endsWith('/one'))await gate;return nodeFiles.list(path);}}});
  try {
    const first=manager.activeTab();
    await manager.newTab(join(root,'two'));
    const pending=manager.navigate(join(root,'one'));
    await manager.selectTab(first);
    assert.equal(manager.path(),root);
    assert.equal(manager.busy(),false);
    release();await pending;
    assert.equal(manager.path(),root);
  } finally {release();manager.dispose();await rm(root,{recursive:true,force:true});}
});
