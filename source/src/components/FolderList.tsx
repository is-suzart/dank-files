import { importQml } from '@nandomo/bridge-qml';
const nativeWidgets=importQml('qs.DankCommon.Widgets');
import { t } from '../infrastructure/i18n.js';
import { component, For, Show } from '@nandomo/core';
import { qml } from '@nandomo/bridge-qml';
import type { Entry } from '../domain/files.js';
import { QuietButton } from '../native/QuietButton.js';

/** Application composition: native scrolling, TypeScript-owned list and actions. */
export const FolderList = component<{
  folders: () => Entry[];
  enabled: () => boolean;
  onChosen: (path: string) => void;
}>('FolderList', ({folders, enabled, onChosen}) => (
  <qml.ScrollView objectName="destinationFolders" width={480} height={300}>
    <qml.Column width="fill" spacing={4}>
      <For each={folders} by={folder => folder.path}>
        {folder => <QuietButton objectName={`destination:${folder().path}`}
          width="fill" text={() => folder().name} iconName="folder" enabled={enabled}
          onClicked={() => onChosen(folder().path)} />}
      </For>
      <Show when={() => !folders().length}>
        {() => <nativeWidgets.StyledText text={t("Nenhuma subpasta")} />}
      </Show>
    </qml.Column>
  </qml.ScrollView>
));
