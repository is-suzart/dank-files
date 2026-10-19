import { component } from '@nandomo/core';
import { importQml, qmlReadEvent, createQmlRef, qmlExpression, createQmlScope } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { Toolbar } from '../components/Toolbar.js';
import { Sidebar } from '../components/Sidebar.js';
import type { ChooserController } from './chooserController.js';
import { t } from '../infrastructure/i18n.js';
import { AppMenu } from '../native/AppMenu.js';
import { ContextAction } from '../native/ContextAction.js';
import { QuietButton } from '../native/QuietButton.js';
import { NativeTextField } from '../components/NativeTextField.js';

declare let contentItem:any, leftPadding:any, rightPadding:any;
const qml = importQml('QtQuick');
const dms = importQml('qs.DCommon.Widgets');
const controls = importQml('QtQuick.Controls');
const layouts = importQml('QtQuick.Layouts');

const ChooserSelect = component<{
  objectName:string; options:()=>string[]; value:()=>number;
  onChanged:(index:number)=>void; onError:(error:unknown)=>void;
}>('ChooserSelect',({objectName,options,value,onChanged,onError})=>{
  const menu=createQmlRef(controls.Menu);
  return <QuietButton objectName={objectName} text={()=>options()[value()] || ''} statusIcon="expand_more"
    implicitWidth={qmlExpression(createQmlScope(),()=>Math.min(300,Math.max(120,contentItem.implicitWidth+leftPadding+rightPadding)))}
    {...{'Layout.maximumWidth':300}} onClicked={()=>{void menu.current?.invoke('open').catch(onError);}}>
    <AppMenu objectName={`${objectName}Popup`} ref={menu.attach}>
      {options().map((label,index)=><ContextAction objectName={`${objectName}Option:${index}`}
        text={label} checkable checked={()=>value()===index} onTriggered={()=>onChanged(index)} />)}
    </AppMenu>
  </QuietButton>;
});

/** OpenFile selects existing files; only SaveFile asks the user for a filename. */
export const ChooserFooter = component<{ chooser: () => ChooserController; onError:(error:unknown)=>void }>('ChooserFooter', ({ chooser,onError }) => (
  <layouts.ColumnLayout objectName="chooserFooter" width="fill" spacing={4}>
    {chooser().needsName() ? <layouts.RowLayout {...{'Layout.fillWidth':true}} spacing={12}>
      <dms.StyledText text={t('Nome')} />
      <NativeTextField objectName="chooserName" text={chooser().name}
        {...{'Layout.fillWidth':true,'Accessible.name':t('Nome')}}
        onTextEdited={text => chooser().setName(text)}
        onAccepted={() => {if(chooser().canAccept())chooser().accept();}} />
    </layouts.RowLayout> : null}
    <dms.StyledText objectName="chooserOverwrite" visible={chooser().overwritePrompt}
      text={t('O arquivo já existe. Substituir?')} />
    {chooser().choices().length ? <layouts.RowLayout objectName="chooserChoices" spacing={12}>
      {chooser().choices().map(item=><layouts.RowLayout spacing={6}>
        <dms.StyledText text={item.label} />
        {item.kind==='checkbox' ? <controls.CheckBox objectName={`chooserChoice:${item.id}`}
          checked={()=>chooser().choiceValues()[item.id]==='true'}
          onToggled={qmlReadEvent(['checked'],(checked:unknown)=>chooser().setChoice(item.id,checked===true?'true':'false'))} />
          : <ChooserSelect objectName={`chooserChoice:${item.id}`} options={()=>item.optionLabels}
            value={chooser().choiceIndex(item.id)} onError={onError}
            onChanged={index=>{const option=item.options[index];if(option)chooser().setChoice(item.id,option.value);}} />}
      </layouts.RowLayout>)}
    </layouts.RowLayout> : null}
    <layouts.RowLayout objectName="chooserActions" spacing={8} {...{'Layout.fillWidth':true}}>
      {chooser().filterLabels().length > 1 ? <ChooserSelect objectName="chooserFilter" options={chooser().filterLabels} value={chooser().filterIndex}
          onChanged={chooser().setFilterIndex} onError={onError} /> : null}
      <qml.Item {...{'Layout.fillWidth':true}} />
      <QuietButton objectName="chooserCancel" implicitWidth={96} text={t('Cancelar')} onClicked={() => chooser().cancel()} />
      <dms.DButton objectName="chooserAccept" {...{"Layout.minimumWidth":96}} buttonHeight={36}
        text={() => chooser().overwritePrompt() ? t('Substituir') : chooser().acceptLabel()}
        enabled={chooser().canAccept} onClicked={() => chooser().accept()} />
    </layouts.RowLayout>
  </layouts.ColumnLayout>
));

export function ChooserApp({ manager, chooser }: { manager: FileManager; chooser: ChooserController }) {
  return {
    toolbar: <Toolbar manager={manager} chooser />,
    sidebar: <Sidebar manager={{ ...manager, locationAction: undefined }} navigationOnly />,
    details: <qml.Item />,
    dialogs: <qml.Item />,
    footer: <ChooserFooter chooser={() => chooser} onError={manager.reportError} />,
  };
}
