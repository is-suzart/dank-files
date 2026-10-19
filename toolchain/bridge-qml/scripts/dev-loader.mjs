import { build } from 'esbuild';
import { watch } from 'node:fs';
import { access, mkdtemp, symlink, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

/** Bundle only application views; external packages retain their live runtime identity. */
export async function createViewLoader({entry, tsconfig}) {
  entry=resolve(entry);
  const directory=await mkdtemp(join(tmpdir(),'nandomo-views-'));
  let root=dirname(entry), version=0, closed=false;
  let inputs=new Set([entry]);
  try {
    while(true) {
      try {await access(join(root,'node_modules'));break;}
      catch {const parent=dirname(root);if(parent===root)throw new Error('View project node_modules not found');root=parent;}
    }
    await symlink(join(root,'node_modules'),join(directory,'node_modules'),'dir');
  }catch(error){await rm(directory,{recursive:true,force:true});throw error;}
  return {
    dependencies:()=>new Set(inputs),
    async load() {
      if(closed)throw new Error('View loader closed');
      const result=await build({entryPoints:[entry],absWorkingDir:root,bundle:true,packages:'external',
        platform:'node',format:'esm',write:false,metafile:true,sourcemap:'inline',absPaths:['code','log'],
        jsx:'automatic',jsxDev:true,tsconfig,logLevel:'silent'});
      if(closed)throw new Error('View loader closed');
      const file=join(directory,`views-${++version}.mjs`);
      try {
        await writeFile(file,result.outputFiles[0].contents);
        if(closed)throw new Error('View loader closed');
        const module=await import(pathToFileURL(file).href);
        inputs=new Set(Object.keys(result.metafile.inputs).map(file=>resolve(root,file)));
        return module;
      }catch(error){if(closed)throw new Error('View loader closed',{cause:error});throw error;}
      finally{await rm(file,{force:true});}
    },
    async dispose(){closed=true;await rm(directory,{recursive:true,force:true});},
  };
}

/** Debounced, serialized reloads. An edit during a build schedules another pass. */
export function watchViewSources(root, onChange, onError=console.error, delay=120) {
  root=resolve(root);
  const changed=new Set();
  let timer,closed=false,running=false;
  async function flush() {
    if(closed || running)return;
    running=true;
    const files=[...changed];changed.clear();
    try{await onChange(files);}catch(error){onError(error);}
    // A pending debounce timer must never survive: re-arming without clearing it
    // fires a second, empty reload for the same edit.
    finally{running=false;clearTimeout(timer);if(changed.size&&!closed)timer=setTimeout(flush,delay);}
  }
  const watcher=watch(root,{recursive:true},(_event,file)=>{
    if(closed || !file || !/\.(tsx?|mjs|json)$/.test(String(file)))return;
    const path=resolve(root,String(file));
    if(relative(root,path).startsWith('..'))return;
    changed.add(path);clearTimeout(timer);timer=setTimeout(flush,delay);
  });
  return ()=>{closed=true;clearTimeout(timer);watcher.close();};
}
