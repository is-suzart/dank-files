import { SortMenu } from './SortMenu.js';
import { ViewGroup } from './ViewGroup.js';
import { component, computed, signal, effect } from '@nandomo/core';
import type { FileManager } from '../application/createFileManager.js';
import type { Sort } from '../domain/files.js';
import { importQml,createQmlScope,qmlHandler } from '@nandomo/bridge-qml';
const layouts = importQml('QtQuick.Layouts');
import { QuietButton as DankButton } from '../native/QuietButton.js';
import { PathBar } from '../native/PathBar.js';
import { NativeTextField } from './NativeTextField.js';
import { TabBar } from './TabBar.js';
import { t } from '../infrastructure/i18n.js';

export interface ToolbarProps { manager: FileManager; chooser?: boolean; }
export const Toolbar = component<ToolbarProps>('Toolbar', ({manager,chooser = false}) => {
  const scope=createQmlScope();
  const searchOpen=signal(false);
  const address = signal(manager.path());
  effect(() => { address.set(manager.path());searchOpen.set(false); });
  const canGoBack = computed(() => manager.navigation().back && !manager.busy());
  const canGoForward = computed(() => manager.navigation().forward && !manager.busy());
  const sorts: Sort[] = ['name','size','modified','type'];

  return (
    <layouts.ColumnLayout width="fill" spacing={6}>
      {chooser ? null : <TabBar manager={manager} />}
      <layouts.RowLayout {...{'Layout.fillWidth':true}}>
        <DankButton objectName="toolbarBack" text="" iconName="go-previous" {...{'Accessible.name':t('Voltar')}} enabled={canGoBack} onClicked={() => { void manager.back(); }} />
        <DankButton objectName="toolbarForward" text="" iconName="go-next" {...{'Accessible.name':t('Avançar')}} enabled={canGoForward} onClicked={() => { void manager.forward(); }} />
        <DankButton objectName="toolbarUp" text="" iconName="go-up" {...{'Accessible.name':t('Pasta acima')}} onClicked={() => { void manager.up(); }} />
        <PathBar objectName="toolbarAddress" visible={()=>!searchOpen()} text={address} path={manager.path} home={manager.home} onNavigate={(target: string)=>{void manager.navigate(target);}}
          {...{'Layout.fillWidth':true}} onTextEdited={text => address.set(text)}
          onAccepted={text => { void manager.navigate(text); }} />
        <NativeTextField qmlId={scope.id('search')} objectName="fileSearch" visible={searchOpen}
          text={manager.searchText} placeholderText={t('Buscar nesta pasta…')} {...{'Layout.fillWidth':true,'Accessible.name':t('Buscar arquivos')}}
          onTextEdited={manager.setSearch}
          onVisibleChanged={qmlHandler(scope,q=>{if(q.search.visible){q.search.forceActiveFocus();q.search.selectAll();}})}
          {...{'Keys.onEscapePressed':qmlHandler(scope,q=>{q.searchToggle.clicked();})}} />
        <DankButton qmlId={scope.id('searchToggle')} objectName="toolbarSearch" text="" iconName={()=>searchOpen()?'window-close':'search'}
          selected={searchOpen} {...{'Accessible.name':()=>t(searchOpen()?'Fechar busca':'Buscar arquivos')}}
          onClicked={()=>{searchOpen.set(!searchOpen());if(!searchOpen())manager.setSearch('');}} />
        <DankButton objectName="trashRestore" text={t('Restaurar')} iconName="edit-undo" visible={()=>manager.path()==='trash:///'}
          enabled={()=>manager.selection().length>0&&!manager.mutating()} onClicked={()=>{void manager.restoreSelected();}} />
        <DankButton objectName="toolbarRefresh" text="" iconName="view-refresh" {...{'Accessible.name':t('Atualizar')}} onClicked={() => { void manager.refresh(); }} />

        <ViewGroup view={manager.view} surface={()=>manager.palette().surface_container_high || '#25282b'} onChanged={value=>{if(value==='list' || value==='grid' || value==='columns')manager.setView(value);}} />

        <SortMenu onError={manager.reportError} objectName="toolbarSort"
          currentIndex={() => sorts.indexOf(manager.order())} onActivated={index => { const sort=sorts[index]; if(sort) manager.setOrder(sort); }} />
        <DankButton objectName="toolbarDescending" {...{"Accessible.name":()=>t(manager.descending()?"Ordem decrescente":"Ordem crescente")}} text={() => manager.descending() ? '↓' : '↑'} onClicked={manager.toggleDescending} />
        <DankButton visible={!chooser} text="" iconName="settings" {...{'Accessible.name':t('Preferências')}} onClicked={manager.showPreferences} />
        <DankButton objectName="toolbarHidden" text="" iconName={()=>manager.hidden() ? "visibility" : "visibility-off"} {...{'Accessible.name':()=>manager.hidden() ? t('Arquivos ocultos visíveis') : t('Arquivos ocultos escondidos')}} selected={manager.hidden} onClicked={manager.toggleHidden} />
      </layouts.RowLayout>
    </layouts.ColumnLayout>
  );
});
