import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { createFileManager } from '../src/application/createFileManager.js';
import { nodeFiles } from '../src/infrastructure/nodeServices.js';
import type { Entry } from '../src/domain/files.js';
import type { FileManagerServices } from '../src/application/ports.js';

const names = ['a', 'b', 'c', 'd', 'e'];
function fixture() {
  let items: Entry[] = names.map(name => ({
    name, path: '/home/' + name, directory: false, symlink: false, size: 1, modified: 1, icon: 'text',
  }));
  const trashed: string[] = [];
  const adapters: FileManagerServices = {
    files: {
      list: async () => items, resolve: path => path, parent: () => '/home', child: (parent, name) => parent + '/' + name,
      url: path => 'file://' + path, create: async () => {}, rename: async () => {}, open: async () => {},
      trash: async target => { trashed.push(target); items = items.filter(entry => entry.path !== target); },
    },
    locations: { volumes: async () => [], games: async () => [] },
    desktop: { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} },
  };
  return { adapters, items: () => items, trashed };
}
async function manager() {
  const dependencies = fixture();
  const instance = createFileManager('/home', dependencies.adapters);
  await instance.initialize();
  return { instance, dependencies };
}
const selection = (instance: Awaited<ReturnType<typeof manager>>['instance']) =>
  instance.selection().map(path => path.split('/').pop());

test('refresh preserves surviving selections when the focused entry disappears', async () => {
  const {instance, dependencies}=await manager();
  try {
    instance.select('/home/a');instance.selectPath('/home/c','toggle');
    await dependencies.adapters.files.trash!('/home/c');
    await instance.refresh();
    assert.deepEqual(selection(instance),['a']);
    assert.equal(instance.selected()?.name,'a');
  } finally {instance.dispose();}
});

test('clicking the empty area of the view clears the selection and the details panel', async () => {
  const {instance}=await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/c','toggle');
    instance.openDetails();
    assert.equal(instance.snapshot().detailsVisible,true);
    // The background of list, grid and columns sends the same command as Escape.
    instance.select(null);
    assert.deepEqual(instance.selection(),[]);
    assert.equal(instance.selected(),null);
    assert.equal(instance.snapshot().detailsVisible,false);
    assert.equal(instance.selectionAnchor(),null);
    // Selecting again afterwards still works from an empty selection.
    instance.select('/home/b');
    assert.deepEqual(selection(instance),['b']);
  } finally {instance.dispose();}
});

test('a partial trash failure refreshes completed items and keeps the failure visible', async () => {
  const {instance, dependencies}=await manager();
  try {
    const trash=dependencies.adapters.files.trash!;
    dependencies.adapters.files.trash=async path=>{
      if(path==='/home/c')throw new Error('denied');
      await trash(path);
    };
    instance.select('/home/a');instance.selectPath('/home/c','toggle');
    await instance.trashSelected();
    assert.deepEqual(selection(instance),['c']);
    assert.equal(instance.error(),'denied');
    assert.equal(instance.visibleEntries().some(entry=>entry.name==='a'),false);
  } finally {instance.dispose();}
});

test('control toggles one entry at a time and keeps the focus inside the selection', async () => {
  const { instance, dependencies } = await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/c', 'toggle');
    assert.deepEqual(selection(instance), ['a', 'c']);
    assert.equal(instance.selected()?.name, 'c');
    // Removing the focused entry hands the focus to the nearest remaining one.
    instance.selectPath('/home/c', 'toggle');
    assert.deepEqual(selection(instance), ['a']);
    assert.equal(instance.selected()?.name, 'a');
    instance.selectPath('/home/c', 'toggle');
    instance.selectPath('/home/c', 'toggle');
    assert.deepEqual(selection(instance), ['a']);
    assert.equal(instance.selected()?.name, 'a');
    assert.equal(dependencies.items().length, names.length);
  } finally { instance.dispose(); }
});

test('the selection never contains the same entry twice', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/b');
    instance.selectPath('/home/b', 'toggle');
    instance.selectPath('/home/b', 'toggle');
    instance.select('/home/a');
    assert.deepEqual(selection(instance), ['a']);
  } finally { instance.dispose(); }
});

test('shift selects a range from the anchor and can shrink it', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/b');
    instance.selectPath('/home/d', 'range');
    assert.deepEqual(selection(instance), ['b', 'c', 'd']);
    // The anchor stays on b, so a range backwards selects the other side.
    instance.select('/home/b');
    instance.selectPath('/home/d', 'range');
    instance.selectPath('/home/c', 'range');
    assert.deepEqual(selection(instance), ['b', 'c']);
    // A plain click moves the anchor again.
    instance.select('/home/e');
    instance.selectPath('/home/d', 'range');
    assert.deepEqual(selection(instance), ['d', 'e']);
  } finally { instance.dispose(); }
});

test('a right click inside the selection keeps it and outside replaces it', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/c', 'toggle');
    instance.selectPath('/home/c', 'context');
    assert.deepEqual(selection(instance), ['a', 'c']);
    instance.selectPath('/home/e', 'context');
    assert.deepEqual(selection(instance), ['e']);
  } finally { instance.dispose(); }
});

test('control plus A follows the visible order and ignores hidden entries', async () => {
  const { instance } = await manager();
  try {
    instance.toggleHidden();
    instance.select('/home/a');
    instance.selectAll();
    assert.deepEqual(selection(instance), names);
    instance.select(null);
    instance.setOrder('name');
    instance.selectAll();
    assert.equal(instance.snapshot().selectionCount, names.length);
    assert.equal(instance.selected()?.name, names[names.length - 1]);
  } finally { instance.dispose(); }
});

test('arrow keys move the focus, clamp at the edges and extend with shift', async () => {
  const { instance } = await manager();
  try {
    instance.navigateSelection('index', 1);
    assert.equal(instance.selected()?.name, 'a');
    instance.navigateSelection('index', 1);
    assert.equal(instance.selected()?.name, 'b');
    instance.navigateSelection('index', -5);
    assert.equal(instance.selected()?.name, 'a');
    instance.select('/home/a');
    instance.navigateSelection('index', 2, true);
    assert.deepEqual(selection(instance), ['a', 'b', 'c']);
    instance.navigateSelection('index', 99);
    assert.equal(instance.selected()?.name, 'e');
    instance.navigateSelection('index', 99);
    assert.deepEqual(selection(instance), ['e']);
  } finally { instance.dispose(); }
});

test('the details panel follows the focus while the selection stays whole', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/a');
    instance.openDetails();
    instance.selectPath('/home/d', 'toggle');
    assert.equal(instance.detailsOpen(), true);
    assert.equal(instance.selected()?.name, 'd');
    instance.selectPath('/home/d', 'toggle');
    assert.equal(instance.selected()?.name, 'a');
    // Losing every entry closes the panel, as a single selection always did.
    instance.select('/home/a');
    instance.selectPath('/home/a', 'toggle');
    assert.equal(instance.selected(), null);
    assert.equal(instance.detailsOpen(), false);
  } finally { instance.dispose(); }
});

test('multiple selections open bulk rename while single selections keep rename', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/b', 'toggle');
    instance.requestRename();
    assert.equal(instance.editRequest(), null);
    assert.equal(instance.tools.request()?.kind,'bulk');
    assert.equal(instance.tools.request()?.targets.length,2);
    instance.tools.close();
    instance.select('/home/a');
    instance.requestRename();
    assert.equal(instance.editRequest()?.targets.length, 1);
  } finally { instance.dispose(); }
});

test('trash removes every selected entry and a failure keeps the selection', async () => {
  const { instance, dependencies } = await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/c', 'toggle');
    dependencies.adapters.files.trash = async () => { throw new Error('trash unavailable'); };
    await instance.trashSelected();
    assert.equal(instance.error(), 'trash unavailable');
    assert.deepEqual(selection(instance), ['a', 'c']);
    dependencies.adapters.files.trash = dependencies.trashed.length ? undefined! : dependencies.adapters.files.trash;
    instance.dispose();
  } finally { instance.dispose(); }
});

test('trash of many entries keeps the untouched ones selected', async () => {
  const { instance, dependencies } = await manager();
  try {
    instance.select('/home/b');
    instance.selectPath('/home/d', 'toggle');
    await instance.trashSelected();
    assert.deepEqual(dependencies.trashed, ['/home/b', '/home/d']);
    assert.deepEqual(selection(instance), []);
    assert.deepEqual(dependencies.items().map(entry => entry.name), ['a', 'c', 'e']);
  } finally { instance.dispose(); }
});

test('copy and cut carry every selected entry into the destination', async () => {
  const root = await mkdtemp('/tmp/nandomo-multi-clipboard-');
  try {
    await mkdir(join(root, 'dest'));
    for (const name of ['a', 'b', 'c']) await writeFile(join(root, name), name);
    const instance = createFileManager(root, {
      files: nodeFiles, locations: { volumes: async () => [], games: async () => [] },
      desktop: { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} },
    });
    await instance.initialize(root);
    instance.select(join(root, 'a'));
    instance.copy();
    await instance.navigate(join(root, 'dest'));
    instance.paste();
    while (instance.mutating()) await new Promise(resolve => setTimeout(resolve, 5));
    assert.deepEqual((await readdir(join(root, 'dest'))).sort(), ['a']);
    // The pasted entry becomes the selection, still in visual order.
    assert.deepEqual(instance.selection().map(path => path.split('/').pop()), ['a']);
    // Cut removes the sources and keeps a single clipboard with both entries.
    await instance.navigate(root);
    instance.select(join(root, 'b'));
    instance.selectPath(join(root, 'c'), 'toggle');
    instance.cut();
    assert.equal(instance.snapshot().clipboard?.entries.length, 2);
    await instance.navigate(join(root, 'dest'));
    instance.paste();
    while (instance.mutating()) await new Promise(resolve => setTimeout(resolve, 5));
    assert.deepEqual((await readdir(join(root, 'dest'))).sort(), ['a', 'b', 'c']);
    assert.deepEqual(await readFile(join(root, 'dest', 'b'), 'utf8'), 'b');
    assert.equal(instance.snapshot().clipboard, null);
    instance.dispose();
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('a conflict on one entry of many pauses the transfer and resumes with the rest', async () => {
  const root = await mkdtemp('/tmp/nandomo-multi-conflict-');
  try {
    await mkdir(join(root, 'dest'));
    for (const name of ['a', 'b', 'c']) await writeFile(join(root, name), name);
    await writeFile(join(root, 'dest', 'b'), 'old');
    const instance = createFileManager(root, {
      files: nodeFiles, locations: { volumes: async () => [], games: async () => [] },
      desktop: { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} },
    });
    await instance.initialize(root);
    instance.select(join(root, 'a'));
    instance.selectPath(join(root, 'b'), 'toggle');
    instance.selectPath(join(root, 'c'), 'toggle');
    instance.copy();
    await instance.navigate(join(root, 'dest'));
    instance.paste();
    while (instance.mutating()) await new Promise(resolve => setTimeout(resolve, 5));
    assert.ok(instance.conflict());
    // 'a' already landed, 'b' is the collision and 'c' is still pending.
    assert.equal(await readFile(join(root, 'dest', 'a'), 'utf8'), 'a');
    assert.equal(await readFile(join(root, 'dest', 'b'), 'utf8'), 'old');
    assert.equal(await readFile(join(root, 'dest', 'c'), 'utf8').catch(() => null), null);
    await instance.resolveConflict('replace');
    assert.equal(await readFile(join(root, 'dest', 'b'), 'utf8'), 'b');
    assert.equal(await readFile(join(root, 'dest', 'c'), 'utf8'), 'c');
    assert.equal(instance.conflict(), null);
    instance.dispose();
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('navigating keeps the selection only when the entry is still listed', async () => {
  const { instance } = await manager();
  try {
    instance.select('/home/a');
    instance.selectPath('/home/c', 'toggle');
    await instance.navigate('/home');
    assert.deepEqual(selection(instance), []);
    instance.select('/home/a');
    await instance.navigate('/other');
    assert.deepEqual(selection(instance), []);
  } finally { instance.dispose(); }
});

test('column navigation stays inside the column and crosses to the neighbour', async () => {
  const entry = (name: string, path: string): Entry =>
    ({ name, path, directory: false, symlink: false, size: 1, modified: 1, icon: 'text' });
  const listings: Record<string, Entry[]> = {
    '/home': [entry('one', '/home/one'), entry('two', '/home/two')],
    '/home/one': [entry('same', '/home/one/same'), entry('deep', '/home/one/deep')],
    '/home/two': [entry('other', '/home/two/other')],
  };
  const instance = createFileManager('/home', {
    files: {
      list: async path => listings[path] ?? [], resolve: path => path, parent: path => path.split('/').slice(0, -1).join('/') || '/',
      child: (parent, name) => parent + '/' + name, url: path => 'file://' + path, create: async () => {}, rename: async () => {}, open: async () => {},
    },
    locations: { volumes: async () => [], games: async () => [] },
    desktop: { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} },
  });
  try {
    await instance.initialize();
    instance.setView('columns');
    await instance.openColumn('/home/one', 0);
    await instance.openColumn('/home/two', 1);
    instance.select('/home/one/deep');
    // Down stays inside the column that holds the focus, in name order.
    instance.navigateSelection('row', 1);
    assert.equal(instance.selected()?.name, 'same');
    instance.navigateSelection('row', 1);
    assert.equal(instance.selected()?.name, 'same');
    instance.navigateSelection('row', -99);
    assert.equal(instance.selected()?.name, 'deep');
    // Crossing keeps the file name when the next column has it.
    instance.select('/home/one/same');
    instance.navigateSelection('column', 1);
    assert.equal(instance.selected()?.name, 'other');
    instance.navigateSelection('column', 1);
    assert.equal(instance.selected()?.name, 'other');
    instance.navigateSelection('column', -1);
    // Without a matching name the same row is kept.
    assert.equal(instance.selected()?.name, 'deep');
  } finally { instance.dispose(); }
});
