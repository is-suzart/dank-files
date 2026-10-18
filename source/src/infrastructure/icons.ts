import { readFile, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
const names = ['folder','text-x-generic','image-x-generic','video-x-generic','audio-x-generic','package-x-generic','application-pdf','user-home','user-desktop','folder-download','folder-documents','folder-pictures','folder-music','folder-videos','folder-development','drive-harddisk','applications-games','go-previous','go-next','go-up','view-refresh','view-list-details','view-grid','view-column','list-add','document-open','edit-rename','window-close','document-preview'];
/** Bounded XDG lookup with inheritance; Quickshell remains the fallback provider. */
export async function discoverIcons(home: string, light: boolean, requested:readonly string[]=[]): Promise<Record<string,string>> {
  const wanted=[...new Set([...names,...requested])].filter(name=>/^[\w .+-]+$/.test(name));
  let theme = '';
  try {
    const settings = JSON.parse(await readFile(join(process.env.XDG_CONFIG_HOME || join(home,'.config'),'DankMaterialShell/settings.json'),'utf8'));
    theme = settings.iconThemePerMode && light ? settings.iconThemeLight : settings.iconThemeDark;
  } catch {}
  if (!theme || theme === 'System Default') {
    try { theme = (await readFile(join(home,'.config/qt6ct/qt6ct.conf'),'utf8')).match(/^icon_theme=(.+)$/m)?.[1]?.trim() || ''; } catch {}
  }
  if (!theme || !/^[\w .-]+$/.test(theme)) return {};
  const dataHome = process.env.XDG_DATA_HOME || join(home,'.local/share');
  const roots = [join(home,'.icons'),join(dataHome,'icons'),...(process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share').split(':').map(root=>join(root,'icons'))];
  const result: Record<string,string> = {}; const seen = new Set<string>();
  async function visit(name: string) {
    if (seen.has(name) || seen.size >= 12 || !/^[\w .-]+$/.test(name)) return; seen.add(name);
    const inherited = new Set<string>();
    for (const root of roots) {
      try {
        const ini = await readFile(join(root,name,'index.theme'),'utf8');
        const directories = [...ini.matchAll(/^(?:ScaledDirectories|Directories)=(.+)$/gm)].flatMap(match=>match[1]!.trim().split(','));
        for (const inherit of (ini.match(/^Inherits=(.+)$/m)?.[1] || '').trim().split(',')) if(inherit) inherited.add(inherit);
        directories.sort((a,b)=>(b.includes('scalable') ? 1000 : parseInt(b)||0)-(a.includes('scalable') ? 1000 : parseInt(a)||0));
        for (const directory of directories) {
          if (directory.startsWith('/') || directory.split('/').includes('..')) continue;
          const files=new Set(await readdir(join(root,name,directory)).catch(()=>[] as string[]));
          for(const icon of wanted) {
            if(result[icon])continue;
            for(const file of /\.(svg|png|xpm)$/i.test(icon)?[icon]:['svg','png','xpm'].map(extension=>`${icon}.${extension}`)) {
              if(!files.has(file))continue;
              const path=join(root,name,directory,file);
              try{await access(path);result[icon]=pathToFileURL(path).href;break;}catch{}
            }
          }
        }
      } catch {}
    }
    for (const inheritedTheme of inherited) await visit(inheritedTheme);
  }
  await visit(theme); await visit('hicolor'); return result;
}
