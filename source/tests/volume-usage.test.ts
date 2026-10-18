import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { createFileManager } from '../src/application/createFileManager.js';
import { statfsUsage } from '../src/infrastructure/nodeServices.js';
import { normalizeUsage, usageFraction, type VolumeUsage } from '../src/domain/volumeUsage.js';
import type { Place } from '../src/domain/files.js';

const desktop = { theme: async () => ({ palette: {}, icons: {} }), watchTheme: () => () => {} };
const files = {
  list: async () => [], resolve: (path: string) => path, parent: () => '/', child: (parent: string, name: string) => parent + '/' + name,
  url: (path: string) => 'file://' + path, create: async () => {}, rename: async () => {}, open: async () => {},
};

test('statfs reports real numbers for a mounted path and skips what it cannot read', async () => {
  const root = await mkdtemp('/tmp/nandomo-usage-');
  const memory = '/proc/self/mem';
  try {
    await mkdir(join(root, 'data'));
    const usage = await statfsUsage([join(root, 'data'), join(root, 'missing'), memory]);
    assert.ok(usage[join(root, 'data')]);
    assert.ok(usage[join(root, 'data')]!.total > 0);
    assert.ok(usage[join(root, 'data')]!.used >= 0);
    assert.ok(usage[join(root, 'data')]!.used <= usage[join(root, 'data')]!.total);
    assert.equal(usage[join(root, 'missing')], undefined);
    assert.equal(usage[memory], undefined);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('unknown usage is normalized away instead of becoming an empty bar', () => {
  assert.equal(normalizeUsage(null), null);
  assert.equal(normalizeUsage({ used: 0, total: 0 }), null);
  assert.equal(normalizeUsage({ used: -1, total: 100 }), null);
  assert.equal(normalizeUsage({ used: Number.NaN, total: 100 }), null);
  assert.equal(normalizeUsage({ used: 10, total: Number.POSITIVE_INFINITY }), null);
  assert.equal(normalizeUsage({ used: 10 }), null);
  assert.deepEqual(normalizeUsage({ used: 150, total: 100 }), { used: 100, total: 100 });
  assert.equal(usageFraction(undefined), null);
  assert.equal(usageFraction({ used: 0, total: 0 }), null);
  assert.equal(usageFraction({ used: 25, total: 100 }), 0.25);
  assert.equal(usageFraction({ used: 300, total: 100 }), 1);
});

async function managerWithDrives(drives: Place[], usage?: (paths: readonly string[]) => Promise<Record<string, VolumeUsage>>) {
  const root = await mkdtemp('/tmp/nandomo-usage-volumes-');
  await mkdir(join(root, 'home'));
  const asked: string[][] = [];
  const manager = createFileManager(join(root, 'home'), {
    files,
    locations: {
      volumes: async () => drives,
      games: async () => [],
      ...(usage ? { volumeUsage: async paths => { asked.push([...paths]); return usage(paths); } } : {}),
    },
    desktop,
  });
  await manager.initialize();
  return { root, manager, asked };
}

test('only mounted volumes are measured and the sidebar survives a failure', async () => {
  const drives: Place[] = [{ id: 'a', name: 'Data', path: '/mnt/data', mounted: true }, { id: 'b', name: 'Spare', path: '', mounted: false }];
  const failing = await managerWithDrives(drives, async () => { throw new Error('statfs indisponível'); });
  try {
    assert.deepEqual(failing.asked, [['/mnt/data']]);
    assert.deepEqual(failing.manager.volumeUsage(), {});
    assert.deepEqual(failing.manager.drives().map(place => place.name), ['Data', 'Spare']);
    assert.equal(failing.manager.error(), '');
  } finally { failing.manager.dispose(); await rm(failing.root, { recursive: true, force: true }); }

  const reported = await managerWithDrives(drives, async paths => Object.fromEntries(paths.map(path => [path, { used: 30, total: 120 }])));
  try {
    assert.deepEqual(reported.manager.volumeUsage(), { '/mnt/data': { used: 30, total: 120 } });
    assert.equal(usageFraction(reported.manager.volumeUsage()['/mnt/data']), 0.25);
  } finally { reported.manager.dispose(); await rm(reported.root, { recursive: true, force: true }); }

  const partial = await managerWithDrives(drives, async () => ({ '/mnt/data': { used: Number.NaN, total: 0 } }));
  try {
    assert.deepEqual(partial.manager.volumeUsage(), {});
  } finally { partial.manager.dispose(); await rm(partial.root, { recursive: true, force: true }); }
});

test('a workspace without the statfs port keeps working without usage', async () => {
  const root = await mkdtemp('/tmp/nandomo-usage-none-');
  await mkdir(join(root, 'home'));
  const manager = createFileManager(join(root, 'home'), {
    files,
    locations: { volumes: async () => [{ id: 'a', name: 'Data', path: '/mnt/data', mounted: true }], games: async () => [] },
    desktop,
  });
  try {
    await manager.initialize();
    assert.deepEqual(manager.volumeUsage(), {});
    assert.equal(manager.drives().length, 1);
  } finally { manager.dispose(); await rm(root, { recursive: true, force: true }); }
});
