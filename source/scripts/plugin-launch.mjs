import { mkdtemp, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { launchOptions } from './launch-options.mjs';
import { findDmsSource, mountDmsSource, adaptDmsQml } from './dms-source.mjs';

const { startPath, platform } = launchOptions(process.argv.slice(2));
if (process.argv.slice(2).some(arg => arg.startsWith('--') && arg !== '--' && arg !== '--dbus')) throw new Error('Este pacote não inclui modo de desenvolvimento.');
if (startPath && !(await stat(startPath)).isDirectory()) throw new Error('O caminho deve ser uma pasta.');
const source = await findDmsSource();
const runtime = await mkdtemp(join(tmpdir(), 'nandomo-files-plugin-'));
try {
  const layout = await mountDmsSource(source, runtime);
  await writeFile(join(runtime,'shell.qml'),adaptDmsQml(await readFile(new URL('./shell.qml',import.meta.url),'utf8'),layout.legacy));
  const child = spawn(process.env.NANDOMO_QUICKSHELL_BINARY || 'qs', ['--path', join(runtime, 'shell.qml')], {
    stdio: 'inherit',
    env: {...process.env, NANDOMO_FM_DMS_LEGACY:layout.legacy?'1':'0', NANDOMO_FM_DEV:'0', NANDOMO_FM_NODE:process.execPath,
      NANDOMO_FM_LINUX_HELPER:fileURLToPath(new URL('./linux-desktop.py',import.meta.url)),
      NANDOMO_FM_BACKEND:fileURLToPath(new URL('./backend.mjs', import.meta.url)),
      ...(platform ? {QT_QPA_PLATFORM:platform} : {}),
      ...(startPath ? {NANDOMO_FM_START_PATH:startPath} : {}),
    },
  });
  const interrupt = () => child.kill('SIGINT');
  const terminate = () => child.kill('SIGTERM');
  process.once('SIGINT', interrupt);
  process.once('SIGTERM', terminate);
  try {
    process.exitCode = await new Promise((resolve, reject) => {
      child.once('error', reject);
      child.once('exit', code => resolve(code ?? 1));
    });
  } finally {
    process.removeListener('SIGINT', interrupt);
    process.removeListener('SIGTERM', terminate);
  }
} finally { await rm(runtime, {recursive:true, force:true}); }
