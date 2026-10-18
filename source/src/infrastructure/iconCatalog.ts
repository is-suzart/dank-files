import { readFile,readdir } from 'node:fs/promises';
import { join,basename } from 'node:path';
import { pathToFileURL } from 'node:url';
export async function discoverIconCatalog(home:string){
  let theme='Adwaita';try{const data=JSON.parse(await readFile(join(process.env.XDG_CONFIG_HOME || join(home,'.config'),'DankMaterialShell/settings.json'),'utf8'));theme=data.iconThemeDark || theme;}catch{}
  const roots=[join(home,'.icons'),join(process.env.XDG_DATA_HOME || join(home,'.local/share'),'icons'),...(process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share').split(':').map(root=>join(root,'icons'))];
  const emblems=new Map<string,{name:string;source:string}>(),logos=new Map<string,{name:string;source:string}>();
  for(const name of [...new Set([theme,'Adwaita','hicolor'])].filter(name=>/^[\w .-]+$/.test(name))){
    for(const root of roots){
      let ini='';try{ini=await readFile(join(root,name,'index.theme'),'utf8');}catch{continue;}
      const directories=[...ini.matchAll(/^(?:ScaledDirectories|Directories)=(.+)$/gm)].flatMap(match=>match[1]!.trim().split(',')).filter(dir=>!dir.startsWith('/')&&!dir.split('/').includes('..') && /(?:emblems|apps|places)/.test(dir));
      directories.sort((a,b)=>(b.includes('scalable')?1000:parseInt(b)||0)-(a.includes('scalable')?1000:parseInt(a)||0));
      for(const directory of directories){let files:string[]=[];try{files=await readdir(join(root,name,directory));}catch{}
        for(const file of files){if(!/\.(svg|png)$/i.test(file))continue;const id=basename(file).replace(/\.(svg|png)$/i,'');const map=id.startsWith('emblem-') ? emblems : logos;if(map.has(id)||map.size>=1500)continue;map.set(id,{name:id,source:pathToFileURL(join(root,name,directory,file)).href});}
      }
    }
  }
  return {emblems:[...emblems.values()].sort((a,b)=>a.name.localeCompare(b.name)),logos:[...logos.values()].sort((a,b)=>a.name.localeCompare(b.name))};
}
