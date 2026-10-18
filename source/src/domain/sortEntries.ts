import type { Entry, Sort } from './files.js';
function extension(name:string) { const index=name.lastIndexOf('.'); return index>0 && name!=='..' ? name.slice(index) : ''; }
export function sortEntries(entries: readonly Entry[], order: Sort, descending: boolean, hidden: boolean, foldersFirst=true) {
  const compare = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  return entries.filter(entry => hidden || !entry.name.startsWith('.')).sort((a, b) => {
    if (foldersFirst && a.directory !== b.directory) return a.directory ? -1 : 1;
    const delta = order === 'size' ? a.size - b.size : order === 'modified' ? a.modified - b.modified : order === 'type' ? compare.compare(extension(a.name), extension(b.name)) : compare.compare(a.name, b.name);
    return (delta || compare.compare(a.name, b.name)) * (descending ? -1 : 1);
  });
}
