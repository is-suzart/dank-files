import { importQml } from '@nandomo/bridge-qml';
const nativeWidgets=importQml('qs.DCommon.Widgets');
const nativeQuick=importQml('QtQuick');
import { t } from '../infrastructure/i18n.js';
import { component, computed, For, Show } from '@nandomo/core';
import type { FileManager } from '../application/createFileManager.js';
import { QuietButton } from '../native/QuietButton.js';
import { SectionTitle } from './SectionTitle.js';
import { GameSection } from './GameSection.js';
import { PlaceItem } from './PlaceItem.js';

export interface SidebarProps { navigationOnly?:boolean; manager: Pick<FileManager,'home'|'drives'|'games'|'navigate'|'volumeUsage'> & Partial<Pick<FileManager,'requestNew'|'places'|'path'|'showApplications'|'special'|'locationAction'|'preferences'>>; }
export const Sidebar = component<SidebarProps>('Sidebar', ({manager,navigationOnly=false}) => {
  const hasDrives = computed(() => manager.drives().length > 0);
  const hasGames = computed(() => manager.games().length > 0);
  const showSidebarSpecial = () => !navigationOnly && (manager.preferences?.().showSidebarSpecial ?? true);
  const showSidebarPlaces = () => manager.preferences?.().showSidebarPlaces ?? true;
  const showSidebarVolumes = () => manager.preferences?.().showSidebarVolumes ?? true;
  const showSidebarGames = () => manager.preferences?.().showSidebarGames ?? true;

  return (
    <nativeQuick.Column width="fill" spacing={4}>
      <Show when={showSidebarSpecial}>
        {() => <QuietButton width="fill" iconName="applications-other" selected={()=>manager.path?.() === 'applications:///'} text={t("Aplicativos")} onClicked={()=>{void manager.showApplications?.();}} />}
      </Show>
      <Show when={showSidebarSpecial}>
        {() => <QuietButton width="fill" iconName="trash" selected={()=>manager.path?.() === 'trash:///'} text={t("Lixeira")} onClicked={()=>{void manager.special?.('trash:///');}} />}
      </Show>
      <Show when={showSidebarSpecial}>
        {() => <QuietButton width="fill" iconName="recent" selected={()=>manager.path?.() === 'recent:///'} text={t("Recentes")} onClicked={()=>{void manager.special?.('recent:///');}} />}
      </Show>
      <Show when={showSidebarPlaces}>
        {() => <SectionTitle width="fill" text={t("LUGARES")} />}
      </Show>
      <Show when={showSidebarPlaces}>
        {() => <QuietButton objectName="sidebarHome" width="fill" iconName="user-home" selected={()=>manager.path?.() === manager.home} text={t("Pasta pessoal")} onClicked={() => { void manager.navigate(manager.home); }} />}
      </Show>
      <Show when={showSidebarPlaces}>
        {() => <QuietButton objectName="sidebarRoot" width="fill" iconName="drive-harddisk" text={t("Sistema")} onClicked={() => { void manager.navigate('/'); }} />}
      </Show>
      <Show when={showSidebarPlaces}>
        {() => <For each={()=>manager.places?.() ?? []} by={place=>place.path}>
          {place=><PlaceItem action={manager.locationAction} place={place} navigate={manager.navigate} currentPath={manager.path} />}
        </For>}
      </Show>
      <Show when={showSidebarVolumes}>
        {() => <SectionTitle objectName="sidebarVolumesTitle" width="fill" text={t("VOLUMES")} />}
      </Show>
      <Show when={showSidebarVolumes}>
        {() => <For each={manager.drives} by={place => place.id ?? `${place.path}:${place.name}`}>
          {place => <PlaceItem action={manager.locationAction} place={place} navigate={manager.navigate} currentPath={manager.path} usage={manager.volumeUsage} drive />}
        </For>}
      </Show>
      <Show when={() => showSidebarVolumes() && !hasDrives()}>
        {() => <nativeWidgets.StyledText width="fill" text={t("Nenhum volume detectado")} />}
      </Show>
      <Show when={showSidebarGames}>
        {() => <SectionTitle width="fill" text={t("JOGOS")} />}
      </Show>
      <Show when={showSidebarGames}>
        {() => <For each={manager.games} by={group => group.name}>
          {group => (
            <GameSection objectName={`gameGroup:${group().name}`} width="fill" title={()=>group().name}>
              <For each={() => group().places} by={place => place.path}>
                {place => <PlaceItem place={place} navigate={manager.navigate} />}
              </For>
            </GameSection>
          )}
        </For>}
      </Show>
      <Show when={() => showSidebarGames() && !hasGames()}>
        {() => <nativeWidgets.StyledText width="fill" text={t("Nenhuma instalação detectada")} />}
      </Show>
    </nativeQuick.Column>
  );
});
