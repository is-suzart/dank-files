import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const root = await mkdtemp('/tmp/nandomo-selection-smoke-');
try {
  await Promise.all(['a.txt','b.txt','c.txt'].map(name=>writeFile(join(root,name),name)));
  const child=spawn(process.execPath,[fileURLToPath(new URL('./run.mjs',import.meta.url))],{
    env:{...process.env,NANDOMO_FM_SELECTION_SMOKE:'1',NANDOMO_FM_START_PATH:root,NANDOMO_FM_CONFIG_DIR:join(root,'config')},
    stdio:['ignore','pipe','pipe'],
  });
  let output='';
  for(const stream of [child.stdout,child.stderr])stream.on('data',data=>{output+=data;process.stdout.write(data);});
  const timer=setTimeout(()=>child.kill('SIGTERM'),25000);
  let code;
  try {code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});}
  finally{clearTimeout(timer);}
  assert.equal(code,0,'Native selection failed');
  assert.match(output,/FM_SELECTION_SMOKE_PASS/);
}finally{await rm(root,{recursive:true,force:true});}
