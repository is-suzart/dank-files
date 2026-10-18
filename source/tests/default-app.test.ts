import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

test('default-app adapter delegates the exact file path to xdg-open without shell evaluation', async()=>{
  const root=await mkdtemp('/tmp/nandomo-open-test-');
  try {
    await writeFile(join(root,'xdg-open'),'#!/bin/sh\nprintf "%s\\n" "$@" > "$FM_OPEN_LOG"\n',{mode:0o700});
    const target=join(root,'spaces # $(touch unexpected).png');
    const source=new URL('../src/infrastructure/nodeServices.ts',import.meta.url).href;
    await promisify(execFile)(process.execPath,['--import','tsx','--input-type=module','-e',`import {nodeFiles} from ${JSON.stringify(source)};await nodeFiles.open(process.env.FM_OPEN_PATH);`],{
      env:{...process.env,PATH:root,FM_OPEN_LOG:join(root,'opened'),FM_OPEN_PATH:target},
    });
    assert.equal(await readFile(join(root,'opened'),'utf8'),target+'\n');
  } finally {await rm(root,{recursive:true,force:true});}
});
