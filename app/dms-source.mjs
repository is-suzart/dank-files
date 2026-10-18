import { access, readdir, symlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';

/** DMS 1.7 renamed the standalone SDK; 1.6 packages still expose DankCommon. */
export async function dmsLayout(source) {
  for (const [folder, button, legacy] of [['DCommon', 'DButton', false], ['DankCommon', 'DankButton', true]]) {
    try { await access(join(source, folder, 'Widgets', button + '.qml')); await access(join(source,folder,'Common/Style.qml')); return { folder, legacy }; } catch {}
  }
  throw new Error(`DMS shared widgets not found in ${source}. Expected DCommon or DankCommon; initialize the DMS submodule for source checkouts.`);
}
export async function findDmsSource(env = process.env) {
  const explicit = env.NANDOMO_DMS_SOURCE || env.DMS_SHELL_DIR;
  if (explicit) {
    for(const path of [resolve(explicit),resolve(explicit,'quickshell')]) {
      try { await dmsLayout(path); return path; } catch {}
    }
    throw new Error(`Invalid DMS source: ${explicit}. Expected DCommon or DankCommon widgets.`);
  }
  const root = join(env.XDG_RUNTIME_DIR || `/run/user/${process.getuid()}`, 'danklinux-shell');
  for (const candidate of await readdir(root).catch(() => [])) {
    const path=join(root,candidate);
    try { await dmsLayout(path); return path; } catch {}
  }
  throw new Error('DMS shared widgets not found. Start DMS or set NANDOMO_DMS_SOURCE to its quickshell directory.');
}
export async function mountDmsSource(source,runtime) {
  const layout=await dmsLayout(source);
  await symlink(join(source,layout.folder),join(runtime,layout.folder),'dir');
  return layout;
}
/** Only generated QML imports/type references change; bindings and user data stay intact. */
export function adaptDmsQml(source,legacy = process.env.NANDOMO_FM_DMS_LEGACY === '1') {
  if(!legacy)return source;
  return source.replaceAll('qs.DCommon.', 'qs.DankCommon.').replace(/(^[ \t]*|\.)(DButton|DTextField|DSlider|DToggle|DIcon)\b/gm,(_,prefix,name)=>prefix+'Dank'+name.slice(1));
}
