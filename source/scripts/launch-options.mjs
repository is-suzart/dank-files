import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function launchOptions(args, env = process.env) {
  const { positionals } = parseArgs({ args, allowPositionals: true, options: Object.fromEntries(
    ['dbus', 'dev', 'smoke', 'hmr-smoke', 'ux-smoke', 'sidebar-smoke'].map(name => [name, { type: 'boolean' }]),
  ) });
  if (positionals.length > 1) throw new Error('Abra uma pasta por execução.');
  const target = positionals[0];
  const startPath = target ? (target.startsWith('file:') ? fileURLToPath(target) : resolve(target)) : undefined;
  const platform = env.NANDOMO_FM_QT_PLATFORM ||
    (env.WAYLAND_DISPLAY && (!env.QT_QPA_PLATFORM || env.QT_QPA_PLATFORM === 'xcb') ? 'wayland' : env.QT_QPA_PLATFORM);
  return { startPath, platform };
}
