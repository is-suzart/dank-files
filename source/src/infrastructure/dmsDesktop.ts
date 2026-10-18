import { readFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import { dirname, join } from 'node:path';
import { desktopActions } from './desktopActions.js';
import { discoverIcons } from './icons.js';
import type { Desktop } from '../application/ports.js';

export function createDmsDesktop(home: string): Desktop {
  const colorsPath = join(process.env.XDG_CACHE_HOME || join(home,'.cache'), 'DankMaterialShell/dms-colors.json');
  const desktop=desktopActions(home);
  return {
    ...desktop,
    async applications(target) {
      const apps=await desktop.applications(target);
      const light=await readFile(colorsPath,'utf8').then(text=>JSON.parse(text).mode==='light').catch(()=>false);
      const icons=await discoverIcons(home,light,apps.map(app=>app.icon || '').filter(icon=>!icon.startsWith('file:')));
      return apps.map(app=>({...app,icon:app.icon ? icons[app.icon] || app.icon : icons['package-x-generic'] || 'package-x-generic'}));
    },
    async theme() {
      const data = JSON.parse(await readFile(colorsPath, 'utf8'));
      const light = data.mode === 'light';
      const colors = data.colors?.[light ? 'light' : 'dark'];
      const keys = ['background','surface','on_surface','on_surface_variant','primary','on_primary',
        'primary_container','secondary','surface_variant','surface_container','surface_container_high','outline','error'];
      const palette = Object.fromEntries(keys.filter(key => typeof colors?.[key] === 'string' &&
        /^#[0-9a-fA-F]{6,8}$/.test(colors[key])).map(key => [key,colors[key]]));
      return {palette, icons:await discoverIcons(home,light)};
    },
    watchTheme(changed) {
      try {
        const watcher = watch(dirname(colorsPath), (_, file) => {
          if (String(file) === 'dms-colors.json') changed();
        });
        return () => watcher.close();
      } catch { return () => {}; }
    },
  };
}
