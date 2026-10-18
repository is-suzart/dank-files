import { importQml } from '@nandomo/bridge-qml';
const nativeLayouts=importQml('QtQuick.Layouts');
const nativeControls=importQml("QtQuick.Controls");
const nativeQuick=importQml('QtQuick');
const nativeWidgets=importQml('qs.DCommon.Widgets');
import { PreferencesContent } from './PreferencesContent.js';
import { FolderList } from './FolderList.js';
import { FolderAppearanceDialog } from './FolderAppearanceDialog.js';
import { t } from '../infrastructure/i18n.js';
import { component, signal, effect, Dialog } from '@nandomo/core';
import { qml, createQmlScope, qmlExpression } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { NativeTextField as DankTextField } from './NativeTextField.js';
import { DialogBody } from './DialogBody.js';
import { QuietButton } from '../native/QuietButton.js';
import { PermissionEditor } from '../native/PermissionEditor.js';
import { PreviewContent } from '../native/PreviewContent.js';
import { ApplicationChooser } from '../native/ApplicationChooser.js';

const NameDialog=component<{manager:FileManager}>('NameDialog',({manager})=>{
  const name=signal('');
  effect(()=>{name.set(manager.editRequest()?.name ?? '');});
  return <Dialog objectName="nameDialog" open={()=>!!manager.editRequest() && !['copy','move'].includes(manager.editRequest()!.kind)}
    title={()=>manager.editRequest()?.kind === 'copy' ? t('Copiar para…') : manager.editRequest()?.kind === 'move' ? t('Mover para…') : manager.editRequest()?.kind === 'rename' ? t('Renomear') : manager.editRequest()?.kind === 'folder' ? t('Nova pasta') : t('Novo arquivo')}
    initialFocus="editName" closeOnEscape={()=>!manager.mutating()} onCloseRequest={manager.cancelEdit}>
    <DialogBody open={()=>!!manager.editRequest() && !['copy','move'].includes(manager.editRequest()!.kind)}>
    <nativeQuick.Column width={360} spacing={12}>
      <nativeWidgets.StyledText text={()=>['copy','move'].includes(manager.editRequest()?.kind ?? '') ? t('Pasta de destino (caminho completo)') : t('Nome')} />
      <DankTextField objectName="editName" width="fill" text={name} placeholderText={t("Nome")}
        enabled={()=>!manager.mutating()} onTextEdited={text=>name.set(text)} onAccepted={()=>{void manager.submitEdit(name());}} />
      <nativeWidgets.StyledText width="fill" text={manager.error} />
      <nativeLayouts.RowLayout width="fill">
        <nativeWidgets.DButton objectName="editCancel" text={t("Cancelar")} enabled={()=>!manager.mutating()} onClicked={manager.cancelEdit} />
        <nativeWidgets.DButton objectName="editSave" text={()=>manager.mutating() ? t('Salvando…') : t('Salvar')} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.submitEdit(name());}} />
      </nativeLayouts.RowLayout>
    </nativeQuick.Column>
    </DialogBody>
  </Dialog>;
});
const DestinationDialog=component<{manager:FileManager}>('DestinationDialog',({manager})=>
  <Dialog objectName="destinationDialog" open={()=>!manager.conflict() && ['copy','move'].includes(manager.editRequest()?.kind ?? '')}
    title={()=>manager.editRequest()?.kind === 'move' ? t('Mover para…') : t('Copiar para…')} onCloseRequest={manager.cancelEdit}>
    <DialogBody open={()=>!manager.conflict() && ['copy','move'].includes(manager.editRequest()?.kind ?? '')}>
    <nativeQuick.Column width={480} spacing={10}>
      <nativeWidgets.StyledText width="fill" text={manager.destinationPath} />
      <QuietButton text={t("Pasta acima")} iconName="go-up" enabled={()=>!manager.destinationBusy() && !manager.mutating()} onClicked={()=>{void manager.destinationUp();}} />
      <FolderList folders={manager.destinationFolders} enabled={()=>!manager.destinationBusy() && !manager.mutating()} onChosen={target=>{void manager.browseDestination(target);}} />
      <nativeWidgets.StyledText width="fill" text={()=>manager.destinationBusy() ? t('Carregando pastas…') : manager.error()} />
      <nativeLayouts.RowLayout width="fill">
        <nativeWidgets.DButton text={t("Cancelar")} enabled={()=>!manager.mutating()} onClicked={manager.cancelEdit} />
        <nativeWidgets.DButton objectName="destinationConfirm" text={t("Escolher esta pasta")} enabled={()=>!manager.destinationBusy() && !manager.mutating()} onClicked={()=>{void manager.confirmDestination();}} />
      </nativeLayouts.RowLayout>
    </nativeQuick.Column>
    </DialogBody>
  </Dialog>,
);
const ConflictDialog=component<{manager:FileManager}>('ConflictDialog',({manager})=>{
  const name=signal('');
  effect(()=>{name.set(manager.conflict()?.destination.split('/').pop() ?? '');});
  return <Dialog objectName="conflictDialog" open={()=>!!manager.conflict()} title={t("Já existe um item com esse nome")} onCloseRequest={manager.cancelConflict}>
    <DialogBody open={()=>!!manager.conflict()}>
    <nativeQuick.Column width={480} spacing={12}>
      <nativeWidgets.StyledText width="fill" text={()=>manager.conflict()?.destination ?? ''} />
      <nativeWidgets.StyledText width="fill" text={t("Você pode escolher outro nome, ignorar este item ou substituir um arquivo comum.")} />
      <DankTextField objectName="conflictName" text={name} placeholderText={t("Novo nome")} enabled={()=>!manager.mutating()} onTextEdited={name.set} />
      <nativeWidgets.StyledText width="fill" text={manager.error} />
      <nativeLayouts.RowLayout width="fill">
        <nativeWidgets.DButton text={t("Cancelar")} enabled={()=>!manager.mutating()} onClicked={manager.cancelConflict} />
        <nativeWidgets.DButton text={t("Ignorar")} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.resolveConflict('skip');}} />
        <nativeWidgets.DButton objectName="conflictRename" text={t("Renomear")} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.resolveConflict('rename',name());}} />
        <nativeWidgets.DButton text={t("Substituir")} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.resolveConflict('replace');}} />
      </nativeLayouts.RowLayout>
    </nativeQuick.Column>
    </DialogBody>
  </Dialog>;
});
const PermissionsDialog=component<{manager:FileManager}>('PermissionsDialog',({manager})=>{
  const mode=signal(0o644);
  effect(()=>{if(manager.permissionsTarget())mode.set(parseInt(manager.selectedDetails()?.permissions ?? '644',8)&0o777);});
  return <Dialog objectName="permissionsDialog" open={()=>!!manager.permissionsTarget()} title={t("Editar permissões")} onCloseRequest={manager.closePermissions}>
    <DialogBody open={()=>!!manager.permissionsTarget()}>
    <nativeQuick.Column width={440} spacing={12}>
      <nativeWidgets.StyledText width="fill" text={()=>manager.permissionsTarget()?.name ?? ''} />
      <PermissionEditor objectName="permissionsEditor" mode={mode} enabled={()=>!manager.mutating()} onModeChanged={mode.set} />
      <nativeWidgets.StyledText width="fill" text={manager.error} />
      <nativeLayouts.RowLayout width="fill"><QuietButton text={t("Cancelar")} enabled={()=>!manager.mutating()} onClicked={manager.closePermissions} /><nativeWidgets.DButton objectName="permissionsSave" text={t("Salvar")} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.savePermissions(mode());}} /></nativeLayouts.RowLayout>
    </nativeQuick.Column>
    </DialogBody>
  </Dialog>;
});
declare const ApplicationWindow: any;
const dialogScope=createQmlScope();
const PreviewDialog=component<{manager:FileManager}>('PreviewDialog',({manager})=>
  <Dialog objectName="previewDialog" open={manager.previewOpen} title={()=>manager.selected()?.name ?? t('Pré-visualização')} onCloseRequest={manager.closePreview}>
    <PreviewContent source={manager.previewSource} kind={manager.selectedPreviewKind} onClosed={manager.closePreview} onOpened={()=>{const file=manager.selected();if(file)void manager.open(file.path);}} />
  </Dialog>,
);
export const FileDialogs=component<{manager:FileManager}>('FileDialogs',({manager})=>
  <qml.Item><NameDialog manager={manager} /><DestinationDialog manager={manager} /><ConflictDialog manager={manager} /><FolderAppearanceDialog manager={manager} /><PermissionsDialog manager={manager} /><PreviewDialog manager={manager} />
    <Dialog objectName="preferencesDialog" open={manager.preferencesOpen} title={t("Preferências")} onCloseRequest={manager.closePreferences}>
      <DialogBody open={manager.preferencesOpen}>
      <nativeQuick.Column width={520} spacing={12}>
        <nativeControls.ScrollView objectName="preferencesScroll" width={520}
          height={qmlExpression(dialogScope, () => Math.max(180, Math.min(620, (ApplicationWindow.window ? ApplicationWindow.window.height : 800) - 180)))} clip={true}>
          <PreferencesContent preferences={manager.preferences} onChanged={manager.setPreference} />
        </nativeControls.ScrollView>
        <nativeWidgets.DButton objectName="preferencesClose" text={t("Fechar")} onClicked={manager.closePreferences} />
      </nativeQuick.Column>
      </DialogBody>
    </Dialog>
    <Dialog objectName="chooserDialog" open={manager.chooserOpen} title={t("Escolher aplicativo")} onCloseRequest={manager.closeChooser}>
      <ApplicationChooser objectName="applicationChooser" applications={manager.applications} onChosen={(id: string)=>{void manager.launchApplication(id);}}><QuietButton objectName="chooserClose" text={t("Fechar")} onClicked={manager.closeChooser} /></ApplicationChooser>
    </Dialog>
  </qml.Item>,
);
