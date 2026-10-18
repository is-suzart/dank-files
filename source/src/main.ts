import { t,i18n } from './infrastructure/i18n.js';
import { createLinuxDesktop } from './infrastructure/linuxDesktop.js';
import { restoreTrash,emptyTrash,findTrashed } from './infrastructure/trashActions.js';
import { withUndo } from './infrastructure/fileOperations.js';
import { fileURLToPath } from 'node:url';
import { relative, dirname } from 'node:path';
import { homedir } from 'node:os';
import { createFileManager } from './application/createFileManager.js';
import { App } from './app.js';
import { nodeFiles, nodeLocations } from './infrastructure/nodeServices.js';
import { createDmsDesktop } from './infrastructure/dmsDesktop.js';
import { runQuickshell, ViewReloadError } from './infrastructure/quickshell.js';

const home=homedir();
let markReady!:()=>void;
const initialized=new Promise<void>(resolve=>{markReady=resolve;});
const linux=process.env.NANDOMO_FM_DESKTOP_INTEGRATION==='0' ? undefined : createLinuxDesktop(event=>{
  if(event.event==='clipboard')manager.setExternalClipboardAvailable(!!event.available);
  if(event.event==='reveal' && Array.isArray(event.urls))void initialized.then(()=>manager.reveal(event.urls!,event.method==='ShowItemProperties',event.method==='ShowFolders'));
});
const manager=createFileManager(home,{
  locale:i18n.locale,translate:t,files:withUndo(nodeFiles,{locate:findTrashed,restore:restoreTrash}), locations:nodeLocations, desktop:{...createDmsDesktop(home),restoreTrash,emptyTrash,...(linux?{readFileClipboard:linux.readFileClipboard,writeFileClipboard:linux.writeFileClipboard,resolveLocation:linux.resolveLocation}:{})},
});
const project=fileURLToPath(new URL('../',import.meta.url));
const entry=process.env.NANDOMO_FM_DEV_ENTRY || fileURLToPath(new URL('./app.tsx',import.meta.url));
const devTools=process.env.NANDOMO_FM_DEV==='1' ? await import('@nandomo/bridge-qml/dev') : undefined;
const loader=devTools ? await devTools.createViewLoader({entry,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))}) : undefined;
let runtime:ReturnType<typeof runQuickshell>;
try {
  const initial=loader ? (await loader.load()).App : App;
  if(typeof initial!=='function')throw new Error('A entrada de views deve exportar App.');
  runtime=runQuickshell(manager,initial({manager}));
}catch(error){await loader?.dispose();manager.dispose();linux?.close();throw error;}
let stopWatching:(()=>void)|undefined;
if(loader) {
  console.error('[dev] Hot reload das regiões TSX ativo. Estado de aplicação preservado; estado local dos componentes reinicia.');
  stopWatching=devTools!.watchViewSources(process.env.NANDOMO_FM_DEV_ENTRY ? dirname(entry) : fileURLToPath(new URL('./',import.meta.url)),async files=>{
    const changed=files.map(file=>relative(project,file));
    const reload=files.includes(entry) || changed.some(file=>file.startsWith('src/components/'));
    const restart=files.filter(file=>file!==entry && !relative(project,file).startsWith('src/components/')).map(file=>relative(project,file));
    if(restart.length)console.error('[dev] Reinício necessário para: '+restart.join(', '));
    if(!reload)return;
    try {
      const module=await loader.load();
      if(typeof module.App!=='function')throw new Error('A entrada de views deve exportar App.');
      await runtime.replaceRegions(module.App({manager}));
      console.error('[dev] UI atualizada: '+changed.join(', '));
    }catch(error){
      if(error instanceof ViewReloadError && error.committed) {manager.reportError(error);console.error('[dev] UI trocada, mas o lifecycle de montagem falhou:',error);}
      else console.error('[dev] Recarga falhou; UI anterior mantida:',error);
    }
  });
}
const stop=()=>{stopWatching?.();runtime.dispose();manager.dispose();linux?.close();};
process.once('SIGTERM',stop);
try {
  await Promise.race([manager.initialize(process.env.NANDOMO_FM_START_PATH || home).then(markReady),runtime.closed]);
  await runtime.closed;
} finally {stop();await loader?.dispose();}
