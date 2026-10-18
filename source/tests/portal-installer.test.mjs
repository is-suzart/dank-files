import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mergeConfig,install} from '../scripts/install-portal-backend.mjs';
import {mkdtemp,readFile,readdir,rm,writeFile,mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
test('portal preference preserves desktop overrides and unrelated sections',()=>{
 const input='[preferred]\ndefault=gtk\norg.freedesktop.impl.portal.ScreenCast=gnome\norg.freedesktop.impl.portal.FileChooser=gtk\n[other]\nkey=value\n';
 const result=mergeConfig(input);
 assert.equal(result,input.replace('FileChooser=gtk','FileChooser=dank-files;gtk'));
 assert.equal(mergeConfig(result),result);
 assert.match(mergeConfig('[preferred]\ndefault=gtk\n[other]\nkey=value\n'),/FileChooser=dank-files;gtk\n\[other\]/);
});
test('portal installer dry run writes nothing and honors the desktop-specific config',async()=>{
 const root=await mkdtemp(join(tmpdir(),'dank-portal-install-'));
 const previous={XDG_CONFIG_HOME:process.env.XDG_CONFIG_HOME,XDG_DATA_HOME:process.env.XDG_DATA_HOME,XDG_CURRENT_DESKTOP:process.env.XDG_CURRENT_DESKTOP};
 try{
  process.env.XDG_CONFIG_HOME=join(root,'config');process.env.XDG_DATA_HOME=join(root,'data');process.env.XDG_CURRENT_DESKTOP='niri';
  await install([]);assert.deepEqual(await readdir(root),[]);
  const config=join(root,'config/xdg-desktop-portal/niri-portals.conf');await mkdir(join(root,'config/xdg-desktop-portal'),{recursive:true});
  const original='[preferred]\ndefault=gtk\norg.freedesktop.impl.portal.FileChooser=gtk\n';await writeFile(config,original);
  // Actual installation requires a compiled bundle. Config edits are separately checked above.
  await install(['--uninstall']);assert.equal(await readFile(config,'utf8'),original);
 }finally{for(const [key,value] of Object.entries(previous)){if(value===undefined)delete process.env[key];else process.env[key]=value;}await rm(root,{recursive:true,force:true});}
});
