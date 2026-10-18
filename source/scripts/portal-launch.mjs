/** Launches one Dank Files chooser window for a portal request (installed bundle entry). */
import { mkdtemp, symlink, copyFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { launchOptions } from './launch-options.mjs';
import { findDmsSource } from './dms-source.mjs';

const requestFile = process.argv[2] ?? process.env.DANK_FILES_PORTAL_REQUEST;
if (!requestFile) throw new Error('requisição do portal ausente');
const app = fileURLToPath(new URL('./', import.meta.url));
const source = await findDmsSource();
const runtime = await mkdtemp(join(tmpdir(), 'dank-files-chooser-'));
try {
  await symlink(join(source, 'DankCommon'), join(runtime, 'DankCommon'), 'dir');
  await copyFile(join(app, 'shell.qml'), join(runtime, 'shell.qml'));
  const child = spawn(process.env.NANDOMO_QUICKSHELL_BINARY || 'qs', ['--path', join(runtime, 'shell.qml')], {
    stdio: 'inherit',
    env: { ...process.env, QT_QPA_PLATFORM: launchOptions([]).platform, NANDOMO_FM_DESKTOP_INTEGRATION: '0', NANDOMO_FM_DEV: '0', NANDOMO_FM_NODE: process.execPath,
      NANDOMO_FM_LINUX_HELPER: fileURLToPath(new URL('./linux-desktop.py', import.meta.url)),
      NANDOMO_FM_BACKEND: fileURLToPath(new URL('./portal-main.mjs', import.meta.url)),
      DANK_FILES_PORTAL_REQUEST: requestFile },
  });
  const stop = () => child.kill('SIGTERM');
  process.once('SIGINT', stop); process.once('SIGTERM', stop);
  process.exitCode = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', code => resolve(code ?? 0));
  });
} finally { await rm(runtime, { recursive: true, force: true }); }
