import { tsImport } from 'tsx/esm/api';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNativeScene } from '@nandomo/bridge-qml';
import { i18n, t } from '../src/infrastructure/i18n.js';

const here = new URL('../tsconfig.json', import.meta.url);
const load = (path: string) => tsImport(path, { parentURL: import.meta.url, tsconfig: fileURLToPath(here) });

test('a generated region is translated when the region is generated', async () => {
  const { PreferencesContent } = await load('../src/components/PreferencesContent.tsx');
  i18n.setLocale('en_US.UTF-8');
  try {
    const scene = createNativeScene(
      PreferencesContent({ preferences: () => ({ gridSize: 96, thumbnails: true, detailsAlwaysVisible: false, foldersFirst: true, singleClick: false, showTerminal: true, showSidebarSpecial: true, showSidebarPlaces: true, showSidebarVolumes: true, showSidebarGames: true, reduceAnimations: false }), onChanged: () => {} } as never),
      () => {}, async () => {}, undefined, { fragment: true, dynamicFragments: true },
    );
    assert.match(scene.source, /text: "APPEARANCE"/);
    assert.doesNotMatch(scene.source, /APARÊNCIA/);
    assert.match(scene.source, /Show thumbnails/);
    scene.dispose();
  } finally {
    i18n.setLocale('pt_BR.UTF-8');
  }
});

test('icon-only controls keep an accessible name in every locale', () => {
  i18n.setLocale('zh_CN.UTF-8');
  try {
    assert.equal(t('Visualização em grade'), '网格视图');
    i18n.setLocale('en_US.UTF-8');
    assert.equal(t('Visualização em grade'), 'Grid view');
  } finally {
    i18n.setLocale('pt_BR.UTF-8');
  }
});
