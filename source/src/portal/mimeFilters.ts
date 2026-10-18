/** Uses the OS shared-mime-info catalog instead of limiting chooser MIME filters to known extensions. */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { globMatches, matchesFilter, type SerializedFilter } from './chooserCore.js';

export function createSystemFilterMatcher() {
  const rules: Array<{mime:string;glob:string}> = [];
  const directories=[process.env.XDG_DATA_HOME || join(homedir(),'.local/share'),...(process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share').split(':')];
  for(const dir of directories) {
    try {
      for(const line of readFileSync(join(dir,'mime/globs2'),'utf8').split('\n')) {
        const [,mime,glob]=line.split(':');
        if(!line.startsWith('#') && mime && glob) rules.push({mime,glob});
      }
    } catch {} // Minimal systems can still use the built-in common-type fallback.
  }
  const cache=new Map<string,string[]>();
  return (name:string,filter:SerializedFilter):boolean => {
    if(matchesFilter(name,filter)) return true;
    const key=filter.mimeTypes.join('\n');
    let globs=cache.get(key);
    if(!globs) {
      globs=rules.filter(rule=>filter.mimeTypes.some(type=>type===rule.mime || (type.endsWith('/*') && rule.mime.startsWith(type.slice(0,-1))))).map(rule=>rule.glob);
      cache.set(key,globs);
    }
    return globs.some(glob=>globMatches(name,glob));
  };
}
