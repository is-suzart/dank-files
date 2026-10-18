import { mkdtemp, mkdir, writeFile, readFile, stat, rm } from 'node:fs/promises';
import { spawn, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const exec=promisify(execFile),delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const root=await mkdtemp('/tmp/nandomo-drag-smoke-');let child;
try {
  await mkdir(join(root,'Target'));await writeFile(join(root,'source.txt'),'native drag');
  child=spawn(process.execPath,[fileURLToPath(new URL('./run.mjs',import.meta.url))],{env:{...process.env,NANDOMO_FM_START_PATH:root,NANDOMO_FM_CONFIG_DIR:join(root,'config')},stdio:'ignore'});
  await delay(2000);
  async function drag(move){
    await exec('xdotool',['keydown',move?'Shift':'ctrl']);
    await exec('xdotool',['mousemove','525','125','mousedown','1']);await delay(200);
    await exec('xdotool',['mousemove','550','150']);await delay(300);
    await exec('xdotool',['mousemove','330','125']);await delay(300);
    await exec('xdotool',['mouseup','1']);await exec('xdotool',['keyup',move?'Shift':'ctrl']);
    await delay(700);
  }
  await drag(false);
  assert.equal(await readFile(join(root,'Target/source.txt'),'utf8'),'native drag');
  assert.equal(await readFile(join(root,'source.txt'),'utf8'),'native drag');
  await rm(join(root,'Target/source.txt'));await drag(true);
  assert.equal(await readFile(join(root,'Target/source.txt'),'utf8'),'native drag');
  await assert.rejects(stat(join(root,'source.txt')),{code:'ENOENT'});
  console.log('FM_DRAG_SMOKE_PASS');
}finally{
  if(child && child.exitCode === null){const closed=new Promise(resolve=>child.once('exit',resolve));child.kill('SIGTERM');await closed;}
  await rm(root,{recursive:true,force:true});
}
