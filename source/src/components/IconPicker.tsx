import { t } from '../infrastructure/i18n.js';
import { component } from '@nandomo/core';
import { importQml, qml, createQmlRef } from '@nandomo/bridge-qml';
import { QuietButton } from '../native/QuietButton.js';

const dialogs=importQml('QtQuick.Dialogs');

export const IconPicker=component<{onChosen:(url:string)=>void;onError:(error:unknown)=>void}>(
  'IconPicker',({onChosen,onError})=>{
    const picker=createQmlRef(dialogs.FileDialog);
    return <qml.Column width={420} spacing={8}>
      <QuietButton width="fill" text={t("Escolher imagem para o ícone…")} iconName="folder-pictures"
        onClicked={()=>{if(picker.current)void picker.current.invoke('open').catch(onError);}} />
      <dialogs.FileDialog objectName="folderIconPicker" title={t("Ícone da pasta")}
        nameFilters={['Imagens (*.png *.jpg *.jpeg *.svg *.webp *.ico)']}
        ref={picker.attach}
        onAccepted={()=>{if(picker.current)void picker.current.inspect(['selectedFile']).then(values=>{
          if(typeof values.selectedFile==='string')onChosen(values.selectedFile);
          else throw new Error('O seletor não retornou uma URL de arquivo.');
        }).catch(onError);}} />
    </qml.Column>;
  });
