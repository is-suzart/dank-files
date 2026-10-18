import { build } from 'esbuild';
import { tsImport } from 'tsx/esm/api';
import { mkdir, writeFile, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const project = resolve(fileURLToPath(new URL('../', import.meta.url)));
const dist = join(project, 'dist');
const output = join(dist, 'dankFiles');
await rm(output, {recursive:true, force:true});
await mkdir(join(output, 'app'), {recursive:true});
const tsconfig = join(project, 'tsconfig.json');
const { renderShell } = await tsImport('../src/native/renderShell.tsx', {parentURL:import.meta.url, tsconfig});
const { renderFilesWidget } = await tsImport('../src/plugin/FilesWidget.tsx', {parentURL:import.meta.url, tsconfig});
await writeFile(join(output, 'app/shell.qml'), renderShell().replaceAll(project + '/', ''));
await writeFile(join(output, 'FilesWidget.qml'), renderFilesWidget().replaceAll(project + '/', ''));
await build({entryPoints:[join(project, 'src/main.ts')], outfile:join(output, 'app/backend.mjs'),
  bundle:true, platform:'node', format:'esm', target:'node20', tsconfig, minifySyntax:true,
  define:{'process.env.NANDOMO_FM_DEV':'"0"'},
});
for (const [from, to] of [['plugin-launch.mjs','launch.mjs'], ['launch-options.mjs','launch-options.mjs'], ['dms-source.mjs','dms-source.mjs'], ['linux-desktop.py','linux-desktop.py'], ['install-desktop.mjs','register-desktop.mjs']]) {
  await copyFile(join(project, 'scripts', from), join(output, 'app', to));
}
await writeFile(join(output, 'plugin.json'), JSON.stringify({id:'dankFiles', name:'Dank Files', author:'Igor Suzart', license:'BSD-3-Clause',
  description:'A standalone file manager integrated with Dank Material Shell', version:'0.1.0',
  type:'widget', component:'./FilesWidget.qml', icon:'folder', capabilities:['dankbar-widget'],
  requires_dms:'>=1.5.0', requires:['node', 'qs', 'gio', 'python3', 'bsdtar'], permissions:['process'],
}, null, 2)+'\n');
await copyFile(join(project, 'PLUGIN.md'), join(output, 'README.md'));
await copyFile(join(project, 'LICENSE'), join(output, 'LICENSE'));
await copyFile(join(project, 'THIRD_PARTY_NOTICES.md'), join(output, 'THIRD_PARTY_NOTICES.md'));
execFileSync('tar', ['-czf', join(dist, 'dankFiles.tar.gz'), '-C', dist, 'dankFiles']);
console.log('Plugin: '+output+'\nArchive: '+join(dist, 'dankFiles.tar.gz'));
