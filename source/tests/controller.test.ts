import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
interface State {path:string;busy:boolean;error:string;hidden:boolean;view:string;entries:Array<{name:string}>;columns:Array<{path:string}>;back:boolean;forward:boolean;}
test('backend IPC navigates, keeps errors recoverable, and opens Finder-like columns', async () => {
  const root = await mkdtemp(join(tmpdir(),'nandomo-fm-controller-'));
  await mkdir(join(root,'child/nested'),{recursive:true}); await writeFile(join(root,'.secret'),'fixture');
  const child = spawn(process.execPath,[fileURLToPath(new URL('../scripts/backend.mjs',import.meta.url))],{env:{...process.env,NANDOMO_FM_START_PATH:root},stdio:['pipe','pipe','pipe']});
  let state:State|undefined;
  const input = createInterface({input:child.stdout}); input.on('line',line=>{const message=JSON.parse(line); if(message.uiPatch) child.stdin.write(JSON.stringify({action:'uiResult',value:{request:message.uiPatch.request}})+'\n'); else state=message as State;});
  let stderr=''; child.stderr.on('data',data=>{stderr+=String(data);});
  const closed = new Promise<void>(resolve=>child.once('exit',()=>resolve()));
  async function until(check:(value:State)=>boolean) {
    const deadline=Date.now()+8000;
    while(Date.now()<deadline) { if(state && check(state)) return state; if(child.exitCode !== null) assert.fail(stderr); await new Promise(resolve=>setTimeout(resolve,15)); }
    assert.fail('State timeout: '+stderr);
  }
  const send=(action:string,value?:string,index?:number)=>child.stdin.write(JSON.stringify({action,value,index})+'\n');
  try {
    await until(s=>s.path===root&&!s.busy); assert.equal(state?.entries.length,1);
    send('hidden'); await until(s=>s.hidden); assert.equal(state?.entries.length,2);
    send('navigate',join(root,'child')); await until(s=>s.path.endsWith('/child')&&!s.busy);
    send('back'); await until(s=>s.path===root&&!s.busy); assert.equal(state?.forward,true);
    send('forward'); await until(s=>s.path.endsWith('/child')&&!s.busy);
    send('up'); await until(s=>s.path===root&&!s.busy);
    send('navigate',join(root,'missing')); await until(s=>!!s.error&&!s.busy); assert.equal(state?.path,root);
    send('column',join(root,'child'),0); await until(s=>s.columns.length===2&&!s.busy); assert.equal(state?.error,'');
    send('column',join(root,'child/nested'),1); await until(s=>s.columns.length===3&&!s.busy);
    send('column',join(root,'child'),0); await until(s=>s.columns.length===2&&!s.busy);
    send('view','columns'); await until(s=>s.view==='columns');
    child.stdin.end(); await closed;
    assert.equal(child.exitCode,0);
  } finally { if(child.exitCode===null)child.kill('SIGTERM'); await closed;input.close();await rm(root,{recursive:true,force:true}); }
});
