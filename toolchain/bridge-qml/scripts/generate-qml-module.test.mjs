import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localDeclarations, toolingDeclarations, declarationSource } from './generate-qml-module.mjs';

test('local declarations ignore nested objects, comments and braces in strings', () => {
  const result=localDeclarations(`import QtQuick
    Item {
      property string title: "{ property bool fake }"
      readonly property int computed: 2
      signal chosen(string path, int index)
      // property bool comment
      Text { property bool nested: true }
      function run() { const fake = "}"; }
    }`);
  assert.deepEqual(result,{properties:{title:'string'},events:{onChosen:['string','number']}});
});
test('tooling resolves prototypes across files and exports only requested module', () => {
  const files=[`Module { Component { name: "Base"; Property {name:"text";type:"QString"} Signal {name:"chosen";Parameter {type:"int"}} } }`,
    `Module { Component {name:"Derived";prototype:"Base";exports:["Test.Controls/Picker 1.0"];Property {name:"private";type:"bool";isReadonly:true}} }`];
  assert.deepEqual(toolingDeclarations(files,'Test.Controls'),{Picker:{properties:{text:'string'},events:{onChosen:['number']}}});
  assert.deepEqual(toolingDeclarations(files,'Other'),{});
  const generated=declarationSource('Test.Controls',toolingDeclarations(files,'Test.Controls'));
  assert.match(generated,/importQml<ModuleTypes>/);
  assert.match(generated,/"onChosen"\?: \(arg0: number\)/);
});

test('local sibling inheritance, native bases, aliases and readonly overrides',async()=>{
  const {resolveLocalDeclarations}=await import('./generate-qml-module.mjs');
  const definitions=resolveLocalDeclarations({
    Base:'Text { property bool highlighted: false }',
    Derived:'Base { readonly property string text: "locked"; property alias value: input.text; TextInput { id: input } }',
  },{
    Text:{properties:{text:'string',color:'string'},events:{onLinkActivated:['string']}},
    TextInput:{properties:{text:'string'},events:{}},
  });
  assert.equal(definitions.Base.properties.text,'string');
  assert.equal(definitions.Derived.properties.color,'string');
  assert.equal(definitions.Derived.properties.highlighted,'boolean');
  assert.equal(definitions.Derived.properties.value,'string');
  assert.equal(definitions.Derived.properties.text,undefined);
  assert.deepEqual(definitions.Derived.events.onLinkActivated,['string']);
  assert.throws(()=>resolveLocalDeclarations({A:'B {}',B:'A {}'}),/inheritance cycle/);
});
test('collection properties and tooling enums retain useful types',()=>{
  assert.deepEqual(localDeclarations('Item { property list<string> names; }').properties,{names:'ReadonlyArray<string>'});
  const definitions=toolingDeclarations([`Module { Component {name:"Native";exports:["Test/Native 1.0"];
    Enum {name:"Mode";values:["First","Second"]}
    Property {name:"mode";type:"Mode"}
    Property {name:"names";type:"QStringList"}
    Property {name:"items";type:"QString";isList:true}
  } }`],'Test');
  assert.deepEqual(definitions.Native.properties,{mode:'QmlEnum',names:'ReadonlyArray<string>',items:'ReadonlyArray<string>'});
});
test('native base aliases are resolved from the actual QML import',async()=>{
  const {resolveLocalDeclarations}=await import('./generate-qml-module.mjs');
  const definitions=resolveLocalDeclarations({
    Custom:'import QtQuick as Native\nNative.Text { property bool selected: false }',
  },{'QtQuick/Text':{properties:{text:'string'},events:{}}});
  assert.equal(definitions.Custom.properties.text,'string');
});
test('typed methods are extracted from local functions and native tooling',async()=>{
  const {localMethods}=await import('./generate-qml-module.mjs');
  assert.deepEqual(localMethods('Item { function add(value: int, label: string): bool { return true; } }'),{
    add:{args:['number','string'],returns:'boolean'},
  });
  const definitions=toolingDeclarations([`Module { Component {name:"Native";exports:["Test/Native 1.0"];
    Method {name:"echo";type:"QString";Parameter {type:"QString"}}
  } }`],'Test');
  assert.deepEqual(definitions.Native.methods.echo,{args:['string'],returns:'string'});
  assert.match(declarationSource('Test',definitions),/QmlTypedObject/);
});
