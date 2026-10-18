import { t } from '../src/infrastructure/i18n.js';
import { sortEntries } from '../src/domain/sortEntries.js';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { listDirectory, discoverGames, parseDrives } from '../src/infrastructure/filesystem.js';
test('listing preserves file names and symbolic directories; sorting keeps folders first', async () => {
  const root = await mkdtemp(join(tmpdir(),'nandomo-fm-test-'));
  try {
    await mkdir(join(root,'Folder')); await symlink(join(root,'Folder'),join(root,'Link'));
    await writeFile(join(root,'a10.txt'),'12345'); await writeFile(join(root,'a2.txt'),'a'); await writeFile(join(root,'.hidden'),'a');
    const entries = await listDirectory(root);
    assert.equal(entries.find(entry=>entry.name==='Link')?.directory,true);
    assert.equal(entries.find(entry=>entry.name==='Link')?.symlink,true);
    const ordered = sortEntries(entries,'name',false,false);
    assert.deepEqual(ordered.map(entry=>entry.name),['Folder','Link','a2.txt','a10.txt']);
    assert.equal(sortEntries(entries,'size',true,false)[2]?.name,'a10.txt');
    assert.equal(sortEntries(entries,'name',false,true).length,5);
    await assert.rejects(listDirectory(join(root,'missing')));
  } finally { await rm(root,{recursive:true,force:true}); }
});
test('drives show mounted filesystems and disabled unmounted volumes', () => {
  const drives = parseDrives({blockdevices:[{name:'sdb',type:'disk',children:[{name:'sdb1',type:'part',label:'Games',fstype:'xfs',mountpoints:['/mnt/games']},{name:'sdb2',type:'part',fstype:'ext4',mountpoints:[null]},{name:'sdb3',type:'part',fstype:'swap',mountpoints:[null]}]}]});
  assert.equal(drives.length,2); assert.equal(drives[0]?.path,'/mnt/games'); assert.equal(drives[1]?.mounted,false);
});
test('Steam libraries/Proton and launcher prefixes are grouped without duplicate symlinks', async () => {
  const root = await mkdtemp(join(tmpdir(),'nandomo-fm-games-'));
  try {
    const steam = join(root,'.local/share/Steam'); const external = join(root,'external');
    for (const library of [steam,external]) { await mkdir(join(library,'steamapps/common'),{recursive:true}); await mkdir(join(library,'steamapps/compatdata')); }
    await writeFile(join(steam,'steamapps/libraryfolders.vdf'),`"libraryfolders" { "1" { "path" "${external}" } }`);
    await mkdir(join(root,'.steam')); await symlink(steam,join(root,'.steam/steam'));
    const heroic = join(root,'.config/heroic/GamesConfig'); await mkdir(heroic,{recursive:true}); await mkdir(join(root,'heroic-prefix'));
    await writeFile(join(heroic,'game.json'),JSON.stringify({game:{winePrefix:join(root,'heroic-prefix')}}));
    const lutris = join(root,'.config/lutris/games'); await mkdir(lutris,{recursive:true}); await mkdir(join(root,'lutris-prefix'));
    await writeFile(join(lutris,'game.yml'),`wine:\n  prefix: '${join(root,'lutris-prefix')}'\n`);
    const games = await discoverGames(root);
    assert.deepEqual(games.map(group=>group.name),['Steam / Proton','Heroic','Lutris']);
    assert.equal(games[0]?.places.length,4);
    assert.ok(games[1]?.places.some(place=>place.path.endsWith('heroic-prefix')));
    assert.ok(games[2]?.places.some(place=>place.path.endsWith('lutris-prefix')));
  } finally { await rm(root,{recursive:true,force:true}); }
});

test('Heroic uses the store title instead of the internal app identifier for prefixes',async()=>{
  const home=await mkdtemp('/tmp/nandomo-heroic-titles-');
  try {
    const root=join(home,'.config/heroic');const prefix=join(home,'Prefixes/Rocket League');
    await mkdir(join(root,'GamesConfig'),{recursive:true});await mkdir(join(root,'store_cache'),{recursive:true});await mkdir(prefix,{recursive:true});
    await writeFile(join(root,'GamesConfig/Sugar.json'),JSON.stringify({Sugar:{winePrefix:prefix}}));
    await writeFile(join(root,'store_cache/legendary_library.json'),JSON.stringify({library:[{app_name:'Sugar',title:'Rocket League'}]}));
    const groups=await discoverGames(home);
    assert.equal(groups.find(group=>group.name==='Heroic')?.places.find(place=>place.path===prefix)?.name,t('Prefixo · {name}',{name:'Rocket League'}));
  }finally{await rm(home,{recursive:true,force:true});}
});

test('volumes omit mounted boot and EFI partitions but retain data and unmounted devices',()=>{
  const drives=parseDrives({blockdevices:[{name:'disk',type:'disk',children:[
    {name:'efi',type:'part',fstype:'vfat',mountpoints:['/boot/efi']},
    {name:'boot',type:'part',fstype:'ext4',mountpoints:['/boot']},
    {name:'data',type:'part',fstype:'xfs',mountpoints:['/mnt/data']},
    {name:'usb',type:'part',fstype:'vfat',mountpoints:[null]},
  ]}]});
  assert.deepEqual(drives.map(drive=>drive.id),['data:/mnt/data','usb:unmounted']);
});
