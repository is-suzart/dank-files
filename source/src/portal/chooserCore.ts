/** Pure logic of the FileChooser portal backend: option decoding, validation and results. */
import { basename, dirname, join } from 'node:path';

export const RESPONSE_SUCCESS = 0;
export const RESPONSE_CANCELLED = 1;
export const RESPONSE_FAILED = 2;

export interface SerializedFilter { name: string; patterns: string[]; mimeTypes: string[]; }
export interface SerializedChoice { id: string; label: string; options: Array<{ value: string; label: string }>; current: string; }
export type ChooserMethod = 'OpenFile' | 'SaveFile' | 'SaveFiles';
export interface ChooserRequest {
  method: ChooserMethod;
  appId: string;
  parentWindow: string;
  title: string;
  mode: 'file' | 'directory';
  multiple: boolean;
  acceptLabel?: string;
  modal: boolean;
  filters: SerializedFilter[];
  currentFilter?: SerializedFilter;
  choices: SerializedChoice[];
  currentFolder?: string;
  currentFile?: string;
  suggestedName?: string;
  filenames: string[];
  /** SaveFile only: the user explicitly confirmed replacing an existing file. */
  overwrite: boolean;
}

/** The portal sends paths as NUL-terminated byte arrays; anything else is rejected. */
export function decodeByteArray(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Uint8Array) return trimNul(Buffer.from(value).toString('utf8'));
  if (!Array.isArray(value)) throw new TypeError('byte array esperado');
  if (!value.every(item => Number.isInteger(item) && item >= 0 && item <= 255)) throw new TypeError('byte array inválido');
  return trimNul(Buffer.from(value as number[]).toString('utf8'));
}
function trimNul(value: string) { const end = value.indexOf('\0'); return end < 0 ? value : value.slice(0, end); }

const MAX_BYTES = 4096;
function text(value: unknown, max = MAX_BYTES): string {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string' || value.length > max || value.includes('\0')) throw new TypeError('texto inválido');
  return value;
}
function bool(value: unknown) { return value === true; }

/** Rejects paths that escape the local filesystem: only absolute, NUL-free paths are usable. */
function localPath(value: unknown): string | undefined {
  const raw = text(value);
  if (!raw) return undefined;
  if (raw.startsWith('file://')) throw new TypeError('use um caminho local, não uma URI');
  if (!raw.startsWith('/')) throw new TypeError('apenas caminhos absolutos são suportados');
  return raw;
}

/** `a(sa(us))`: each rule is (kind, value) with kind 0 = glob and kind 1 = MIME type. */
function filter(raw: unknown): SerializedFilter {
  if (!Array.isArray(raw) || raw.length !== 2) throw new TypeError('filtro inválido');
  const [name, rules] = raw as [unknown, unknown];
  if (!Array.isArray(rules) || !rules.length || rules.length > 256) throw new TypeError('filtro inválido');
  const patterns: string[] = [], mimeTypes: string[] = [];
  for (const rule of rules) {
    if (!Array.isArray(rule) || rule.length !== 2) throw new TypeError('regra de filtro inválida');
    const [kind, value] = rule as [unknown, unknown];
    const raw = text(value, 512);
    if (kind === 0) {
      if (!raw || raw.includes('/')) throw new TypeError('padrão de filtro inválido');
      patterns.push(raw);
    } else if (kind === 1) {
      if (!/^[a-z0-9][a-z0-9!#$&^_.+-]*\/[a-z0-9*][a-z0-9!#$&^_.+*-]*$/i.test(raw)) throw new TypeError('tipo MIME inválido');
      mimeTypes.push(raw.toLowerCase());
    } else throw new TypeError('tipo de filtro desconhecido');
  }
  return { name: text(name, 512), patterns, mimeTypes };
}

function filters(raw: unknown): SerializedFilter[] {
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw) || raw.length > 64) throw new TypeError('lista de filtros inválida');
  return raw.map(filter);
}

function choice(raw: unknown): SerializedChoice {
  if (!Array.isArray(raw) || raw.length < 2 || raw.length > 4) throw new TypeError('escolha inválida');
  const [id, label, options, current] = raw as [unknown, unknown, unknown, unknown];
  if (!Array.isArray(options) || options.length > 64) throw new TypeError('escolha inválida');
  const entries = options.map(entry => {
    if (!Array.isArray(entry) || entry.length !== 2) throw new TypeError('opção de escolha inválida');
    const [value, optionLabel] = entry as [unknown, unknown];
    return { value: text(value, 512), label: text(optionLabel, 512) };
  });
  return { id: text(id, 512), label: text(label, 512), options: entries, current: text(current, 512) };
}

function choices(raw: unknown): SerializedChoice[] {
  if (raw === undefined || raw === null) return [];
  if (!Array.isArray(raw) || raw.length > 16) throw new TypeError('lista de escolhas inválida');
  return raw.map(choice);
}

/** Decodes a portal `options` vardict. Throws for malformed input so the caller answers with a D-Bus error. */
export function normalizeRequest(method: ChooserMethod, appId: string, parentWindow: string, title: string, options: unknown): ChooserRequest {
  if (method !== 'OpenFile' && method !== 'SaveFile' && method !== 'SaveFiles') throw new TypeError('método desconhecido');
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('opções inválidas');
  const raw = options as Record<string, unknown>;
  const available = filters(raw['filters']);
  const request: ChooserRequest = {
    method, appId: text(appId, 255), parentWindow: text(parentWindow, 4096), title: text(title, 512),
    mode: bool(raw['directory']) ? 'directory' : 'file', multiple: bool(raw['multiple']),
    modal: raw['modal'] === undefined ? true : bool(raw['modal']),
    filters: available,
    currentFilter: raw['current_filter'] === undefined || raw['current_filter'] === null ? undefined : filter(raw['current_filter']),
    choices: choices(raw['choices']),
    currentFolder: decodeByteArray(raw['current_folder']),
    currentFile: method === 'SaveFile' ? decodeByteArray(raw['current_file']) : undefined,
    suggestedName: method === 'SaveFile' ? (raw['current_name'] === undefined || raw['current_name'] === null ? undefined : text(raw['current_name'], 255)) : undefined,
    filenames: [],
    overwrite: false,
  };
  if (method === 'SaveFiles') {
    const names = raw['files'];
    if (!Array.isArray(names) || !names.length || names.length > 4096) throw new TypeError('files inválido');
    request.filenames = names.map(item => { const name = decodeByteArray(item); if (!name || !isPlainName(name)) throw new TypeError('nome de arquivo inválido'); return name; });
    if (available.length) throw new TypeError('SaveFiles não aceita filtros');
  } else {
    request.multiple = method === 'OpenFile' ? request.multiple : false;
    if (request.suggestedName && !isPlainName(request.suggestedName)) throw new TypeError('nome de arquivo inválido');
  }
  if (request.currentFolder) request.currentFolder = localPath(request.currentFolder);
  if (request.currentFile) request.currentFile = localPath(request.currentFile);
  return request;
}

/** Portal file names are appended to a folder: separators and dot names are refused. */
export function isPlainName(name: string) {
  return !!name && name !== '.' && name !== '..' && !name.includes('/') && !name.includes('\0') && name.length <= 255;
}

/** Extension to MIME map for the MIME-only rules the portal sends. */
const MIME_TYPES: Record<string, string[]> = {
  png: ['image/png'], jpg: ['image/jpeg'], jpeg: ['image/jpeg'], gif: ['image/gif'], webp: ['image/webp'],
  bmp: ['image/bmp'], tif: ['image/tiff'], tiff: ['image/tiff'], svg: ['image/svg+xml'], ico: ['image/vnd.microsoft.icon'],
  pdf: ['application/pdf'], txt: ['text/plain'], md: ['text/markdown'], log: ['text/plain'],
  zip: ['application/zip'], gz: ['application/gzip'], tar: ['application/x-tar'], bz2: ['application/x-bzip2'],
  '7z': ['application/x-7z-compressed'], xz: ['application/x-xz'],
  mp3: ['audio/mpeg'], wav: ['audio/x-wav'], ogg: ['audio/ogg'], flac: ['audio/flac'], m4a: ['audio/mp4'],
  mp4: ['video/mp4'], mkv: ['video/x-matroska'], webm: ['video/webm'], mov: ['video/quicktime'], avi: ['video/x-msvideo'],
  odt: ['application/vnd.oasis.opendocument.text'], ods: ['application/vnd.oasis.opendocument.spreadsheet'],
  odp: ['application/vnd.oasis.opendocument.presentation'], docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  pptx: ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  json: ['application/json'], xml: ['application/xml'], html: ['text/html'], css: ['text/css'], csv: ['text/csv'],
  sh: ['application/x-shellscript'], py: ['text/x-python'],
};

export function extensionOf(name: string) {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

export function matchesMimeTypes(name: string, mimeTypes: string[]) {
  if (!mimeTypes.length) return true;
  return MIME_TYPES[extensionOf(name)]?.some(type => mimeTypes.some(rule => rule === type || rule === type.split('/')[0] + '/*')) ?? false;
}

/** A filter matches when any of its rules does: a glob rule and a MIME rule are alternatives. */
export function matchesFilter(name: string, target: SerializedFilter) {
  if (!target.patterns.length && !target.mimeTypes.length) return true;
  if (target.patterns.some(pattern => globMatches(name, pattern))) return true;
  return !!target.mimeTypes.length && matchesMimeTypes(name, target.mimeTypes);
}

export function globMatches(name: string, pattern: string) {
  const source = pattern;
  let escaped='';
  for(let i=0;i<source.length;i++) {
    const ch=source[i]!;
    if(ch==='*') escaped+='.*';
    else if(ch==='?') escaped+='.';
    else if(ch==='[') {
      const end=source.indexOf(']',i+1), value=end<0 ? '' : source.slice(i+1,end);
      if(value && /^[a-zA-Z0-9!^-]+$/.test(value)) {escaped+='['+value.replace(/^!/, '^')+']';i=end;}
      else escaped+='\\[';
    } else escaped+=ch.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp(`^${escaped}$`, 'i').test(name);
}

export function matchesAnyFilter(name: string, available: SerializedFilter[]) {
  return !available.length || available.some(target => matchesFilter(name, target));
}

/** Picks `name (2).txt` style alternatives so SaveFiles never overwrites silently. */
export function uniquePath(folder: string, name: string, taken: (path: string) => boolean) {
  if (!taken(join(folder, name))) return name;
  const extension = name.includes('.') && !name.startsWith('.') ? name.slice(name.lastIndexOf('.')) : '';
  const stem = extension ? name.slice(0, -extension.length) : name;
  for (let counter = 2; counter < 10_000; counter++) {
    const candidate = `${stem} (${counter})${extension}`;
    if (!taken(join(folder, candidate))) return candidate;
  }
  throw new Error('não foi possível gerar um nome único');
}

export type SelectionOutcome =
  | { response: number; error?: string; paths?: string[] };

/** Validates what the chooser window selected before it reaches the portal caller. */
export function validateSelection(
  request: ChooserRequest,
  selection: { paths: string[]; folder?: string; overwrite?: boolean },
  exists: (path: string) => { exists: boolean; directory: boolean },
  accepts = matchesFilter,
): SelectionOutcome {
  // SaveFiles confirms a folder, so it has no selected paths to check.
  if (request.method === 'SaveFiles') {
    const folder = selection.folder ? localPath(selection.folder) : undefined;
    if (!folder || !exists(folder).directory) return { response: RESPONSE_FAILED, error: 'pasta de destino inválida' };
    const taken = new Set<string>();
    const paths = [];
    for (const name of request.filenames) {
      const unique = uniquePath(folder, name, candidate => taken.has(candidate) || exists(candidate).exists);
      taken.add(join(folder, unique));
      paths.push(join(folder, unique));
    }
    return { response: RESPONSE_SUCCESS, paths };
  }
  if (!selection.paths.length) return { response: RESPONSE_CANCELLED };
  if (request.method === 'SaveFile') {
    const path = selection.paths[0]!;
    if (!path.startsWith('/') || isPlainName(basename(path)) === false) return { response: RESPONSE_FAILED, error: 'destino inválido' };
    const parent = exists(dirname(path));
    if (!parent.directory) return { response: RESPONSE_FAILED, error: 'pasta de destino inexistente' };
    if (exists(path).directory) return { response: RESPONSE_FAILED, error: 'destino é uma pasta' };
    if (exists(path).exists && selection.overwrite !== true)
      return { response: RESPONSE_FAILED, error: 'OVERWRITE_CONFIRMATION_REQUIRED' };
    return { response: RESPONSE_SUCCESS, paths: [path] };
  }
  const paths = selection.paths;
  if (!request.multiple && paths.length !== 1) return { response: RESPONSE_FAILED, error: 'seleção inválida' };
  for (const path of paths) {
    if (!path.startsWith('/') || path.includes('\0') || (path !== '/' && path.endsWith('/'))) return { response: RESPONSE_FAILED, error: 'seleção inválida' };
    const info = exists(path);
    if (!info.exists) return { response: RESPONSE_FAILED, error: 'arquivo inexistente' };
    if (request.mode === 'directory' && !info.directory) return { response: RESPONSE_FAILED, error: 'seleção inválida' };
    if (request.mode === 'file' && info.directory) return { response: RESPONSE_FAILED, error: 'seleção inválida' };
    if (request.mode !== 'directory' && request.filters.length > 0 && !request.filters.some(filter=>accepts(basename(path),filter))) return { response: RESPONSE_FAILED, error: 'seleção inválida' };
  }
  return { response: RESPONSE_SUCCESS, paths };
}

export interface ChooserResults {
  uris: string[];
  choices: Array<[string, string]>;
  current_filter?: SerializedFilter;
  writable?: boolean;
}

export function toFileUri(path: string) {
  return `file://${path.split('/').map((part, index) => index === 0 ? part : encodeURIComponent(part)).join('/')}`;
}

/** Results vardict exactly as the portal documents it. */
export function buildResults(request: ChooserRequest, selection: { paths: string[]; choices?: Record<string, string>; filter?: SerializedFilter; writable?: boolean }): ChooserResults {
  const results: ChooserResults = {
    uris: selection.paths.map(toFileUri),
    choices: request.choices.map(item => {
      const value = selection.choices?.[item.id];
      const known = item.options.length ? item.options.some(option => option.value === value) : value === 'true' || value === 'false';
      return [item.id, known ? value! : item.current] as [string, string];
    }),
  };
  if (request.method !== 'SaveFiles' && (request.filters.length || selection.filter)) {
    const selected = selection.filter ?? request.currentFilter;
    if (selected) results.current_filter = selected;
  }
  if (request.method === 'OpenFile' && selection.writable) results.writable = true;
  return results;
}
