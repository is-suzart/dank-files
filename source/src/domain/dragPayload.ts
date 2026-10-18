/**
 * The `text/uri-list` payload of a drag. Paths are converted with the
 * filesystem adapter and de-duplicated, so a selection never drags the same
 * item twice and no transfer runs twice for it.
 */
export function uriList(paths: readonly string[], toUrl: (path: string) => string): string[] {
  const urls = new Set<string>();
  for (const path of paths) {
    if (typeof path !== 'string' || !path) continue;
    try { urls.add(toUrl(path)); } catch { /* a path without a valid URL is skipped */ }
  }
  return [...urls];
}
