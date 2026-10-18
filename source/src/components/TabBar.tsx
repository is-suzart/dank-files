import { component, signal, effect } from '@nandomo/core';
import { importQml, createQmlScope, qmlExpression, qmlReadEvent } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { QuietButton } from '../native/QuietButton.js';
import { t } from '../infrastructure/i18n.js';

const qml=importQml('QtQuick');
const layouts=importQml('QtQuick.Layouts');
declare const parent:any, implicitWidth:any, modelData:any;
export interface TabBarProps {
  manager: Pick<FileManager, 'tabs' | 'newTab' | 'selectTab' | 'closeTab'>;
}

export const TabBar=component<TabBarProps>('TabBar',({manager})=>{
  const scope=createQmlScope();
  const ids=signal(manager.tabs().map(tab=>tab.id));
  effect(()=>{
    const next=manager.tabs().map(tab=>tab.id), previous=ids.peek();
    if(next.length!==previous.length || next.some((id,index)=>id!==previous[index])) ids.set(next);
  });
  return <layouts.RowLayout qmlId={scope.id('bar')} width="fill" spacing={4}
    qmlDeclarations={{
      titles:{type:'var',value:()=>Object.fromEntries(manager.tabs().map(tab=>[tab.id,tab.title]))},
      activeTab:{type:'string',value:()=>manager.tabs().find(tab=>tab.active)?.id ?? ''},
    }}>
    <qml.Flickable objectName="tabViewport" clip={true}
      {...{'Layout.fillWidth':true,'Layout.minimumWidth':0,'Layout.preferredWidth':0,'Layout.preferredHeight':40}}
      contentWidth={qmlExpression(scope,q=>q.tabsStrip.width)} contentHeight={40}>
      <qml.Row qmlId={scope.id('tabsStrip')} height={40} spacing={4} width={qmlExpression(scope,()=>implicitWidth)}>
        <qml.Repeater model={ids} delegate={
          <qml.Item width={200} height={40} qmlDeclarations={{modelData:{type:'var',required:true}}}>
            <layouts.RowLayout {...{'anchors.fill':qmlExpression(scope,()=>parent)}} spacing={0}>
              <QuietButton objectName={qmlExpression(scope,()=>`tab:${modelData}`)}
                {...{'Layout.fillWidth':true,'Layout.minimumWidth':0}}
                qmlDeclarations={{tabId:{type:'string',value:qmlExpression(scope,()=>modelData)}}}
                text={qmlExpression(scope,q=>q.bar.titles[modelData])} selected={qmlExpression(scope,q=>q.bar.activeTab===modelData)}
                onClicked={qmlReadEvent(['tabId'],id=>{void manager.selectTab(id);})} />
              <QuietButton objectName={qmlExpression(scope,()=>`tabClose:${modelData}`)}
                text="" iconName="window-close" {...{'Accessible.name':t('Fechar')}} enabled={()=>manager.tabs().length>1}
                qmlDeclarations={{tabId:{type:'string',value:qmlExpression(scope,()=>modelData)}}}
                onClicked={qmlReadEvent(['tabId'],id=>{void manager.closeTab(id);})} />
            </layouts.RowLayout>
          </qml.Item>
        } />
      </qml.Row>
    </qml.Flickable>
    <QuietButton objectName="tabNew" text={t("Nova aba")} iconName="list-add" onClicked={()=>{void manager.newTab();}} />
  </layouts.RowLayout>;
});
