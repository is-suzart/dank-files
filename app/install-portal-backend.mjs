/** Per-user FileChooser registration. Other portal preferences remain intact. */
import { mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function mergeConfig(current, backend = 'dank-files;gtk') {
  const lines = current.split('\n');
  let preferred = false, foundSection = false, foundKey = false;
  const output = lines.map(line => {
    if (/^\s*\[.+\]\s*$/.test(line)) {
      if (preferred && !foundKey) { foundKey = true; line = `org.freedesktop.impl.portal.FileChooser=${backend}\n${line}`; }
      preferred = /^\s*\[preferred\]\s*$/.test(line); foundSection ||= preferred;
    }
    if (preferred && /^\s*org\.freedesktop\.impl\.portal\.FileChooser\s*=/.test(line)) {
      foundKey = true; return `org.freedesktop.impl.portal.FileChooser=${backend}`;
    }
    return line;
  });
  if (!foundSection) output.push('[preferred]');
  if (!foundKey) output.push(`org.freedesktop.impl.portal.FileChooser=${backend}`);
  return output.join('\n').replace(/\n*$/, '\n');
}
const quote = value => `"${value.replace(/([\\"$`])/g, '\\$1')}"`;

export async function install(args = process.argv.slice(2)) {
  const enable = args.includes('--enable'), uninstall = args.includes('--uninstall');
  if (enable && uninstall) throw new Error('Choose --enable or --uninstall.');
  const dataHome = process.env.XDG_DATA_HOME || join(homedir(), '.local/share');
  const configHome = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  const here = dirname(fileURLToPath(import.meta.url));
  const appDir = existsSync(join(here, 'portal-main.mjs')) ? here : resolve(here, '../dist/dankFiles/app');
  const configDir = join(configHome, 'xdg-desktop-portal');
  const desktops = (process.env.XDG_CURRENT_DESKTOP || '').split(':').filter(x => /^[a-z0-9_-]+$/i.test(x));
  const desktopConfigs = desktops.map(x => join(configDir, `${x.toLowerCase()}-portals.conf`));
  const portalConfig = desktopConfigs.find(existsSync) || join(configDir, 'portals.conf');
  const backup = `${portalConfig}.dank-files.bak`;
  const portalFile = join(dataHome, 'xdg-desktop-portal/portals/dank-files.portal');
  const serviceFile = join(dataHome, 'dbus-1/services/org.freedesktop.impl.portal.desktop.dankfiles.service');
  if (!enable && !uninstall) {
    console.log(`Dry run: register ${portalFile}, ${serviceFile}; change only FileChooser in ${portalConfig}. Use --enable or --uninstall.`); return;
  }
  if (uninstall) {
    for (const file of [portalFile, serviceFile]) await rm(file, {force: true});
    if (existsSync(backup)) { const text = await readFile(backup, 'utf8'); if (text === '# dank-files: configuration did not exist\n') await rm(portalConfig, {force:true}); else await writeFile(portalConfig,text); await rm(backup,{force:true}); }
    console.log('Portal registration removed; previous configuration restored.'); return;
  }
  if (!existsSync(join(appDir, 'portal-main.mjs'))) throw new Error('Build the plugin first.');
  const descriptor = '[portal]\nDBusName=org.freedesktop.impl.portal.desktop.dankfiles\nInterfaces=org.freedesktop.impl.portal.FileChooser;\nUseIn=niri;\n';
  const service = `[D-BUS Service]\nName=org.freedesktop.impl.portal.desktop.dankfiles\nExec=/usr/bin/python3 ${quote(join(appDir, 'portal-backend.py'))} ${quote(process.execPath)} ${quote(join(appDir, 'portal-launch.mjs'))}\n`;
  for (const file of [portalFile, serviceFile, portalConfig]) await mkdir(dirname(file), {recursive:true});
  const current = existsSync(portalConfig) ? await readFile(portalConfig,'utf8') : '';
  if (!existsSync(backup)) await writeFile(backup, existsSync(portalConfig) ? current : '# dank-files: configuration did not exist\n', {mode:0o600});
  await writeFile(portalFile, descriptor); await writeFile(serviceFile,service);
  await writeFile(portalConfig, mergeConfig(current));
  console.log(`Registered Dank Files. Backup: ${backup}\nApply with: systemctl --user restart xdg-desktop-portal.service`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await install();
