import test from 'node:test';
import assert from 'node:assert/strict';
import { launchOptions } from '../scripts/launch-options.mjs';
import { resolve, join } from 'node:path';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

test('launch opens one local folder and prefers native Wayland without breaking test overrides', () => {
  assert.equal(launchOptions(['--dev', 'uma pasta'], {}).startPath, resolve('uma pasta'));
  assert.equal(launchOptions(['file:///tmp/imagens%20e%20a%C3%A7%C3%A3o'], {}).startPath, '/tmp/imagens e ação');
  assert.equal(launchOptions([], {}).startPath, undefined);
  assert.equal(launchOptions([], {WAYLAND_DISPLAY:'wayland-1', QT_QPA_PLATFORM:'xcb'}).platform, 'wayland');
  assert.equal(launchOptions([], {WAYLAND_DISPLAY:'wayland-1', QT_QPA_PLATFORM:'offscreen'}).platform, 'offscreen');
  assert.equal(launchOptions([], {WAYLAND_DISPLAY:'wayland-1', NANDOMO_FM_QT_PLATFORM:'xcb'}).platform, 'xcb');
  assert.equal(launchOptions([], {QT_QPA_PLATFORM:'xcb'}).platform, 'xcb');
  assert.throws(() => launchOptions(['a','b'], {}));
  assert.throws(() => launchOptions(['--unknown'], {}));
  assert.throws(() => launchOptions(['file://remote/tmp'], {}));
});

test('desktop installer registers folders and quotes paths without changing MIME preferences', async () => {
  const root = await mkdtemp(join(tmpdir(), 'nandomo-desktop-'));
  const data = join(root, 'space $ ` " % data');
  try {
    execFileSync(process.execPath, [new URL('../scripts/install-desktop.mjs', import.meta.url).pathname], {
      env: {...process.env, XDG_DATA_HOME:data}, stdio:'pipe',
    });
    const desktop = await readFile(join(data,'applications/io.github.is_suzart.DankFiles.desktop'),'utf8');
    assert.match(desktop, /MimeType=inode\/directory;/);
    assert.match(desktop, /Exec=.* %f\n/);
    assert.doesNotMatch(desktop, /DBusActivatable=true/);
    const launcher = join(data,'dank-files/launch');
    assert.ok((await stat(launcher)).mode & 0o111);
    // The generated launcher forwards arguments as arguments, never shell code.
    assert.throws(() => execFileSync(launcher, ['--not-a-valid-option'], {
      encoding:'utf8', stdio:'pipe',
    }), error => String(error.stderr).includes('Unknown option'));
  } finally { await rm(root, {recursive:true, force:true}); }
});
