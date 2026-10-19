import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

for (const mode of ['dms', 'fallback', 'failure', 'missing'] as const) test(`default-app launcher: ${mode}`, async()=>{
  const root=await mkdtemp('/tmp/nandomo-open-test-');
  try {
    if(mode!=='missing')await writeFile(join(root,'xdg-open'),'#!/bin/sh\nprintf "%s\\n" "$@" > "$FM_OPEN_LOG"\n',{mode:0o700});
    if(mode==='dms' || mode==='failure')await writeFile(join(root,'dms'),mode==='failure'?'#!/bin/sh\nexit 23\n':'#!/bin/sh\nprintf "%s\\n" "$@" > "$FM_DMS_LOG"\n',{mode:0o700});
    const target=join(root,'spaces # $(touch unexpected).png');
    const source=new URL('../src/infrastructure/nodeServices.ts',import.meta.url).href;
    const opening=promisify(execFile)(process.execPath,['--import','tsx','--input-type=module','-e',`import {nodeFiles} from ${JSON.stringify(source)};await nodeFiles.open(process.env.FM_OPEN_PATH);`],{
      env:{...process.env,PATH:root,FM_OPEN_LOG:join(root,'opened'),FM_DMS_LOG:join(root,'dms-opened'),FM_OPEN_PATH:target},
    });
    if(mode==='failure' || mode==='missing')await assert.rejects(opening);
    else await opening;
    if(mode==='dms')assert.equal(await readFile(join(root,'dms-opened'),'utf8'),'open\n'+target+'\n');
    if(mode==='fallback')assert.equal(await readFile(join(root,'opened'),'utf8'),target+'\n');
    else await assert.rejects(readFile(join(root,'opened')), {code:'ENOENT'});
  } finally {await rm(root,{recursive:true,force:true});}
});
