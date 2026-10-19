#!/usr/bin/env node
import ts from 'typescript';
import { watch } from 'node:fs';
import { readFile, readdir, mkdir, writeFile, realpath } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { localReferencedTypes, resolveLocalDeclarations, toolingDeclarations, declarationSource } from './generate-qml-module.mjs';
import { checkNativeCaptures, formatNativeCapture } from './native-captures.mjs';

async function files(root,extension) {
  const result=[];
  for(const entry of await readdir(root,{withFileTypes:true}).catch(()=>[])) {
    if(['node_modules','.git','.nandomo','dist'].includes(entry.name))continue;
    const path=join(root,entry.name);
    if(entry.isDirectory())result.push(...await files(path,extension));
    else if(extension.test(entry.name))result.push(path);
  }
  return result;
}
async function exists(path){try{await readdir(path);return true;}catch{return false;}}
/**
 * QML cannot read a TypeScript variable. A native closure that mentions one is a
 * defect the native type metadata cannot see, so it is reported with its origin.
 */
export async function prepareProject(project, { strictCaptures = false, onCapture = finding => console.warn('[nandomo/qml] ' + formatNativeCapture(finding)) } = {}) {
  const captures = await checkNativeCaptures(project);
  for (const finding of captures) onCapture(finding);
  if (strictCaptures && captures.length) throw new Error(
    captures.length + ' native closure(s) capture TypeScript variables: ' + captures.map(formatNativeCapture).join(' | '));
  const modules=new Set();
  for(const file of await files(join(project,'src'),/\.tsx?$/)) {
    const source=await readFile(file,'utf8');
    const tree=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
    const names=new Set(['importQml']);
    for(const statement of tree.statements) {
      if(!ts.isImportDeclaration(statement) || statement.moduleSpecifier.text!=='@nandomo/bridge-qml')continue;
      const bindings=statement.importClause?.namedBindings;
      if(bindings && ts.isNamedImports(bindings))for(const element of bindings.elements) {
        if((element.propertyName?.text || element.name.text)==='importQml')names.add(element.name.text);
      }
    }
    function visit(node) {
      if(ts.isCallExpression(node) && ts.isIdentifier(node.expression) && names.has(node.expression.text)) {
        const argument=node.arguments[0];
        if(!argument || !ts.isStringLiteralLike(argument))throw new Error(`QML module import must use a literal module name: ${file}`);
        modules.add(argument.text);
      }
      ts.forEachChild(node,visit);
    }
    visit(tree);
  }
  const roots=(process.env.QML_IMPORT_PATH || '').split(':').filter(Boolean);
  for(const command of ['qtpaths6','qtpaths'])try{roots.push(execFileSync(command,['--query','QT_INSTALL_QML'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim());break;}catch{}
  roots.push('/usr/lib/qt6/qml',join(project,'qml'));
  const shellRoots=[process.env.NANDOMO_DMS_SOURCE,process.env.DMS_SHELL_DIR].filter(Boolean);
  const runtime=join(process.env.XDG_RUNTIME_DIR || `/run/user/${process.getuid()}`,'danklinux-shell');
  for(const name of await readdir(runtime).catch(()=>[]))shellRoots.push(join(runtime,name));
  // A private test runtime need not be the desktop session's runtime.
  const desktopRuntime=`/run/user/${process.getuid()}/danklinux-shell`;
  if(runtime!==desktopRuntime)for(const name of await readdir(desktopRuntime).catch(()=>[]))shellRoots.push(join(desktopRuntime,name));
  const generated=[],directories=new Set(),loaded=new Map(),allSources={},allBases={};
  const baseFiles=[];
  for(const root of roots)for(const base of ['QtQuick','QtQml','QtQuick/Templates']) {
    const folder=join(root,base);
    for(const name of await readdir(folder).catch(()=>[]))if(name.endsWith('.qmltypes'))baseFiles.push(join(folder,name));
  }
  const baseSources=await Promise.all([...new Set(baseFiles)].map(file=>readFile(file,'utf8')));
  for(const module of ['QtQml','QtQuick','QtQuick.Templates'])for(const [name,value] of Object.entries(toolingDeclarations(baseSources,module))) {
    allBases[`${module}/${name}`]=value;
    if(module!=='QtQuick.Templates')allBases[name]=value;
  }
  async function load(module,required=false) {
    if(loaded.has(module))return loaded.get(module);
    let directory;
    const relative=module.replaceAll('.','/');
    const candidates=[...roots.map(root=>join(root,relative)),...(module.startsWith('qs.') ?
      [join(project,'qml',relative.slice(3)),...shellRoots.map(root=>join(root,relative.slice(3)))] : [])];
    for(const candidate of candidates)if(await exists(candidate)){directory=candidate;break;}
    if(!directory) {
      if(required)throw new Error(`QML module ${module} was not found. Set QML_IMPORT_PATH to its import root.`);
      return;
    }
    let qmldir=await readFile(join(directory,'qmldir'),'utf8').catch(()=>'');
    const originalDirectory=directory, originalQmldir=qmldir;
    let metadataModule=module;
    const defaultImport=qmldir.match(/^default import\s+(\S+)/m)?.[1];
    if(defaultImport)for(const root of roots) {
      const candidate=join(root,defaultImport.replaceAll('.','/'));
      if(await exists(candidate)){directory=candidate;metadataModule=defaultImport;qmldir=await readFile(join(directory,'qmldir'),'utf8');break;}
    }
    directories.add(directory);
    directories.add(originalDirectory);
    const typeinfo=[...qmldir.matchAll(/^typeinfo\s+(\S+)/gm)].map(match=>join(directory,match[1]));
    const metadataFiles=typeinfo.length?typeinfo:(await readdir(directory)).filter(name=>name.endsWith('.qmltypes')).map(name=>join(directory,name));
    const originalFiles=[...originalQmldir.matchAll(/^typeinfo\s+(\S+)/gm)].map(match=>join(originalDirectory,match[1]));
    const native={
      ...toolingDeclarations([...baseSources,...await Promise.all(originalFiles.map(file=>readFile(file,'utf8')))],module),
      ...toolingDeclarations([...baseSources,...await Promise.all(metadataFiles.map(file=>readFile(file,'utf8')))],metadataModule),
    };
    for(const [name,value] of Object.entries(native))allBases[`${module}/${name}`]=value;
    const localFiles=qmldir?[...qmldir.matchAll(/^(?!singleton\s)([A-Z]\w*)\s+(?:\d+\.\d+\s+)?(\S+\.qml)\s*$/gm)].map(match=>[match[1],match[2]]):
      (await readdir(directory)).filter(name=>/^[A-Z]\w*\.qml$/.test(name)).map(name=>[name.slice(0,-4),name]);
    const local=Object.fromEntries(await Promise.all(localFiles.map(async([name,file])=>[name,await readFile(join(directory,file),'utf8')])));
    // Publish the registry before traversing imports: module dependency cycles are legal.
    loaded.set(module,{native,local});
    for(const [name,source] of Object.entries(local))allSources[`${module}/${name}`]=source;
    for(const source of Object.values(local)) {
      const references=localReferencedTypes(source);
      const imports=[...source.matchAll(/^import\s+([\w.]+)(?:\s+[\d.]+)?(?:\s+as\s+(\w+))?\s*$/gm)];
      const missing=references.some(type=>{
        if(local[type] || allBases[type])return false;
        const [prefix,...tail]=type.split('.');
        const alias=imports.find(match=>match[2]===prefix);
        return !(alias && (allBases[`${alias[1]}/${tail.join('.')}`] || allSources[`${alias[1]}/${tail.join('.')}`]));
      });
      if(missing)for(const match of imports)await load(match[1]);
    }
    return loaded.get(module);
  }
  for(const module of [...modules].sort())await load(module,true);
  const resolved=resolveLocalDeclarations(allSources,allBases);
  for(const module of [...modules].sort()) {
    const registry=loaded.get(module);
    const definitions={...registry.native};
    for(const name of Object.keys(registry.local))definitions[name]=resolved[`${module}/${name}`];
    if(!Object.keys(definitions).length)throw new Error(`No component metadata found for QML module ${module}`);
    const source=declarationSource(module,definitions);
    const body=source.slice(source.indexOf('export interface ModuleTypes {')+'export interface ModuleTypes '.length,source.lastIndexOf('export const native')).trim();
    generated.push(`${JSON.stringify(module)}: ${body.replace(/;?\s*$/, '')};`);
  }
  const directory=join(project,'.nandomo');await mkdir(directory,{recursive:true});
  const source=`// Generated automatically. Do not edit.\nimport type { QmlObject, QmlEnum, QmlTypedObject } from '@nandomo/bridge-qml';\ntype Binding<T> = T | (() => T);\ntype ItemProps = {children?:unknown;objectName?:Binding<string>;width?:Binding<number|'fill'>;height?:Binding<number|'fill'>;visible?:Binding<boolean>;enabled?:Binding<boolean>;ref?:(object:QmlObject|null)=>void;'Layout.fillWidth'?:Binding<boolean>};\ndeclare module '@nandomo/bridge-qml' { interface QmlModules {\n${generated.join('\n')}\n} }\n`;
  const output=join(directory,'qml-modules.d.ts');
  if(await readFile(output,'utf8').catch(()=>'')!==source)await writeFile(output,source);
  return {modules:[...modules],output,directories:[...directories],captures};
}
/** Refresh native contracts while source and QML modules change. No runtime hot reload. */
export async function watchProject(project,onError=console.error) {
  let watchers=[],timer,closed=false,running=false,again=false;
  function changed(_event,file) {
    if(file && !/\.(tsx?|qml|qmltypes)$|(?:^|\/)qmldir$/.test(String(file)))return;
    clearTimeout(timer);timer=setTimeout(refresh,100);
  }
  async function refresh() {
    if(closed)return;
    if(running){again=true;return;}
    running=true;
    try {
      const result=await prepareProject(project);
      if(closed)return;
      const next=[];
      try {
        for(const directory of new Set([join(project,'src'),...result.directories]))next.push(watch(directory,{recursive:true},changed));
      } catch(error){for(const watcher of next)watcher.close();throw error;}
      for(const watcher of watchers)watcher.close();watchers=next;
    } catch(error){onError(error);}
    finally{running=false;if(again){again=false;void refresh();}}
  }
  await refresh();
  return ()=>{closed=true;clearTimeout(timer);for(const watcher of watchers)watcher.close();};
}
if(process.argv[1] && import.meta.url===pathToFileURL(await realpath(resolve(process.argv[1]))).href) {
  const args=process.argv.slice(2);
  const project=resolve(args.find(arg=>!arg.startsWith('--')) || '.');
  const result=await prepareProject(project);
  if(args.includes('--watch'))await watchProject(project);
  process.stdout.write(`QML metadata ready: ${result.modules.join(', ')}\n`);
  if(result.captures.length)process.stdout.write(`Native closures with TypeScript captures: ${result.captures.length}\n`);
  if(args.includes('--check') && result.captures.length)process.exitCode=1;
}
