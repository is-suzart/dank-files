/** Entry of one portal request: normal Dank Files views in chooser mode, no desktop integration. */
import { readFile, writeFile, rename } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { i18n, t } from '../infrastructure/i18n.js';
import { createFileManager } from '../application/createFileManager.js';
import { withUndo } from '../infrastructure/fileOperations.js';
import { nodeFiles, nodeLocations } from '../infrastructure/nodeServices.js';
import { createDmsDesktop } from '../infrastructure/dmsDesktop.js';
import { runQuickshell } from '../infrastructure/quickshell.js';
import { createSystemFilterMatcher } from './mimeFilters.js';
import { ChooserApp } from './app.js';
import { createChooserController } from './chooserController.js';
type ChooserAnswer = { response: number; results: Record<string, unknown> };
import { normalizeRequest, matchesFilter, type ChooserMethod } from './chooserCore.js';

const requestFile = process.env.DANK_FILES_PORTAL_REQUEST ?? process.argv[2];
if (!requestFile) throw new Error('requisição do portal ausente');

const payload = JSON.parse(await readFile(requestFile, 'utf8')) as {
  method: ChooserMethod; appId: string; parentWindow: string; title: string;
  options: Record<string, unknown>; resultFile: string;
};
const request = normalizeRequest(payload.method, payload.appId, payload.parentWindow, payload.title, payload.options);
const manager = createFileManager(process.env.HOME || '/', {
  locale: i18n.locale, translate: t, files: withUndo(nodeFiles), locations: nodeLocations, // Same theme and icons as the normal window; no clipboard or URI-reveal integration.
  desktop: createDmsDesktop(process.env.HOME || '/'),
});
manager.setChooserMode(true);

let finished = false;
/** Exactly one terminal reply: the first result wins and later closes are no-ops. */
async function close(result: ChooserAnswer) {
  if (finished) return;
  finished = true;
  const target = `${payload.resultFile}.tmp`;
  try {
    await writeFile(target, JSON.stringify(result), { mode: 0o600 });
    await rename(target, payload.resultFile);
  } catch (error) {
    console.error('[portal] falha ao gravar o resultado:', error);
  }
}
const accepts = createSystemFilterMatcher();
const chooser = createChooserController(request, {
  matchesFilter: accepts,
  folder: () => manager.path(),
  selection: () => manager.selectedEntries().map(entry => entry.path),
  select: (path: string) => { manager.selectPath(path, 'replace'); },
  exists: path => { try { return { exists: true, directory: statSync(path).isDirectory() }; } catch { return { exists: false, directory: false }; } },
  close: result => { void close(result); },
});

manager.setEntryFilter(entry => entry.directory || !chooser.activeFilter() || accepts(entry.name, chooser.activeFilter()!));
const runtime = runQuickshell(manager, ChooserApp({ manager, chooser }), {
  onCommand: command => {
    // Chooser windows never launch applications or run file commands: confirming is explicit.
    if (command.action === 'open' || command.action === 'openColumn') {
      const target = typeof command.value === 'string' ? command.value : '';
      // A folder only navigates; a file (or the current folder) is what confirms.
      if (target && statSync(target).isDirectory()) void manager.navigate(target);
      else if (target) { chooser.pathChosen(target); chooser.accept(); }
      else chooser.accept();
      return true;
    }
    return !['uiEvent','uiMounted','uiResult','select','selectPath','selectAll','selectStep','navigate','column','back','forward','up','refresh','hidden','descending','sort','view'].includes(command.action);
  },
  onClosed: () => { void close({ response: 1, results: {} }); },
});
const stop = () => { void close({ response: 1, results: {} }); };
process.once('SIGTERM', stop); process.once('SIGINT', stop);
await manager.initialize(chooser.startPath);
try {
  await runtime.closed;
} finally {
  // A closed window is a cancellation; the backend answers 1 when nothing was written.
  await close({ response: 1, results: {} });
  manager.dispose();
}
