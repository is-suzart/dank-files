import type { Signal } from '@nandomo/core';
import type { Entry } from '../domain/files.js';
import { validateName } from '../domain/fileActions.js';
import type { FileSystem,Desktop } from './ports.js';
export type ToolKind='archive'|'extract'|'bulk'|'emptyTrash';
export interface ToolRequest {kind:ToolKind;targets:Entry[];name:string;}
export function createFileTools(options:{request:Signal<ToolRequest|null>;path:()=>string;selected:()=>Entry[];entries:()=>Entry[];mutating:Signal<boolean>;files:FileSystem;desktop:Desktop;refresh:()=>Promise<unknown>;onError:(problem:unknown)=>void;}) {
  const {request,files,desktop,mutating}=options;
  return {
    request,
    open(kind:ToolKind){
      if(mutating.peek())return;
      options.onError('');
      if(kind==='emptyTrash') {
        if(options.path()!=='trash:///')return;
        request.set({kind,targets:[...options.entries()],name:''});return;
      }
      if(options.path().includes(':///')){options.onError('Abra a pasta original para esta operação.');return;}
      const targets=options.selected();if(!targets.length)return;
      if(kind==='extract' && (targets.length!==1 || targets[0]!.directory)){options.onError('Selecione um arquivo compactado.');return;}
      request.set({kind,targets:[...targets],name:kind==='bulk'?'{name}-{n}':kind==='archive'?targets[0]!.name+'.zip':targets[0]!.name.replace(/\.(tar\.(gz|bz2|xz)|tgz|zip|tar|7z|rar)$/i,'')+'-extraído'});
    },
    close(){if(!mutating.peek())request.set(null);},
    async submit(value:string){
      const current=request.peek();if(!current || mutating.peek())return false;
      mutating.set(true);
      try {
        if(current.kind==='emptyTrash') {
          if(!desktop.emptyTrash)throw new Error('Lixeira indisponível.');
          await desktop.emptyTrash(current.targets.map(item=>item.path));
        }else if(current.kind==='bulk') {
          if(!files.renameMany)throw new Error('Renomeação em lote indisponível.');
          if(!value.includes('{n}')&&!value.includes('{name}'))throw new Error('Use {name} para o nome original e/ou {n} para a sequência.');
          const plan=current.targets.map((item,index)=>{
            const split=item.directory ? -1:item.name.lastIndexOf('.');
            const extension=split>0?item.name.slice(split):'',stem=split>0?item.name.slice(0,split):item.name;
            const name=validateName(value.replaceAll('{name}',stem).replaceAll('{n}',String(index+1))+extension);
            return {source:item.path,destination:files.child(files.parent(item.path),name)};
          });
          await files.renameMany(plan);
        }else {
          validateName(value);
          const destination=files.child(files.parent(current.targets[0]!.path),value);
          if(current.kind==='archive') {if(!files.archive)throw new Error('Compactação indisponível.');await files.archive(current.targets.map(item=>item.path),destination);}
          else {if(!files.extract)throw new Error('Extração indisponível.');await files.extract(current.targets[0]!.path,destination);}
        }
        request.set(null);await options.refresh();return true;
      }catch(problem){await options.refresh().catch(()=>{});options.onError(problem);return false;}
      finally{mutating.set(false);}
    },
  };
}
