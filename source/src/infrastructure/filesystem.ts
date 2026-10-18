import { t } from './i18n.js';
import { previewKind } from '../domain/fileActions.js';
import { readdir, stat, readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, basename, extname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
import type { Entry, Place, GameGroup } from '../domain/files.js';
export function entryIcon(name: string, directory: boolean) {
  if (directory) return ({Downloads:'folder-download',Documentos:'folder-documents',Documents:'folder-documents',Imagens:'folder-pictures',Pictures:'folder-pictures',Músicas:'folder-music',Music:'folder-music',Vídeos:'folder-videos',Videos:'folder-videos','Área de trabalho':'user-desktop',Desktop:'user-desktop'} as Record<string,string>)[name] ?? 'folder';
  const extension = extname(name).toLowerCase();
  if (['.png','.jpg','.jpeg','.gif','.svg','.webp'].includes(extension)) return 'image-x-generic';
  if (previewKind(name) === 'video') return 'video-x-generic';
  if (['.mp3','.flac','.ogg','.wav'].includes(extension)) return 'audio-x-generic';
  if (['.zip','.tar','.gz','.7z','.rar'].includes(extension)) return 'package-x-generic';
  return extension === '.pdf' ? 'application-pdf' : 'text-x-generic';
}
export async function listDirectory(path: string): Promise<Entry[]> {
  const children = await readdir(path, { withFileTypes: true });
  const entries: Entry[] = []; let index = 0;
  await Promise.all(Array.from({ length: Math.min(16, children.length) }, async () => {
    while (index < children.length) {
      const child = children[index++]!; const childPath = join(path, child.name);
      try {
        const info = await stat(childPath);
        entries.push({ name: child.name, path: childPath, directory: info.isDirectory(), symlink: child.isSymbolicLink(), size: info.size, modified: info.mtimeMs, icon: entryIcon(child.name, info.isDirectory()) });
      } catch {
        entries.push({ name: child.name, path: childPath, directory: child.isDirectory(), symlink: child.isSymbolicLink(), size: 0, modified: 0, icon: entryIcon(child.name, child.isDirectory()) });
      }
    }
  }));
  return entries;
}
export function parseDrives(data: unknown): Place[] {
  const places: Place[] = [];
  function walk(nodes: unknown) {
    if (!Array.isArray(nodes)) return;
    for (const raw of nodes) {
      if (!raw || typeof raw !== 'object') continue;
      const node = raw as Record<string, unknown>;
      const mounts = Array.isArray(node.mountpoints) ? node.mountpoints.filter((path): path is string => typeof path === 'string' && path.startsWith('/')) : [];
      if (node.fstype && !['swap','squashfs'].includes(String(node.fstype)) && ['disk','part','crypt','lvm'].includes(String(node.type))) {
        if (mounts.length) for (const path of mounts.filter(path=>!['/boot','/boot/efi','/efi'].includes(path.replace(/\/+$/,'')))) places.push({ id: `${node.name}:${path}`, device:String(node.path || '/dev/'+node.name), name: String(node.label || node.name) + ` (${path})`, path, mounted: true });
        else places.push({ id: `${node.name}:unmounted`, device:String(node.path || '/dev/'+node.name), name: String(node.label || node.name), path: '', mounted: false });
      }
      walk(node.children);
    }
  }
  walk((data as { blockdevices?: unknown })?.blockdevices);
  return [...new Map(places.map(place => [place.id,place])).values()];
}
export async function discoverDrives() {
  const { stdout } = await exec('lsblk', ['--json','--output','NAME,PATH,LABEL,FSTYPE,TYPE,MOUNTPOINTS'], { timeout: 5000, maxBuffer: 1024 * 1024 });
  return parseDrives(JSON.parse(stdout));
}
export async function discoverGames(home: string): Promise<GameGroup[]> {
  const groups: GameGroup[] = []; const seen = new Set<string>();
  const add = async (places: Place[], name: string, path: string) => {
    try { if (!(await stat(path)).isDirectory()) return; const resolved = await realpath(path); if (seen.has(resolved)) return; seen.add(resolved); places.push({ name, path }); } catch {}
  };
  const steam: Place[] = [];
  const roots = [join(home,'.local/share/Steam'), join(home,'.steam/steam'), join(home,'.var/app/com.valvesoftware.Steam/.local/share/Steam')];
  for (const root of roots) {
    const libraries = [root];
    try { const vdf = await readFile(join(root,'steamapps/libraryfolders.vdf'), 'utf8'); for (const match of vdf.matchAll(/"path"\s+"((?:\\.|[^"\\])*)"/g)) libraries.push(match[1]!.replace(/\\\\/g, '\\').replace(/\\"/g, '"')); } catch {}
    for (const library of libraries) {
      await add(steam, t('Biblioteca · {name}',{name:basename(library)}), join(library,'steamapps/common'));
      await add(steam, `Proton · ${basename(library)}`, join(library,'steamapps/compatdata'));
    }
  }
  if (steam.length) groups.push({ name: 'Steam / Proton', places: steam });
  const heroic: Place[] = [];
  for (const root of [join(home,'.config/heroic'),join(home,'.var/app/com.heroicgameslauncher.hgl/config/heroic')]) {
    await add(heroic, t('Configurações'), root);
    const titles=new Map<string,string>();
    for(const file of ['store_cache/legendary_library.json','store_cache/gog_library.json','store_cache/nile_library.json','legendaryConfig/legendary/installed.json']) {
      try {
        const data=JSON.parse(await readFile(join(root,file),'utf8'));
        const rows=Array.isArray(data.library) ? data.library : Array.isArray(data) ? data : Object.values(data);
        for(const row of rows)if(row && typeof row==='object') {
          const id=row.app_name ?? row.appName ?? row.id;const title=row.title ?? row.name;
          if(typeof id==='string' && typeof title==='string')titles.set(id,title);
        }
      }catch{}
    }
    try {
      for (const filename of await readdir(join(root,'GamesConfig'))) {
        if (!filename.endsWith('.json')) continue;
        try {
          const config = JSON.parse(await readFile(join(root,'GamesConfig',filename),'utf8'));
          for (const game of Object.values(config) as Array<Record<string,unknown>>) if (game && typeof game === 'object' && typeof game.winePrefix === 'string') await add(heroic, t('Prefixo · {name}',{name:titles.get(filename.replace(/\.json$/, '')) ?? (typeof game.title === 'string' ? game.title : basename(game.winePrefix))}), game.winePrefix);
        } catch {}
      }
    } catch {}
  }
  await add(heroic, t('Jogos'), join(home,'Games/Heroic')); if (heroic.length) groups.push({ name: 'Heroic', places: heroic });
  const lutris: Place[] = [];
  for (const root of [join(home,'.config/lutris'),join(home,'.var/app/net.lutris.Lutris/config/lutris')]) {
    await add(lutris, t('Configurações'), root);
    try {
      for (const filename of await readdir(join(root,'games'))) {
        if (!/\.ya?ml$/.test(filename)) continue;
        const yaml = await readFile(join(root,'games',filename),'utf8');
        const match = yaml.match(/^\s*prefix:\s*(.+)$/m);
        if (match) await add(lutris, t('Prefixo · {name}',{name:filename.replace(/\.ya?ml$/, '')}), match[1]!.trim().replace(/^['"]|['"]$/g,''));
      }
    } catch {}
  }
  await add(lutris, t('Jogos'), join(home,'Games')); if (lutris.length) groups.push({ name: 'Lutris', places: lutris });
  return groups;
}


/** Read XDG directories as data; never evaluate the configuration as shell code. */
export async function discoverPlaces(home:string,config=join(process.env.XDG_CONFIG_HOME || join(home,'.config'),'user-dirs.dirs')):Promise<Place[]> {
  for(const bookmarks of [join(dirname(config),'gtk-3.0/bookmarks'),join(home,'.gtk-bookmarks')]) {
    try {
      const saved=await readFile(bookmarks,'utf8');const result:Place[]=[];const seen=new Set<string>();
      for(const line of saved.split('\n')) {
        const match=line.match(/^(\S+)(?:\s+(.*))?$/);if(!match)continue;
        try {
          const path=fileURLToPath(match[1]!);if(seen.has(path) || path===home || !(await stat(path)).isDirectory())continue;
          seen.add(path);result.push({id:path,path,name:match[2]?.trim() || basename(path),icon:entryIcon(basename(path),true)});
        }catch{}
      }
      return result;
    }catch{}
  }
  let text='';try{text=await readFile(config,'utf8');}catch{}
  const labels:Record<string,[string,string]>={DESKTOP:['Área de trabalho','user-desktop'],DOWNLOAD:['Downloads','folder-download'],DOCUMENTS:['Documentos','folder-documents'],PICTURES:['Imagens','folder-pictures'],MUSIC:['Músicas','folder-music'],VIDEOS:['Vídeos','folder-videos'],PROJECTS:['Projetos','folder-development']};
  const places:Place[]=[];const seen=new Set([home]);
  for(const match of text.matchAll(/^XDG_([A-Z]+)_DIR="((?:\\.|[^"\\])*)"\s*$/gm)) {
    const label=labels[match[1]!];if(!label)continue;
    let path=match[2]!.replace(/\\([\\"$`])/g,'$1');
    path=path.replace(/^\$HOME(?=\/|$)/,()=>home);
    if(!path.startsWith('/') || seen.has(path))continue;
    try{if(!(await stat(path)).isDirectory())continue;}catch{continue;}
    seen.add(path);places.push({id:match[1],name:t(label[0]),icon:label[1],path});
  }
  return places;
}
