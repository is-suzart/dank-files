import { FileViews } from "./FileViews.js";
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qml = importQml("QtQuick");
const controls = importQml("QtQuick.Controls");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
import { EntryIcon } from "./EntryIcon.js";
import { FilePreview } from "./FilePreview.js";
declare let visible: any;
import type { QmlScope } from "@nandomo/bridge-qml";
export const FileContextMenus = component<{
  scope: QmlScope;
}>("FileContextMenus", ({ scope }) => (
  <>
    <AppMenu
      qmlId={scope.id("newMenu")}
      onClosed={qmlHandler(scope, ($qml) => {
        $qml.app.send("closeNewMenu");
      })}
    >
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Nova pasta"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("create", "folder");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Novo arquivo vazio"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("create", "file");
        })}
      />
    </AppMenu>
    <AppMenu qmlId={scope.id("applicationMenu")}>
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Abrir app"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.open($qml.app.contextTarget);
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Abrir .desktop"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("openDesktop");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Desinstalar…"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("manageApplication");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Ocultar"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("hideApplication");
        })}
      />
    </AppMenu>
    <AppMenu qmlId={scope.id("contextMenu")}>
      <ContextAction
        text={qmlExpression(scope, ($qml) =>
          $qml.app.tr(
            $qml.app.state.path === "applications:///"
              ? "Abrir app"
              : "Abrir no app padrão",
          ),
        )}
        hint={"Enter"}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.open($qml.app.contextTarget);
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Adicionar pasta a Locais"))}
        visible={qmlExpression(
          scope,
          ($qml) =>
            !!$qml.app.contextTarget && $qml.app.contextTarget.directory,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("addPlace");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Cor, emblema e ícone…"))}
        visible={qmlExpression(
          scope,
          ($qml) =>
            !!$qml.app.contextTarget && $qml.app.contextTarget.directory,
        )}
        enabled={qmlExpression(scope, ($qml) => visible)}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("customizeFolder");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Pré-visualizar"))}
        hint={qmlExpression(scope, ($qml) => $qml.app.tr("Espaço"))}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(
          scope,
          ($qml) =>
            !!$qml.app.contextTarget &&
            !$qml.app.contextTarget.directory &&
            /\.(pdf|png|jpe?g|webp|gif|bmp|svg|mp4|mkv|webm|mov|avi|m4v|ogv|mpeg|mpg)$/i.test(
              $qml.app.contextTarget.name,
            ),
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("preview");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Abrir com…"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send(
            "openWith",
            $qml.app.contextTarget
              ? $qml.app.contextTarget.path
              : $qml.app.state.path,
          );
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Abrir terminal aqui"))}
        visible={qmlExpression(
          scope,
          ($qml) =>
            !$qml.app.state.preferences ||
            $qml.app.state.preferences.showTerminal,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("terminal");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr($qml.app.state.selectionCount>1 ? "Renomear em lote…" : "Renomear…"))}
        hint={"F2"}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(
          scope,
          ($qml) => !!$qml.app.contextTarget && !$qml.app.state.mutating,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("rename");
        })}
      />
      <controls.MenuSeparator
        contentItem={
          <qml.Rectangle
            implicitWidth={236}
            implicitHeight={1}
            color={qmlExpression(scope, ($qml) => $qml.theme.outline)}
            opacity={0.2}
          />
        }
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Recortar"))}
        hint={"Ctrl+X"}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(
          scope,
          ($qml) =>
            !$qml.app.state.mutating && $qml.app.state.path.indexOf(":///") < 0,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("cut");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Copiar"))}
        hint={"Ctrl+C"}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("copy");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Colar"))}
        hint={"Ctrl+V"}
        enabled={qmlExpression(
          scope,
          ($qml) => !!$qml.app.state.canPaste && !$qml.app.state.mutating,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("paste");
        })}
      />
      <ContextAction objectName="undoContext" text={qmlExpression(scope,q=>q.app.tr('Desfazer'))} hint="Ctrl+Z"
        enabled={qmlExpression(scope,q=>!!q.app.state.canUndo && !q.app.state.mutating)}
        onTriggered={qmlHandler(scope,q=>{q.app.send('undo');})} />
      <ContextAction objectName="emptyTrashContext" text={qmlExpression(scope,q=>q.app.tr('Esvaziar…'))}
        visible={qmlExpression(scope,q=>q.app.state.path==='trash:///')}
        enabled={qmlExpression(scope,q=>!q.app.state.mutating && q.app.state.entries.length>0)}
        onTriggered={qmlHandler(scope,q=>{q.app.send('fileTool','emptyTrash');})} />
      <ContextAction objectName="trashRestoreContext" text={qmlExpression(scope,q=>q.app.tr('Restaurar'))}
        visible={qmlExpression(scope,q=>q.app.state.path==='trash:///' && !!q.app.contextTarget)}
        enabled={qmlExpression(scope,q=>!q.app.state.mutating)} onTriggered={qmlHandler(scope,q=>{q.app.send('restoreTrash');})} />
      <ContextAction text={qmlExpression(scope,q=>q.app.tr('Compactar…'))}
        visible={qmlExpression(scope,q=>!!q.app.contextTarget && q.app.state.path.indexOf(':///')<0)}
        enabled={qmlExpression(scope,q=>!q.app.state.mutating)} onTriggered={qmlHandler(scope,q=>{q.app.send('fileTool','archive');})} />
      <ContextAction text={qmlExpression(scope,q=>q.app.tr('Extrair…'))}
        visible={qmlExpression(scope,q=>!!q.app.contextTarget && !q.app.contextTarget.directory && /\.(zip|tar|tgz|gz|xz|bz2|7z|rar)$/i.test(q.app.contextTarget.name))}
        enabled={qmlExpression(scope,q=>!q.app.state.mutating)} onTriggered={qmlHandler(scope,q=>{q.app.send('fileTool','extract');})} />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Mover para…"))}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(
          scope,
          ($qml) =>
            !$qml.app.state.mutating && $qml.app.state.path.indexOf(":///") < 0,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("transfer", "move");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Copiar para…"))}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(
          scope,
          ($qml) =>
            !$qml.app.state.mutating && $qml.app.state.path.indexOf(":///") < 0,
        )}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("transfer", "copy");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Mover para a lixeira"))}
        hint={"Delete"}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget && $qml.app.state.path.indexOf(":///") < 0)}
        enabled={qmlExpression(scope, ($qml) => !$qml.app.state.mutating && !$qml.app.state.conflict)}
        onTriggered={qmlHandler(scope, ($qml) => { $qml.app.send("trash"); })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Copiar caminho"))}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.clipboard.text = $qml.app.contextTarget.path;
          $qml.clipboard.selectAll();
          $qml.clipboard.copy();
        })}
      />
      <controls.MenuSeparator
        contentItem={
          <qml.Rectangle
            implicitWidth={236}
            implicitHeight={1}
            color={qmlExpression(scope, ($qml) => $qml.theme.outline)}
            opacity={0.2}
          />
        }
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Nova pasta"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("create", "folder");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Novo arquivo vazio"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("create", "file");
        })}
      />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Atualizar"))}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("refresh");
        })}
      />
      <ContextAction objectName="folderNewTab" text={qmlExpression(scope, ($qml) => $qml.app.tr("Abrir em nova aba"))}
        visible={qmlExpression(scope, q => !!q.app.contextTarget && q.app.contextTarget.directory)}
        onTriggered={qmlHandler(scope, q => {if(q.app.contextTarget && q.app.contextTarget.directory) q.app.send("newTab",q.app.contextTarget.path);})} />
      <ContextAction
        text={qmlExpression(scope, ($qml) => $qml.app.tr("Propriedades"))}
        visible={qmlExpression(scope, ($qml) => !!$qml.app.contextTarget)}
        enabled={qmlExpression(scope, ($qml) => visible)}
        onTriggered={qmlHandler(scope, ($qml) => {
          $qml.app.send("properties", $qml.app.contextTarget.path);
        })}
      />
    </AppMenu>
  </>
));
