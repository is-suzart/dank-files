/** Per-request chooser state: filters, choices, the save name and the portal result. */
import { basename, dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { t } from '../infrastructure/i18n.js';
import { computed, signal, effect } from '@nandomo/core';
import {
  RESPONSE_CANCELLED, buildResults, matchesFilter, validateSelection, isPlainName,
  type ChooserRequest, type SerializedFilter,
} from './chooserCore.js';

export interface ChooserChoiceView {
  id: string; label: string; kind: 'checkbox' | 'combo';
  options: Array<{ value: string; label: string }>;
  optionLabels: string[];
}

/** Portal `a(ssa(ss)s)`: two options serialize a combo box, one option a checkbox. */
export function buildChoices(request: ChooserRequest) {
  return request.choices.map(item => ({
    id: item.id, label: item.label,
    kind: (item.options.length > 0 ? 'combo' : 'checkbox') as 'checkbox' | 'combo',
    options: item.options,
    optionLabels: item.options.length ? item.options.map(option => option.label) : [item.label, item.label],
    initial: item.current || item.options[0]?.value || '',
  }));
}

export interface ChooserHost {
  matchesFilter?(name:string,filter:SerializedFilter):boolean;
  folder(): string;
  selection(): string[];
  /** Replaces the browsing selection; the window is the only owner of the selection. */
  select(path: string): void;
  exists(path: string): { exists: boolean; directory: boolean };
  close(result: { response: number; results: Record<string, unknown> }): void;
}

export function createChooserController(request: ChooserRequest, host: ChooserHost) {
  const accepts = host.matchesFilter || matchesFilter;
  const name = signal(request.suggestedName ?? (request.currentFile ? basename(request.currentFile) : ''));
  const filterIndex = signal(Math.max(0, request.filters.findIndex(item => sameFilter(item, request.currentFilter))));
  const choiceValues = signal<Record<string, string>>(Object.fromEntries(buildChoices(request).map(item => [item.id, item.initial])));
  const overwritePrompt = signal(false);
  const done = signal(false);
  effect(() => { host.folder(); name(); overwritePrompt.set(false); });
  const start = request.currentFolder ?? (request.currentFile ? dirname(request.currentFile) : homedir());

  /** Only the active filter applies: an unsatisfiable selection must not look valid. */
  const activeFilter = computed<SerializedFilter | undefined>(() => request.filters[filterIndex()]);
  const selectedFiles = computed(() => host.selection().filter(path => !host.exists(path).directory));

  function candidates(): string[] {
    if (request.method === 'SaveFiles') return [];
    if (request.method === 'SaveFile') return name() && !name().includes('/') ? [join(host.folder(), name())] : [];
    const filter = activeFilter();
    if (request.mode === 'directory') return host.selection().length ? host.selection() : [host.folder()];
    const paths = selectedFiles().filter(path => !filter || accepts(basename(path), filter));
    return request.multiple ? paths : paths.slice(0,1);
  }

  function answer() {
    const choices = choiceValues();
    if (request.method === 'SaveFiles') {
      // SaveFiles confirms a folder; the names come from the request, not from the view.
      const outcome = validateSelection(request, { paths: [], folder: host.folder() }, host.exists, accepts);
      return outcome.paths
        ? { response: outcome.response, results: buildResults(request, { paths: outcome.paths, choices }) as unknown as Record<string, unknown> }
        : undefined;
    }
    const outcome = validateSelection(request, { paths: candidates(), overwrite: overwritePrompt() }, host.exists, accepts);
    if (outcome.response === 0 && outcome.paths)
      return { response: outcome.response, results: buildResults(request, { paths: outcome.paths, choices, filter: activeFilter() }) as unknown as Record<string, unknown> };
    if (outcome.error === 'OVERWRITE_CONFIRMATION_REQUIRED') { overwritePrompt.set(true); return undefined; }
    return undefined;
  }
  function sameFilter(a?: SerializedFilter, b?: SerializedFilter) {
    if (!a || !b) return a === b;
    return a.name === b.name && a.patterns.join(',') === b.patterns.join(',') && a.mimeTypes.join(',') === b.mimeTypes.join(',');
  }

  return {
    request, activeFilter,
    startPath: start,
    title: computed(() => request.title),
    name,
    needsName: computed(() => request.method === 'SaveFile'),
    acceptLabel: computed(() => request.acceptLabel
      || t(request.method === 'SaveFiles' ? 'Salvar' : request.mode === 'directory' ? 'Selecionar' : request.method === 'SaveFile' ? 'Salvar' : 'Abrir')),
    filterLabels: computed(() => request.filters.map((item, index) => item.name || item.patterns.join(', ') || (index === 0 ? 'Todos' : `Filtro ${index}`))),
    filterIndex,
    choices: computed(() => buildChoices(request)),
    /** Selected choice values, so a checkbox or combo can be read reactively. */
    choiceValues,
    selectedChoice: (id: string) => computed(() => choiceValues()[id] ?? ''),
    choiceIndex: (id: string) => computed(() => {
      const item = buildChoices(request).find(entry => entry.id === id);
      return Math.max(0, item?.options.findIndex(option => option.value === choiceValues()[id]) ?? 0);
    }),
    overwritePrompt,
    canAccept: computed(() => {
      if (done()) return false;
      if (request.method === 'SaveFiles') return host.exists(host.folder()).directory;
      if (request.method === 'SaveFile') return isPlainName(name());
      // Accepting the folder itself is valid even with an empty selection.
      if (request.mode === 'directory') return host.selection().length > 0 || host.exists(host.folder()).directory;
      const filter = activeFilter();
      return selectedFiles().some(path => !filter || accepts(basename(path), filter));
    }),
    setName(value: string) { name.set(value); overwritePrompt.set(false); },
    setFilterIndex(index: number) {
      if (!Number.isInteger(index) || index < 0 || index >= request.filters.length) return;
      filterIndex.set(index);
    },
    setChoice(id: string, value: string) {
      if (!buildChoices(request).some(item => item.id === id)) return;
      choiceValues.set({ ...choiceValues(), [id]: value });
    },
    /** Double click: a file confirms, a folder only navigates (the caller decides). */
    pathChosen(path: string): boolean {
      if (host.exists(path).directory) return false;
      if (request.mode === 'directory') return false;
      host.select(path);
      if(request.method === 'SaveFile') name.set(basename(path));
      return true;
    },
    selectPath(path: string) { host.select(path); },
    accept() {
      if (done()) return;
      const result = answer();
      if (!result) return;
      done.set(true);
      host.close(result);
    },
    cancel() {
      if (done()) return;
      done.set(true);
      host.close({ response: RESPONSE_CANCELLED, results: {} });
    },
  };
}
export type ChooserController = ReturnType<typeof createChooserController>;
