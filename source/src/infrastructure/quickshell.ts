import { effect, signal } from '@nandomo/core';
import { createInterface } from 'node:readline';
import type { FileManager } from '../application/createFileManager.js';
import type { Sort, ViewMode } from '../domain/files.js';
import { formatQmlDiagnostic } from '@nandomo/bridge-qml';
import { createUiTransport } from './ui-transport.js';
import { createQuickshellScene } from './quickshellScene.js';

export interface AppRegions { toolbar:unknown; sidebar:unknown; details:unknown; dialogs:unknown; }
export class ViewReloadError extends Error {
  constructor(message:string,readonly committed:boolean,cause:unknown){super(message,{cause});this.name='ViewReloadError';}
}
interface Command { action:string; value?:unknown; index?:number; }

/** Process/protocol adapter for the TSX-authored Quickshell window. */
export function runQuickshell(manager:FileManager, regions:AppRegions, options:{input?:NodeJS.ReadableStream;send?:(message:object)=>void}={}) {
  const send=options.send ?? ((message:object)=>{process.stdout.write(JSON.stringify(message)+'\n');});
  const transport=createUiTransport(send);
  let generation=0, reloading=false;
  const revision=signal(0);
  function createScenes(regions:AppRegions, version:number) {
    const built={} as Record<keyof AppRegions,ReturnType<typeof createQuickshellScene>>;
    const contexts={toolbar:'app.uiBridge',sidebar:'app.sidebarBridge',details:'app.detailsBridge',dialogs:'app.dialogsBridge'};
    try {
      for(const name of Object.keys(contexts) as Array<keyof AppRegions>) {
        built[name]=createQuickshellScene(regions[name],contexts[name],manager.reportError,
          command=>transport.patch({...command,scene:name,generation:version}),
          command=>transport.request({...command,scene:name,generation:version}));
      }
      return built;
    }catch(error){for(const scene of Object.values(built))scene.dispose();throw error;}
  }
  let scenes=createScenes(regions,generation);
  const output=effect(()=>{
    revision();
    const message={...manager.snapshot(),ui:scenes.toolbar.snapshot(),sidebarUi:scenes.sidebar.snapshot(),detailsUi:scenes.details.snapshot(),dialogsUi:scenes.dialogs.snapshot()};
    if(!reloading)send(message);
  });
  const input=createInterface({input:options.input ?? process.stdin});
  let disposed=false;
  let resolveClosed!:()=>void;
  const closed=new Promise<void>(resolve=>{resolveClosed=resolve;});

  function handle(command:Command) {
    switch(command.action) {
      case 'uiEvent': {
        if(reloading)return;
        const event=command.value as {scene?:unknown;handler?:unknown;args?:unknown}|undefined;
        if(!event || typeof event.handler!=='string' || !Array.isArray(event.args)) throw new Error('Evento de UI inválido.');
        // A replaced scene reuses handler ids from scratch, so a late event from the
        // previous generation would otherwise run a different handler.
        const eventGeneration=(event as {generation?:unknown}).generation;
        if(typeof eventGeneration==='number' && eventGeneration!==generation)return;
        const scene=event.scene==='sidebar'?scenes.sidebar:event.scene==='details'?scenes.details:event.scene==='dialogs'?scenes.dialogs:scenes.toolbar;
        scene.dispatch(event.handler,event.args);
        break;
      }
      case 'uiMounted': {
        if(reloading)break;
        if(command.value==='toolbar' || command.value==='sidebar' || command.value==='details' || command.value==='dialogs') scenes[command.value].mount();
        break;
      }
      case 'uiResult': {
        const result=command.value as {request?:unknown;error?:unknown;value?:unknown}|undefined;
        if(result && typeof result.request==='number') transport.acknowledge({request:result.request,error:typeof result.error==='string'?result.error:undefined,value:result.value});
        break;
      }
      case 'properties': manager.openDetails(typeof command.value==='string' ? command.value : undefined);break;
      case 'closeDetails': manager.closeDetails();break;
      case 'trash': void manager.trashSelected();break;
      case 'select': if(command.value === null || typeof command.value === 'string') manager.select(command.value); break;
      case 'selectPath': {
        const value=command.value as {path?:unknown;mode?:unknown}|undefined;
        if(value && (typeof value.path==='string' || value.path===null) && ['replace','toggle','range','context'].includes(String(value.mode)))
          manager.selectPath(value.path, value.mode as 'replace'|'toggle'|'range'|'context');
        break;
      }
      case 'selectAll': manager.selectAll(); break;
      case 'selectStep': {
        const value=command.value as {axis?:unknown;delta?:unknown;extend?:unknown}|undefined;
        if(value && ['index','row','column'].includes(String(value.axis)) && typeof value.delta==='number')
          manager.navigateSelection(value.axis as 'index'|'row'|'column', value.delta, value.extend === true);
        break;
      }
      case 'newMenu': manager.requestNew(); break;
      case 'closeNewMenu': manager.closeNewMenu(); break;
      case 'create': if(command.value === 'file' || command.value === 'folder') manager.requestCreate(command.value); break;
      case 'drop': {
        const value=command.value as {urls?:unknown;folder?:unknown;mode?:unknown};
        if(value && Array.isArray(value.urls) && value.urls.every(url=>typeof url==='string') && typeof value.folder==='string' && (value.mode==='copy' || value.mode==='move'))void manager.dropFiles(value.urls,value.folder,value.mode);
        break;
      }
      case 'openDesktop': void manager.openDesktopFile();break;
      case 'manageApplication': void manager.manageApplication();break;
      case 'hideApplication': void manager.hideApplication();break;
      case 'applications': void manager.showApplications();break;
      case 'special': if(command.value==='trash:///' || command.value==='recent:///')void manager.special(command.value);break;
      case 'editPermissions': manager.editPermissions();break;
      case 'addPlace': void manager.addSelectedPlace();break;
      case 'customizeFolder': manager.customizeFolder();break;
      case 'preferences': manager.showPreferences();break;
      case 'closePreferences': manager.closePreferences();break;
      case 'closeChooser': manager.closeChooser();break;
      case 'openWith': void manager.chooseApplication(typeof command.value==='string'?command.value:undefined);break;
      case 'terminal': void manager.terminal();break;
      case 'copy': manager.copy();break;
      case 'cut': manager.cut();break;
      case 'paste': void manager.paste();break;
      case 'undo': void manager.undo();break;
      case 'cancelTransfer': manager.cancelTransfer();break;
      case 'restoreTrash': void manager.restoreSelected();break;
      case 'fileTool': if(command.value==='archive'||command.value==='extract'||command.value==='bulk'||command.value==='emptyTrash')manager.tools.open(command.value);break;
      case 'browseDestination': if(typeof command.value==='string')void manager.browseDestination(command.value);break;
      case 'transfer': if(command.value==='copy' || command.value==='move')manager.requestTransfer(command.value);break;
      case 'rename': manager.requestRename(); break;
      case 'preview': manager.requestPreview(); break;
      case 'closePreview': manager.closePreview(); break;
      case 'cancelEdit': manager.cancelEdit(); break;
      case 'navigate': if(typeof command.value==='string') void manager.navigate(command.value); break;
      case 'column': if(typeof command.value==='string' && typeof command.index==='number') void manager.openColumn(command.value,command.index); break;
      case 'back': void manager.back(); break;
      case 'forward': void manager.forward(); break;
      case 'up': void manager.up(); break;
      case 'refresh': void manager.refresh(); break;
      case 'hidden': manager.toggleHidden(); break;
      case 'descending': manager.toggleDescending(); break;
      case 'sort': if(['name','size','modified','type'].includes(String(command.value))) manager.setOrder(command.value as Sort); break;
      case 'view': if(['list','grid','columns'].includes(String(command.value))) manager.setView(command.value as ViewMode); break;
      case 'newTab': manager.newTab(typeof command.value==='string' ? command.value : undefined); break;
      case 'closeTab': manager.closeTab(typeof command.value==='string'?command.value:undefined); break;
      case 'selectTab': if(typeof command.value==='string')manager.selectTab(command.value); break;
      case 'nextTab': manager.nextTab(); break;
      case 'prevTab': manager.prevTab(); break;
      case 'open': if(typeof command.value==='string') void manager.open(command.value); break;
      default: manager.reportError('Comando desconhecido.');
    }
  }
  input.on('line',line=>{
    try {handle(JSON.parse(line));} catch {manager.reportError('Comando inválido.');}
  });
  function dispose() {
    if(disposed) return;
    disposed=true;
    output.dispose(); for(const scene of Object.values(scenes))scene.dispose(); transport.close(); input.close();
    resolveClosed();
  }
  input.once('close',dispose);
  async function replaceRegions(regions:AppRegions) {
    if(disposed)throw new Error('UI runtime closed');
    if(reloading)throw new Error('UI reload already in progress');
    const nextGeneration=generation+1;
    const next=createScenes(regions,nextGeneration);
    reloading=true;
    let committed=false;
    try {
      await transport.request({cmd:'replace_scenes',generation:nextGeneration,
        scenes:Object.fromEntries(Object.entries(next).map(([name,scene])=>[name,scene.snapshot()]))});
      if(disposed)throw new Error('UI runtime closed');
      const previous=scenes;scenes=next;generation=nextGeneration;committed=true;
      for(const scene of Object.values(previous)) {try{scene.dispose();}catch(error){manager.reportError(error);}}
      for(const scene of Object.values(next))scene.mount();
    } catch(error) {
      let message=error instanceof Error ? error.message : String(error);
      for(const [name,scene] of Object.entries(next)) {
        const pattern=new RegExp('file:\\/\\/\\/[^\\s]*\\/NandomoReload'+name+'\\.tsx','g');
        const urls=message.match(pattern) ?? [];
        for(const url of new Set(urls))message=formatQmlDiagnostic(message,scene.snapshot().source,url);
      }
      throw new ViewReloadError(message,committed,error);
    } finally {
      if(!committed)for(const scene of Object.values(next))scene.dispose();
      reloading=false;
      if(!disposed)revision.update(value=>value+1);
    }
  }
  return {closed,dispose,replaceRegions};
}
