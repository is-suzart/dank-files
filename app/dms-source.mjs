import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function findDmsSource(env = process.env) {
  let source = env.NANDOMO_DMS_SOURCE || env.DMS_SHELL_DIR;
  if (!source) {
    const root = join(env.XDG_RUNTIME_DIR || `/run/user/${process.getuid()}`, 'danklinux-shell');
    for (const candidate of await readdir(root).catch(() => [])) {
      const path = join(root, candidate);
      try { await access(join(path, 'DankCommon/Widgets/DankButton.qml')); source = path; break; } catch {}
    }
  }
  if (!source) throw new Error('DankCommon não encontrado. Inicie DMS ou defina NANDOMO_DMS_SOURCE.');
  await access(join(source, 'DankCommon/Widgets/DankButton.qml'));
  return source;
}
