import assert from 'node:assert/strict';
import { withSourceOrigin } from '@nandomo/core';
import { importQml, renderNative } from '@nandomo/bridge-qml';

/** Deliberately bypass metadata types to exercise a genuine Qt compiler failure. */
export async function verifyDiagnostics() {
  const qml=importQml<Record<string,Record<string,unknown>>>('QtQuick');
  const node=withSourceOrigin(qml.Item!({nonexistentProperty:1}), {
    fileName:'/fixture/BrokenView.tsx',lineNumber:24,columnNumber:5,
  });
  await assert.rejects(renderNative(()=>node,{platform:'offscreen',startupTimeoutMs:5000,onWarning:()=>{}}),error=>{
    assert.match((error as Error).message,/BrokenView.tsx:24:5/);
    assert.match((error as Error).message,/\[nonexistentProperty\]/);
    assert.match((error as Error).message,/Cannot assign to non-existent property/);
    assert.match((error as Error).message,/file:\/\/\/nandomo.qml:/);
    return true;
  });
}
