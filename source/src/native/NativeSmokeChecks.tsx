import { FileWindow } from "./FileWindow.js";
import { component } from "@nandomo/core";
import {
  importQml,
  createQmlScope,
  qmlExpression,
  qmlHandler,
} from "@nandomo/bridge-qml";
const qt = importQml("QtQml");
import { AppMenu } from "./AppMenu.js";
import { ContextAction } from "./ContextAction.js";
import { EntryIcon } from "./EntryIcon.js";
import { FilePreview } from "./FilePreview.js";
declare let Quickshell: any,
  Qt: any,
  Style: any,
  ticks: any,
  startingPath: any,
  startingHidden: any,
  hasText: any,
  step: any,
  originalSidebar: any,
  alpha: any,
  beta: any,
  proton: any,
  heroic: any,
  fixturePath: any,
  originalWindowHeight: any,
  previewStableTicks: any,
  field: any,
  save: any;
import type { QmlScope } from "@nandomo/bridge-qml";
export const NativeSmokeChecks = component<{
  scope: QmlScope;
}>("NativeSmokeChecks", ({ scope }) => (
  <>
    <qt.Timer
      qmlDeclarations={{step:{type:"int",value:0},ticks:{type:"int",value:0},startingPath:{type:"string",value:""}}}
      interval={100} repeat={true}
      running={qmlExpression(scope,(_qml)=>Quickshell.env("NANDOMO_FM_HMR_SMOKE")==="1")}
      onTriggered={qmlHandler(scope,($qml)=>{
        try {
          if(++ticks>400)throw new Error("HMR timeout at step "+step+": "+$qml.app.state.error);
          if(step===0 && $qml.app.toolbarObject && !$qml.app.state.busy) {
            startingPath=$qml.app.state.path;
            if(startingPath.indexOf("/tmp/nandomo-hmr-smoke-")!==0)throw new Error("Unsafe HMR fixture");
            $qml.app.send("select",startingPath+"/alpha.txt");
            $qml.app.send("properties");$qml.app.send("hidden");step=1;
          }else if(step===1 && $qml.app.state.selected && $qml.app.state.hidden && $qml.app.state.detailsOpen) {
            console.warn("FM_HMR_READY");step=2;
          }else if(step===2) {
            if($qml.app.state.path!==startingPath || !$qml.app.state.selected || $qml.app.state.selected.name!=="alpha.txt" || !$qml.app.state.hidden || !$qml.app.state.detailsOpen)throw new Error("Application state lost during reload");
            var label:any=$qml.app.findUi("hmrLabel",$qml.app.toolbarObject);
            if(label && label.text==="HMR version 2") {
              if($qml.app.uiGeneration!==1)throw new Error("Failed edits committed a scene");
              $qml.app.findUi("hmrAction",$qml.app.toolbarObject).clicked();step=3;
            }
          }else if(step===3 && $qml.app.state.descending) {
            if($qml.app.findUi("hmrAction",$qml.app.toolbarObject).text!=="updated")return;
            console.warn("FM_HMR_SMOKE_PASS");Qt.quit();
          }
        }catch(error:any){console.warn("FM_HMR_SMOKE_FAIL",error);Qt.exit(1);}
      })}
    />
    <qt.Timer
      qmlDeclarations={{
        ticks: { type: "int", value: 0 },
        startingPath: { type: "string", value: "" },
        startingHidden: { type: "bool", value: false },
      }}
      interval={250}
      repeat={true}
      running={qmlExpression(
        scope,
        ($qml) => Quickshell.env("NANDOMO_FM_SMOKE") === "1",
      )}
      onTriggered={qmlHandler(scope, ($qml) => {
        ticks++;
        try {
          if (ticks === 4) {
            if (!$qml.app.toolbarObject)
              throw new Error("TSX toolbar did not mount");
            startingPath = $qml.app.state.path;
            startingHidden = $qml.app.state.hidden;
            var address: any = $qml.app.findUi(
              "toolbarAddress",
              $qml.app.toolbarObject,
            );
            if (!address || address.text !== startingPath)
              throw new Error("Address binding failed");
            console.warn(
              "FM_QML_READY",
              $qml.window.visible,
              $qml.app.state.entries.length,
              Style.primary,
            );
            $qml.app.findUi("toolbarHidden", $qml.app.toolbarObject).clicked();
          }
          if (ticks === 8) {
            if ($qml.app.state.hidden === startingHidden)
              throw new Error("TSX clicked handler failed");
            var hiddenButton: any = $qml.app.findUi(
              "toolbarHidden",
              $qml.app.toolbarObject,
            );
            if (hiddenButton.selected !== $qml.app.state.hidden)
              throw new Error("TSX reactive label failed");
            $qml.app.findUi("toolbarGrid", $qml.app.toolbarObject).clicked();
          }
          if (ticks === 12) {
            if ($qml.app.state.view !== "grid")
              throw new Error("Grid event failed");
            $qml.app.findUi("toolbarColumns", $qml.app.toolbarObject).clicked();
          }
          if (ticks === 16) {
            if ($qml.app.state.view !== "columns")
              throw new Error("Columns event failed");
            $qml.app.findUi("toolbarUp", $qml.app.toolbarObject).clicked();
          }
          if (ticks === 20) {
            var address: any = $qml.app.findUi(
              "toolbarAddress",
              $qml.app.toolbarObject,
            );
            if (
              address.text !== $qml.app.state.path ||
              $qml.app.state.path === startingPath
            )
              throw new Error("Path update binding failed");
            address.clear();
            address.insertText(startingPath);
            address.accepted();
          }
          if (ticks === 24) {
            if ($qml.app.state.path !== startingPath || $qml.app.state.error)
              throw new Error("TSX accepted text argument failed");
            var address: any = $qml.app.findUi(
              "toolbarAddress",
              $qml.app.toolbarObject,
            );
            address.clear();
            address.insertText("/draft-not-submitted");
            $qml.app.findUi("toolbarHidden", $qml.app.toolbarObject).clicked();
          }
          if (ticks === 28) {
            var address: any = $qml.app.findUi(
              "toolbarAddress",
              $qml.app.toolbarObject,
            );
            if (
              address.text !== "/draft-not-submitted" ||
              $qml.app.state.path !== startingPath
            )
              throw new Error(
                "Local address draft did not survive unrelated state updates: " +
                  address.text +
                  " draft=" +
                  address.draft +
                  " path=" +
                  $qml.app.state.path,
              );
            console.warn("FM_TSX_SMOKE_PASS");
            Qt.quit();
          }
          if (ticks > 36) throw new Error("TSX smoke timeout");
        } catch (error: any) {
          console.warn("FM_TSX_SMOKE_FAIL", error);
          Qt.exit(1);
        }
      })}
    />
    <qt.Timer
      qmlDeclarations={{
        step: { type: "int", value: 0 },
        ticks: { type: "int", value: 0 },
        originalSidebar: { type: "var", value: null },
        alpha: { type: "var", value: null },
        beta: { type: "var", value: null },
        proton: { type: "var", value: null },
        heroic: { type: "var", value: null },
      }}
      qmlMethods={{
        hasText: qmlHandler(scope, ($qml, object: any, text: any) => {
          if (!object) return false;
          if (object.text === text) return true;
          for (var i: any = 0; i < object.children.length; i++)
            if (hasText(object.children[i], text)) return true;
          return false;
        }),
      }}
      interval={200}
      repeat={true}
      running={qmlExpression(
        scope,
        ($qml) => Quickshell.env("NANDOMO_FM_SIDEBAR_SMOKE") === "1",
      )}
      onTriggered={qmlHandler(scope, ($qml) => {
        ticks++;
        try {
          if ($qml.app.state.error) throw new Error($qml.app.state.error);
          if (ticks > 80)
            throw new Error("Sidebar fixture timeout at step " + step);
          if (
            step === 0 &&
            $qml.app.sidebarObject &&
            hasText($qml.app.sidebarObject, $qml.app.tr("Nenhuma instalação detectada"))
          ) {
            originalSidebar = $qml.app.sidebarObject;
            $qml.app.send("fixture", "populated");
            step = 1;
          } else if (
            step === 1 &&
            $qml.app.findUi("gameGroup:Steam / Proton", $qml.app.sidebarObject)
          ) {
            alpha = $qml.app.findUi("drive:a", $qml.app.sidebarObject);
            beta = $qml.app.findUi("drive:b", $qml.app.sidebarObject);
            var section: any = $qml.app.findUi(
              "gameGroup:Steam / Proton",
              $qml.app.sidebarObject,
            );
            if (
              section.height !== 36 ||
              $qml.app.findUi("game:/games/proton", section)
            )
              throw new Error("Collapsed group dimensions failed");
            if (!alpha || !beta) return;
            if (
              beta.mounted ||
              !beta.statusIcon ||
              hasText($qml.app.sidebarObject, $qml.app.tr("Nenhum volume detectado"))
            )
              throw new Error("Initial sidebar state failed");
            $qml.app
              .findUi("groupToggle:gameGroup:Steam / Proton", section)
              .clicked();
            step = 11;
          } else if (
            step === 11 &&
            $qml.app.findUi("game:/games/proton", $qml.app.sidebarObject)
          ) {
            var section: any = $qml.app.findUi(
              "gameGroup:Steam / Proton",
              $qml.app.sidebarObject,
            );
            if (section.height <= 36) return;
            $qml.app
              .findUi("groupToggle:gameGroup:Steam / Proton", section)
              .clicked();
            step = 12;
          } else if (
            step === 12 &&
            !$qml.app.findUi("game:/games/proton", $qml.app.sidebarObject)
          ) {
            var section: any = $qml.app.findUi(
              "gameGroup:Steam / Proton",
              $qml.app.sidebarObject,
            );
            if (section.height !== 36) return;
            $qml.app
              .findUi("groupToggle:gameGroup:Steam / Proton", section)
              .clicked();
            step = 13;
          } else if (
            step === 13 &&
            $qml.app.findUi("game:/games/proton", $qml.app.sidebarObject)
          ) {
            proton = $qml.app.findUi(
              "game:/games/proton",
              $qml.app.sidebarObject,
            );
            $qml.app.send("fixture", "updated");
            step = 2;
          } else if (
            step === 2 &&
            $qml.app.findUi("gameGroup:Heroic", $qml.app.sidebarObject) &&
            beta.text === "Beta online"
          ) {
            if (
              $qml.app.sidebarObject !== originalSidebar ||
              $qml.app.findUi("drive:a", $qml.app.sidebarObject) !== alpha ||
              $qml.app.findUi("drive:b", $qml.app.sidebarObject) !== beta
            )
              throw new Error("Drive identities changed");
            if (
              $qml.app.findUi("game:/games/proton", $qml.app.sidebarObject) !==
                proton ||
              proton.text !== "Proton renamed"
            )
              throw new Error("Nested row identity changed");
            if (
              !beta.mounted ||
              beta.statusIcon ||
              beta.parent.parent.y >= alpha.parent.parent.y
            )
              throw new Error("Native reorder failed");
            $qml.app
              .findUi("groupToggle:gameGroup:Heroic", $qml.app.sidebarObject)
              .clicked();
            step = 21;
          } else if (
            step === 21 &&
            $qml.app.findUi("game:/games/heroic", $qml.app.sidebarObject)
          ) {
            heroic = $qml.app.findUi(
              "game:/games/heroic",
              $qml.app.sidebarObject,
            );
            beta.clicked();
            step = 3;
          } else if (step === 3 && $qml.app.state.path === "/b-new") {
            $qml.app.send("fixture", "removed");
            step = 4;
          } else if (
            step === 4 &&
            beta.text === "Beta kept" &&
            !$qml.app.findUi("drive:a", $qml.app.sidebarObject) &&
            !$qml.app.findUi("game:/games/proton", $qml.app.sidebarObject)
          ) {
            if (
              $qml.app.findUi("game:/games/heroic", $qml.app.sidebarObject) !==
                heroic ||
              heroic.text !== "Heroic kept"
            )
              throw new Error("Retained group failed");
            $qml.app.send("fixture", "empty");
            step = 5;
          } else if (
            step === 5 &&
            hasText($qml.app.sidebarObject, $qml.app.tr("Nenhum volume detectado")) &&
            hasText($qml.app.sidebarObject, $qml.app.tr("Nenhuma instalação detectada")) &&
            !$qml.app.findUi("drive:b", $qml.app.sidebarObject)
          ) {
            if (
              $qml.app.sidebarObject !== originalSidebar ||
              $qml.app.findUi("game:/games/heroic", $qml.app.sidebarObject)
            )
              throw new Error("Sidebar teardown failed");
            console.warn("FM_SIDEBAR_SMOKE_PASS");
            Qt.quit();
          }
        } catch (error: any) {
          console.warn("FM_SIDEBAR_SMOKE_FAIL", error);
          Qt.exit(1);
        }
      })}
    />
    <qt.Timer
      qmlDeclarations={{
        step: { type: "int", value: 0 },
        ticks: { type: "int", value: 0 },
        fixturePath: { type: "string", value: "" },
        originalWindowHeight: {type:"int",value:0},
        previewStableTicks: {type:"int",value:0},
      }}
      qmlMethods={{
        field: qmlHandler(scope, ($qml, value: any) => {
          var input: any = $qml.app.findUi("editName", $qml.app.dialogsObject);
          input.clear();
          input.insertText(value);
        }),
        save: qmlHandler(scope, ($qml) => {
          $qml.app.findUi("editSave", $qml.app.dialogsObject).clicked();
        }),
      }}
      interval={200}
      repeat={true}
      running={qmlExpression(
        scope,
        ($qml) => Quickshell.env("NANDOMO_FM_UX_SMOKE") === "1",
      )}
      onTriggered={qmlHandler(scope, ($qml) => {
        ticks++;
        try {
          if ($qml.app.state.error && !$qml.app.state.conflict && step !== 9 && step !== 10) throw new Error("Unexpected UI error at step " + step + ": " + $qml.app.state.error);
          if (ticks > 100)
            throw new Error(
              "UX timeout at step " + step + ": " + $qml.app.state.error,
            );
          if (
            step === 0 &&
            $qml.app.detailsObject &&
            $qml.app.dialogsObject &&
            !$qml.app.state.busy
          ) {
            if ($qml.app.state.path.indexOf("/tmp/nandomo-ux-smoke-") !== 0)
              throw new Error("Unsafe fixture path");
            fixturePath = $qml.app.state.path;
            if ($qml.detailsContainer.visible)
              throw new Error("Details visible without selection");
            $qml.app.findUi("toolbarSort", $qml.app.toolbarObject).clicked();
            step = -1;
          } else if (
            step === -1 &&
            $qml.app.findUi("toolbarSortPopup", $qml.app.toolbarObject).visible
          ) {
            $qml.app.findUi("sortOption:1", $qml.app.toolbarObject).triggered();
            $qml.app.findUi("toolbarSortPopup", $qml.app.toolbarObject).close();
            step = -2;
          } else if (step === -2 && $qml.app.state.order === "size") {
            $qml.app.findUi("sortOption:0", $qml.app.toolbarObject).triggered();
            step = -3;
          } else if (step === -3 && $qml.app.state.order === "name") {
            $qml.app.send("select", $qml.app.state.path + "/picture #.svg");
            step = -4;
          } else if(step === -4 && $qml.app.state.selected) {
            if($qml.detailsContainer.visible)throw new Error("Selection opened details automatically");
            $qml.app.send("properties");
            step = 1;
          } else if (
            step === 1 && $qml.app.state.detailsOpen &&
            $qml.app.findUi("detailsPreview", $qml.app.detailsObject)
              .previewStatus === "ready"
          ) {
            if (!$qml.detailsContainer.visible)
              throw new Error("Selected file details hidden");
            var thumb: any = $qml.app.findUi(
              "thumbnail:" + $qml.app.state.selected.path,
              $qml.window.contentItem,
            );
            if (!thumb || !thumb.item || thumb.item.previewStatus !== "ready")
              return;
            $qml.app.context($qml.app.state.selected, 400, 200);
            if (!$qml.contextMenu.itemAt(3).enabled)
              throw new Error("Preview menu disabled");
            $qml.contextMenu.itemAt(3).triggered();
            $qml.contextMenu.close();
            step = 2;
          } else if (
            step === 2 &&
            $qml.app.findUi("previewDialog", $qml.app.dialogsObject).visible
          ) {
            if (
              $qml.app.findUi("expandedPreview", $qml.app.dialogsObject)
                .previewStatus !== "ready"
            )
              return;
            // Image loading and the popup layout settle in separate Qt frames.
            if(++previewStableTicks < 3) return;
            var preview: any = $qml.app.findUi(
              "previewDialog",
              $qml.app.dialogsObject,
            );
            if (preview.height <= preview.width)
              throw new Error(
                "Portrait image did not produce a portrait modal",
              );
            if (
              preview.height > $qml.window.height ||
              preview.width > $qml.window.width
            )
              throw new Error("Preview exceeds window");
            $qml.app.findUi("previewZoomIn", $qml.app.dialogsObject).clicked();
            step = 201;
          } else if(step === 201) {
            var image: any = $qml.app.findUi("expandedPreview", $qml.app.dialogsObject);
            if(image.zoom <= 1 || $qml.app.findUi("previewImage", $qml.app.dialogsObject).scale <= 1) return;
            $qml.app.findUi("previewRotateRight", $qml.app.dialogsObject).clicked(); step = 202;
          } else if(step === 202) {
            if($qml.app.findUi("expandedPreview", $qml.app.dialogsObject).angle !== 90 || $qml.app.findUi("previewImage", $qml.app.dialogsObject).rotation !== 90) return;
            $qml.app.findUi("expandedPreview", $qml.app.dialogsObject).panTo(20, 30);
            $qml.app.findUi("previewZoomReset", $qml.app.dialogsObject).clicked(); step = 203;
          } else if(step === 203) {
            var image: any = $qml.app.findUi("expandedPreview", $qml.app.dialogsObject);
            if(image.zoom !== 1 || image.angle !== 0) return;
            if(image.panX !== 0 || image.panY !== 0) throw new Error("Reset button retained image pan");
            $qml.app.findUi("previewClose", $qml.app.dialogsObject).clicked();
            $qml.app.send("select", $qml.app.state.path + "/document.pdf"); step = 3;
          } else if (
            step === 3 &&
            $qml.app.findUi("detailsPreview", $qml.app.detailsObject)
              .previewStatus === "ready" &&
            $qml.app.state.selected.name === "document.pdf"
          ) {
            $qml.app.send("preview"); step = 301;
          } else if(step === 301 && $qml.app.findUi("previewDialog", $qml.app.dialogsObject).visible) {
            var pdf: any = $qml.app.findUi("expandedPreview", $qml.app.dialogsObject);
            if(pdf.previewStatus !== "ready") return;
            if(pdf.zoom !== 1 || pdf.angle !== 0) throw new Error("Preview transform did not reset for another file");
            $qml.app.findUi("previewRotateRight", $qml.app.dialogsObject).clicked(); step = 302;
          } else if(step === 302) {
            if($qml.app.findUi("previewPdf", $qml.app.dialogsObject).rotation !== 90) return;
            $qml.app.findUi("previewClose", $qml.app.dialogsObject).clicked(); step = 3021;
          } else if(step === 3021 && !$qml.app.state.previewOpen) {
            $qml.app.send("editPermissions"); step = 303;
          } else if (
            step === 303 &&
            $qml.app.findUi("permissionsDialog", $qml.app.dialogsObject).visible
          ) {
            $qml.app.findUi("permissionsEditor", $qml.app.dialogsObject).mode =
              416;
            step = 304;
          } else if (step === 304) {
            $qml.app
              .findUi("permissionsSave", $qml.app.dialogsObject)
              .clicked();
            step = 305;
          } else if (
            step === 305 &&
            !$qml.app.findUi("permissionsDialog", $qml.app.dialogsObject)
              .visible &&
            !$qml.app.state.mutating
          ) {
            if ($qml.app.state.error) throw new Error($qml.app.state.error);
            $qml.app.send("newMenu");
            step = 4;
          } else if (step === 4 && $qml.newMenu.visible) {
            $qml.newMenu.itemAt(0).triggered();
            $qml.newMenu.close();
            step = 5;
          } else if (
            step === 5 &&
            $qml.app.findUi("nameDialog", $qml.app.dialogsObject).visible
          ) {
            field("Created folder");
            save();
            step = 6;
          } else if (
            step === 6 &&
            !$qml.app.state.editRequest &&
            !$qml.app.state.mutating &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "Created folder"
          ) {
            if (!$qml.detailsContainer.visible)
              throw new Error("Directory properties sidebar hidden");
            $qml.app.send("create", "file");
            step = 7;
          } else if (
            step === 7 &&
            $qml.app.findUi("nameDialog", $qml.app.dialogsObject).visible
          ) {
            field("created.txt");
            save();
            step = 8;
          } else if (
            step === 8 &&
            !$qml.app.state.editRequest &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "created.txt"
          ) {
            $qml.app.send("rename");
            step = 9;
          } else if (
            step === 9 &&
            $qml.app.findUi("nameDialog", $qml.app.dialogsObject).visible
          ) {
            field("existing.txt");
            save();
            step = 10;
          } else if (
            step === 10 &&
            $qml.app.state.error &&
            !$qml.app.state.mutating
          ) {
            if (!$qml.app.findUi("nameDialog", $qml.app.dialogsObject).visible)
              throw new Error("Conflict closed rename dialog");
            field("renamed.txt");
            save();
            step = 11;
          } else if (
            step === 11 &&
            !$qml.app.state.editRequest &&
            !$qml.app.state.mutating &&
            $qml.app.state.selected.name === "renamed.txt"
          ) {
            $qml.app.send("select", null);
            step = 12;
          } else if (
            step === 12 &&
            !$qml.app.state.selected &&
            !$qml.detailsContainer.visible
          ) {
            $qml.app.send("select", $qml.app.state.path + "/renamed.txt");
            step = 13;
          } else if (
            step === 13 &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "renamed.txt"
          ) {
            $qml.app.findUi("detailsCopy", $qml.app.detailsObject).clicked();
            step = 14;
          } else if (step === 14 && $qml.app.state.clipboard) {
            $qml.app.send("navigate", $qml.app.state.path + "/Created folder");
            step = 15;
          } else if (
            step === 15 &&
            $qml.app.state.path.endsWith("/Created folder") &&
            !$qml.app.state.busy
          ) {
            $qml.app.send("paste");
            step = 16;
          } else if (
            step === 16 &&
            !$qml.app.state.mutating &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "renamed.txt"
          ) {
            if ($qml.app.state.error) throw new Error($qml.app.state.error);
            $qml.app.send("up");
            step = 17;
          } else if (
            step === 17 &&
            !$qml.app.state.busy &&
            !$qml.app.state.path.endsWith("/Created folder")
          ) {
            $qml.app.send("select", $qml.app.state.path + "/renamed.txt");
            step = 18;
          } else if (
            step === 18 &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "renamed.txt"
          ) {
            $qml.app.findUi("detailsCut", $qml.app.detailsObject).clicked();
            step = 19;
          } else if (
            step === 19 &&
            $qml.app.state.clipboard &&
            $qml.app.state.clipboard.mode === "move"
          ) {
            $qml.app.send("navigate", $qml.app.state.path + "/Move target");
            step = 20;
          } else if (
            step === 20 &&
            $qml.app.state.path.endsWith("/Move target") &&
            !$qml.app.state.busy
          ) {
            $qml.app.send("paste");
            step = 21;
          } else if (
            step === 21 &&
            !$qml.app.state.mutating &&
            $qml.app.state.selected &&
            $qml.app.state.selected.name === "renamed.txt"
          ) {
            if ($qml.app.state.error || $qml.app.state.clipboard)
              throw new Error("Cut/paste failed");
            $qml.app.send("preferences");
            step = 22;
          } else if (
            step === 22 &&
            $qml.app.findUi("preferencesDialog", $qml.app.dialogsObject).visible
          ) {
            originalWindowHeight = $qml.window.height;
            $qml.window.height = 480;
            step = 220;
          } else if(step === 220) {
            var preferencesDialog: any = $qml.app.findUi("preferencesDialog", $qml.app.dialogsObject);
            if(preferencesDialog.width < 400 || preferencesDialog.height < 250) throw new Error("Preferences content collapsed");
            if(preferencesDialog.height > $qml.window.height) throw new Error("Preferences exceeds window");
            $qml.app.findUi("preferencesShowSidebarVolumes", $qml.app.dialogsObject).handleClick();
            step = 221;
          } else if(step === 221) {
            if($qml.app.state.preferences.showSidebarVolumes || $qml.app.findUi("sidebarVolumesTitle", $qml.app.sidebarObject)) return;
            $qml.app.findUi("preferencesShowSidebarVolumes", $qml.app.dialogsObject).handleClick(); step = 222;
          } else if(step === 222) {
            if(!$qml.app.state.preferences.showSidebarVolumes || !$qml.app.findUi("sidebarVolumesTitle", $qml.app.sidebarObject)) return;
            $qml.app
              .findUi("preferencesGrid", $qml.app.dialogsObject)
              .sliderDragFinished(128);
            $qml.app
              .findUi("preferencesThumbnails", $qml.app.dialogsObject)
              .handleClick();
            step = 23;
          } else if (
            step === 23 &&
            $qml.app.state.preferences.gridSize === 128 &&
            $qml.app.state.preferences.thumbnails === false
          ) {
            $qml.window.height = originalWindowHeight;
            $qml.app.send("closePreferences");
            $qml.app.send("openWith", $qml.app.state.selected.path);
            step = 24;
          } else if (
            step === 24 &&
            $qml.app.findUi("chooserDialog", $qml.app.dialogsObject).visible
          ) {
            if (!$qml.app.state.applications.length)
              throw new Error("No installed applications found");
            var list: any = $qml.app.findUi("chooserList", $qml.app.dialogsObject);
            if(!list || list.count !== $qml.app.state.applications.length) return;
            list.forceLayout();
            if(!list.itemAtIndex(0)) return;
            $qml.app.findUi("chooserSearch", $qml.app.dialogsObject).text = "nandomo-no-such-application-12345";
            step = 241;
          } else if(step === 241) {
            if($qml.app.findUi("chooserList", $qml.app.dialogsObject).count !== 0) return;
            $qml.app.findUi("chooserSearch", $qml.app.dialogsObject).text = "";
            step = 242;
          } else if(step === 242) {
            if($qml.app.findUi("chooserList", $qml.app.dialogsObject).count !== $qml.app.state.applications.length) return;
            $qml.app.findUi("chooserClose", $qml.app.dialogsObject).clicked(); step = 25;
          } else if (step === 25 && !$qml.app.state.chooserOpen) {
            $qml.app.send("transfer", "copy");
            step = 26;
          } else if (
            step === 26 &&
            $qml.app.findUi("destinationDialog", $qml.app.dialogsObject).visible
          ) {
            if ($qml.app.findUi("nameDialog", $qml.app.dialogsObject).visible)
              throw new Error("Transfer still shows text input");
            $qml.app.send(
              "browseDestination",
              $qml.app.state.path.substring(
                0,
                $qml.app.state.path.lastIndexOf("/"),
              ) + "/Created folder",
            );
            step = 27;
          } else if (
            step === 27 &&
            !$qml.app.state.destinationBusy &&
            $qml.app.state.destinationPath.endsWith("/Created folder")
          ) {
            $qml.app
              .findUi("destinationConfirm", $qml.app.dialogsObject)
              .clicked();
            step = 28;
          } else if (
            step === 28 &&
            $qml.app.findUi("conflictDialog", $qml.app.dialogsObject).visible
          ) {
            var input: any = $qml.app.findUi(
              "conflictName",
              $qml.app.dialogsObject,
            );
            input.clear();
            input.insertText("resolved.txt");
            $qml.app.findUi("conflictRename", $qml.app.dialogsObject).clicked();
            step = 29;
          } else if (
            step === 29 &&
            !$qml.app.state.conflict &&
            !$qml.app.state.editRequest &&
            !$qml.app.state.mutating
          ) {
            $qml.app.send("up");
            step = 30;
          } else if (
            step === 30 &&
            !$qml.app.state.busy &&
            !$qml.app.state.path.endsWith("/Move target")
          ) {
            $qml.app.send("select", $qml.app.state.path + "/Created folder");
            step = 31;
          } else if (
            step === 31 &&
            $qml.app.state.selected &&
            $qml.app.state.selected.directory
          ) {
            $qml.app.send("customizeFolder");
            step = 32;
          } else if (
            step === 32 &&
            $qml.app.findUi("appearanceDialog", $qml.app.dialogsObject).visible
          ) {
            $qml.app
              .findUi("appearanceLogosTab", $qml.app.dialogsObject)
              .clicked();
            step = 321;
          } else if (
            step === 321 &&
            $qml.app.findUi("appearanceNext", $qml.app.dialogsObject).enabled
          ) {
            $qml.app.findUi("appearanceNext", $qml.app.dialogsObject).clicked();
            step = 322;
          } else if (
            step === 322 &&
            $qml.app.findUi("appearancePrevious", $qml.app.dialogsObject)
              .enabled
          ) {
            $qml.app
              .findUi("appearanceEmblemsTab", $qml.app.dialogsObject)
              .clicked();
            step = 323;
          } else if (
            step === 323 &&
            !$qml.app.findUi("appearancePrevious", $qml.app.dialogsObject)
              .enabled
          ) {
            $qml.app
              .findUi("appearanceColor:#448aff", $qml.app.dialogsObject)
              .clicked();
            $qml.app.findUi("appearanceSave", $qml.app.dialogsObject).clicked();
            step = 33;
          } else if (
            step === 33 &&
            !$qml.app.findUi("appearanceDialog", $qml.app.dialogsObject).visible
          ) {
            var folder: any = $qml.app.state.entries.find(function (
              entry: any,
            ) {
              return entry.name === "Created folder";
            });
            if (!folder || folder.folderColor !== "#448aff")
              throw new Error("Folder appearance not propagated");
            $qml.app.send("applications");
            step = 34;
          } else if (
            step === 34 &&
            $qml.app.state.path === "applications:///" &&
            !$qml.app.state.busy
          ) {
            if (!$qml.app.state.entries.length || $qml.app.state.chooserOpen)
              throw new Error("Applications did not open as file view");
            $qml.app.send(
              "properties",
              $qml.app.state.entries[
                Math.floor($qml.app.state.entries.length / 3)
              ].path,
            );
            step = 341;
          } else if (
            step === 341 &&
            $qml.app.state.selected &&
            $qml.filesGrid.currentItem
          ) {
            if (
              $qml.app.findUi("detailsOpen", $qml.app.detailsObject).text !==
              $qml.app.tr("Abrir app")
            )
              throw new Error("Application action label wrong");
            if (
              $qml.app.findUi("detailsPreview", $qml.app.detailsObject).visible
            )
              throw new Error("Application shows file preview");
            $qml.filesGrid.forceLayout();
            var tile: any = $qml.filesGrid.currentItem;
            if (
              tile.y < $qml.filesGrid.contentY - 1 ||
              tile.y + tile.height >
                $qml.filesGrid.contentY + $qml.filesGrid.height + 1
            )
              throw new Error("Selected app disappeared after grid resized");
            $qml.window.width = 1000;
            $qml.window.height = 650;
            step = 342;
          } else if (step === 342 && $qml.filesGrid.currentItem) {
            var tile: any = $qml.filesGrid.currentItem;
            if (
              tile.y < $qml.filesGrid.contentY - 1 ||
              tile.y + tile.height >
                $qml.filesGrid.contentY + $qml.filesGrid.height + 1
            )
              throw new Error("Selection lost after another window resize");
            $qml.app.send("special", "recent:///");
            step = 35;
          } else if (
            step === 35 &&
            $qml.app.state.path === "recent:///" &&
            !$qml.app.state.busy
          ) {
            $qml.app.send("special", "trash:///");
            step = 36;
          } else if (
            step === 36 &&
            $qml.app.state.path === "trash:///" &&
            !$qml.app.state.busy
          ) {
            $qml.app.send("navigate", fixturePath + "/Steam/steamapps/common");
            step = 37;
          } else if (
            step === 37 &&
            $qml.app.state.path === fixturePath + "/Steam/steamapps/common" &&
            !$qml.app.state.busy
          ) {
            var crumb: any = $qml.app
              .findUi("toolbarAddress", $qml.app.toolbarObject)
              .segment(fixturePath + "/Steam/steamapps");
            if (!crumb)
              throw new Error(
                "Breadcrumb segment missing: " +
                  JSON.stringify(
                    $qml.app
                      .findUi("toolbarAddress", $qml.app.toolbarObject)
                      .parts(),
                  ),
              );
            crumb.clicked();
            step = 38;
          } else if (
            step === 38 &&
            !$qml.app.state.busy &&
            $qml.app.state.path !== fixturePath + "/Steam/steamapps/common"
          ) {
            if ($qml.app.state.path !== fixturePath + "/Steam/steamapps")
              throw new Error(
                "Breadcrumb navigated to wrong directory: " +
                  $qml.app.state.path,
              );
            console.warn("FM_UX_SMOKE_PASS");
            Qt.quit();
          }
        } catch (error: any) {
          console.warn("FM_UX_SMOKE_FAIL", error);
          Qt.exit(1);
        }
      })}
    />
  </>
));
