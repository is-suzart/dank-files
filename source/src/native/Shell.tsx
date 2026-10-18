import { NativeSmokeChecks } from "./NativeSmokeChecks.js";
import { FileWindow } from "./FileWindow.js";
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const shell = importQml("Quickshell");
const qt = importQml("QtQml");
const qml = importQml("QtQuick");
const io = importQml("Quickshell.Io");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
import { EntryIcon } from "./EntryIcon.js";
import { FilePreview } from "./FilePreview.js";
import { qmlCatalog } from "../infrastructure/i18n.js";
declare let Quickshell: any,
  Qt: any,
  findUi: any,
  send: any,
  Style: any,
  remaining: any,
  keyboardReveal: any,
  restart: any,
  stop: any,
  GridView: any,
  ListView: any;
export const Shell = component<Record<string, any>>("Shell", (props) => {
  // Translated text must come from app state: QML closures cannot capture Node
  // variables, so the catalogs and the resolved locale ride on the shell object.
  const i18n = qmlCatalog();
  const scope = createQmlScope({ app: "app" });
  scope.id("app");
  scope.id("selectionReveal");
  scope.id("osPalette");
  scope.id("theme");
  scope.id("backend");
  scope.id("window");
  scope.id("dialogsSlot");
  scope.id("clipboard");
  scope.id("newMenu");
  scope.id("applicationMenu");
  scope.id("contextMenu");
  scope.id("toolbarSlot");
  scope.id("sidebarScroll");
  scope.id("sidebarSlot");
  scope.id("fileViews");
  scope.id("filesList");
  scope.id("dragProxy");
  scope.id("rowMouse");
  scope.id("filesGrid");
  scope.id("filesColumns");
  scope.id("thumbnail");
  scope.id("gridMouse");
  scope.id("columnRow");
  scope.id("columnPanel");
  scope.id("detailsContainer");
  scope.id("detailsScroll");
  scope.id("detailsSlot");
  return (
    <shell.ShellRoot
      qmlImports={["Quickshell", "qs.DCommon.Common"]}
      qmlId={scope.id("app")}
      qmlDeclarations={{
        state: {
          type: "var",
          value: qmlExpression(scope, ($qml) => ({
            path: "",
            entries: [],
            columns: [],
            drives: [],
            games: [],
            palette: {},
            themeReady: false,
            videoThumbnails: {},
            home: "",
            view: "list",
            busy: true,
            hidden: false,
          })),
        },
        applyingBindings: { type: "bool", value: false },
        uiGeneration: { type: "int", value: 0 },
        uiBridge: {
          type: "var",
          value: qmlExpression(scope, ($qml) => ({
            dispatch: function (handler: any, args: any) {
              if ($qml.app.applyingBindings) return;
              $qml.app.send("uiEvent", { handler: handler, args: args, generation: $qml.app.uiGeneration });
            },
          })),
        },
        toolbarObject: { type: "var", value: null },
        sidebarObject: { type: "var", value: null },
        detailsObject: { type: "var", value: null },
        dialogsObject: { type: "var", value: null },
        detailsBridge: {
          type: "var",
          value: qmlExpression(scope, ($qml) => ({
            dispatch: function (handler: any, args: any) {
              if (!$qml.app.applyingBindings)
                $qml.app.send("uiEvent", {
                  scene: "details",
                  handler: handler,
                  args: args,
                  generation: $qml.app.uiGeneration,
                });
            },
          })),
        },
        dialogsBridge: {
          type: "var",
          value: qmlExpression(scope, ($qml) => ({
            dispatch: function (handler: any, args: any) {
              if (!$qml.app.applyingBindings)
                $qml.app.send("uiEvent", {
                  scene: "dialogs",
                  handler: handler,
                  args: args,
                  generation: $qml.app.uiGeneration,
                });
            },
          })),
        },
        contextTarget: { type: "var", value: null },
        catalog: { type: "var", value: i18n.catalogs },
        locale: { type: "string", value: qmlExpression(scope,q=>q.app.state.locale || "en") },
        fallbackLocale: { type: "string", value: i18n.fallback },
        sourceLocale: { type: "string", value: i18n.source },
        sidebarBridge: {
          type: "var",
          value: qmlExpression(scope, ($qml) => ({
            dispatch: function (handler: any, args: any) {
              if ($qml.app.applyingBindings) return;
              $qml.app.send("uiEvent", {
                scene: "sidebar",
                handler: handler,
                args: args,
                generation: $qml.app.uiGeneration,
              });
            },
          })),
        },
      }}
      qmlMethods={{
        tr: qmlHandler(scope, ($qml, text: any, params: any) => {
          const catalog: any = $qml.app.catalog || {};
          var entry: any = (catalog[$qml.app.locale] || {})[text];
          // The source catalog is intentionally sparse: a missing key stays in
          // the authored language instead of leaking another one.
          if (entry === undefined && $qml.app.locale !== $qml.app.sourceLocale)
            entry = (catalog[$qml.app.fallbackLocale] || {})[text];
          if (entry === undefined) entry = text;
          var count: any = params ? Number(params.count) : NaN;
          // CLDR cardinal rules for the three catalogs shipped by this app.
          var singular: any = $qml.app.locale === "pt-BR"
            ? count >= 0 && count < 2
            : $qml.app.locale === "en" && count === 1;
          var template: any =
            typeof entry === "string"
              ? entry
              : singular && entry.one
                ? entry.one
                : entry.other || entry.one || text;
          return String(template).replace(/\{(\w+)\}/g, function (match: any, name: any) {
            return params && Object.prototype.hasOwnProperty.call(params, name)
              ? String(params[name])
              : match;
          });
        }),
        revealSelection: qmlHandler(scope, ($qml) => {
          if($qml.app.state.detailsVisible)$qml.selectionReveal.schedule();
        }),
        revealKeyboard: qmlHandler(scope, ($qml) => { $qml.selectionReveal.schedule(true); }),
        fileIcon: qmlHandler(scope, ($qml, name: any) => {
          const fallback = $qml.app.state.path === "applications:///" ? "package-x-generic" : "text-x-generic";
          if (String(name).indexOf("file://") === 0) return name;
          return $qml.app.state.icons && $qml.app.state.icons[name]
            ? $qml.app.state.icons[name]
            : Quickshell.hasThemeIcon(name || fallback)
              ? Quickshell.iconPath(name || fallback)
              : ($qml.app.state.icons || {})[fallback] || Quickshell.iconPath(fallback, "application-x-executable");
        }),
        context: qmlHandler(scope, ($qml, entry: any, x: any, y: any) => {
          $qml.app.contextTarget = entry;
          $qml.app.send("selectPath", {
            path: entry ? entry.path : null,
            mode: "context",
          });
          if ($qml.app.state.path === "applications:///" && entry)
            $qml.applicationMenu.popup(x, y);
          else $qml.contextMenu.popup(x, y);
        }),
        patchScene: qmlHandler(scope, ($qml, message: any) => {
          try {
            var command: any = message.command;
            if(command.cmd === "replace_scenes") {
              var slots: any = {toolbar:$qml.toolbarSlot,sidebar:$qml.sidebarSlot,details:$qml.detailsSlot,dialogs:$qml.dialogsSlot};
              var objectKeys: any = {toolbar:"toolbarObject",sidebar:"sidebarObject",details:"detailsObject",dialogs:"dialogsObject"};
              var bridgeKeys: any = {toolbar:"uiBridge",sidebar:"sidebarBridge",details:"detailsBridge",dialogs:"dialogsBridge"};
              var previousBridges: any = {}, candidates: any = {};
              var previousApplying: any = $qml.app.applyingBindings;
              $qml.app.applyingBindings=true;
              try {
                ["toolbar","sidebar","details","dialogs"].forEach(function(name:any) {
                  var descriptor:any=command.scenes[name];
                  if(!descriptor || typeof descriptor.source !== "string")throw new Error("Invalid replacement scene: "+name);
                  var bridgeKey:any=bridgeKeys[name];
                  previousBridges[name]=$qml.app[bridgeKey];
                  $qml.app[bridgeKey]=Object.assign({dispatch:previousBridges[name].dispatch},descriptor.bindings);
                  candidates[name]=Qt.createQmlObject(descriptor.source,slots[name],"NandomoReload"+name+".tsx");
                });
                ["toolbar","sidebar","details","dialogs"].forEach(function(name:any) {
                  var old:any=$qml.app[objectKeys[name]];
                  $qml.app[objectKeys[name]]=candidates[name];
                  if(old){old.visible=false;old.parent=null;old.destroy();}
                });
                $qml.app.uiGeneration=command.generation;
              } catch(error:any) {
                Object.keys(candidates).forEach(function(name:any){candidates[name].visible=false;candidates[name].parent=null;candidates[name].destroy();});
                Object.keys(previousBridges).forEach(function(name:any){$qml.app[bridgeKeys[name]]=previousBridges[name];});
                throw error;
              } finally {$qml.app.applyingBindings=previousApplying;}
              $qml.app.send("uiResult",{request:message.request,value:null});
              return;
            }
            if(typeof command.generation === "number" && command.generation !== $qml.app.uiGeneration) {
              $qml.app.send("uiResult",{request:message.request,value:null});
              return;
            }
            var scene: any = command.scene || "sidebar";
            var roots: any = {
              toolbar: $qml.app.toolbarObject,
              sidebar: $qml.app.sidebarObject,
              details: $qml.app.detailsObject,
              dialogs: $qml.app.dialogsObject,
            };
            var bridges: any = {
              toolbar: "uiBridge",
              sidebar: "sidebarBridge",
              details: "detailsBridge",
              dialogs: "dialogsBridge",
            };
            var root: any = roots[scene],
              bridge: any = bridges[scene];
            if (!root || !bridge)
              throw new Error("Scene not mounted: " + scene);
            var result: any = null;
            if (command.cmd === "native_object") {
              var object: any = $qml.app.findUi(command.object, root);
              if (!object)
                throw new Error("Native object missing: " + command.object);
              var identifier: any = /^[A-Za-z_][A-Za-z0-9_]*$/;
              if (command.operation === "inspect") {
                result = {};
                command.properties.forEach(function (property: any) {
                  if (!identifier.test(property))
                    throw new Error("Invalid property");
                  var value: any = object[property];
                  result[property] = value === undefined ? null : value;
                });
              } else if (command.operation === "set") {
                if (!identifier.test(command.property))
                  throw new Error("Invalid property");
                object[command.property] = command.value;
              } else if (command.operation === "invoke") {
                if (
                  !identifier.test(command.method) ||
                  typeof object[command.method] !== "function"
                )
                  throw new Error("Invalid native method");
                result = object[command.method].apply(
                  object,
                  command.args || [],
                );
              } else throw new Error("Unknown native operation");
            } else if (command.cmd === "create_fragment") {
              var parent: any = $qml.app.findUi(command.parent, root);
              if (!parent)
                throw new Error("Fragment parent missing: " + command.parent);
              // Queued creation snapshots must not overwrite newer live bindings.
              $qml.app[bridge] = Object.assign(
                {},
                command.bindings,
                $qml.app[bridge],
              );
              Qt.createQmlObject(
                command.source,
                parent,
                "Nandomo" + scene + "Fragment.tsx",
              );
            } else if (command.cmd === "order_fragments") {
              var parent: any = $qml.app.findUi(command.parent, root);
              if (!parent || !parent.ndReflow)
                throw new Error("Region missing: " + command.parent);
              var ordered: any = [];
              for (var i: any = 0; i < command.objects.length; i++) {
                var object: any = $qml.app.findUi(command.objects[i], parent);
                if (!object || object.parent !== parent)
                  throw new Error("Fragment missing: " + command.objects[i]);
                ordered.push(object);
              }
              parent.ndItems = ordered;
              parent.ndReflow();
            } else if (command.cmd === "destroy_fragment") {
              var object: any = $qml.app.findUi(command.object, root);
              if (!object)
                throw new Error("Removed fragment missing: " + command.object);
              var parent: any = object.parent;
              object.visible = false;
              object.parent = null;
              object.destroy();
              if (parent && parent.ndReflow) parent.ndReflow();
            } else throw new Error("Unknown UI patch");
            $qml.app.send("uiResult", {
              request: message.request,
              value: result,
            });
          } catch (error: any) {
            $qml.app.send("uiResult", {
              request: message.request,
              error: String(error),
            });
            console.warn("Scene patch failed", error);
          }
        }),
        findUi: qmlHandler(scope, ($qml, name: any, object: any) => {
          if (!object) return null;
          if (object.objectName === name) return object;
          var children: any = object.data || object.children || [];
          for (var i: any = 0; i < children.length; i++) {
            var found: any = findUi(name, children[i]);
            if (found) return found;
          }
          if (object.contentItem && object.contentItem !== object) {
            var found: any = findUi(name, object.contentItem);
            if (found) return found;
          }
          return null;
        }),
        receive: qmlHandler(scope, ($qml, next: any) => {
          if (next.uiPatch) {
            $qml.app.patchScene(next.uiPatch);
            return;
          }
          // DankTextField emits textEdited even for model-driven text changes.
          $qml.app.applyingBindings = true;
          try {
            // Keep native view delegates alive across selection/binding-only snapshots.
            if (
              JSON.stringify(next.entries) ===
              JSON.stringify($qml.app.state.entries)
            )
              next.entries = $qml.app.state.entries;
            if (
              JSON.stringify(next.columns) ===
              JSON.stringify($qml.app.state.columns)
            )
              next.columns = $qml.app.state.columns;
            var selectionChanged: any =
              (next.selected ? next.selected.path : "") !==
                ($qml.app.state.selected ? $qml.app.state.selected.path : "") ||
              (next.selection || []).join("\u0000") !==
                ($qml.app.state.selection || []).join("\u0000");
            var entriesChanged: any = next.entries !== $qml.app.state.entries;
            var activate = Number(next.activation || 0) > Number($qml.app.state.activation || 0);
            $qml.app.state = next;
            if(activate){$qml.window.showNormal();$qml.window.requestActivate();}
            if (selectionChanged || entriesChanged) $qml.app.revealSelection();
            if (next.sidebarUi) {
              $qml.app.sidebarBridge = Object.assign(
                {},
                $qml.app.sidebarBridge,
                next.sidebarUi.bindings,
              );
              if (!$qml.app.sidebarObject) {
                $qml.app.sidebarObject = Qt.createQmlObject(
                  next.sidebarUi.source,
                  $qml.sidebarSlot,
                  "NandomoSidebar.tsx",
                );
                $qml.app.send("uiMounted", "sidebar");
              }
            }
            if (next.ui) {
              $qml.app.uiBridge = Object.assign(
                {},
                $qml.app.uiBridge,
                next.ui.bindings,
              );
              if (!$qml.app.toolbarObject) {
                $qml.app.toolbarObject = Qt.createQmlObject(
                  next.ui.source,
                  $qml.toolbarSlot,
                  "NandomoToolbar.tsx",
                );
                $qml.app.send("uiMounted", "toolbar");
              }
            }
            if (next.detailsUi) {
              $qml.app.detailsBridge = Object.assign(
                {},
                $qml.app.detailsBridge,
                next.detailsUi.bindings,
              );
              if (!$qml.app.detailsObject) {
                $qml.app.detailsObject = Qt.createQmlObject(
                  next.detailsUi.source,
                  $qml.detailsSlot,
                  "DetailsPanel.tsx",
                );
                $qml.app.send("uiMounted", "details");
              }
            }
            if (next.dialogsUi) {
              $qml.app.dialogsBridge = Object.assign(
                {},
                $qml.app.dialogsBridge,
                next.dialogsUi.bindings,
              );
              if (!$qml.app.dialogsObject) {
                $qml.app.dialogsObject = Qt.createQmlObject(
                  next.dialogsUi.source,
                  $qml.dialogsSlot,
                  "FileDialogs.tsx",
                );
                $qml.app.send("uiMounted", "dialogs");
              }
            }
            if (next.newMenuOpen && !$qml.newMenu.visible) {
              var button: any = $qml.app.findUi(
                "sidebarNew",
                $qml.app.sidebarObject,
              );
              var point: any = button
                ? button.mapToItem($qml.window.contentItem, 0, button.height)
                : Qt.point(16, 130);
              $qml.newMenu.popup(point.x, point.y);
            }
          } finally {
            $qml.app.applyingBindings = false;
          }
        }),
        send: qmlHandler(scope, ($qml, action: any, value: any, index: any) => {
          $qml.backend.write(
            JSON.stringify({ action: action, value: value, index: index }) +
              "\n",
          );
        }),
        open: qmlHandler(scope, ($qml, entry: any, index: any) => {
          if (entry.directory)
            send(
              index === undefined ? "navigate" : "column",
              entry.path,
              index,
            );
          else send("open", entry.path);
        }),
        dropFiles: qmlHandler(scope, ($qml, drop: any, folder: any) => {
          if (!drop.hasUrls || $qml.app.state.mutating) return;
          var urls: any = [];
          for (var i: any = 0; i < drop.urls.length; i++)
            urls.push(String(drop.urls[i]));
          var mode: any =
            drop.proposedAction === Qt.MoveAction ? "move" : "copy";
          $qml.app.send("drop", { urls: urls, folder: folder, mode: mode });
          drop.accept(mode === "move" ? Qt.MoveAction : Qt.CopyAction);
        }),
        sizeText: qmlHandler(scope, ($qml, bytes: any) => {
          return bytes < 1024
            ? bytes + " B"
            : bytes < 1048576
              ? (bytes / 1024).toFixed(1) + " KB"
              : (bytes / 1048576).toFixed(1) + " MB";
        }),
        // Dragging a selected entry offers the whole selection, already
        // converted and de-duplicated by the application layer.
        dragPayload: qmlHandler(scope, ($qml, path: any) => {
          var selection: any = $qml.app.state.selection || [];
          var uris: any = $qml.app.state.selectionUris || [];
          if (
            uris.length &&
            selection.indexOf(path) >= 0
          )
            return uris.join("\r\n") + "\r\n";
          return (
            "file://" +
            String(path)
              .split("/")
              .map(encodeURIComponent)
              .join("/") +
            "\r\n"
          );
        }),
      }}
      {...{
        "Component.onCompleted": qmlHandler(scope, ($qml) => {
          Style.theme = $qml.theme;
        }),
      }}
    >
      <qt.Timer
        qmlId={scope.id("selectionReveal")}
        qmlDeclarations={{
          remaining: { type: "int", value: 0 },
          keyboardReveal: {type:"bool",value:false},
        }}
        qmlMethods={{
          schedule: qmlHandler(scope, ($qml, keyboard: boolean) => {
            keyboardReveal = !!keyboard;
            remaining = 3;
            restart();
          }),
        }}
        interval={80}
        repeat={true}
        onTriggered={qmlHandler(scope, ($qml) => {
          if (--remaining <= 0) stop();
          if ((!$qml.app.state.detailsVisible && !keyboardReveal) || !$qml.app.state.selected) {
            stop();
            return;
          }
          var index: any = $qml.app.state.entries.findIndex(function (
            entry: any,
          ) {
            return entry.path === $qml.app.state.selected.path;
          });
          if (index < 0) return;
          var view: any =
            $qml.app.state.view === "grid"
              ? $qml.filesGrid
              : $qml.app.state.view === "list"
                ? $qml.filesList
                : null;
          if (!view) return;
          view.forceLayout();
          view.currentIndex = index;
          view.positionViewAtIndex(
            index,
            $qml.app.state.view === "grid" ? GridView.Center : ListView.Contain,
          );
        })}
      />
      <qml.SystemPalette qmlId={scope.id("osPalette")} />
      <qt.QtObject
        qmlId={scope.id("theme")}
        qmlDeclarations={{
          background: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.background || $qml.osPalette.window,
            ),
          },
          surface: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) => $qml.app.state.palette.surface || $qml.osPalette.window,
            ),
          },
          surfaceText: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.on_surface || $qml.osPalette.windowText,
            ),
          },
          surfaceVariantText: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.on_surface_variant ||
                $qml.osPalette.windowText,
            ),
          },
          primary: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.primary || $qml.osPalette.highlight,
            ),
          },
          primaryText: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.on_primary ||
                $qml.osPalette.highlightedText,
            ),
          },
          primaryContainer: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.primary_container ||
                $qml.osPalette.highlight,
            ),
          },
          secondary: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.secondary || $qml.osPalette.highlight,
            ),
          },
          surfaceVariant: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.surface_variant || $qml.osPalette.base,
            ),
          },
          surfaceContainer: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.surface_container || $qml.osPalette.base,
            ),
          },
          surfaceContainerHigh: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) =>
                $qml.app.state.palette.surface_container_high ||
                $qml.osPalette.alternateBase,
            ),
          },
          outline: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) => $qml.app.state.palette.outline || $qml.osPalette.mid,
            ),
          },
          error: {
            type: "color",
            value: qmlExpression(
              scope,
              ($qml) => $qml.app.state.palette.error || "#b3261e",
            ),
          },
        }}
      />
      <io.Process
        qmlId={scope.id("backend")}
        command={qmlExpression(scope, ($qml) => [
          Quickshell.env("NANDOMO_FM_NODE"),
          Quickshell.env("NANDOMO_FM_BACKEND"),
        ])}
        stdinEnabled={true}
        running={true}
        stdout={
          <io.SplitParser
            onRead={qmlHandler(scope, ($qml, ...args: any[]) =>
              (
                ((data: any) => {
                  try {
                    $qml.app.receive(JSON.parse(data));
                  } catch (error: any) {
                    console.warn("Resposta inválida", error);
                  }
                }) as (...args: any[]) => unknown
              )(...args),
            )}
          />
        }
        stderr={
          <io.SplitParser
            onRead={qmlHandler(scope, ($qml, ...args: any[]) =>
              (
                ((data: any) => console.warn("backend:", data)) as (
                  ...args: any[]
                ) => unknown
              )(...args),
            )}
          />
        }
        onExited={qmlHandler(scope, ($qml, ...args: any[]) =>
          (
            ((code: any, status: any) => {
              if (code !== 0) console.warn("Backend encerrado", code);
            }) as (...args: any[]) => unknown
          )(...args),
        )}
      />
      <FileWindow scope={scope} nativeProbe={props.nativeProbe} />
      <NativeSmokeChecks scope={scope} />
    </shell.ShellRoot>
  );
});
