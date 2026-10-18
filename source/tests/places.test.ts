import { t } from '../src/infrastructure/i18n.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { discoverPlaces } from '../src/infrastructure/filesystem.js';

test('OS places honor XDG paths, skip missing or disabled folders, and never evaluate shell syntax',async()=>{
  const home=await mkdtemp('/tmp/nandomo-places-');
  try {
    await mkdir(join(home,'Fotos pessoais'));await mkdir(join(home,'Downloads'));
    const config=join(home,'user-dirs.dirs');
    await writeFile(config,'XDG_PICTURES_DIR="$HOME/Fotos pessoais"\nXDG_DOWNLOAD_DIR="'+join(home,'Downloads')+'"\nXDG_DOCUMENTS_DIR="$HOME"\nXDG_VIDEOS_DIR="$HOME/Missing"\nXDG_MUSIC_DIR="$(touch injected)"\n');
    const places=await discoverPlaces(home,config);
    assert.deepEqual(places.map(place=>[place.name,place.path,place.icon]),[
      [t('Imagens'),join(home,'Fotos pessoais'),'folder-pictures'],[t('Downloads'),join(home,'Downloads'),'folder-download'],
    ]);
  } finally {await rm(home,{recursive:true,force:true});}
});

test('GTK bookmarks override XDG default places and preserve labels and order',async()=>{
  const home=await mkdtemp('/tmp/nandomo-bookmarks-');
  try {
    await mkdir(join(home,'gtk-3.0'));await mkdir(join(home,'My files'));
    await writeFile(join(home,'gtk-3.0/bookmarks'),new URL('file://'+join(home,'My files').replace(/ /g,'%20')).href+' Personalizados\nsmb://server/share Remote\n');
    const places=await discoverPlaces(home,join(home,'user-dirs.dirs'));
    assert.deepEqual(places.map(place=>[place.name,place.path]),[['Personalizados',join(home,'My files')]]);
  }finally{await rm(home,{recursive:true,force:true});}
});
