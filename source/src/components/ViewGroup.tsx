import { component } from '@nandomo/core';
import { importQml } from '@nandomo/bridge-qml';
import type { ViewMode } from '../domain/files.js';
const qml=importQml('QtQuick');
import { QuietButton } from '../native/QuietButton.js';
import { t } from '../infrastructure/i18n.js';
export const ViewGroup=component<{
  view:()=>ViewMode;surface:()=>string;onChanged:(view:ViewMode)=>void;
}>('ViewGroup',({view,surface,onChanged})=><qml.Rectangle width={112} height={38} radius={9} color={surface}>
  <qml.Row x={1} y={1} spacing={1}>
    <QuietButton objectName="toolbarList" text="" iconName="view-list-details" {...{'Accessible.name':t('Visualização em lista')}} selected={()=>view()==='list'} onClicked={()=>onChanged('list')} />
    <QuietButton objectName="toolbarGrid" text="" iconName="view-grid" {...{'Accessible.name':t('Visualização em grade')}} selected={()=>view()==='grid'} onClicked={()=>onChanged('grid')} />
    <QuietButton objectName="toolbarColumns" text="" iconName="view-column" {...{'Accessible.name':t('Visualização em colunas')}} selected={()=>view()==='columns'} onClicked={()=>onChanged('columns')} />
  </qml.Row>
</qml.Rectangle>);
