import { importQml } from '@nandomo/bridge-qml';
const nativeLayouts=importQml('QtQuick.Layouts');
const nativeQuick=importQml('QtQuick');
const nativeWidgets=importQml('qs.DCommon.Widgets');
import { AppearancePalette } from './AppearancePalette.js';
import { IconPicker } from './IconPicker.js';
import { t } from '../infrastructure/i18n.js';
import { component, signal, effect, Dialog } from '@nandomo/core';
import type { FileManager } from '../application/createFileManager.js';
import { QuietButton } from '../native/QuietButton.js';
export const FolderAppearanceDialog=component<{manager:FileManager}>('FolderAppearanceDialog',({manager})=>{
  const color=signal(''),emblem=signal(''),icon=signal('');
  effect(()=>{if(manager.appearanceOpen()){const style=manager.folderAppearances()[manager.selected()?.path ?? ''] ?? {};color.set(style.color ?? '');emblem.set(style.emblem ?? '');icon.set(style.icon ?? '');}});
  return <Dialog objectName="appearanceDialog" open={manager.appearanceOpen} title={t("Personalizar pasta")} onCloseRequest={manager.closeAppearance}>
    <nativeQuick.Column width={420} spacing={12}>
      <nativeWidgets.StyledText width="fill" text={()=>manager.selected()?.name ?? ''} />
      <nativeWidgets.StyledText text={t("Cor da pasta")} />
      <AppearancePalette manager={manager} colorValue={color} emblemValue={emblem} iconValue={icon} onColorChosen={color.set} onEmblemChosen={emblem.set} onIconChosen={icon.set} />
      <IconPicker onChosen={icon.set} onError={manager.reportError} />
      <nativeWidgets.StyledText width="fill" text={manager.error} />
      <nativeLayouts.RowLayout width="fill">
        <QuietButton text={t("Restaurar padrão")} onClicked={()=>{color.set('');emblem.set('');icon.set('');}} />
        <nativeQuick.Item {...{'Layout.fillWidth':true}} />
        <nativeWidgets.DButton objectName="appearanceSave" text={t("Salvar")} onClicked={()=>{void manager.saveFolderAppearance({color:color(),emblem:emblem(),icon:icon()});}} />
      </nativeLayouts.RowLayout>
    </nativeQuick.Column>
  </Dialog>;
});
