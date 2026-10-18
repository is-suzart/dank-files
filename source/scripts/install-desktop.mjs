import { mkdir, writeFile, chmod, access } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const applications = join(process.env.XDG_DATA_HOME || join(homedir(), '.local/share'), 'applications');
const launcher = join(process.env.XDG_DATA_HOME || join(homedir(), '.local/share'), 'dank-files', 'launch');
const shellQuote = value => "'" + value.replaceAll("'", "'\\''") + "'";
const desktopQuote = (value,fieldCodes=true) => '"' + value.replace(/[\\"`$]/g, '\\$&').replaceAll('\\', '\\\\').replaceAll('%', fieldCodes?'%%':'%') + '"';
let run = fileURLToPath(new URL('./run.mjs', import.meta.url));
try {await access(new URL('./launch.mjs',import.meta.url));run=fileURLToPath(new URL('./launch.mjs',import.meta.url));}catch{}
if ([applications, launcher].some(path => /[\r\n]/.test(path))) throw new Error('Diretório XDG inválido.');
await access(run);
await mkdir(applications, { recursive: true });
await mkdir(dirname(launcher), { recursive: true });
await writeFile(launcher, '#!/bin/sh\nexec ' + shellQuote(process.execPath) + ' ' + shellQuote(run) + ' "$@"\n');
await chmod(launcher, 0o755);
const desktop = join(applications, 'io.github.is_suzart.DankFiles.desktop');
await writeFile(desktop, `[Desktop Entry]
Type=Application
Name=Dank Files
Name[pt_BR]=Dank Files
Comment=Browse files and folders
Comment[pt_BR]=Navegue por arquivos e pastas
Exec=${desktopQuote(launcher)} %f
Icon=system-file-manager
Terminal=false
Categories=System;FileTools;FileManager;
MimeType=inode/directory;
StartupNotify=true
`);
if(process.argv.includes('--dbus')) {
  const directory=join(process.env.XDG_DATA_HOME || join(homedir(),'.local/share'),'dbus-1/services');
  await mkdir(directory,{recursive:true});
  const service=join(directory,'org.freedesktop.FileManager1.service');
  try {await access(service);throw new Error('Já existe uma ativação D-Bus do usuário. Preserve-a antes de registrar Dank Files.');}catch(error){if(error.code!=='ENOENT')throw error;}
  await writeFile(service,'[D-BUS Service]\nName=org.freedesktop.FileManager1\nExec='+desktopQuote(launcher,false)+' --dbus\n');
  console.log('Ativação D-Bus registrada: '+service);
}
try { execFileSync('update-desktop-database', [applications], { stdio: 'pipe' }); }
catch (error) { console.warn('Registro criado; atualização do cache não executada:', error.message); }
console.log('Registrado: ' + desktop + '\nO gerenciador padrão não foi alterado.');
