import { tsImport } from 'tsx/esm/api';
import { prepareProject, watchProject } from '@nandomo/bridge-qml/tooling';
import { mkdtemp, symlink, writeFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { findDmsSource } from './dms-source.mjs';
import { launchOptions } from './launch-options.mjs';
const { startPath, platform: qtPlatform } = launchOptions(process.argv.slice(2));
if (startPath && !(await stat(startPath)).isDirectory()) throw new Error('O caminho deve ser uma pasta.');
const app = fileURLToPath(new URL('../',import.meta.url));
await prepareProject(app);
const sidebarSmoke = process.argv.includes('--sidebar-smoke');
const isolatedSmoke = process.argv.some(arg=>arg==='--smoke'||arg.endsWith('-smoke')) || process.env.NANDOMO_FM_SELECTION_SMOKE==='1';
const source = await findDmsSource();
const stopWatching=await watchProject(app);
const runtime = await mkdtemp(join(tmpdir(),'nandomo-file-manager-'));
try {
  await symlink(join(source,'DankCommon'),join(runtime,'DankCommon'),'dir');
  let generatedSource;
  if(process.env.NANDOMO_FM_SELECTION_SMOKE==='1') {
    const {renderSelectionShell}=await tsImport('../tests/native-keyboard-probe.tsx',{parentURL:import.meta.url,tsconfig:join(app,'tsconfig.json')});
    generatedSource=renderSelectionShell();
  } else {
    const {renderShell}=await tsImport('../src/native/renderShell.tsx',{parentURL:import.meta.url,tsconfig:join(app,'tsconfig.json')});
    generatedSource=renderShell();
  }
  const { formatQmlDiagnostic } = await tsImport('../../../packages/bridge-qml/src/diagnostics.ts', {parentURL:import.meta.url});
  const shellPath = join(runtime,'shell.qml');
  await writeFile(shellPath,generatedSource);
  const child = spawn(process.env.NANDOMO_QUICKSHELL_BINARY || 'qs',['--path',join(runtime,'shell.qml')], {
    stdio:['inherit','pipe','pipe'], env:{...process.env,...(isolatedSmoke?{NANDOMO_FM_DESKTOP_INTEGRATION:'0'}:{}),...(startPath?{NANDOMO_FM_START_PATH:startPath}:{}),...(qtPlatform?{QT_QPA_PLATFORM:qtPlatform}:{}),NANDOMO_FM_HMR_SMOKE:process.argv.includes('--hmr-smoke') ? '1':'0',NANDOMO_FM_DEV:process.argv.includes('--dev') ? '1' : '0',NANDOMO_FM_NODE:process.execPath,NANDOMO_FM_BACKEND:join(app,sidebarSmoke ? 'scripts/sidebar-smoke-backend.mjs' : 'scripts/backend.mjs'),NANDOMO_FM_UX_SMOKE:process.argv.includes('--ux-smoke')?'1':'0',NANDOMO_FM_SMOKE:process.argv.includes('--smoke')?'1':'0',NANDOMO_FM_SIDEBAR_SMOKE:sidebarSmoke?'1':'0'},
  });
  function forwardDiagnostics(input, output) {
    input.setEncoding('utf8');
    let buffer = '';
    function report(line) {
      const formatted = formatQmlDiagnostic(line,generatedSource,'file://' + shellPath);
      output.write(formatted === line ? formatQmlDiagnostic(line,generatedSource,shellPath) : formatted);
    }
    input.on('data',chunk=>{
      buffer += chunk;
      let newline;
      while((newline=buffer.indexOf('\n'))>=0) {
        report(buffer.slice(0,newline+1));
        buffer=buffer.slice(newline+1);
      }
    });
    input.on('end',()=>{if(buffer)report(buffer);});
  }
  forwardDiagnostics(child.stdout,process.stdout);
  forwardDiagnostics(child.stderr,process.stderr);
  for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>child.kill(signal));
  process.exitCode = await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',code=>resolve(code??1));});
} finally { stopWatching(); await rm(runtime,{recursive:true,force:true}); }
