import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,mkdir,writeFile,readFile,stat,rm,symlink,unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { prepareProject, watchProject } from './prepare-project.mjs';

test('discovers imported modules, refreshes source changes and preserves unchanged cache',async()=>{
  const root=await mkdtemp('/tmp/nandomo-qml-discovery-');
  const before=process.env.QML_IMPORT_PATH;
  let stop;
  try {
    const module=join(root,'modules','Example','Widgets');
    await mkdir(module,{recursive:true});await mkdir(join(root,'src'));
    process.env.QML_IMPORT_PATH=join(root,'modules');
    await writeFile(join(root,'src','app.tsx'),"import {importQml as nativeImport} from '@nandomo/bridge-qml'; const native = nativeImport('Example.Widgets'); // importQml('Fake.Module')");
    const component=join(module,'Button.qml');
    await writeFile(component,'Item { property string label: ""; signal clicked }');
    const result=await prepareProject(root);
    assert.deepEqual(result.modules,['Example.Widgets']);
    const source=await readFile(result.output,'utf8');assert.match(source,/"label"\?: Binding<string>/);
    const timestamp=(await stat(result.output)).mtimeMs;
    await prepareProject(root);assert.equal((await stat(result.output)).mtimeMs,timestamp);
    await writeFile(component,'Item { property int count: 0; signal clicked }');
    await prepareProject(root);
    const updated=await readFile(result.output,'utf8');assert.match(updated,/"count"\?: Binding<number>/);assert.doesNotMatch(updated,/"label"/);
    stop=await watchProject(root,error=>{throw error;});
    await writeFile(component,'Item { property bool refreshed: true; signal clicked }');
    const deadline=Date.now()+3000;
    while(!(await readFile(result.output,'utf8')).includes('"refreshed"') && Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,25));
    assert.match(await readFile(result.output,'utf8'),/"refreshed"/);
    stop();stop=undefined;
    await writeFile(join(root,'src','app.tsx'),"const native = importQml('Definitely.Missing');");
    await assert.rejects(prepareProject(root),/QML_IMPORT_PATH/);
  } finally {
    stop?.();
    if(before===undefined)delete process.env.QML_IMPORT_PATH;else process.env.QML_IMPORT_PATH=before;
    await rm(root,{recursive:true,force:true});
  }
});
test('discovers inherited contracts and methods in a different local module',async()=>{
  const root=await mkdtemp('/tmp/nandomo-qml-inherited-');const before=process.env.QML_IMPORT_PATH;
  try {
    await mkdir(join(root,'src'));await mkdir(join(root,'modules','Example','Base'),{recursive:true});await mkdir(join(root,'modules','Example','Widgets'),{recursive:true});
    process.env.QML_IMPORT_PATH=join(root,'modules');
    await writeFile(join(root,'src','app.tsx'),"const widgets=importQml('Example.Widgets');");
    await writeFile(join(root,'modules','Example','Base','Label.qml'),'Item { property string label: ""; function echo(value: string): string { return value; } }');
    await writeFile(join(root,'modules','Example','Widgets','Button.qml'),'import Example.Base as Base\nBase.Label { property bool checked: false }');
    const result=await prepareProject(root);const generated=await readFile(result.output,'utf8');
    assert.match(generated,/"label"\?: Binding<string>/);assert.match(generated,/"checked"\?: Binding<boolean>/);
    assert.match(generated,/"echo": \(arg0: string\) => string/);
    assert.ok(result.directories.includes(join(root,'modules','Example','Base')));
    const entry=join(root,'linked-tooling.mjs');
    await symlink(fileURLToPath(new URL('./prepare-project.mjs',import.meta.url)),entry);
    await unlink(result.output);
    const executed=await promisify(execFile)(process.execPath,[entry,root],{timeout:10000});
    assert.match(executed.stdout,/QML metadata ready/);
    assert.match(await readFile(result.output,'utf8'),/"echo"/);

  } finally {if(before===undefined)delete process.env.QML_IMPORT_PATH;else process.env.QML_IMPORT_PATH=before;await rm(root,{recursive:true,force:true});}
});

test('default imports add exports without hiding the original module',async()=>{
  const root=await mkdtemp('/tmp/nandomo-qml-default-import-');
  const before=process.env.QML_IMPORT_PATH;
  try {
    const modules=join(root,'modules');
    await mkdir(join(root,'src'));
    await mkdir(join(modules,'Example','Root'),{recursive:true});
    await mkdir(join(modules,'Example','Window'),{recursive:true});
    process.env.QML_IMPORT_PATH=modules;
    await writeFile(join(root,'src','app.tsx'),"const native=importQml('Example.Root');");
    await writeFile(join(modules,'Example','Root','qmldir'),'module Example.Root\ntypeinfo root.qmltypes\ndefault import Example.Window\n');
    await writeFile(join(modules,'Example','Root','root.qmltypes'),'Module { Component { name: "Root"; exports: ["Example.Root/Root 1.0"]; Property {name: "rootValue"; type: "int"} } }');
    await writeFile(join(modules,'Example','Window','qmldir'),'module Example.Window\ntypeinfo window.qmltypes\n');
    await writeFile(join(modules,'Example','Window','window.qmltypes'),'Module { Component { name: "Window"; exports: ["Example.Window/Window 1.0"]; Property {name: "windowValue"; type: "string"} } }');
    const result=await prepareProject(root);
    const generated=await readFile(result.output,'utf8');
    assert.match(generated,/Root: Omit<ItemProps/);
    assert.match(generated,/Window: Omit<ItemProps/);
    assert.match(generated,/"rootValue"\?: Binding<number>/);
    assert.match(generated,/"windowValue"\?: Binding<string>/);
    assert.ok(result.directories.includes(join(modules,'Example','Root')));
    assert.ok(result.directories.includes(join(modules,'Example','Window')));
  } finally {
    if(before===undefined)delete process.env.QML_IMPORT_PATH;else process.env.QML_IMPORT_PATH=before;
    await rm(root,{recursive:true,force:true});
  }
});
