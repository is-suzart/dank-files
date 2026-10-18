import { component } from '@nandomo/core';
import { importQml } from '@nandomo/bridge-qml';
const qml=importQml('QtQuick');
const dms=importQml('qs.DankCommon.Widgets');
export const SectionTitle=component<{text:string;width?:number|'fill';objectName?:string}>('SectionTitle',({text,width='fill',objectName})=>
  <qml.Item objectName={objectName} width={width} height={30}>
    <dms.StyledText width="fill" y={10} text={text} opacity={0.65}
      {...{'font.pixelSize':10,'font.letterSpacing':1.2}} />
  </qml.Item>);
