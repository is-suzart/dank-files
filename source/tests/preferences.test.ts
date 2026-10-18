import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { normalizePreferences } from '../src/domain/preferences.js';
import { desktopActions } from '../src/infrastructure/desktopActions.js';
import { sortEntries } from '../src/domain/sortEntries.js';

test('preferences reject invalid values, persist serialized changes, and control folder ordering',async()=>{
  const root=await mkdtemp('/tmp/nandomo-preferences-');const previous=process.env.NANDOMO_FM_CONFIG_DIR;
  process.env.NANDOMO_FM_CONFIG_DIR=root;
  try {
    assert.equal(normalizePreferences({gridSize:500,singleClick:'yes'}).gridSize,160);
    assert.equal(normalizePreferences({gridSize:NaN,singleClick:'yes'}).singleClick,false);
    assert.equal(normalizePreferences({}).showSidebarVolumes,true);
    assert.equal(normalizePreferences({showSidebarGames:"no"}).showSidebarGames,true);
    const actions=desktopActions(root);
    await Promise.all([actions.writePreferences({gridSize:64}),actions.writePreferences({gridSize:128,thumbnails:false,detailsAlwaysVisible:true,showSidebarVolumes:false,showSidebarGames:false})]);
    assert.equal((await actions.readPreferences()).gridSize,128);
    assert.equal(normalizePreferences(await actions.readPreferences()).showSidebarVolumes,false);
    assert.equal(normalizePreferences(await actions.readPreferences()).showSidebarGames,false);
    assert.equal(normalizePreferences(await actions.readPreferences()).detailsAlwaysVisible,true);
    assert.equal(normalizePreferences({detailsAlwaysVisible:'true'}).detailsAlwaysVisible,false);
    assert.equal(JSON.parse(await readFile(join(root,'preferences.json'),'utf8')).thumbnails,false);
    const entries=[{name:'Z',directory:true},{name:'A',directory:false}].map(item=>({...item,path:item.name,symlink:false,size:0,modified:0,icon:'folder'}));
    assert.equal(sortEntries(entries,'name',false,false,true)[0]!.name,'Z');
    assert.equal(sortEntries(entries,'name',false,false,false)[0]!.name,'A');
  }finally{if(previous===undefined)delete process.env.NANDOMO_FM_CONFIG_DIR;else process.env.NANDOMO_FM_CONFIG_DIR=previous;await rm(root,{recursive:true,force:true});}
});
