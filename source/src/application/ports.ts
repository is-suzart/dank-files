import type { Entry, Place, GameGroup, DesktopTheme } from '../domain/files.js';
import type { VolumeUsage } from '../domain/volumeUsage.js';

export interface FileClipboard {urls:string[];mode:"copy"|"move";}
export interface TransferProgress {completed:number;total:number;}
export interface TransferOptions {signal?:AbortSignal;progress?:(value:TransferProgress)=>void;}
export interface FileSystem {
  search?(path:string,query:string,options?:{signal?:AbortSignal;hidden?:boolean}):Promise<Entry[]>;
  watch?(path:string,changed:()=>void):()=>void;
  undo?():Promise<void>;
  renameMany?(plan:Array<{source:string;destination:string}>):Promise<void>;
  canUndo?():boolean;
  archive?(paths:string[],destination:string):Promise<void>;
  extract?(source:string,destination:string):Promise<void>;
  videoThumbnail?(path:string):Promise<string>;
  trash?(path:string):Promise<void>;
  setPermissions?(path:string,mode:number):Promise<void>;
  remote?(path:string):Promise<boolean>;
  details?(path:string):Promise<{permissions:string;owner:string;items?:number;folders?:number}>;
  list(path: string): Promise<Entry[]>;
  resolve(path: string): string;
  parent(path: string): string;
  open(path: string): Promise<void>;
  child(parent: string, name: string): string;
  url(path: string): string;
  fromUrl?(url:string):string;
  create(path: string, kind: 'file'|'folder'): Promise<void>;
  exists?(path:string):Promise<boolean>;
  replaceFile?(source:string,destination:string,mode:'copy'|'move'):Promise<void>;
  transfer?(source:string,destination:string,mode:'copy'|'move',options?:TransferOptions):Promise<void>;
  rename(source: string, destination: string): Promise<void>;
}
export interface Locations {
  bookmark?(home:string,path:string,remove?:boolean):Promise<void>;
  volumeAction?(action:'mount'|'unmount',place:Place):Promise<void>;
  /** Space used by each mounted path; unmounted or unreadable paths are omitted. */
  volumeUsage?(paths:readonly string[]):Promise<Record<string,VolumeUsage>>;
  places?(home:string):Promise<Place[]>;
  volumes(): Promise<Place[]>;
  games(home: string): Promise<GameGroup[]>;
}
export interface Desktop {
  readFileClipboard?():Promise<FileClipboard|null>;
  writeFileClipboard?(value:FileClipboard):Promise<void>;
  resolveLocation?(uri:string):Promise<string>;
  restoreTrash?(paths:string[]):Promise<void|string[]>;
  emptyTrash?(paths:string[]):Promise<void|string[]>;
  iconCatalog?():Promise<{emblems:Array<{name:string;source:string}>;logos:Array<{name:string;source:string}>}>;
  readFolderAppearances?():Promise<import('../domain/folderAppearance.js').FolderAppearances>;
  writeFolderAppearances?(value:import('../domain/folderAppearance.js').FolderAppearances):Promise<void>;
  readPreferences?():Promise<unknown>;
  writePreferences?(value:unknown):Promise<void>;
  applications?(target?:string):Promise<Array<{id:string;name:string;icon?:string;associated?:boolean}>>;
  openDesktopFile?(id:string):Promise<void>;
  hideApplication?(id:string):Promise<void>;
  manageApplication?(id:string):Promise<void>;
  launch?(id:string,target?:string):Promise<void>;
  virtualEntries?(uri:string):Promise<Entry[]>;
  special?(uri:string):Promise<void>;
  terminal?(path:string):Promise<void>;
  theme(): Promise<DesktopTheme>;
  watchTheme(changed: () => void): () => void;
}
export interface FileManagerServices { locale?:()=>string; translate?:(key:string,params?:Record<string,string|number>)=>string; files: FileSystem; locations: Locations; desktop: Desktop; }
