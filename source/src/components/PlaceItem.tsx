import { importQml } from '@nandomo/bridge-qml';
const nativeQuick=importQml('QtQuick');
import { component } from '@nandomo/core';
import type { Place } from '../domain/files.js';
import type { VolumeUsage } from '../domain/volumeUsage.js';
import { PlaceButton as DankButton } from '../native/PlaceButton.js';
import { VolumeUsageBar } from './VolumeUsageBar.js';

interface PlaceItemProps {
  place: () => Place;
  navigate: (path:string) => Promise<void>;
  drive?: boolean;
  action?:(action:string,place:Place)=>void;
  currentPath?:()=>string;
  usage?:()=>Record<string,VolumeUsage>;
}
export const PlaceItem = component<PlaceItemProps>('PlaceItem', ({place, navigate, drive=false, currentPath, action, usage}) => (
  <nativeQuick.Column width="fill">
    <DankButton
      objectName={drive ? `drive:${place().id ?? `${place().path}:${place().name}`}` : `game:${place().path}`}
      width="fill"
      iconName={() => place().icon ?? (drive ? "drive-harddisk" : "folder")}
      selected={() => currentPath?.() === place().path}
      text={() => place().name.replace(/ — não montado$/,'')}
      drive={drive} favorite={!!action && !drive} mounted={()=>!drive || place().mounted === true}
      onActionChosen={(value: string)=>{if(value==='open')void navigate(place().path);else action?.(value,place());}}
      enabled={true}
      onClicked={() => { if (!drive || place().mounted) void navigate(place().path); }}
    />
    <VolumeUsageBar shown={() => drive && place().mounted === true} usage={() => usage?.()[place().path]} />
    <nativeQuick.Item width={1} height={2} />
  </nativeQuick.Column>
));
