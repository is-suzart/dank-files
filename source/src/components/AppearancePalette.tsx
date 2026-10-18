const nativeWidgets=importQml('qs.DankCommon.Widgets');
import { t } from '../infrastructure/i18n.js';
import { component, computed, effect, For, signal } from '@nandomo/core';
import { importQml, qmlEnum } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { NativeTextField as DankTextField } from './NativeTextField.js';
import { QuietButton } from '../native/QuietButton.js';

const qml=importQml('QtQuick');
const controls=importQml('QtQuick.Controls');
import { EntryIcon } from '../native/EntryIcon.js';

const colors=['','#448aff','#66bb6a','#ffb74d','#ef5350','#ab47bc','#26a69a','#ec407a'];
const pageSize=35;
interface Props {
  manager:FileManager;colorValue:()=>string;emblemValue:()=>string;iconValue:()=>string;
  onColorChosen:(value:string)=>void;onEmblemChosen:(value:string)=>void;onIconChosen:(value:string)=>void;
}
export const AppearancePalette=component<Props>('AppearancePalette',props=>{
  const {manager,colorValue,emblemValue,iconValue,onColorChosen,onEmblemChosen,onIconChosen}=props;
  const tab=signal<'emblems'|'logos'>('emblems'),search=signal(''),page=signal(0);
  const palette=(key:string,fallback:string)=>manager.palette()[key] || fallback;
  const filtered=computed(()=>[{name:t('Nenhum'),source:''},...manager.iconCatalog()[tab()]]
    .filter(item=>item.name.toLocaleLowerCase().includes(search().toLocaleLowerCase())));
  effect(()=>{tab();search();manager.iconCatalog();page.set(0);});
  const rows=computed(()=>{
    const items=filtered().slice(page()*pageSize,(page()+1)*pageSize);
    return Array.from({length:Math.ceil(items.length/7)},(_,i)=>items.slice(i*7,i*7+7));
  });
  const selected=(item:{name:string;source:string})=>tab()==='emblems'
    ? emblemValue()===(item.source?item.name:'') : iconValue()===item.source;
  return <qml.Column width={420} spacing={10}>
    <EntryIcon width={64} height={64}
      source={()=>iconValue() || manager.icons().folder || manager.iconCatalog().logos.find(item=>item.name==='folder')?.source || ''}
      tint={()=>iconValue()?'transparent':colorValue() || 'transparent'}
      emblem={()=>manager.iconCatalog().emblems.find(item=>item.name===emblemValue())?.source || ''} />
    <QuietButton text={t("Usar ícone de pasta")} visible={()=>!!iconValue()} onClicked={()=>onIconChosen('')} />
    <qml.Row spacing={12}>
      {colors.map(color=><controls.Button objectName={`appearanceColor:${color || 'default'}`}
        width={38} height={38} padding={0} {...{'Accessible.name':color || t('Padrão do sistema')}}
        background={<qml.Rectangle radius={19} color={()=>color || palette('surface_container_high','#25282b')}
          {...{'border.width':()=>colorValue()===color?3:1,'border.color':()=>palette('on_surface','#eeeeee')}} />}
        contentItem={<qml.Text text={()=>color?colorValue()===color?'✓':'':'↺'}
          color={()=>palette('on_surface','#eeeeee')} horizontalAlignment={qmlEnum('Text.AlignHCenter')} verticalAlignment={qmlEnum('Text.AlignVCenter')} />}
        onClicked={()=>onColorChosen(color)} />)}
    </qml.Row>
    <qml.Row spacing={4}>
      <QuietButton objectName="appearanceEmblemsTab" width={208} text={t("Emblemas")} selected={()=>tab()==='emblems'} onClicked={()=>tab.set('emblems')} />
      <QuietButton objectName="appearanceLogosTab" width={208} text={t("Logos e ícones")} selected={()=>tab()==='logos'} onClicked={()=>tab.set('logos')} />
    </qml.Row>
    <DankTextField objectName="appearanceSearch" width="fill" text={search} placeholderText={t("Buscar ícone…")} onTextEdited={search.set} />
    <qml.Column width="fill" height={300} spacing={6}>
      <For each={rows} by={row=>row.map(item=>item.name).join('|')}>
        {row=><qml.Row spacing={6}>
          {row().map((entry,index)=>{const item=()=>row()[index] ?? entry;return <controls.Button width={54} height={54} padding={8}
            {...{'Accessible.name':()=>item().name}}
            background={<qml.Rectangle radius={9} color={()=>selected(item())?palette('primary_container','#27445a'):'transparent'} />}
            contentItem={entry.source?<qml.Image source={()=>item().source} fillMode={qmlEnum('Image.PreserveAspectFit')} asynchronous={true} />
              :<qml.Text text="∅" color={()=>palette('on_surface','#eeeeee')} horizontalAlignment={qmlEnum('Text.AlignHCenter')} verticalAlignment={qmlEnum('Text.AlignVCenter')} />}
            onClicked={()=>tab()==='emblems'?onEmblemChosen(item().source?item().name:''):onIconChosen(item().source)} />;})}
        </qml.Row>}
      </For>
    </qml.Column>
    <qml.Row spacing={8}>
      <QuietButton objectName="appearancePrevious" text={t("Anterior")} enabled={()=>page()>0} onClicked={()=>page.update(value=>value-1)} />
      <nativeWidgets.StyledText text={()=>`${page()+1} / ${Math.max(1,Math.ceil(filtered().length/pageSize))} · ${t('{count} ícones',{count:filtered().length})}`} />
      <QuietButton objectName="appearanceNext" text={t("Próxima")} enabled={()=>(page()+1)*pageSize<filtered().length} onClicked={()=>page.update(value=>value+1)} />
    </qml.Row>
  </qml.Column>;
});
