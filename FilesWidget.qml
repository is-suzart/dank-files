import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import qs.Modules.Plugins
import Quickshell
import qs.Common
import QtQml
import qs.Widgets

// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent"}
PluginComponent {
id: n0
objectName: "n0"
function triggerHoverPopout() { return (() => { const __name = function(fn) { return fn; }; return (()=>{})({}, ...arguments); })(); }
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent","property":"qmlImports"}
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent","property":"qmlMethods"}
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent","property":"pillClickAction"}
pillClickAction: (() => { const __name = function(fn) { return fn; }; return (()=>function(){const path=decodeURIComponent(Qt.resolvedUrl("app/launch.mjs").toString().replace(/^file:\/\//,""));Quickshell.execDetached(["node",path])})({}); })()
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent","property":"horizontalBarPill"}
horizontalBarPill: 
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":13,"columnNumber":22,"component":"qml:Component"}
Component {
id: n1
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":13,"columnNumber":22,"component":"qml:Component","property":"children"}

// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon"}
DankIcon {
id: n2
objectName: "n2"
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"name"}
name: "folder"
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"size"}
size: 24
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Theme.surfaceText)({}); })()
}
}
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":17,"columnNumber":5,"component":"qml:PluginComponent","property":"verticalBarPill"}
verticalBarPill: 
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":13,"columnNumber":22,"component":"qml:Component"}
Component {
id: n3
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":13,"columnNumber":22,"component":"qml:Component","property":"children"}

// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon"}
DankIcon {
id: n4
objectName: "n4"
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"name"}
name: "folder"
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"size"}
size: 24
// @nandomo-source {"fileName":"src/plugin/FilesWidget.tsx","lineNumber":14,"columnNumber":5,"component":"qml:DankIcon","property":"color"}
color: (() => { const __name = function(fn) { return fn; }; return (()=>Theme.surfaceText)({}); })()
}
}
}