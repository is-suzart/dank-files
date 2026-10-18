import { component } from '@nandomo/core';
import { importQml, createQmlRef } from '@nandomo/bridge-qml';
import { ContextAction } from '../native/ContextAction.js';
import { AppMenu } from '../native/AppMenu.js';
import { QuietButton } from '../native/QuietButton.js';
import { t } from '../infrastructure/i18n.js';
const controls=importQml('QtQuick.Controls');
export const SortMenu=component<{
  objectName?:string;currentIndex:()=>number;onActivated:(index:number)=>void;onError:(error:unknown)=>void;
}>('SortMenu',({objectName,currentIndex,onActivated,onError})=>{
  const menu=createQmlRef(controls.Menu);
  return <QuietButton objectName={objectName} text="" iconName="sort" {...{'Accessible.name':t('Ordenar')}}
    onClicked={()=>{void menu.current?.invoke('open').catch(onError);}}>
    <AppMenu objectName={`${objectName || 'sort'}Popup`} ref={menu.attach}>
      {['Nome','Tamanho','Modificado','Tipo'].map((label,index)=><ContextAction
        objectName={`sortOption:${index}`} text={t(label)} checkable={true} checked={()=>currentIndex()===index} onTriggered={()=>onActivated(index)} />)}
    </AppMenu>
  </QuietButton>;
});
