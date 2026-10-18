import { searchFiles } from './search.js';
import { transferFile,moveNoClobber,renameMany,createArchive,extractArchive } from './fileOperations.js';
import { watch } from 'node:fs';
import { videoThumbnail } from './videoThumbnail.js';
import { updateBookmark } from './bookmarks.js';
import { remotePath } from './mountPolicy.js';
import { dirname, resolve, join } from 'node:path';
import { spawn, execFile } from 'node:child_process';
import { mkdir, writeFile, lstat, readdir, readlink, symlink, copyFile, chmod, readFile, realpath, mkdtemp, rename, unlink, rm, statfs } from 'node:fs/promises';
import { constants } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { listDirectory, discoverDrives, discoverGames, discoverPlaces } from './filesystem.js';
import type { FileSystem, Locations } from '../application/ports.js';
import type { VolumeUsage } from '../domain/volumeUsage.js';

/** Bytes in use and total for each mounted path; a failure only skips its own path. */
export async function statfsUsage(paths: readonly string[]): Promise<Record<string, VolumeUsage>> {
  const usage: Record<string, VolumeUsage> = {};
  await Promise.all(paths.map(async path => {
    try {
      const info = await statfs(path, { bigint: true });
      const total = Number(info.blocks) * Number(info.bsize);
      // bavail is what an unprivileged process may use, which is what the bar shows.
      const free = Number(info.bavail) * Number(info.bsize);
      if (!Number.isFinite(total) || total <= 0) return;
      usage[path] = { used: Math.max(0, total - free), total };
    } catch { /* an unmounted, busy or unreadable volume simply has no usage */ }
  }));
  return usage;
}

export const nodeFiles: FileSystem = {
  videoThumbnail,
  search:searchFiles,
  list: listDirectory,
  async trash(path){await promisify(execFile)('gio',['trash','--',path]);},
  remote:remotePath,
  async setPermissions(path,mode){
    if(!Number.isInteger(mode)||mode<0||mode>0o777)throw new Error('Permissões inválidas.');
    const info=await lstat(path);if(info.isSymbolicLink())throw new Error('Abra o arquivo original para editar permissões.');
    await chmod(path,(info.mode & 0o7000)|mode);
  },
  async details(path){
    const info=await lstat(path);
    const children=info.isDirectory() ? await readdir(path,{withFileTypes:true}) : undefined;
    return {permissions:(info.mode & 0o7777).toString(8),owner:(await readFile('/etc/passwd','utf8').catch(()=>'' )).split('\n').find(line=>line.split(':')[2]===String(info.uid))?.split(':')[0] || String(info.uid),items:children?.length,folders:children?.filter(child=>child.isDirectory()).length};
  },
  resolve,
  parent: dirname,
  child: join,
  fromUrl:fileURLToPath,
  url: path => pathToFileURL(path).href,
  async exists(path){try{await lstat(path);return true;}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return false;throw error;}},
  async replaceFile(source,destination,mode) {
    if(source===destination)throw new Error('Origem e destino são iguais.');
    const from=await lstat(source),to=await lstat(destination);
    if(!from.isFile() || !to.isFile())throw new Error('Substituição disponível somente entre arquivos comuns. Renomeie pastas ou links.');
    const temporary=await mkdtemp(join(dirname(destination),'.nandomo-replace-'));
    try{
      const staged=join(temporary,'content');
      await copyFile(source,staged,constants.COPYFILE_EXCL);
      const current=await lstat(destination);
      if(current.dev!==to.dev || current.ino!==to.ino || current.mtimeMs!==to.mtimeMs || current.size!==to.size)throw new Error('O destino mudou. Tente novamente.');
      await rename(staged,destination);
      if(mode==='move'){
        const remaining=await lstat(source);
        if(remaining.dev!==from.dev || remaining.ino!==from.ino || remaining.mtimeMs!==from.mtimeMs || remaining.size!==from.size)throw new Error('O destino foi copiado, mas a origem mudou e foi preservada.');
        await unlink(source);
      }
    }finally{await rm(temporary,{recursive:true,force:true});}
  },
  async create(path,kind) {
    if(kind === 'folder') await mkdir(path);
    else await writeFile(path,'',{flag:'wx'});
  },
  transfer:transferFile,
  rename:moveNoClobber,
  renameMany,
  archive:createArchive,
  extract:extractArchive,
  watch(path,changed){
    let timer:ReturnType<typeof setTimeout>|undefined;
    try {
      const watcher=watch(path,()=>{clearTimeout(timer);timer=setTimeout(changed,180);});
      watcher.on('error',()=>{watcher.close();});
      return ()=>{clearTimeout(timer);watcher.close();};
    }catch{return ()=>{};}
  },
  open(path) {
    return new Promise<void>((done, reject) => {
      const child = spawn('xdg-open', [path], {stdio:'ignore'});
      child.once('error', reject);
      child.once('exit', code => code === 0 ? done() : reject(new Error('Não foi possível abrir o arquivo.')));
    });
  },
};
export const nodeLocations: Locations = {bookmark:updateBookmark,volumeAction:async(action,place)=>{
  if(!place.device?.startsWith('/dev/'))throw new Error('Dispositivo indisponível.');
  await promisify(execFile)('udisksctl',[action,'-b',place.device]);
},volumeUsage:statfsUsage,volumes:discoverDrives, games:discoverGames, places:discoverPlaces};
