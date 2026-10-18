import { component, For, Show, signal } from '@nandomo/core';
import { importQml, qmlReadEvent } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { Sidebar } from '../components/Sidebar.js';
import type { ChooserChoiceView, ChooserController } from './chooserController.js';
import { t } from '../infrastructure/i18n.js';
import { QuietButton } from '../native/QuietButton.js';
import { NativeTextField } from '../components/NativeTextField.js';

const qml = importQml('QtQuick');
const dms = importQml('qs.DCommon.Widgets');
const controls = importQml('QtQuick.Controls');
const layouts = importQml('QtQuick.Layouts');

/** Chooser header: navigation, the active filter and the portal choices. No file actions. */
export const ChooserHeader = component<{ manager: () => FileManager; chooser: () => ChooserController }>(
  'ChooserHeader', ({ manager, chooser }) => (
    <layouts.ColumnLayout objectName="chooserHeader" spacing={6} {...{ 'Layout.fillWidth': true }}>
      <layouts.RowLayout spacing={6} {...{ "Layout.fillWidth": true }}>
        <QuietButton objectName="chooserBack" text={t("Voltar")} onClicked={() => { void manager().back(); }} />
        <QuietButton objectName="chooserUp" text={t("Subir")} onClicked={() => { void manager().up(); }} />
        <QuietButton objectName="chooserRefresh" text={t("Atualizar")} onClicked={() => { void manager().refresh(); }} />
        <dms.StyledText objectName="chooserTitle" text={() => chooser().title()} {...{ 'Layout.fillWidth': true }} />
      </layouts.RowLayout>
      <NativeTextField objectName="chooserFolder" text={() => manager().path()} onAccepted={path => {void manager().navigate(path);}} {...{ "Layout.fillWidth": true }} />
      <Show when={() => chooser().filterLabels().length > 1}>
        {() => <layouts.RowLayout objectName="chooserFilterRow" spacing={6}>
          <dms.StyledText text={t("Filtro")} />
          <controls.ComboBox objectName="chooserFilter" model={chooser().filterLabels}
            currentIndex={chooser().filterIndex}
            onActivated={qmlReadEvent(['currentIndex'], (index: unknown) => chooser().setFilterIndex(Number(index)))} />
        </layouts.RowLayout>}
      </Show>
      <Show when={() => chooser().choices().length > 0}>
        {() => <layouts.RowLayout objectName="chooserChoices" spacing={6}>
          <For each={chooser().choices} by={item => item.id}>
            {(item: () => ChooserChoiceView) => <layouts.RowLayout spacing={4}>
              <dms.StyledText text={() => item().label} />
              <Show when={() => item().kind === 'checkbox'}>
                {() => <controls.CheckBox objectName={`chooserChoice:${item().id}`} checked={() => chooser().selectedChoice(item().id)() === 'true'}
                  onToggled={qmlReadEvent(['checked'], (checked: unknown) => chooser().setChoice(item().id, checked === true ? 'true' : 'false'))} />}
              </Show>
              <Show when={() => item().kind === 'combo'}>
                {() => <controls.ComboBox objectName={`chooserChoice:${item().id}`} model={() => item().optionLabels}
                  currentIndex={chooser().choiceIndex(item().id)}
                  onActivated={qmlReadEvent(['currentIndex'], (index: unknown) => {
                    const option = item().options[Number(index)];
                    if (option) chooser().setChoice(item().id, option.value);
                  })} />}
              </Show>
            </layouts.RowLayout>}
          </For>
        </layouts.RowLayout>}
      </Show>
      <ChooserActionBar chooser={chooser} />
    </layouts.ColumnLayout>
  ));

/** Chooser actions live in the header slot, so nothing overlaps the file views. */
const ChooserActionBar = component<{ chooser: () => ChooserController }>('ChooserActionBar', ({ chooser }) => (
  <layouts.RowLayout objectName="chooserActions" spacing={6} {...{ 'Layout.fillWidth': true }}>
    <Show when={() => chooser().needsName()}>
      {() => <NativeTextField objectName="chooserName" text={chooser().name}
        onTextEdited={(text: string) => chooser().setName(text)} />}
    </Show>
    <Show when={() => chooser().overwritePrompt()}>
      {() => <dms.StyledText objectName="chooserOverwrite" text={t("O arquivo já existe. Substituir?")} />}
    </Show>
    <qml.Item {...{ 'Layout.fillWidth': true }} />
    <QuietButton objectName="chooserCancel" text={t("Cancelar")} onClicked={() => chooser().cancel()} />
    <QuietButton objectName="chooserAccept" text={chooser().acceptLabel} enabled={chooser().canAccept}
      onClicked={() => chooser().accept()} />
  </layouts.RowLayout>
));

/** The dialogs region stays empty: it is the popup layer of the normal window. */
export function ChooserApp({ manager, chooser }: { manager: FileManager; chooser: ChooserController }) {
  return {
    toolbar: <ChooserHeader manager={() => manager} chooser={() => chooser} />,
    sidebar: <Sidebar manager={{ ...manager, preferences: signal({ ...manager.preferences(), showSidebarSpecial: false }), locationAction: undefined }} />,
    details: <qml.Item />,
    dialogs: <qml.Item />,
  };
}
