import { sourceLabel, type SourceOrigin } from '@nandomo/core';

/** Maps only the supplied generated document, never errors in external QML libraries. */
export function formatQmlDiagnostic(message: string, source: string, url = 'file:///nandomo.qml'): string {
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return message.replace(new RegExp(`${escaped}:(\\d+)(?::\\d+)?`, 'g'), (original, line: string) => {
    const number = Number(line);
    const lines = source.split('\n');
    if(number < 1 || number > lines.length) return original;
    for(let index = number - 1; index >= 0; index--) {
      const marker = lines[index]!.trim().match(/^\/\/ @nandomo-source (.+)$/);
      if(!marker) continue;
      try {
        const origin = JSON.parse(marker[1]!) as SourceOrigin & {property?:string};
        if(typeof origin.fileName !== 'string' || !Number.isInteger(origin.lineNumber)) return original;
        return `${sourceLabel(origin)}${origin.property ? ' [' + origin.property + ']' : ''} (QML ${original})`;
      } catch { return original; }
    }
    return original;
  });
}
