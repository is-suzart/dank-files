import { t } from './i18n.js';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import { lstat,readdir,readlink,symlink,mkdir,mkdtemp,rm,chmod,utimes,realpath } from 'node:fs/promises';
import { dirname,join,basename,resolve,isAbsolute,sep } from 'node:path';
import type { FileSystem,TransferOptions } from '../application/ports.js';
const exec=promisify(execFile);
export async function moveNoClobber(source:string,destination:string) {
  if(source===destination)return;
  await exec('mv',['--no-clobber','--no-target-directory','--',source,destination]);
  try {await lstat(source);}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return;throw error;}
  throw new Error('Já existe um item com esse nome. Nada foi substituído.');
}
export async function fingerprint(path:string):Promise<string> {
  const rows:unknown[]=[];
  async function visit(path:string,relative:string) {
    const stat=await lstat(path);
    rows.push([relative,stat.dev,stat.ino,stat.mode,stat.size,stat.mtimeMs,stat.isSymbolicLink()?await readlink(path):'']);
    if(stat.isDirectory())for(const name of (await readdir(path)).sort())await visit(join(path,name),relative+'/'+name);
  }
  await visit(path,'');return JSON.stringify(rows);
}
export async function transferFile(source:string,destination:string,mode:'copy'|'move',options:TransferOptions={}) {
  if(source===destination)throw new Error('Origem e destino são iguais.');
  const info=await lstat(source),parent=await lstat(dirname(destination));
  if(info.isDirectory() && !info.isSymbolicLink()) {
    const origin=await realpath(source),target=await realpath(dirname(destination));
    if(target===origin || target.startsWith(origin+sep))throw new Error('Não é possível transferir uma pasta para dentro dela mesma.');
  }
  options.signal?.throwIfAborted();
  if(mode==='move' && info.dev===parent.dev) {await moveNoClobber(source,destination);options.progress?.({completed:info.size,total:info.size});return;}
  const initial=await fingerprint(source);
  let total=0,completed=0,last=0;
  async function size(path:string):Promise<void>{options.signal?.throwIfAborted();const s=await lstat(path);if(s.isFile())total+=s.size;else if(s.isDirectory())for(const n of await readdir(path))await size(join(path,n));}
  await size(source);options.progress?.({completed,total});
  const temporary=await mkdtemp(join(dirname(destination),'.nandomo-transfer-'));
  try {
    async function copy(from:string,to:string):Promise<void> {
      options.signal?.throwIfAborted();const stat=await lstat(from);
      if(stat.isSymbolicLink())await symlink(await readlink(from),to);
      else if(stat.isDirectory()) {
        await mkdir(to);
        for(const name of await readdir(from))await copy(join(from,name),join(to,name));
        await chmod(to,stat.mode & 0o777);await utimes(to,stat.atime,stat.mtime);
      }else if(stat.isFile()) {
        const progress=new Transform({transform(chunk,_encoding,done){completed+=chunk.length;if(Date.now()-last>=100){last=Date.now();options.progress?.({completed,total});}done(null,chunk);}});
        await pipeline(createReadStream(from),progress,createWriteStream(to,{flags:'wx',mode:stat.mode & 0o777}),{signal:options.signal});
        await utimes(to,stat.atime,stat.mtime);
      }else throw new Error('Este tipo de arquivo não pode ser copiado.');
    }
    const staged=join(temporary,'content');await copy(source,staged);
    options.signal?.throwIfAborted();
    if(await fingerprint(source)!==initial)throw new Error('A origem mudou durante a cópia. Tente novamente.');
    await moveNoClobber(staged,destination);
    if(mode==='move') {
      if(await fingerprint(source)!==initial)throw new Error('O destino foi copiado, mas a origem mudou e foi preservada.');
      await rm(source,{recursive:true});
    }
    options.progress?.({completed:total,total});
  }finally{await rm(temporary,{recursive:true,force:true});}
}
export async function renameMany(plan:Array<{source:string;destination:string}>) {
  const targets=new Set<string>();
  for(const item of plan) {
    if(targets.has(item.destination))throw new Error('Os novos nomes não podem ser repetidos.');targets.add(item.destination);
    if(item.source===item.destination)continue;
    try {await lstat(item.destination);throw new Error('Já existe um item com esse nome.');}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  }
  const changed:Array<{source:string;destination:string}>=[];
  try {for(const item of plan)if(item.source!==item.destination){await moveNoClobber(item.source,item.destination);changed.push(item);}}
  catch(error){const problems:string[]=[];for(const item of changed.reverse())try{await moveNoClobber(item.destination,item.source);}catch{problems.push(item.destination);}if(problems.length)throw new Error(t('Renomeação incompleta. Arquivos preservados em: {paths}',{paths:problems.join(', ')}),{cause:error});throw error;}
}
export async function createArchive(paths:string[],destination:string) {
  if(!paths.length || !paths.every(path=>dirname(path)===dirname(paths[0]!)))throw new Error('Selecione itens da mesma pasta.');
  const zip=/\.zip$/i.test(destination);if(!zip && !/\.tar\.gz$/i.test(destination))throw new Error('Use .zip ou .tar.gz.');
  const temporary=await mkdtemp(join(dirname(destination),'.nandomo-archive-'));
  try {const staged=join(temporary,'archive');await exec('bsdtar',zip?['--format','zip','-cf',staged,'--',...paths.map(path=>basename(path))]:['-czf',staged,'--',...paths.map(path=>basename(path))],{cwd:dirname(paths[0]!),maxBuffer:1024*1024});await moveNoClobber(staged,destination);}
  finally{await rm(temporary,{recursive:true,force:true});}
}
export async function extractArchive(source:string,destination:string) {
  const temporary=await mkdtemp(join(dirname(destination),'.nandomo-extract-'));
  try {
    const staged=join(temporary,'content');await mkdir(staged);
    // Never pass -P: extraction stays inside the private staging directory and is validated below.
    await exec('bsdtar',['-xf',resolve(source),'-C',staged,'--no-same-owner','--no-same-permissions'],{maxBuffer:1024*1024});
    await assertContained(staged);
    await moveNoClobber(staged,destination);
  }finally{await rm(temporary,{recursive:true,force:true});}
}
/** bsdtar extracts absolute and "./.." symlinks verbatim, so the staged tree is checked before it is published. */
async function assertContained(root:string) {
  const base=await realpath(root);
  async function visit(dir:string) {
    for(const child of await readdir(dir,{withFileTypes:true})) {
      const target=join(dir,child.name);
      if(child.isSymbolicLink()) {
        const link=await readlink(target),resolved=resolve(dirname(target),link);
        if(isAbsolute(link)||!resolved.startsWith(base+sep))throw new Error('O arquivo compactado aponta para fora do destino.');
      } else if(child.isDirectory())await visit(target);
    }
  }
  await visit(root);
}
export function withUndo(base:FileSystem,recovery?:{locate:(original:string,version:string)=>Promise<string|undefined>;restore:(paths:string[])=>Promise<unknown>}):FileSystem {
  const history:Array<()=>Promise<void>>=[];
  async function remember(destination:string,reverse:()=>Promise<void>){const saved=await fingerprint(destination);history.push(async()=>{if(!await unchanged(destination,saved))throw new Error('O item mudou desde a operação. Nada foi desfeito.');await reverse();});if(history.length>20)history.shift();}
  async function unchanged(path:string,saved:string){try{return await fingerprint(path)===saved;}catch{return false;}}
  return {...base,canUndo:()=>history.length>0,async undo(){const operation=history.at(-1);if(!operation)return;await operation();history.pop();},
    async renameMany(plan){
      if(!base.renameMany)throw new Error('Renomeação em lote indisponível.');
      await base.renameMany(plan);
      const fingerprints=await Promise.all(plan.map(item=>fingerprint(item.destination)));
      history.push(async()=>{
        for(const [index,item] of plan.entries())if(!await unchanged(item.destination,fingerprints[index]!))throw new Error('Um item mudou desde a renomeação. Nada foi desfeito.');
        await base.renameMany!(plan.map(item=>({source:item.destination,destination:item.source})).reverse());
      });if(history.length>20)history.shift();
    },
    async replaceFile(source,destination,mode){if(!base.replaceFile)throw new Error('Substituição indisponível.');await base.replaceFile(source,destination,mode);history.length=0;},
    async trash(path){
      if(!base.trash)throw new Error('Lixeira indisponível.');
      const version=recovery?await fingerprint(path):'';
      await base.trash(path);
      if(recovery) {
        const trashed=await recovery.locate(path,version).catch(()=>undefined);
        if(trashed)history.push(async()=>{if(!await unchanged(trashed,version))throw new Error('O item mudou desde a operação. Nada foi desfeito.');await recovery.restore([trashed]);});
        else history.length=0;
      }
    },
    async create(path,kind){await base.create(path,kind);await remember(path,async()=>{if(!base.trash)throw new Error('Lixeira indisponível.');await base.trash(path);});},
    async rename(source,destination){await base.rename(source,destination);if(source!==destination)await remember(destination,()=>base.rename(destination,source));},
    async transfer(source,destination,mode,options){if(!base.transfer)throw new Error('Transferência indisponível.');await base.transfer(source,destination,mode,options);await remember(destination,mode==='move'?()=>base.rename(destination,source):async()=>{if(!base.trash)throw new Error('Lixeira indisponível.');await base.trash(destination);});},
    async archive(paths,destination){await createArchive(paths,destination);await remember(destination,async()=>{if(!base.trash)throw new Error('Lixeira indisponível.');await base.trash(destination);});},
    async extract(source,destination){await extractArchive(source,destination);await remember(destination,async()=>{if(!base.trash)throw new Error('Lixeira indisponível.');await base.trash(destination);});},
  };
}
