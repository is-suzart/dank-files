import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { pathToFileURL, fileURLToPath } from 'node:url';
import type { FileClipboard } from '../application/ports.js';

export function createLinuxDesktop(onEvent:(event:{event:string;available?:boolean;method?:string;urls?:string[]})=>void) {
  const child=spawn('python3',[process.env.NANDOMO_FM_LINUX_HELPER || fileURLToPath(new URL('../../scripts/linux-desktop.py',import.meta.url))],{stdio:['pipe','pipe','pipe']});
  let sequence=0, closed=false;
  const pending=new Map<number,{resolve(value:any):void;reject(error:Error):void;timer:ReturnType<typeof setTimeout>}>();
  function fail(error:Error){closed=true;for(const operation of pending.values()){clearTimeout(operation.timer);operation.reject(error);}pending.clear();}
  const input=createInterface({input:child.stdout});
  input.on('line',line=>{try{
    const message=JSON.parse(line);
    if(typeof message.id==='number') {
      const operation=pending.get(message.id);if(!operation)return;
      pending.delete(message.id);clearTimeout(operation.timer);
      if(message.error)operation.reject(new Error(String(message.error)));else operation.resolve(message.value);
    }else if(typeof message.event==='string')onEvent(message);
  }catch(error){console.error('Desktop response:',error);}});
  child.once('error',fail);child.stdin.on('error',fail);child.once('exit',()=>fail(new Error('Desktop integration closed')));
  child.stderr.on('data',data=>console.error(String(data).trim()));
  function request<T>(action:string, data:object={}, timeout=10000):Promise<T>{
    if(closed)return Promise.reject(new Error('Desktop integration unavailable'));
    const id=sequence++;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{pending.delete(id);reject(new Error('Desktop request timed out'));},timeout);
      pending.set(id,{resolve,reject,timer});
      child.stdin.write(JSON.stringify({id,action,...data})+'\n',error=>{if(error){pending.delete(id);clearTimeout(timer);reject(error);}});
    });
  }
  return {
    readFileClipboard:()=>request<FileClipboard|null>('clipboard-read'),
    writeFileClipboard:(value:FileClipboard)=>request<void>('clipboard-write',value),
    resolveLocation:(uri:string)=>request<string>('resolve',{uri},120000),
    close(){if(closed)return;fail(new Error('Desktop integration closed'));input.close();child.stdin.end();child.kill('SIGTERM');},
  };
}
