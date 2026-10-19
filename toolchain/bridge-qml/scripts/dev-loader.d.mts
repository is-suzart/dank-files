export interface ViewLoader {
  dependencies():Set<string>;
  load():Promise<Record<string,any>>;
  dispose():Promise<void>;
}
export function createViewLoader(options:{entry:string;tsconfig?:string}):Promise<ViewLoader>;
export function watchViewSources(root:string,onChange:(files:string[])=>Promise<void>|void,onError?:(error:unknown)=>void,delay?:number):()=>void;
