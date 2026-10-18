import { component } from '@nandomo/core';
import { importQml, createQmlScope, qmlExpression } from '@nandomo/bridge-qml';
import { usageFraction, type VolumeUsage } from '../domain/volumeUsage.js';

const qml = importQml('QtQuick');
declare let Style: any, parent: any;

export interface VolumeUsageBarProps {
  usage: () => VolumeUsage | undefined;
  shown?: () => boolean;
}

/**
 * A discreet bar of OS colors below a mounted volume. Without a trustworthy
 * total there is no bar at all: an unknown volume never looks like an empty one.
 */
export const VolumeUsageBar = component<VolumeUsageBarProps>('VolumeUsageBar', ({ usage, shown }) => {
  const scope = createQmlScope();
  const fraction = () => usageFraction(usage());
  return (
    <qml.Item
      qmlId={scope.id('usageBar')}
      width="fill"
      height={() => (shown?.() ?? true) && fraction() !== null ? 4 : 0}
      visible={() => (shown?.() ?? true) && fraction() !== null}
      qmlDeclarations={{
        share: { type: 'real', readonly: true, value: () => fraction() ?? 0 },
      }}
    >
      <qml.Rectangle
        width="fill"
        height={3}
        radius={1.5}
        color={qmlExpression(scope, ($qml) => Style.withAlpha(Style.surfaceText, 0.16))}
      />
      <qml.Rectangle
        height={3}
        radius={1.5}
        color={qmlExpression(scope, ($qml) => Style.withAlpha(Style.primary, 0.75))}
        width={qmlExpression(scope, ($qml) => {
          const share = $qml.usageBar.share;
          if (share <= 0) return 0;
          return Math.max(3, Math.round(parent.width * share));
        })}
      />
    </qml.Item>
  );
});
