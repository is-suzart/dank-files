import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,symlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {discoverIcons} from '../src/infrastructure/icons.js';
import {createDmsDesktop} from '../src/infrastructure/dmsDesktop.js';

test('application icons use their desktop Icon in the selected DMS theme, with inheritance and a package fallback',async()=>{
 const root=await mkdtemp(join(tmpdir(),'nandomo-icon-theme-'));
 const keys=['XDG_CONFIG_HOME','XDG_DATA_HOME','XDG_DATA_DIRS','XDG_CACHE_HOME','NANDOMO_FM_CONFIG_DIR'];
 const saved=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
 try {
  const config=join(root,'config'),data=join(root,'data'),cache=join(root,'cache');
  Object.assign(process.env,{XDG_CONFIG_HOME:config,XDG_DATA_HOME:data,XDG_DATA_DIRS:join(root,'empty'),XDG_CACHE_HOME:cache,NANDOMO_FM_CONFIG_DIR:join(config,'file-manager')});
  await mkdir(join(config,'DankMaterialShell'),{recursive:true});await mkdir(join(cache,'DankMaterialShell'),{recursive:true});await mkdir(join(data,'applications'),{recursive:true});
  await writeFile(join(config,'DankMaterialShell/settings.json'),JSON.stringify({iconThemePerMode:true,iconThemeDark:'FixtureDark',iconThemeLight:'FixtureLight'}));
  await writeFile(join(cache,'DankMaterialShell/dms-colors.json'),JSON.stringify({mode:'dark'}));
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="blue"/></svg>';
  for(const theme of ['FixtureDark','FixtureLight','Parent']) {
   const dir=join(data,'icons',theme);await mkdir(join(dir,'scalable/apps'),{recursive:true});
   await writeFile(join(dir,'index.theme'),'[Icon Theme]\nDirectories=scalable/apps\nInherits='+(theme==='Parent'?'': 'Parent')+'\n');
  }
  const themed=join(data,'icons/FixtureDark/scalable/apps/preferences-system-network.svg');await writeFile(themed,svg);
  const lightIcon=join(data,'icons/FixtureLight/scalable/apps/preferences-system-network.svg');await writeFile(lightIcon,svg);
  const managerIcon=join(data,'icons/Parent/scalable/apps/system-file-manager.svg');await writeFile(managerIcon,svg);
  await writeFile(join(data,'icons/Parent/scalable/apps/org.gnome.Nautilus.svg'),svg);
  await writeFile(join(data,'icons/Parent/scalable/apps/org.xfce.thunar.svg'),svg);
  const pack=join(data,'icons/Parent/scalable/apps/package-x-generic.svg');await writeFile(pack,svg);
  await symlink('/__missing_icon_target__',join(data,'icons/FixtureDark/scalable/apps/system-file-manager.svg'));
  for(const [id,icon] of [['network','preferences-system-network'],['nandomo','system-file-manager'],['nautilus','org.gnome.Nautilus'],['thunar','org.xfce.thunar'],['missing',''],['unknown','__nonexistent_icon__']])await writeFile(join(data,'applications',id+'.desktop'),'[Desktop Entry]\nType=Application\nName='+id+'\nExec=true\n'+(icon?'Icon='+icon+'\n':''));
  const apps=await createDmsDesktop(root).applications!();
  const icon=(name:string)=>apps.find(app=>app.name===name)?.icon;
  assert.equal(icon('network'),pathToFileURL(themed).href);
  assert.equal(icon('nandomo'),pathToFileURL(managerIcon).href);
  assert.notEqual(icon('nautilus'),icon('thunar'));
  assert.equal(icon('missing'),pathToFileURL(pack).href);
  assert.equal(icon('unknown'),'__nonexistent_icon__'); // Qt resolver checks this name before requesting it.
  await writeFile(join(cache,'DankMaterialShell/dms-colors.json'),JSON.stringify({mode:'light'}));
  assert.equal((await createDmsDesktop(root).applications!()).find(app=>app.name==='network')?.icon,pathToFileURL(lightIcon).href);
  assert.equal((await discoverIcons(root,false,['../../escape']))['../../escape'],undefined);
 }finally{for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}await rm(root,{recursive:true,force:true});}
});
