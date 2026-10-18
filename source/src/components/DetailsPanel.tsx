import { importQml } from '@nandomo/bridge-qml';
const nativeWidgets=importQml('qs.DCommon.Widgets');
const nativeQuick=importQml('QtQuick');
import { formattingLocale, t } from '../infrastructure/i18n.js';
import { component, computed } from '@nandomo/core';
import type { FileManager } from '../application/createFileManager.js';
import { QuietButton as DankButton } from '../native/QuietButton.js';
import { FilePreview } from '../native/FilePreview.js';
import { GameSection } from './GameSection.js';

export const DetailsPanel=component<{manager:FileManager}>('DetailsPanel',({manager})=>{
  const application=computed(()=>manager.path()==='applications:///');
  const file=computed(()=>manager.selected());
  const permissions=computed(()=>{
    const mode=parseInt(manager.selectedDetails()?.permissions ?? '0',8);
    const describe=(bits:number)=>[bits&4 ? t('ler') : '',bits&2 ? t('alterar') : '',bits&1 ? (file()?.directory ? t('acessar') : t('executar')) : ''].filter(Boolean).join(', ') || t('sem acesso');
    return manager.selectedDetails() ? t('Proprietário: {owner} · Grupo: {group} · Outros: {others}',{owner:describe((mode>>6)&7),group:describe((mode>>3)&7),others:describe(mode&7)}) : '';
  });
  const size=computed(()=>file()?.directory ? '—' : file() ? `${new Intl.NumberFormat(formattingLocale('LC_NUMERIC'),{minimumFractionDigits:1,maximumFractionDigits:1}).format(file()!.size/1024)} KB` : '');
  const modified=computed(()=>file() ? new Date(file()!.modified).toLocaleString(formattingLocale('LC_TIME')) : '');
  return <nativeQuick.Column width="fill" spacing={12}>
    <DankButton width="fill" visible={()=>!manager.preferences().detailsAlwaysVisible} iconName="window-close" text={t("Fechar detalhes")} onClicked={manager.closeDetails} />
    <nativeWidgets.StyledText objectName="detailsEmpty" width="fill" visible={()=>!file()} text={t("Selecione um item para ver os detalhes.")} />
    <nativeQuick.Column width="fill" spacing={12} visible={()=>!!file()}>
    <nativeWidgets.StyledText width="fill" text={()=>file()?.name ?? ''} />
    <nativeWidgets.StyledText width="fill" text={()=>file()?.path ?? ''} />
    <FilePreview visible={()=>!application() && !manager.previewOpen()} objectName="detailsPreview" width="fill" height={200} source={manager.previewSource} kind={()=>file()?.directory ? 'folder' : manager.remote() ? 'none' : manager.selectedPreviewKind()} />
    <nativeWidgets.StyledText visible={()=>!application()} width="fill" text={()=>file()?.directory ? t('Tipo: Pasta') : t('Tamanho: {size}',{size:size()})} />
    <nativeWidgets.StyledText visible={()=>!application()} width="fill" text={()=>t('Modificado: {date}',{date:modified()})} />
    <nativeWidgets.StyledText visible={()=>!application()} width="fill" text={()=>manager.selectedDetails()?.items !== undefined ? `${t('{count} itens',{count:manager.selectedDetails()!.items ?? 0})} · ${t('{count} pastas',{count:manager.selectedDetails()!.folders ?? 0})}` : ''} />
    <DankButton width="fill" visible={()=>!application()} iconName="document-preview" text={t("Pré-visualizar")} enabled={()=>manager.selectedPreviewKind() !== 'none'} onClicked={manager.requestPreview} />
    <DankButton width="fill" iconName="document-open" objectName="detailsOpen" text={()=>t(application() ? 'Abrir app' : file()?.directory ? 'Abrir pasta' : 'Abrir no app padrão')} onClicked={()=>{const entry=file();if(entry)void (entry.directory ? manager.navigate(entry.path) : manager.open(entry.path));}} />
    <DankButton width="fill" visible={application} text={t("Abrir .desktop")} iconName="document-open" onClicked={()=>{void manager.openDesktopFile();}} />
    <DankButton width="fill" visible={application} text={t("Desinstalar…")} iconName="trash" onClicked={()=>{void manager.manageApplication();}} />
    <DankButton width="fill" visible={application} text={t("Ocultar")} iconName="visibility-off" onClicked={()=>{void manager.hideApplication();}} />
    <DankButton width="fill" objectName="detailsRestore" visible={()=>manager.path()==='trash:///'} iconName="edit-undo" text={t('Restaurar')} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.restoreSelected();}} />
    <DankButton width="fill" objectName="detailsCopy" visible={()=>!application()} iconName="edit-copy" text={t("Copiar")} onClicked={manager.copy} />
    <DankButton width="fill" objectName="detailsCut" visible={()=>!application()} iconName="edit-cut" text={t("Recortar")} onClicked={manager.cut} />
    <DankButton width="fill" visible={()=>!application()} iconName="move" text={t("Mover para…")} enabled={()=>!manager.mutating()} onClicked={()=>manager.requestTransfer('move')} />
    <DankButton width="fill" visible={()=>!application()} iconName="copy-to" text={t("Copiar para…")} enabled={()=>!manager.mutating()} onClicked={()=>manager.requestTransfer('copy')} />
    <DankButton width="fill" visible={()=>!application()} iconName="edit-rename" text={t("Renomear")} enabled={()=>!manager.mutating()} onClicked={manager.requestRename} />
    <DankButton width="fill" visible={()=>!application() && !manager.path().includes(':///')} iconName="trash" text={t("Mover para a lixeira")} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.trashSelected();}} />
    <GameSection visible={()=>!application()} width="fill" title={t("Avançado")} iconName="settings">
      <nativeWidgets.StyledText width="fill" text={permissions} />
      <nativeWidgets.StyledText width="fill" text={()=>manager.selectedDetails() ? t('Proprietário: {owner}',{owner:manager.selectedDetails()!.owner}) : ''} />
      <DankButton width="fill" text={t("Editar permissões…")} iconName="settings" onClicked={manager.editPermissions} />
    </GameSection>
    </nativeQuick.Column>
  </nativeQuick.Column>;
});
