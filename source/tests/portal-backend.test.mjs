import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';
test('FileChooser backend obeys the real D-Bus implementation contract on a private bus',async()=>{
 const paths=['./portal-backend-client.py','../scripts/portal-backend.py','./fixtures/portal-chooser-stub.mjs'].map(path=>fileURLToPath(new URL(path,import.meta.url)));
 const {stdout,stderr}=await promisify(execFile)('dbus-run-session',['--','python3',...paths],{env:{...process.env,PORTAL_TEST_NODE:process.execPath},timeout:20000});
 assert.match(stdout,/PORTAL_BACKEND_PASS/);assert.doesNotMatch(stderr,/Traceback/);
});

test('public FileChooser frontend dispatches to Dank Files on a private bus',async()=>{
 const paths=['./portal-frontend-client.py','../scripts/portal-backend.py','./fixtures/portal-chooser-stub.mjs'].map(path=>fileURLToPath(new URL(path,import.meta.url)));
 const {stdout}=await promisify(execFile)('dbus-run-session',['--','python3',...paths],{env:{...process.env,PORTAL_TEST_NODE:process.execPath},timeout:20000});
 assert.match(stdout,/PORTAL_FRONTEND_PASS/);
});
