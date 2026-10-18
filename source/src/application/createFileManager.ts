import { createFileTools,type ToolRequest } from './createFileTools.js';
import { normalizeFolderAppearance, type FolderAppearance, type FolderAppearances } from '../domain/folderAppearance.js';
import { normalizePreferences, defaultPreferences } from '../domain/preferences.js';
import { signal, computed, batch, effect } from '@nandomo/core';
import type { Entry, Place, GameGroup, Sort, ViewMode, DirectoryColumn } from '../domain/files.js';
import { validateName, previewKind } from '../domain/fileActions.js';
import { sortEntries } from '../domain/sortEntries.js';
import { cycleTabIndex, emptyTabState, tabTitle, type TabState } from '../domain/tabs.js';
import { normalizeUsage, type VolumeUsage } from '../domain/volumeUsage.js';
import { uriList } from '../domain/dragPayload.js';
import type { FileManagerServices } from './ports.js';

export function createFileManager(home: string, services: FileManagerServices) {
  const iconCatalog=signal<{emblems:Array<{name:string;source:string}>;logos:Array<{name:string;source:string}>}>({emblems:[],logos:[]});
  const folderAppearances=signal<FolderAppearances>({}), appearanceOpen=signal(false);
  const decorate=(item:Entry):Entry=>{const style=item.directory ? folderAppearances()[item.path] : undefined;return style ? {...item,icon:style.icon || item.icon,folderColor:style.icon ? undefined : style.color,emblem:style.emblem} : item;};
  const permissionsTarget=signal<Entry|null>(null);
  const preferences=signal({...defaultPreferences});
  const toolsRequest=signal<ToolRequest|null>(null);
  const preferencesOpen=signal(false), chooserOpen=signal(false);
  const applications=signal<Array<{id:string;name:string;icon?:string;associated?:boolean}>>([]);
  let chooserTarget:string|undefined;
  const detailsOpen = signal(false);
  const path = signal(home);
  const searchText=signal(''),searchRecursive=signal(false),searchBusy=signal(false),searchResults=signal<Entry[]|null>(null);
  const externalClipboardAvailable=signal(false), activation=signal(0), operationProgress=signal<{completed:number;total:number}|null>(null);
  let transferAbort:AbortController|undefined;

  const entries = signal<Entry[]>([]);
  const columns = signal<DirectoryColumn[]>([]);
  const places = signal<Place[]>([]);
  const drives = signal<Place[]>([]);
  const games = signal<GameGroup[]>([]);
  const hidden = signal(false);
  const order = signal<Sort>('name');
  const descending = signal(false);
  const view = signal<ViewMode>('grid');
  const busy = signal(true);
  const error = signal('');
  const palette = signal<Record<string,string>>({});
  const themeReady = signal(false);
  const videoThumbnails = signal<Record<string,string>>({});
  const icons = signal<Record<string,string>>({});
  const navigation = signal({back:false, forward:false});
  const selected = signal<Entry|null>(null);
  /** Ordered paths of the selection; the focus is always the last one. */
  const selection = signal<string[]>([]);
  let selectionAnchor: string | null = null;
  const mutating = signal(false);
  const remote=signal(false), transferStatus=signal('');
  const newMenuOpen = signal(false);
  const previewOpen = signal(false);
  const clipboard = signal<{entries:Entry[];mode:'copy'|'move'}|null>(null);
  /** Usage by mount path. Only mounted volumes with a real total are present. */
  const volumeUsage = signal<Record<string,VolumeUsage>>({});
  const editRequest = signal<{kind:'rename'|'folder'|'file'|'copy'|'move';name:string;targets:Entry[]}|null>(null);
  const destinationPath=signal(home), destinationFolders=signal<Entry[]>([]), destinationBusy=signal(false);
  let destinationGeneration=0;
  async function browseDestination(target:string) {
    const token=++destinationGeneration;destinationBusy.set(true);
    try {
      const resolved=services.files.resolve(target);
      const listed=await services.files.list(resolved);
      if(disposed || token!==destinationGeneration)return;
      batch(()=>{destinationPath.set(resolved);destinationFolders.set(listed.filter(entry=>entry.directory).sort((a,b)=>a.name.localeCompare(b.name)));error.set('');});
    }catch(problem){if(token===destinationGeneration)reportError(problem);}
    finally{if(!disposed && token===destinationGeneration)destinationBusy.set(false);}
  }
  type TransferTask={source:string;destination:string;mode:'copy'|'move'};
  const conflict=signal<TransferTask|null>(null);
  let pendingTransfers:TransferTask[]=[];
  let transferPath=home;
  async function runTransfers(tasks:TransferTask[],activePath=path.peek()):Promise<boolean> {
    if(disposed)return false;
    transferPath=activePath;transferAbort=new AbortController();
    batch(()=>{mutating.set(true);operationProgress.set({completed:0,total:0});tabReadAt.clear();error.set('');});
    const destinations:string[]=[];
    try{
      if(!services.files.transfer)throw new Error('Transferência indisponível.');
      while(tasks.length){
        transferAbort.signal.throwIfAborted();
        const task=tasks[0]!;
        if(task.source===task.destination)throw new Error('Origem e destino são iguais.');
        if(await services.files.exists?.(task.destination)) {
          pendingTransfers=tasks.slice(1);batch(()=>{conflict.set(task);reportError('Já existe um item com esse nome. Escolha como continuar.');});return false;
        }
        const statusKey=task.mode==='move' ? 'Movendo: {name} → {destination}' : 'Copiando: {name} → {destination}';
        const statusParams={name:task.source.split('/').pop() ?? task.source,destination:task.destination};
        transferStatus.set(services.translate?.(statusKey,statusParams) ?? `${task.mode==='move'?'Movendo':'Copiando'}: ${statusParams.name} → ${task.destination}`);
        await services.files.transfer(task.source,task.destination,task.mode,{signal:transferAbort.signal,progress:value=>{if(!disposed)operationProgress.set(value);}});
        destinations.push(task.destination);tasks=tasks.slice(1);
      }
      editRequest.set(null);conflict.set(null);pendingTransfers=[];
      if(clipboard.peek()?.mode==='move')clipboard.set(null);
      await reloadAfterEdit('',destinations,activePath);
      return true;
    }catch(problem){if(transferAbort?.signal.aborted){if(!disposed&&path.peek()===activePath)await loadDirectory(activePath,'refresh');reportError('Operação cancelada. Itens já concluídos foram preservados.');}else {if(destinations.length&&!disposed&&path.peek()===activePath)await loadDirectory(activePath,'refresh');reportError(problem);}return false;}
    finally{transferAbort=undefined;if(!disposed){mutating.set(false);transferStatus.set('');operationProgress.set(null);}}
  }
  async function resolveConflict(action:'skip'|'rename'|'replace',name='') {
    const task=conflict.peek();if(!task || mutating.peek() || disposed)return;
    try{
      if(action==='rename') {
        validateName(name);
        const destination=services.files.child(services.files.parent(task.destination),name);
        if(destination===task.destination)throw new Error('Escolha um nome diferente.');
        batch(()=>{conflict.set(null);error.set('');});await runTransfers([{...task,destination},...pendingTransfers],transferPath);
      }else if(action==='replace') {
        if(!services.files.replaceFile)throw new Error('Substituição indisponível.');
        mutating.set(true);tabReadAt.clear();await services.files.replaceFile(task.source,task.destination,task.mode);
        batch(()=>{conflict.set(null);error.set('');});await runTransfers(pendingTransfers,transferPath);
      }else{batch(()=>{conflict.set(null);error.set('');});await runTransfers(pendingTransfers,transferPath);}
    }catch(problem){reportError(problem);}finally{if(!disposed)mutating.set(false);}
  }
  const previewSource = computed(() => selected() ? services.files.url(selected()!.path) : '');
  const selectedPreviewKind = computed(() => selected() && !selected()!.directory ? previewKind(selected()!.name) : 'none');
  let history: string[] = [];
  let historyIndex = -1;
  const tabStates = new Map<string, TabState>();
  const tabReadAt = new Map<string, number>();
  let tabRefreshTimer: ReturnType<typeof setTimeout> | undefined;
  function cancelTabRefresh() {clearTimeout(tabRefreshTimer);tabRefreshTimer=undefined;}
  function refreshRestoredTab(id: string, target: string) {
    // Recent listings are already usable. Old ones update quietly after the click.
    if(Date.now() - (tabReadAt.get(id) ?? 0) < 5000) return;
    tabRefreshTimer=setTimeout(()=>{
      tabRefreshTimer=undefined;
      if(!disposed && activeTab.peek()===id && path.peek()===target && !tabLocked())
        void loadDirectory(target,'refresh',0,true);
    },150);
    tabRefreshTimer.unref?.();
  }
  const tabOrder = signal<string[]>([]);
  const activeTab = signal('');
  let tabSequence = 0;
  let generation = 0;
  let locationsGeneration = 0;
  let usageGeneration = 0;
  let themeGeneration = 0;
  let disposed = false;
  const stopVideoThumbnails=effect(() => {
    const listed=entries(), enabled=preferences().thumbnails && !remote();
    let active=true, index=0;
    videoThumbnails.set({});
    if(enabled && services.files.videoThumbnail) {
      const videos=listed.filter(item=>!item.directory && previewKind(item.name)==='video');
      async function worker() {
        while(active && !disposed && index<videos.length) {
          const item=videos[index++]!;
          const source=await services.files.videoThumbnail!(item.path).catch(()=>'');
          if(active && !disposed && source)videoThumbnails.set({...videoThumbnails.peek(),[item.path]:source});
        }
      }
      void worker(); void worker();
    }
    return () => {active=false;};
  });

  const stopSearch=effect(()=>{
    const query=searchText().trim(),folder=path(),deep=searchRecursive(),showHidden=hidden(),network=remote();
    let active=true;const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
    searchResults.set(null);searchBusy.set(false);
    if(query && deep && !folder.includes(':///') && !network && services.files.search) {
      searchBusy.set(true);searchResults.set([]);
      timer=setTimeout(()=>{void services.files.search!(folder,query,{signal:controller.signal,hidden:showHidden}).then(items=>{if(active&&!disposed)searchResults.set(items);}).catch(problem=>{if(active&&!disposed)reportError(problem);}).finally(()=>{if(active&&!disposed)searchBusy.set(false);});},200);
    }
    return ()=>{active=false;controller.abort();clearTimeout(timer);};
  });
  const stopFileWatch=effect(()=>{
    const folder=path(),network=remote();let timer:ReturnType<typeof setTimeout>|undefined;
    if(folder.includes(':///') || network || !services.files.watch)return;
    function refreshChanged() {
      if(disposed || path.peek()!==folder)return;
      if(busy.peek() || mutating.peek()){timer=setTimeout(refreshChanged,250);return;}
      void loadDirectory(folder,'refresh',0,true);
    }
    const stop=services.files.watch(folder,refreshChanged);
    return ()=>{stop();clearTimeout(timer);};
  });
  let stopWatching: (() => void) | undefined;

  const visibleEntries = computed(() => sortEntries((searchResults() ?? entries()).filter(item=>!searchText().trim() || item.name.toLowerCase().includes(searchText().trim().toLowerCase())), order(), descending(), hidden(),preferences().foldersFirst).map(decorate));
  const visibleColumns = computed(() => (searchText().trim() ? [{path:path(),entries:visibleEntries()}] : columns()).map(column => ({
    path: column.path, entries: sortEntries(column.entries, order(), descending(), hidden(),preferences().foldersFirst).map(decorate),
  })));
  const candidates = () => {
    // The current directory is both entries and the first column, so only the
    // remaining columns of the column view add anything.
    const paths = new Set(entries.peek().map(entry => entry.path));
    return [...(searchResults.peek() ?? entries.peek()), ...columns.peek().flatMap(column => column.entries).filter(entry => !paths.has(entry.path))];
  };
  /** What the user sees: selection ranges and Ctrl+A follow this order. */
  const browsable = () => {
    const visible = view.peek() === 'columns'
      ? visibleColumns.peek().flatMap(column => column.entries) : visibleEntries.peek();
    const seen = new Set<string>();
    return visible.filter(entry => {if(seen.has(entry.path))return false;seen.add(entry.path);return true;});
  };
  const orderPaths = (paths: Iterable<string>) => {
    const wanted = new Set(paths);
    const list = browsable().filter(entry => wanted.has(entry.path)).map(entry => entry.path);
    for (const path of wanted) if (!list.includes(path)) list.push(path);
    return list;
  };
  /** Single writer of both signals, so focus and selection can never disagree. */
  function applySelection(paths: readonly string[], focus: string | null) {
    const list = orderPaths(paths);
    const target = focus ? candidates().find(entry => entry.path === focus) ?? null : null;
    batch(() => {
      selected.set(target);
      selection.set(target ? (list.includes(target.path) ? list : [...list, target.path]) : []);
      previewOpen.set(false);
      if (!target) detailsOpen.set(false);
    });
  }
  const selectedEntries = computed(() => {
    const wanted = new Set(selection());
    return candidates().filter(entry => wanted.has(entry.path));
  });
  /** Any modal surface that owns the keyboard. */
  const modalsOpen = computed(() => !!(editRequest() || preferencesOpen() || chooserOpen()
    || toolsRequest() || appearanceOpen() || newMenuOpen() || previewOpen() || conflict() || permissionsTarget()));

  // Tabs ---------------------------------------------------------------------
  // One manager, one filesystem, one theme watcher: a tab only stores where it
  // is. Switching restores that state and refreshes the listing in the
  // background, so services and listeners are never rebuilt per tab.
  function currentTabState(): TabState {
    return {
      path: path.peek(), entries: entries.peek(), columns: columns.peek(),
      history: [...history], historyIndex, selection: [...selection.peek()],
      selected: selected.peek()?.path ?? null, anchor: selectionAnchor,
      remote: remote.peek(), view: view.peek(), navigation: { ...navigation.peek() },
    };
  }
  function storeTabState(id: string, state: TabState) { tabStates.set(id, state); }
  function restoreTabState(state: TabState) {
    searchText.set('');
    history = [...state.history];
    historyIndex = state.historyIndex;
    selectionAnchor = state.anchor;
    batch(() => {
      path.set(state.path); entries.set(state.entries); columns.set(state.columns);
      remote.set(state.remote); view.set(state.view); navigation.set(state.navigation);
      previewOpen.set(false);
    });
    // The selection is applied through the same writer as a click, so focus
    // and selection of the restored tab can never disagree.
    applySelection(state.selection, state.selected);
  }
  /** Switching is refused while something is running or asking for attention. */
  function tabLocked(): boolean {
    return mutating.peek() || !!conflict.peek() || modalsOpen.peek();
  }
  function refuseTabSwitch() { reportError('Aguarde o fim da operação atual.'); }
  function openTabState(state: TabState, view: ViewMode): Promise<void> {
    const id = `tab-${++tabSequence}`;
    storeTabState(id, state);
    const previous = activeTab.peek();
    if (previous) storeTabState(previous, currentTabState());
    batch(() => { tabOrder.update(order => [...order, id]); activeTab.set(id); restoreTabState({ ...state, view }); });
    error.set('');
    // The listing is refreshed by the existing loader, without touching history.
    return loadDirectory(state.path, 'refresh');
  }
  const tabsSummary = computed(() => {
    const active=activeTab(), current=path();
    return tabOrder().map(id => {
      const location = id === active ? current : tabStates.get(id)?.path ?? home;
      const title=location===home ? 'Pasta pessoal' : tabTitle(location);
      return {id, title:(location===home || location.includes(':///')) ? services.translate?.(title) ?? title : title, path:location, active:id===active};
    });
  });
  // The window always owns one tab, created before anything is loaded.
  {
    const first = `tab-${++tabSequence}`;
    storeTabState(first, emptyTabState(home, view.peek()));
    tabOrder.set([first]);
    activeTab.set(first);
  }

  async function newTab(target?: string) {
    if (disposed) return Promise.resolve();
    if (tabLocked()) { refuseTabSwitch(); return Promise.resolve(); }
    const base = currentTabState();
    // A new tab opens the folder of the current one, with its own history.
    return openTabState(emptyTabState(target ?? base.path, base.view), base.view);
  }
  async function selectTab(id: string) {
    if (disposed || id === activeTab.peek()) return Promise.resolve();
    const state = tabStates.get(id);
    if (!state) return Promise.resolve();
    if (tabLocked()) { refuseTabSwitch(); return Promise.resolve(); }
    const previous = activeTab.peek();
    if (previous) storeTabState(previous, currentTabState());
    cancelTabRefresh();
    generation++; // A directory read from the departing tab must not commit here.
    batch(() => { activeTab.set(id); restoreTabState(state); busy.set(false); error.set(''); });
    refreshRestoredTab(id,state.path);
  }
  async function closeTab(requested?: string) {
    if (disposed) return Promise.resolve();
    const id = requested ?? activeTab.peek();
    const order = tabOrder.peek();
    const at = order.indexOf(id);
    if (at < 0) return Promise.resolve();
    if (tabLocked()) { refuseTabSwitch(); return Promise.resolve(); }
    const closing = id === activeTab.peek() ? currentTabState() : tabStates.get(id)!;
    tabStates.delete(id);tabReadAt.delete(id);
    const remaining = order.filter(tab => tab !== id);
    if (!remaining.length) {
      // Closing the last tab leaves the window on a single fresh tab.
      const fresh = emptyTabState(closing.path, closing.view);
      const replacement = `tab-${++tabSequence}`;
      storeTabState(replacement, fresh);
      batch(() => { tabOrder.set([replacement]); activeTab.set(replacement); restoreTabState(fresh); });
      error.set('');
      return loadDirectory(fresh.path, 'refresh');
    }
    const next = remaining[Math.min(at, remaining.length - 1)]!;
    const wasActive = id === activeTab.peek();
    if (!wasActive) { tabOrder.set(remaining); return; }
    const state = tabStates.get(next)!;
    batch(() => {tabOrder.set(remaining);activeTab.set(next);restoreTabState(state);});
    error.set('');
    return loadDirectory(state.path, 'refresh');
  }
  async function cycleTab(delta: number) {
    const next = cycleTabIndex(tabOrder.peek(), activeTab.peek(), delta);
    if (next) await selectTab(next);
  }

  /** Space used by the mounted volumes; a failure keeps the sidebar intact. */
  async function loadVolumeUsage() {
    if (disposed || !services.locations.volumeUsage) return;
    const token = ++usageGeneration;
    const targets = drives.peek().filter(place => place.mounted === true && !!place.path).map(place => place.path);
    if (!targets.length) { volumeUsage.set({}); return; }
    try {
      const reported = await services.locations.volumeUsage(targets);
      if (disposed || token !== usageGeneration) return;
      const next: Record<string, VolumeUsage> = {};
      for (const [mount, value] of Object.entries(reported)) {
        const usage = normalizeUsage(value);
        if (usage) next[mount] = usage;
      }
      volumeUsage.set(next);
    } catch {
      if (!disposed && token === usageGeneration) volumeUsage.set({});
    }
  }
  const selectedDetails=signal<{permissions:string;owner:string;items?:number;folders?:number}|null>(null);
  let detailsGeneration=0;
  const stopDetails=effect(()=>{
    const target=selected();const token=++detailsGeneration;selectedDetails.set(null);
    if(target && services.files.details)void services.files.details(target.path).then(value=>{if(!disposed && token===detailsGeneration)selectedDetails.set(value);}).catch(()=>{});
  });
  const snapshot = computed(() => ({
    locale:services.locale?.(),detailsOpen:detailsOpen(),detailsVisible:preferences().detailsAlwaysVisible || (!!selected() && detailsOpen()),remote:remote(),transferStatus:transferStatus()+(operationProgress() && operationProgress()!.total>0 ? ' · '+Math.round(operationProgress()!.completed/operationProgress()!.total*100)+'%' : ''),
    destinationPath:destinationPath(),destinationBusy:destinationBusy(),
    canCancelTransfer:mutating() && !!operationProgress(),canUndo:!mutating() && !!services.files.canUndo?.(),searchText:searchText(),searchBusy:searchBusy(),searchRecursive:searchRecursive(),activation:activation(),operationProgress:operationProgress(),canPaste:!!clipboard() || externalClipboardAvailable(),themeReady:themeReady(),videoThumbnails:videoThumbnails(),preferences:preferences(),preferencesOpen:preferencesOpen(),chooserOpen:chooserOpen(),applications:applications(), home, path:path(), entries:visibleEntries(), columns:visibleColumns(), drives:drives(), games:games(), places:places(),
    modalsOpen:modalsOpen(),
    hidden:hidden(), order:order(), descending:descending(), view:view(), busy:busy(), error:error(),
    palette:palette(), icons:{...icons(),...Object.fromEntries(iconCatalog().emblems.map(item=>[item.name,item.source]))}, ...navigation(), selected:selected(), mutating:mutating(),
    selection:[...selection()], selectionCount:selection().length,
    conflict:conflict(), clipboard:clipboard(), newMenuOpen:newMenuOpen(), previewOpen:previewOpen(), editRequest:editRequest(),
    previewSource:previewSource(), previewKind:selectedPreviewKind(),
    tabs:tabsSummary(), activeTab:activeTab(),
    // One URI per selected entry, so the native drag offers the whole selection.
    selectionUris:uriList(selectedEntries().map(entry=>entry.path), path=>services.files.url(path)),
    volumeUsage:{...volumeUsage()},
  }));

  function reportError(problem: unknown) {
    if (!disposed) error.set(services.translate?.(problem instanceof Error ? problem.message : String(problem)) ?? (problem instanceof Error ? problem.message : String(problem)));
  }
  async function loadDirectory(target: string, kind: 'push'|'back'|'forward'|'refresh'|'column' = 'push', columnIndex = 0, quiet = false) {
    if (disposed) return;
    if(kind !== 'refresh')searchText.set('');
    cancelTabRefresh();
    const token = ++generation;
    batch(() => { if(!quiet)busy.set(true); error.set(''); });
    try {
      const virtual=['trash:///','recent:///','applications:///'].includes(target);
      const nextPath = virtual ? target : target.includes('://') && !target.startsWith('file://') ? await services.desktop.resolveLocation?.(target) ?? (()=>{throw new Error('Instale GVfs para abrir locais de rede.');})() : services.files.resolve(target.startsWith('file://') && services.files.fromUrl ? services.files.fromUrl(target) : target);
      let nextEntries:Entry[];
      if(nextPath==='applications:///') {
        if(!services.desktop.applications)throw new Error('Aplicativos indisponíveis.');
        const apps=await services.desktop.applications();applications.set(apps);
        nextEntries=apps.map(app=>({name:app.name,path:app.id,directory:false,symlink:false,size:0,modified:0,icon:app.icon || 'package-x-generic'}));
      }else if(virtual){
        if(!services.desktop.virtualEntries)throw new Error('Local virtual indisponível.');
        nextEntries=await services.desktop.virtualEntries(nextPath);
      }else nextEntries=await services.files.list(nextPath);
      const nextRemote=virtual ? false : await services.files.remote?.(nextPath).catch(()=>false) ?? false;
      if (disposed || token !== generation) return;
      tabReadAt.set(activeTab.peek(),Date.now());
      const wanted=new Set(selection.peek()), previousFocus=selected.peek()?.path ?? null;
      batch(() => {
        if (kind === 'push' || kind === 'column') {
          history.splice(historyIndex + 1);
          history.push(nextPath);
          historyIndex++;
        } else if (kind === 'back') historyIndex--;
        else if (kind === 'forward') historyIndex++;
        if(nextPath==='recent:///' && kind==='push'){order.set('modified');descending.set(true);}
        path.set(nextPath);remote.set(nextRemote);
        entries.set(nextEntries);
        previewOpen.set(false);
        const nextColumn = {path:nextPath, entries:nextEntries};
        columns.set(kind === 'column' ? [...columns.peek().slice(0,columnIndex + 1), nextColumn] : kind === 'refresh' && columns.peek().length ? columns.peek().map(column=>column.path===nextPath ? nextColumn : column) : [nextColumn]);
        navigation.set({back:historyIndex > 0, forward:historyIndex < history.length - 1});
      });
      // Selection reads the listing, so it is applied once the columns agree with it.
      const retained = kind === 'refresh' ? candidates().filter(entry => wanted.has(entry.path)).map(entry => entry.path) : [];
      applySelection(retained, retained.includes(previousFocus ?? '') ? previousFocus : retained[retained.length - 1] ?? null);
    } catch (problem) {
      if (token === generation) reportError(problem);
    } finally {
      if (!disposed && token === generation) busy.set(false);
    }
  }
  async function refreshLocations() {
    const token = ++locationsGeneration;
    const results = await Promise.allSettled([services.locations.volumes(), services.locations.games(home), services.locations.places?.(home) ?? Promise.resolve([])]);
    if (disposed || token !== locationsGeneration) return;
    batch(() => {
      if (results[0].status === 'fulfilled') drives.set(results[0].value);
      else reportError('Não foi possível consultar volumes.');
      if (results[1].status === 'fulfilled') games.set(results[1].value);
      if (results[2].status === 'fulfilled') places.set(results[2].value);
    });
    void loadVolumeUsage();
  }
  async function refreshTheme() {
    const token = ++themeGeneration;
    try {
      const theme = await services.desktop.theme();
      if (disposed || token !== themeGeneration) return;
      batch(() => { palette.set(theme.palette); icons.set(theme.icons); });
    } catch { if (!disposed && token === themeGeneration) palette.set({}); }
    finally { if (!disposed && token === themeGeneration) themeReady.set(true); }
  }
  async function open(target: string) {
    if (disposed) return;
    try {
      if(path.peek()==='applications:///'){
        if(!applications.peek().some(app=>app.id===target))throw new Error('Aplicativo inválido.');
        if(!services.desktop.launch)throw new Error('Não foi possível iniciar o aplicativo.');
        await services.desktop.launch(target);
      }else await services.files.open(services.files.resolve(target));
    }
    catch (problem) { reportError(problem); }
  }
  function select(target: string | null) {
    selectPath(target, 'replace');
  }
  /** One entry point for click, keyboard and context menus. */
  function selectPath(target: string | null, mode: 'replace'|'toggle'|'range'|'context' = 'replace') {
    if (target === null) { selectionAnchor = null; applySelection([], null); return; }
    if (!candidates().some(entry => entry.path === target)) return;
    const list = browsable();
    const index = list.findIndex(entry => entry.path === target);
    if (index < 0) { applySelection([target], target); return; }
    if (mode === 'context') {
      // A right click inside the selection keeps it; outside it replaces it.
      if (selection.peek().includes(target)) applySelection(selection.peek(), target);
      else selectPath(target, 'replace');
      return;
    }
    if (mode === 'toggle') {
      const current = selection.peek();
      if (current.includes(target)) {
        const remaining = current.filter(path => path !== target);
        const focus = remaining.length
          ? remaining.reduce((best, path) => Math.abs(list.findIndex(entry => entry.path === path) - index)
              < Math.abs(list.findIndex(entry => entry.path === best) - index) ? path : best)
          : null;
        selectionAnchor = focus;
        applySelection(remaining, focus);
        return;
      }
      selectionAnchor = target;
      applySelection([...current, target], target);
      return;
    }
    if (mode === 'range') {
      const anchor = selectionAnchor && list.some(entry => entry.path === selectionAnchor) ? selectionAnchor : target;
      const from = list.findIndex(entry => entry.path === anchor);
      const [start, end] = from <= index ? [from, index] : [index, from];
      applySelection(list.slice(start, end + 1).map(entry => entry.path), target);
      return;
    }
    selectionAnchor = target;
    applySelection([target], target);
  }
  function selectAll() {
    const list = browsable().filter(entry => entries.peek().some(item => item.path === entry.path));
    if (!list.length) return;
    if (!(selection.peek()[0] && list.some(entry => entry.path === selection.peek()[0]))) selectionAnchor = list[0]!.path;
    applySelection(list.map(entry => entry.path), list[list.length - 1]!.path);
  }
  /**
   * Keyboard movement. `index` walks the current listing, `row` stays inside the
   * column that holds the focus and `column` moves between columns.
   */
  function navigateSelection(axis: 'index'|'row'|'column', delta: number, extend = false) {
    if (!Number.isInteger(delta) || !delta) return;
    const focus = selected.peek();
    if (!focus) { selectPath(browsable()[0]?.path ?? null); return; }
    const flat = browsable();
    if (axis === 'index' || flat.length < 2) {
      const at = flat.findIndex(entry => entry.path === focus.path);
      if (at < 0) return;
      selectPath(flat[Math.max(0, Math.min(flat.length - 1, at + delta))]!.path, extend ? 'range' : 'replace');
      return;
    }
    const columnsList = visibleColumns.peek();
    const columnIndex = Math.max(0, columnsList.findIndex(column => column.entries.some(entry => entry.path === focus.path)));
    if (axis === 'row') {
      const entriesList = columnsList[columnIndex]?.entries ?? [];
      const at = entriesList.findIndex(entry => entry.path === focus.path);
      if (at < 0) return;
      selectPath(entriesList[Math.max(0, Math.min(entriesList.length - 1, at + delta))]!.path, extend ? 'range' : 'replace');
      return;
    }
    const next = columnIndex + delta;
    if (next < 0 || next >= columnsList.length) return;
    const row = columnsList[columnIndex]?.entries.findIndex(entry => entry.path === focus.path) ?? 0;
    const neighbour = columnsList[next]!.entries;
    // Prefer the entry with the same name, otherwise keep the same row.
    const target = neighbour.find(entry => entry.name === focus.name)
      ?? neighbour[Math.min(Math.max(row, 0), neighbour.length - 1)];
    if (target) selectPath(target.path, extend ? 'range' : 'replace');
  }
  async function trashSelected() {
    const targets=selectedEntries.peek(), activePath=path.peek();
    if(!targets.length || disposed || mutating.peek() || conflict.peek() || activePath.includes(':///'))return;
    let changed=false;
    try {
      if(!services.files.trash)throw new Error('Lixeira indisponível.');
      mutating.set(true);tabReadAt.clear();error.set('');
      for(const target of targets) {
        if(disposed)return;
        await services.files.trash(target.path);changed=true;
        const held=clipboard.peek();
        if(held?.entries.some(entry=>entry.path===target.path))clipboard.set(null);
      }
      if(disposed)return;
      if(path.peek()===activePath)await loadDirectory(activePath,'refresh');
    }catch(problem){
      if(changed && !disposed && path.peek()===activePath)await loadDirectory(activePath,'refresh');
      reportError(problem);
    }finally{if(!disposed)mutating.set(false);}
  }
  function requestCreate(kind:'file'|'folder') {
    if(mutating.peek()) return;
    if(path.peek().includes(':///')){reportError('Abra uma pasta para criar um item.');return;}
    batch(() => { error.set(''); newMenuOpen.set(false); editRequest.set({kind,name:'',targets:[]}); });
  }
  function requestRename() {
    const targets=selectedEntries.peek();
    if(path.peek().includes(':///')){reportError('Abra a pasta original para renomear este item.');return;}
    if(!targets.length || mutating.peek()) return;
    if(targets.length>1){tools.open('bulk');return;}
    batch(() => { error.set(''); editRequest.set({kind:'rename',name:targets[0]!.name,targets}); });
  }
  async function reloadAfterEdit(previous: string, destinations: readonly string[], activePath: string) {
    if(disposed || path.peek() !== activePath) return;
    if(activePath.includes(':///')){await loadDirectory(activePath,'refresh');return;}
    const token=++generation;
    const refreshed=await Promise.all(columns.peek().map(async column => ({path:column.path,entries:await services.files.list(column.path)})));
    if(disposed || token !== generation || path.peek() !== activePath) return;
    batch(() => {
      columns.set(refreshed);
      entries.set(refreshed.find(column => column.path === activePath)?.entries ?? []);
      const landed=refreshed.flatMap(column=>column.entries).filter(entry=>destinations.includes(entry.path));
      if(!selected.peek() || selected.peek()?.path === previous || !previous)
        applySelection(landed.map(entry=>entry.path), landed[landed.length - 1]?.path ?? null);
    });
  }
  async function submitEdit(name: string) {
    const request=editRequest.peek();
    if(!request || disposed || mutating.peek() || conflict.peek()) return false;
    const activePath=path.peek();
    try {
      if(activePath==='applications:///')throw new Error('Aplicativos não podem ser alterados nesta visualização.');
      const transfer=request.kind === 'copy' || request.kind === 'move';
      if(!transfer) validateName(name);
      else if(!name.trim()) throw new Error('Informe a pasta de destino.');
      const targets=request.targets;
      if(transfer && !targets.length) throw new Error('Selecione um item para transferir.');
      const parent=transfer ? services.files.resolve(name) : targets[0] ? services.files.parent(targets[0].path) : activePath;
      batch(() => { mutating.set(true);tabReadAt.clear(); error.set(''); });
      if(transfer) {
        if(!services.files.transfer) throw new Error('Transferência indisponível.');
        editRequest.set(null);
        return await runTransfers(targets.map(target=>({
          source:target.path,destination:services.files.child(parent,target.name),mode:request.kind as 'copy'|'move',
        })),activePath);
      }
      const destination=services.files.child(parent,name);
      if(request.kind === 'rename') await services.files.rename(targets[0]!.path,destination);
      else if(request.kind === 'file' || request.kind === 'folder') await services.files.create(destination,request.kind);
      if(disposed) return false;
      // The disk operation succeeded; close the dialog even if a later refresh fails.
      editRequest.set(null);
      previewOpen.set(false);
      await reloadAfterEdit(targets[0]?.path ?? '',[destination],activePath);
      return true;
    } catch(problem) { reportError(problem); return false; }
    finally { if(!disposed) mutating.set(false); }
  }
  const tools=createFileTools({request:toolsRequest,path,selected:selectedEntries,entries,mutating,files:services.files,desktop:services.desktop,
    refresh:()=>loadDirectory(path.peek(),'refresh'),onError:reportError});
  return {
    tools,
    searchText,searchRecursive,searchBusy,operationProgress,
    setSearch:(value:string)=>searchText.set(value),
    setSearchRecursive:(value:boolean)=>searchRecursive.set(value),
    setExternalClipboardAvailable:(value:boolean)=>externalClipboardAvailable.set(value),
    canPaste:()=>!!clipboard() || externalClipboardAvailable(),
    cancelTransfer:()=>transferAbort?.abort(),
    canCancelTransfer:()=>mutating() && !!operationProgress(),
    canUndo:()=>!mutating() && !!services.files.canUndo?.(),
    undo:async()=>{if(mutating.peek()||!services.files.undo)return;mutating.set(true);try{await services.files.undo();tabReadAt.clear();await loadDirectory(path.peek(),'refresh');}catch(problem){reportError(problem);}finally{if(!disposed)mutating.set(false);}},
    reveal:async(urls:string[],properties=false,folders=false)=>{
      for(const [index,url] of urls.entries())try {
        const target=url.startsWith('file:')&&services.files.fromUrl?services.files.fromUrl(url):await services.desktop.resolveLocation?.(url);
        if(!target)throw new Error('Local indisponível.');
        if(index>0)await newTab(folders?target:services.files.parent(target));else await loadDirectory(folders?target:services.files.parent(target));
        if(!folders){selectPath(target,'replace');if(properties)detailsOpen.set(true);}
      }catch(problem){reportError(problem);}
      activation.update(value=>value+1);
    },
    restoreSelected:async()=>{
      if(path.peek()!=='trash:///'||mutating.peek()||!services.desktop.restoreTrash)return;
      const targets=selectedEntries.peek();if(!targets.length)return;
      let failure:unknown;mutating.set(true);try{await services.desktop.restoreTrash(targets.map(item=>item.path));}catch(problem){failure=problem;}finally{if(!disposed){await loadDirectory('trash:///','refresh');if(failure)reportError(failure);mutating.set(false);}}
    },
    permissionsTarget,
    editPermissions:()=>{if(selected.peek() && path.peek()!=='applications:///')permissionsTarget.set(selected.peek());},
    closePermissions:()=>{if(!mutating.peek())permissionsTarget.set(null);},
    savePermissions:async(mode:number)=>{
      const target=permissionsTarget.peek();if(!target || mutating.peek())return;
      try{if(!services.files.setPermissions)throw new Error('Edição de permissões indisponível.');mutating.set(true);tabReadAt.clear();error.set('');await services.files.setPermissions(target.path,mode);if(disposed)return;if(selected.peek()?.path===target.path && services.files.details)selectedDetails.set(await services.files.details(target.path));permissionsTarget.set(null);}catch(problem){reportError(problem);}finally{if(!disposed)mutating.set(false);}
    },
    iconCatalog,
    locationAction:async(action:string,place:Place)=>{try{
      if(action==='addCurrent'){if(path.peek().includes(':///'))throw new Error('Abra uma pasta para adicioná-la a Locais.');if(!services.locations.bookmark)throw new Error('Favoritos indisponíveis.');await services.locations.bookmark(home,path.peek());}
      else if(action==='remove' || action==='add'){if(!services.locations.bookmark)throw new Error('Favoritos indisponíveis.');await services.locations.bookmark(home,place.path,action==='remove');}
      else if(action==='mount' || action==='unmount'){if(!services.locations.volumeAction)throw new Error('Volumes indisponíveis.');await services.locations.volumeAction(action,place);}
      await refreshLocations();
    }catch(problem){reportError(problem);}},
    addSelectedPlace:async()=>{const target=selected.peek();if(!target?.directory)return;try{await services.locations.bookmark?.(home,target.path);await refreshLocations();}catch(problem){reportError(problem);}},
    folderAppearances,appearanceOpen,
    customizeFolder:()=>{void services.desktop.iconCatalog?.().then(value=>{if(!disposed)iconCatalog.set(value);}).catch(reportError);if(selected.peek()?.directory && !path.peek().includes(':///') && !mutating.peek())appearanceOpen.set(true);},
    closeAppearance:()=>appearanceOpen.set(false),
    saveFolderAppearance:async(value:FolderAppearance)=>{
      const target=selected.peek();if(!target?.directory)return;
      const next={...folderAppearances.peek(),[target.path]:normalizeFolderAppearance(value)};
      try{if(!services.desktop.writeFolderAppearances)throw new Error('Personalização indisponível.');await services.desktop.writeFolderAppearances(next);if(disposed)return;folderAppearances.set(next);appearanceOpen.set(false);}catch(problem){reportError(problem);}
    },
    preferences,preferencesOpen,chooserOpen,applications,
    showPreferences:()=>preferencesOpen.set(true),closePreferences:()=>preferencesOpen.set(false),
    setPreference:(key:string,value:unknown)=>{const next=normalizePreferences({...preferences.peek(),[key]:value});preferences.set(next);void services.desktop.writePreferences?.(next).catch(reportError);},
    chooseApplication:async(target?:string)=>{try{if(!services.desktop.applications)throw new Error('Seletor indisponível.');chooserTarget=target;applications.set(await services.desktop.applications(target));chooserOpen.set(true);}catch(e){reportError(e);}},
    closeChooser:()=>chooserOpen.set(false),
    launchApplication:async(id:string)=>{try{if(!applications.peek().some(app=>app.id===id))throw new Error('Aplicativo inválido.');await services.desktop.launch?.(id,chooserTarget);chooserOpen.set(false);}catch(e){reportError(e);}},
    special:(uri:string)=>loadDirectory(uri),
    openDesktopFile:async()=>{const item=selected.peek();if(path.peek()!=='applications:///' || !item)return;try{if(!services.desktop.openDesktopFile)throw new Error('Editor de texto indisponível.');await services.desktop.openDesktopFile(item.path);}catch(problem){reportError(problem);}},
    manageApplication:async()=>{const item=selected.peek();if(path.peek()!=='applications:///' || !item)return;try{if(!services.desktop.manageApplication)throw new Error('Gerenciador de aplicativos indisponível.');await services.desktop.manageApplication(item.path);}catch(problem){reportError(problem);}},
    hideApplication:async()=>{const item=selected.peek();if(path.peek()!=='applications:///' || !item)return;try{if(!services.desktop.hideApplication)throw new Error('Ocultar indisponível.');await services.desktop.hideApplication(item.path);await loadDirectory('applications:///','refresh');}catch(problem){reportError(problem);}},
    showApplications:()=>loadDirectory('applications:///'),
    terminal:async()=>{try{await services.desktop.terminal?.(path.peek());}catch(e){reportError(e);}},
    home, path, places, drives, games, hidden, order, descending, view, busy, error, navigation, palette, icons,
    visibleEntries, visibleColumns, snapshot, reportError,
    remote, transferStatus, selected, selection, selectedEntries, selectionAnchor:()=>selectionAnchor, selectedDetails, mutating, editRequest, previewOpen, previewSource, selectedPreviewKind,
    detailsOpen, openDetails:(target?:string)=>{if(target)selectPath(target);if(selected.peek())detailsOpen.set(true);},
    closeDetails:()=>detailsOpen.set(false), trashSelected,
    select, selectPath, selectAll, navigateSelection, requestCreate, requestRename, submitEdit,
    tabs:tabsSummary, activeTab, newTab, selectTab, closeTab,
    nextTab:()=>cycleTab(1), prevTab:()=>cycleTab(-1),
    volumeUsage,
    conflict,resolveConflict,
    cancelConflict:()=>{if(!mutating.peek()){conflict.set(null);pendingTransfers=[];editRequest.set(null);}},
    destinationPath,destinationFolders,destinationBusy,browseDestination,
    destinationUp:()=>browseDestination(services.files.parent(destinationPath.peek())),
    confirmDestination:()=>destinationBusy.peek() ? Promise.resolve(false) : submitEdit(destinationPath.peek()),
    dropFiles:async(urls:string[],folder:string,mode:'copy'|'move')=>{
      if(disposed || mutating.peek() || conflict.peek())return false;
      const activePath=path.peek();
      try {
        if(!services.files.fromUrl || !services.files.transfer)throw new Error('Arrastar arquivos indisponível.');
        const sources=[...new Set(urls.map(url=>services.files.fromUrl!(url)))];
        if(!sources.length)return false;
        return await runTransfers(sources.map(source=>{
          const name=source.split('/').pop()!;validateName(name);
          return {source,destination:services.files.child(folder,name),mode};
        }),activePath);
      }catch(e){reportError(e);return false;}finally{if(!disposed)mutating.set(false);}
    },
    copy:()=>{const targets=selectedEntries.peek();if(path.peek()==='applications:///'||!targets.length)return;clipboard.set({entries:[...targets],mode:'copy'});void services.desktop.writeFileClipboard?.({urls:targets.map(item=>services.files.url(item.path)),mode:'copy'}).catch(reportError);},
    cut:()=>{const targets=selectedEntries.peek();if(path.peek().includes(':///')){reportError('Abra a pasta original para recortar este item.');return;}if(targets.length){clipboard.set({entries:[...targets],mode:'move'});void services.desktop.writeFileClipboard?.({urls:targets.map(item=>services.files.url(item.path)),mode:'move'}).catch(reportError);}},
    requestTransfer:(kind:'copy'|'move')=>{
      if(path.peek()==='applications:///' || (path.peek()==='trash:///' && kind==='move')){reportError('Abra uma pasta para transferir este item.');return;}
      const targets=selectedEntries.peek();
      if(targets.length && !mutating.peek() && !conflict.peek()){error.set('');editRequest.set({kind,targets:[...targets],name:path.peek()});void browseDestination(path.peek().includes(':///') ? home : path.peek());}},
    paste:async()=>{
      if(conflict.peek())return;
      if(mutating.peek() || path.peek().includes(':///')){reportError('Escolha uma pasta de destino.');return;}
      try {
        const destinationPath=path.peek();
        if(services.desktop.readFileClipboard) {
          const external=await services.desktop.readFileClipboard();
          if(!external){clipboard.set(null);return;}
          const targets:Entry[]=external.urls.map(url=>{
            if(!services.files.fromUrl || !url.startsWith('file:'))throw new Error('Copie arquivos de uma localização local ou montada.');
            const path=services.files.fromUrl(url);return {path,name:path.split('/').pop()!,directory:false,symlink:false,size:0,modified:0,icon:'text-x-generic'};
          });
          clipboard.set({entries:targets,mode:external.mode});
        }
        if(path.peek()!==destinationPath || mutating.peek() || disposed)return;
        const held=clipboard.peek();if(held?.entries.length)await runTransfers(held.entries.map(target=>({
          source:target.path,destination:services.files.child(destinationPath,target.name),mode:held.mode,
        })),destinationPath);
      }catch(problem){reportError(problem);}
    },
    requestNew: () => newMenuOpen.set(true),
    closeNewMenu: () => newMenuOpen.set(false),
    cancelEdit: () => { if(!mutating.peek()){editRequest.set(null);conflict.set(null);pendingTransfers=[];} },
    requestPreview: () => { if(selected.peek() && selectedPreviewKind() !== 'none') previewOpen.set(true); },
    closePreview: () => previewOpen.set(false),
    navigate: (target: string) => loadDirectory(target),
    back: () => historyIndex > 0 ? loadDirectory(history[historyIndex - 1]!, 'back') : Promise.resolve(),
    forward: () => historyIndex < history.length - 1 ? loadDirectory(history[historyIndex + 1]!, 'forward') : Promise.resolve(),
    up: () => loadDirectory(path.peek().includes(':///') ? home : services.files.parent(path.peek())),
    refresh: () => Promise.all([loadDirectory(path.peek(), 'refresh'), refreshLocations()]),
    open,
    openColumn: (target: string, index: number) => {
      if (!Number.isInteger(index) || index < 0 || index >= columns.peek().length) return Promise.resolve();
      return loadDirectory(target, 'column', index);
    },
    toggleHidden: () => hidden.update(value => !value),
    toggleDescending: () => descending.update(value => !value),
    setOrder: (value: Sort) => order.set(value),
    setView: (value: ViewMode) => view.set(value),
    async initialize(startPath = home) {
      if (disposed) return;
      if(services.desktop.readFolderAppearances){const saved=await services.desktop.readFolderAppearances();if(disposed)return;folderAppearances.set(saved);}
      if(services.desktop.readPreferences){const saved=await services.desktop.readPreferences();if(disposed)return;preferences.set(normalizePreferences(saved));}
      stopWatching ??= services.desktop.watchTheme(() => { void refreshTheme(); });
      const seed = activeTab.peek();
      if (seed) storeTabState(seed, emptyTabState(startPath, view.peek()));
      await Promise.all([loadDirectory(startPath), refreshLocations(), refreshTheme(),services.desktop.iconCatalog?.().then(value=>{if(!disposed)iconCatalog.set(value);}).catch(reportError)]);
    },
    dispose() {
      if (disposed) return;
      disposed = true;destinationGeneration++;usageGeneration++;pendingTransfers=[];
      cancelTabRefresh();generation++;tabStates.clear();tabReadAt.clear();
      transferAbort?.abort();stopWatching?.();stopDetails.dispose();stopVideoThumbnails.dispose();stopSearch.dispose();stopFileWatch.dispose();
      snapshot.dispose(); tabsSummary.dispose(); visibleColumns.dispose(); visibleEntries.dispose(); previewSource.dispose(); selectedPreviewKind.dispose(); selectedEntries.dispose(); modalsOpen.dispose();
    },
  };
}
export type FileManager = ReturnType<typeof createFileManager>;
