import { component, Show, signal, ui } from '@nandomo/core';
import { importQml } from '@nandomo/bridge-qml';
const qml=importQml('QtQuick');
import { QuietButton } from '../native/QuietButton.js';
export const GameSection=component<{
  objectName?:string;title:string|(()=>string);iconName?:string;
  width?:number|'fill';visible?:boolean|(()=>boolean);children?:unknown;
}>('GameSection',({objectName,title,iconName='applications-games',width='fill',visible=true,children})=>{
  const expanded=signal(false);
  const name=objectName || 'advancedSection';
  return <qml.Column objectName={name} width={width} spacing={4} visible={visible}>
    <QuietButton objectName={`groupToggle:${name}`} width="fill" iconName={iconName}
      text={()=>`${expanded()?'▾':'▸'}  ${typeof title==='function'?title():title}`}
      onClicked={()=>expanded.update(value=>!value)} />
    <Show when={expanded}>
      {()=> <ui.HStack width="fill" gap={0}>
        <qml.Item width={18} height={1} />
        <ui.VStack grow={1} gap={4}>{children}</ui.VStack>
      </ui.HStack>}
    </Show>
  </qml.Column>;
});
