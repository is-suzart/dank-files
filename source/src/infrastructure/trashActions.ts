import { t } from './i18n.js';
import { readFile,mkdir,unlink,lstat,rm,realpath } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { basename,dirname,join,resolve,isAbsolute,sep } from 'node:path';
import { moveNoClobber } from './fileOperations.js';

export interface TrashFailure {path:string;reason:string;}
/** A batch that partly succeeded: `restored` lists what already moved, `failed` why the rest did not. */
export class TrashBatchError extends Error {
  constructor(readonly restored:string[],readonly failed:TrashFailure[],cause?:unknown){super(t('Lixeira parcialmente processada: {count} concluído(s), {reasons}',{count:restored.length,reasons:failed.map(item=>t(item.reason)).join('; ')}),{cause});this.name='TrashBatchError';}
}
function reason(error:unknown){return error instanceof Error?error.message:String(error);}

/** The only directories a trash item may live in: XDG_DATA_HOME/Trash, or a mounted volume's per-uid trash. */
export function defaultTrashRoots():string[] {
  const home=process.env.XDG_DATA_HOME && isAbsolute(process.env.XDG_DATA_HOME)?process.env.XDG_DATA_HOME:join(process.env.HOME??'','.local','share');
  const roots=[join(home,'Trash')];
  const uid=typeof process.getuid==='function'?process.getuid():null;
  if(uid!==null)for(const mount of mountPoints()){roots.push(join(mount,`.Trash-${uid}`));roots.push(join(mount,'.Trash',String(uid)));}
  return roots;
}
function mountPoints(){try{return readFileSync('/proc/mounts','utf8').split('\n').filter(line=>line.trim()&&!line.startsWith('#')).map(line=>line.split(/\s+/)[1]??'').map(path=>path.replace(/\\([0-7]{3})/g,(_all,digits:string)=>String.fromCharCode(parseInt(digits,8)))).filter(isAbsolute);}catch{return [];}}

async function allowedRoots(extra?:readonly string[]):Promise<Set<string>> {
  const roots=new Set<string>();
  for(const candidate of [...(extra??[]),...defaultTrashRoots()]){if(!isAbsolute(candidate))continue;roots.add(await realpath(candidate).catch(()=>resolve(candidate)));}
  return roots;
}

async function metadata(path:string,roots:ReadonlySet<string>) {
  const files=dirname(path),root=dirname(files),name=basename(path);
  if(!name||name==='.'||name==='..'||basename(files)!=='files')throw new Error('Item fora da lixeira.');
  // lstat is deliberate: a symlinked root or "files" directory must not be followed into foreign storage.
  if(!(await lstat(files).catch(()=>null))?.isDirectory()||!(await lstat(root).catch(()=>null))?.isDirectory())throw new Error('Item fora da lixeira.');
  if(!roots.has(await realpath(root)))throw new Error('Item fora da lixeira.');
  if(!(await lstat(path).catch(()=>null)))throw new Error('Item da lixeira não existe.');
  const info=join(root,'info',name+'.trashinfo');
  if(!(await lstat(join(root,'info')).catch(()=>null))?.isDirectory()||!(await lstat(info).catch(()=>null))?.isFile())throw new Error('Metadados da lixeira inválidos.');
  const original=/^Path=(.*)$/m.exec(await readFile(info,'utf8'))?.[1];if(!original)throw new Error('Local original indisponível.');
  let decoded:string;try{decoded=decodeURIComponent(original);}catch{throw new Error('Local original inválido.');}
  if(decoded.includes('\0'))throw new Error('Local original inválido.');
  let destination=decoded;
  if(!isAbsolute(decoded)) {
    const mount=basename(root).startsWith('.Trash-')?dirname(root):basename(dirname(root))==='.Trash'?dirname(dirname(root)):undefined;
    if(!mount || decoded.split('/').includes('..'))throw new Error('Local original inválido.');
    destination=resolve(mount,decoded);
    if(!destination.startsWith(mount+sep))throw new Error('Local original inválido.');
  }
  // Restoring into the trash itself would fight the very metadata being read.
  if([...roots].some(base=>destination===base||destination.startsWith(base+sep)))throw new Error('Local original inválido.');
  return {info,destination};
}

async function runBatch(paths:readonly string[],roots:readonly string[]|undefined,step:(path:string,roots:Set<string>)=>Promise<string>):Promise<string[]> {
  const allowed=await allowedRoots(roots),done:string[]=[];const failed:TrashFailure[]=[];
  for(const path of paths){
    try{done.push(await step(path,allowed));}catch(error){failed.push({path,reason:reason(error)});}
  }
  if(failed.length)throw new TrashBatchError(done,failed);
  return done;
}

export async function restoreTrash(paths:readonly string[],roots?:readonly string[]):Promise<string[]> {
  return runBatch(paths,roots,async(path,allowed)=>{
    const {info,destination}=await metadata(path,allowed);
    await mkdir(dirname(destination),{recursive:true});
    await moveNoClobber(path,destination); // no clobber: a collision leaves the item and its metadata in place
    try {await unlink(info);}catch(error) {throw new Error(t('Restaurado, mas os metadados ficaram: {reason}',{reason:t(reason(error))}));}
    return destination;
  });
}
/** Only the snapshot explicitly confirmed by the user is removed, never newly arrived items. */
export async function emptyTrash(paths:readonly string[],roots?:readonly string[]):Promise<string[]> {
  return runBatch(paths,roots,async(path,allowed)=>{
    const {info}=await metadata(path,allowed);
    await rm(path,{recursive:true});
    await unlink(info);
    return path;
  });
}

/** Locate exactly the just-trashed version for Undo; never guess from the display name. */
export async function findTrashed(original:string,version:string):Promise<string|undefined> {
  const {fingerprint}=await import('./fileOperations.js');
  const roots=defaultTrashRoots();
  const candidates=roots.filter((root,index)=>index===0 || original.startsWith((basename(root).startsWith('.Trash-')?dirname(root):dirname(dirname(root)))+sep));
  const allowed=new Set<string>();for(const root of candidates)try{allowed.add(await realpath(root));}catch{}
  for(const root of candidates) {
    const names=await import('node:fs/promises').then(fs=>fs.readdir(join(root,'files'))).catch(()=>[] as string[]);
    for(const name of names)try {
      const path=join(root,'files',name),info=await metadata(path,allowed);
      if(info.destination===original && await fingerprint(path)===version)return path;
    }catch{}
  }
}
