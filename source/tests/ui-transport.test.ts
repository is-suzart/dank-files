import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createUiTransport } from '../src/infrastructure/ui-transport.js';

test('native patches stay ordered until acknowledged, including after a failed patch',async()=>{
  const sent:Array<{uiPatch:{request:number;command:object}}>=[];
  const transport=createUiTransport(message=>sent.push(message as typeof sent[number]));
  const first=transport.patch({cmd:'create'}), second=transport.patch({cmd:'order'});
  const rejected=assert.rejects(first,/native failure/);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(sent.length,1);
  transport.acknowledge({request:sent[0]!.uiPatch.request,error:'native failure'});
  await rejected; await new Promise(resolve=>setImmediate(resolve));
  assert.equal(sent.length,2);
  transport.acknowledge({request:sent[1]!.uiPatch.request}); await second;
  transport.close();
});
test('closing rejects in-flight and queued patches without sending further commands',async()=>{
  let sends=0;const transport=createUiTransport(()=>{sends++;});
  const first=transport.patch({cmd:'create'}), second=transport.patch({cmd:'order'});
  const firstFailure=assert.rejects(first,/closed/), secondFailure=assert.rejects(second,/closed/);
  await new Promise(resolve=>setImmediate(resolve));transport.close();
  await Promise.all([firstFailure,secondFailure]);assert.equal(sends,1);
});
test('a missing native acknowledgement rejects with a bounded timeout',async()=>{
  const transport=createUiTransport(()=>{},15);
  await assert.rejects(transport.patch({cmd:'create'}),/timed out/);transport.close();
});
test('native references return inspection results and detached patch functions remain usable',async()=>{
  const sent:Array<{uiPatch:{request:number}}>=[];
  const transport=createUiTransport(message=>sent.push(message as typeof sent[number]));
  const operation=transport.request({cmd:'native_object',operation:'inspect'});
  await new Promise(resolve=>setImmediate(resolve));
  transport.acknowledge({request:sent[0]!.uiPatch.request,value:{selectedFile:'file:///tmp/image.png'}});
  assert.deepEqual(await operation,{selectedFile:'file:///tmp/image.png'});
  const patch=transport.patch;
  const done=patch({cmd:'order'});
  await new Promise(resolve=>setImmediate(resolve));
  transport.acknowledge({request:sent[1]!.uiPatch.request});
  await done;transport.close();
});
