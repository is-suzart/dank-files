import { t } from '../infrastructure/i18n.js';
import { component,Dialog,signal,effect } from '@nandomo/core';
import { importQml,qmlEnum } from '@nandomo/bridge-qml';
import type { FileManager } from '../application/createFileManager.js';
import { NativeTextField } from './NativeTextField.js';
import { QuietButton } from '../native/QuietButton.js';
const qml=importQml('QtQuick'), layouts=importQml('QtQuick.Layouts'),controls=importQml('QtQuick.Controls');
export const FileToolsDialog=component<{manager:FileManager}>('FileToolsDialog',({manager})=>{
  const value=signal('');effect(()=>{value.set(manager.tools.request()?.name??'');});
  const title=()=>t(({archive:'Compactar',extract:'Extrair',bulk:'Renomear em lote',emptyTrash:'Esvaziar lixeira'})[manager.tools.request()?.kind??'archive']);
  return <Dialog objectName="fileToolsDialog" open={()=>!!manager.tools.request()} title={title} onCloseRequest={manager.tools.close}>
    <qml.Column width={440} spacing={14}>
      <controls.Label width="fill" wrapMode={qmlEnum('Text.Wrap')} text={()=>manager.tools.request()?.kind==='emptyTrash'
        ? t('Excluir permanentemente {count} itens da lixeira? Esta ação não pode ser desfeita.',{count:manager.tools.request()!.targets.length})
        :manager.tools.request()?.kind==='bulk'?t('Use {name} para o nome original e {n} para numerar. A extensão é preservada.'):t('Informe o nome no diretório atual. ZIP e TAR.GZ são suportados para compactação.')} />
      <NativeTextField objectName="fileToolName" width="fill" text={value} visible={()=>manager.tools.request()?.kind!=='emptyTrash'} onTextEdited={text=>value.set(text)} onAccepted={()=>{void manager.tools.submit(value());}} />
      <controls.Label width="fill" wrapMode={qmlEnum("Text.Wrap")} visible={()=>!!manager.error()} text={manager.error} />
      <layouts.RowLayout width="fill">
        <QuietButton text={t('Cancelar')} enabled={()=>!manager.mutating()} onClicked={manager.tools.close} />
        <qml.Item {...{'Layout.fillWidth':true}} />
        <controls.Button objectName="fileToolSubmit" text={()=>manager.tools.request()?.kind==='emptyTrash'?t('Excluir permanentemente'):t('Confirmar')} enabled={()=>!manager.mutating()} onClicked={()=>{void manager.tools.submit(value());}} />
      </layouts.RowLayout>
    </qml.Column>
  </Dialog>;
});
