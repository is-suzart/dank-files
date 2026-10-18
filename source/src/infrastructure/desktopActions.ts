import { discoverIconCatalog } from './iconCatalog.js';
import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { join, basename } from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { normalizePreferences } from '../domain/preferences.js';
import { normalizeFolderAppearance } from '../domain/folderAppearance.js';
import type { FolderAppearances } from '../domain/folderAppearance.js';
import { virtualLocations } from './virtualLocations.js';
const exec=promisify(execFile);
export function desktopActions(home:string) {
  const config=process.env.NANDOMO_FM_CONFIG_DIR || join(process.env.XDG_CONFIG_HOME || join(home,'.config'),'nandomo-file-manager');
  let pending=Promise.resolve();
  return {
    iconCatalog:()=>discoverIconCatalog(home),
    virtualEntries:virtualLocations(home),
    async readFolderAppearances():Promise<FolderAppearances>{
      try{const data=JSON.parse(await readFile(join(config,'folders.json'),'utf8'));return Object.fromEntries(Object.entries(data).filter(([path])=>path.startsWith('/')).map(([path,value])=>[path,normalizeFolderAppearance((value || {}) as never)]));}catch{return {};}
    },
    writeFolderAppearances(value:FolderAppearances){pending=pending.catch(()=>{}).then(async()=>{await mkdir(config,{recursive:true});const temp=join(config,`folders.json.${process.pid}.tmp`);await writeFile(temp,JSON.stringify(value,null,2)+'\n');await rename(temp,join(config,'folders.json'));});return pending;},
    async readPreferences(){try{return normalizePreferences(JSON.parse(await readFile(join(config,'preferences.json'),'utf8')));}catch{return normalizePreferences(null);}},
    writePreferences(value:unknown){pending=pending.catch(()=>{}).then(async()=>{await mkdir(config,{recursive:true});const temp=join(config,`preferences.json.${process.pid}.tmp`);await writeFile(temp,JSON.stringify(normalizePreferences(value),null,2)+'\n');await rename(temp,join(config,'preferences.json'));});return pending;},
    async applications(target?:string){
      let hidden:string[]=[];try{hidden=JSON.parse(await readFile(join(config,'hidden-apps.json'),'utf8'));}catch{}
      const apps:Array<{id:string;name:string;icon?:string}>=[];const seen=new Set<string>();
      const lang=process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || '';
      const nameLocales=/^(C|POSIX)(\.|$)/i.test(lang)?[]:(process.env.LANGUAGE || lang).split(':').flatMap(value=>{
        const locale=value.split('.')[0]!.replaceAll('-','_');
        return [locale,locale.split('@')[0]!,locale.split('_')[0]!.split('@')[0]!];
      });
      for(const root of [join(process.env.XDG_DATA_HOME || join(home,'.local/share'),'applications'),...(process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share').split(':').map(path=>join(path,'applications'))]) {
        let names:string[]=[];try{names=await readdir(root);}catch{}
        for(const name of names.filter(name=>name.endsWith('.desktop'))) {
          if(hidden.includes(name))continue;
          if(seen.has(name))continue;seen.add(name);
          try{const text=await readFile(join(root,name),'utf8');const section=text.split('[Desktop Entry]')[1]?.split(/\n\[/)[0] ?? '';
            if(/^Hidden=true/m.test(section)||(!target && /^NoDisplay=true/m.test(section))||!/^Type=Application$/m.test(section))continue;
            const values=Object.fromEntries(section.split('\n').filter(line=>line.includes('=')).map(line=>{const i=line.indexOf('=');return [line.slice(0,i),line.slice(i+1)];}));
            apps.push({id:join(root,name),icon:values.Icon?.startsWith('/') ? pathToFileURL(values.Icon).href : values.Icon,name:nameLocales.map(locale=>values[`Name[${locale}]`]).find(Boolean) || values.Name || basename(name,'.desktop')});
          }catch{}
        }
      }
      const associated=new Set<string>();
      if(target){try{
        const {stdout:type}=await exec('xdg-mime',['query','filetype',target],{timeout:5000});
        if(type.trim()){
          const {stdout}=await exec('gio',['mime',type.trim()],{timeout:5000,env:{...process.env,LC_ALL:'C'}});
          const defaultApp=/Default application[^\n]*: (.+)/.exec(stdout)?.[1]?.trim();if(defaultApp)associated.add(defaultApp);
          const recommended=stdout.split('Recommended applications:')[1] || '';
          for(const line of recommended.split('\n'))if(/^\s+\S/.test(line))associated.add(line.trim());
        }
      }catch{}}
      return apps.map(app=>({...app,associated:associated.has(basename(app.id))})).sort((a,b)=>Number(b.associated)-Number(a.associated)||a.name.localeCompare(b.name));
    },
    async openDesktopFile(id:string){
      const {stdout}=await exec('xdg-mime',['query','default','text/plain'],{timeout:5000});const editor=stdout.trim();
      if(!editor || basename(editor)!==editor)throw new Error('Configure um editor padrão para arquivos de texto.');
      const roots=[process.env.XDG_DATA_HOME || join(home,'.local/share'),...(process.env.XDG_DATA_DIRS || '/usr/local/share:/usr/share').split(':')];
      for(const root of roots){const path=join(root,'applications',editor);try{await readFile(path);}catch{continue;}await exec('gio',['launch',path,id],{timeout:15000});return;}
      throw new Error('Editor padrão não encontrado.');
    },
    hideApplication(id:string){pending=pending.catch(()=>{}).then(async()=>{
      let hidden:string[]=[];try{hidden=JSON.parse(await readFile(join(config,'hidden-apps.json'),'utf8'));}catch{}
      await mkdir(config,{recursive:true});const temp=join(config,`hidden-apps.${process.pid}.tmp`);
      await writeFile(temp,JSON.stringify([...new Set([...hidden,basename(id)])]));await rename(temp,join(config,'hidden-apps.json'));
    });return pending;},
    async manageApplication(id:string){
      const text=await readFile(id,'utf8');const flatpak=/^X-Flatpak=(.+)$/m.exec(text)?.[1]?.trim();
      const appId=flatpak || basename(id,'.desktop');
      await exec('gio',['open','appstream://'+encodeURIComponent(appId)],{timeout:15000});
    },
    async launch(id:string,target?:string){await exec('gio',['launch',id,...(target?[target]:[])],{timeout:15000});},
    async special(uri:string){await exec('gio',['open',uri],{timeout:15000});},
    async terminal(path:string){
      for(const [binary,args] of [['xdg-terminal-exec',['--dir',path]],['kgx',['--working-directory',path]],['gnome-terminal',['--working-directory',path]],['konsole',['--workdir',path]],['xfce4-terminal',['--working-directory',path]],['alacritty',['--working-directory',path]],['kitty',['--directory',path]]] as Array<[string,string[]]>) {
        try {
          await exec('which',[binary]);
          await new Promise<void>((resolve,reject)=>{const child=spawn(binary,args,{cwd:path,stdio:'ignore',detached:true});child.once('error',reject);child.once('spawn',()=>{child.unref();resolve();});});
          return;
        }catch(error){if((error as NodeJS.ErrnoException).code !== 'ENOENT' && (error as {code?:unknown}).code !== 1)throw error;}
      }
      throw new Error('Nenhum terminal compatível encontrado.');
    },
  };
}
