import { FileToolsDialog } from './components/FileTools.js';
import { importQml } from '@nandomo/bridge-qml';
const qml=importQml('QtQuick');
import type { FileManager } from './application/createFileManager.js';
import { Toolbar } from './components/Toolbar.js';
import { Sidebar } from './components/Sidebar.js';
import { DetailsPanel } from './components/DetailsPanel.js';
import { FileDialogs } from './components/FileDialogs.js';

/** TSX regions hosted by the native window. */
export function App({manager}: {manager:FileManager}) {
  return {
    toolbar: <Toolbar manager={manager} />,
    sidebar: <Sidebar manager={manager} />,
    details: <DetailsPanel manager={manager} />,
    dialogs: <qml.Item><FileDialogs manager={manager} /><FileToolsDialog manager={manager} /></qml.Item>,
  };
}
