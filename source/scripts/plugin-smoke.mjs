import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, access } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawn } from 'node:child_process';

const root = await mkdtemp(join(tmpdir(), 'nandomo-plugin-smoke-'));
try {
  execFileSync('tar', ['-xzf', fileURLToPath(new URL('../dist/dankFiles.tar.gz', import.meta.url)), '-C', root]);
  const app = join(root, 'dankFiles/app');
  const fixture = join(root, 'folder with spaces');
  await mkdir(fixture);
  const manifest = JSON.parse(await readFile(join(root,'dankFiles/plugin.json'),'utf8'));
  assert.equal(manifest.id, 'dankFiles');
  const widget = await readFile(join(root,'dankFiles/FilesWidget.qml'),'utf8');
  assert.ok(widget.includes('pillClickAction:'));
  for (const file of ['FilesWidget.qml','app/shell.qml','app/backend.mjs']) {
    assert.ok(!(await readFile(join(root,'dankFiles',file),'utf8')).includes(fileURLToPath(new URL('../../../', import.meta.url))), file+' leaks checkout path');
  }
  const installer=fileURLToPath(new URL('./install-plugin.mjs',import.meta.url));
  execFileSync(process.execPath,[installer],{env:{...process.env,XDG_CONFIG_HOME:join(root,'plugin-config')},stdio:'pipe'});
  const installed=join(root,'plugin-config/DankMaterialShell/plugins/dankFiles/plugin.json');
  assert.equal(JSON.parse(await readFile(installed,'utf8')).id,'dankFiles');
  assert.throws(() => execFileSync(process.execPath,[installer],{env:{...process.env,XDG_CONFIG_HOME:join(root,'plugin-config')},stdio:'pipe'}),
    error => String(error.stderr).includes('Plugin já existe'));
  const env = {...process.env, HOME:root, NANDOMO_FM_DESKTOP_INTEGRATION:'0', XDG_CONFIG_HOME:join(root,'config'), XDG_CACHE_HOME:join(root,'cache'), XDG_DATA_HOME:join(root,'data'), NANDOMO_FM_START_PATH:fixture};
  const backend = spawn(process.execPath, [join(app,'backend.mjs')], {cwd:root, env, stdio:['pipe','pipe','pipe']});
  let output='', errors='';
  backend.stdout.on('data', data => { output+=data; });
  backend.stderr.on('data', data => { errors+=data; });
  let timer;
  try {
    await new Promise((resolve, reject) => {
      timer=setTimeout(() => reject(new Error('Backend initialization timeout: '+errors)), 20000);
      backend.once('error', reject);
      backend.once('exit', code => reject(new Error('Backend exited early: '+code+' '+errors)));
      backend.stdout.on('data', () => {
        if(output.split('\n').slice(0,-1).filter(Boolean).some(line => {
          const state=JSON.parse(line); return state.path===fixture && state.busy===false;
        }))resolve();
      });
    });
  } finally { clearTimeout(timer); backend.kill('SIGTERM'); }
  // Exercise the real package launcher with a fake Quickshell, without opening a window.
  const fakeQs=join(root,'fake-qs');
  await writeFile(fakeQs, '#!'+process.execPath+'\n'+`
import('node:fs').then(fs => {
  fs.writeFileSync(process.env.PROBE_OUTPUT, JSON.stringify({args:process.argv.slice(2),platform:process.env.QT_QPA_PLATFORM,path:process.env.NANDOMO_FM_START_PATH,backend:process.env.NANDOMO_FM_BACKEND,dbus:process.env.NANDOMO_FM_DBUS}));
});\n`, {mode:0o755});
  const probe=join(root,'probe.json');
  execFileSync(process.execPath, [join(app,'launch.mjs'), fixture], {cwd:root, env:{...env,
    WAYLAND_DISPLAY:'wayland-test', QT_QPA_PLATFORM:'xcb', NANDOMO_FM_QT_PLATFORM:'wayland',
    NANDOMO_FM_DBUS:'1', NANDOMO_QUICKSHELL_BINARY:fakeQs, PROBE_OUTPUT:probe}, stdio:'pipe'});
  const result=JSON.parse(await readFile(probe,'utf8'));
  assert.equal(result.platform,'wayland');
  assert.equal(result.path,fixture);
  assert.equal(result.backend,join(app,'backend.mjs'));
  assert.equal(result.dbus,'0');
  await assert.rejects(access(result.args[1]), {code:'ENOENT'}); // runtime removed after exit
  execFileSync(process.execPath, [join(app,'launch.mjs'), '--dbus', fixture], {cwd:root,
    env:{...env, NANDOMO_QUICKSHELL_BINARY:fakeQs, PROBE_OUTPUT:probe}, stdio:'pipe'});
  assert.equal(JSON.parse(await readFile(probe,'utf8')).dbus,'1');
  console.log('PLUGIN_PACKAGE_PASS: relocated backend, startup folder, launcher, Wayland and cleanup');
  if (process.argv.includes('--native')) {
    const native = spawn(process.execPath, [join(app,'launch.mjs'), fixture], {cwd:root,
      env:{...env, NANDOMO_FM_QT_PLATFORM:'offscreen', QT_QUICK_BACKEND:'software',
        NANDOMO_FM_SMOKE:'1', NANDOMO_FM_CONFIG_DIR:join(root,'preferences')},
      stdio:['ignore','pipe','pipe'],
    });
    let logs='';
    native.stdout.on('data', data => { logs+=data; });
    native.stderr.on('data', data => { logs+=data; });
    const watchdog=setTimeout(() => native.kill('SIGTERM'), 25000);
    try {
      const code=await new Promise((resolve,reject) => {native.once('error',reject);native.once('exit',resolve);});
      assert.equal(code,0,logs.slice(-5000));
      assert.ok(logs.includes('FM_TSX_SMOKE_PASS'),logs.slice(-5000));
      console.log('PLUGIN_NATIVE_PASS: relocated package, Qt window, native bindings and events');
    } finally { clearTimeout(watchdog); }
  }
} finally { await rm(root, {recursive:true, force:true}); }
