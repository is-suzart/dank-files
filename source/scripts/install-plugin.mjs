import { cp, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'DankMaterialShell/plugins');
const target = join(root, 'dankFiles');
try { await access(target); throw new Error('Plugin já existe: '+target+'. Preserve/remova a versão anterior antes de instalar.'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
await mkdir(root, {recursive:true});
await cp(fileURLToPath(new URL('../dist/dankFiles', import.meta.url)), target, {recursive:true, force:false, errorOnExist:true});
console.log('Instalado: '+target+'\nEm DMS Settings → Plugins, escaneie e ative Dank Files; depois adicione o widget à DankBar.');
