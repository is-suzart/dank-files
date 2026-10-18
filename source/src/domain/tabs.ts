import type { DirectoryColumn, Entry, ViewMode } from './files.js';

/**
 * Everything a tab owns. The directory, its history and the current view are
 * per tab; the clipboard, the theme and the preferences stay with the window.
 */
export interface TabState {
  path: string;
  entries: Entry[];
  columns: DirectoryColumn[];
  history: string[];
  historyIndex: number;
  selection: string[];
  selected: string | null;
  anchor: string | null;
  remote: boolean;
  view: ViewMode;
  navigation: { back: boolean; forward: boolean };
}

export interface TabSummary { id: string; title: string; path: string; active: boolean; }

const virtualTitles: Record<string, string> = {
  'trash:///': 'Lixeira',
  'recent:///': 'Recentes',
  'applications:///': 'Aplicativos',
};

/** Label of a tab: virtual locations keep their name, folders keep the base name. */
export function tabTitle(path: string): string {
  const known = virtualTitles[path];
  if (known) return known;
  const parts = path.split('/').filter(part => part.length);
  return parts[parts.length - 1] ?? '/';
}

export function emptyTabState(path: string, view: ViewMode): TabState {
  return {
    path,
    entries: [],
    columns: [],
    history: [path],
    historyIndex: 0,
    selection: [],
    selected: null,
    anchor: null,
    remote: false,
    view,
    navigation: { back: false, forward: false },
  };
}

/** Ctrl+Tab wraps around, exactly like the shortcuts of a browser. */
export function cycleTabIndex(order: readonly string[], active: string, delta: number): string | null {
  if (!order.length || !Number.isInteger(delta)) return null;
  const at = order.indexOf(active);
  if (at < 0) return null;
  return order[((at + delta) % order.length + order.length) % order.length] ?? null;
}
