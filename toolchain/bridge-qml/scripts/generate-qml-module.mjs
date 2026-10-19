import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

// Read declarations at the component root only. Strings/comments are tokenized so
// braces inside handlers, text and comments cannot become component declarations.
function tokens(source) {
  return [...source.matchAll(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_][\w.]*|\d+|[^\s]/g)]
    .map(match => match[0]).filter(token => !token.startsWith('//') && !token.startsWith('/*'));
}
function scalar(type) {
  if(!type)return 'unknown';
  const list=type.match(/^(?:list|QList|QVector)<(.+)>$/);
  if(list)return `ReadonlyArray<${scalar(list[1])}>`;
  return {string:'string',url:'string',color:'string',bool:'boolean',int:'number',uint:'number',real:'number',double:'number',float:'number',qreal:'number',QString:'string',QUrl:'string',QColor:'string',QStringList:'ReadonlyArray<string>',QVariantList:'ReadonlyArray<unknown>',QVariantMap:'Readonly<Record<string, unknown>>'}[type] || 'unknown';
}
function directBlocks(input) {
  const blocks=[];let depth=0;
  for(let i=0;i<input.length;i++) {
    if(input[i]==='{') {
      if(depth===0) {
        const start=i;let end=i+1,nesting=1;
        while(end<input.length && nesting){if(input[end]==='{')nesting++;if(input[end]==='}')nesting--;end++;}
        if(nesting)throw new Error('Unclosed QML block');
        blocks.push({kind:input[start-1],body:input.slice(start+1,end-1)});i=end-1;
      } else depth++;
    }
  }
  return blocks;
}
function rootTokens(input) {
  const result=[];let depth=0;
  for(const token of input){if(token==='{')depth++;else if(token==='}')depth--;else if(!depth)result.push(token);}
  return result;
}
function field(body,key) {
  const flat=rootTokens(body), index=flat.findIndex((token,i)=>token===key && flat[i+1]===':');
  return index<0 ? undefined : flat[index+2];
}
function unquote(value){return value?.startsWith('"') ? JSON.parse(value) : value;}
export function localDeclarations(source) {
  const root=directBlocks(tokens(source))[0];
  if(!root)throw new Error('No QML root object');
  const flat=rootTokens(root.body), properties={},events={};
  for(let i=0;i<flat.length;i++) {
    if(flat[i]==='property') {
      let type=flat[i+1],offset=i+2;
      if(flat[offset]==='<'){let level=0;do {type+=flat[offset];if(flat[offset]==='<')level++;if(flat[offset]==='>')level--;offset++;}while(offset<flat.length && level);}
      const name=flat[offset];
      if(/^[A-Za-z_]\w*$/.test(name || '') && flat[i-1]!=='readonly')properties[name]=scalar(type);
    }
    if(flat[i]==='signal') {
      const name=flat[i+1];if(!/^[A-Za-z_]\w*$/.test(name || ''))continue;
      const args=[];
      if(flat[i+2]==='('){for(let j=i+3;j<flat.length && flat[j]!==')';j++){if(flat[j]===',')continue;args.push(scalar(flat[j]));j++;}}
      events[`on${name[0].toUpperCase()}${name.slice(1)}`]=args;
    }
  }
  return {properties,events};
}
export function localMethods(source) {
  const root=directBlocks(tokens(source))[0];if(!root)return {};
  const flat=rootTokens(root.body),methods={};
  for(let i=0;i<flat.length;i++)if(flat[i]==='function' && flat[i+2]==='(') {
    const name=flat[i+1],args=[];let j=i+3;
    while(j<flat.length && flat[j]!==')') {
      const parameter=flat[j++];let type='unknown';
      if(flat[j]===':'){j++;type=scalar(flat[j++]);}
      args.push(type);
      if(flat[j]===',')j++;else if(flat[j]!==')')break;
    }
    const returns=flat[j+1]===':'?scalar(flat[j+2]):'unknown';
    if(/^[A-Za-z_]\w*$/.test(name))methods[name]={args,returns};
  }
  return methods;
}
export function localReferencedTypes(source) {
  const root=directBlocks(tokens(source))[0];if(!root)return [];
  const result=[root.kind];
  function walk(body){for(const block of directBlocks(body)){if(field(block.body,'id'))result.push(block.kind);walk(block.body);}}
  walk(root.body);return [...new Set(result)];
}
/** Resolve sibling QML components and their native base classes without application contracts. */
export function resolveLocalDeclarations(sources,bases={}) {
  const resolved={},active=new Set();
  function resolve(name) {
    if(resolved[name])return resolved[name];
    if(active.has(name))throw new Error(`QML inheritance cycle: ${[...active,name].join(' -> ')}`);
    if(!(name in sources))return bases[name] || {properties:{},events:{}};
    active.add(name);
    const root=directBlocks(tokens(sources[name]))[0];
    if(!root)throw new Error(`No QML root object: ${name}`);
    function nativeType(type) {
      if(type.includes('.')) {
        const [prefix,...tail]=type.split('.');
        for(const match of sources[name].matchAll(/^import\s+([\w.]+)(?:\s+[\d.]+)?\s+as\s+(\w+)/gm)) {
          if(match[2]===prefix)return `${match[1]}/${tail.join('.')}`;
        }
      }
      const ownModule=name.includes('/')?name.slice(0,name.lastIndexOf('/')):undefined;
      if(ownModule && sources[`${ownModule}/${type}`])return `${ownModule}/${type}`;
      for(const match of sources[name].matchAll(/^import\s+([\w.]+)(?:\s+[\d.]+)?(?:\s+as\s+(\w+))?\s*$/gm)) {
        if(!match[2] && (sources[`${match[1]}/${type}`] || bases[`${match[1]}/${type}`]))return `${match[1]}/${type}`;
      }
      return type;
    }
    const parent=resolve(nativeType(root.kind));
    const own=localDeclarations(sources[name]);
    const result={properties:{...parent.properties,...own.properties},events:{...parent.events,...own.events},methods:{...parent.methods,...localMethods(sources[name])}};
    const flat=rootTokens(root.body);
    // A readonly override must not inherit a writable declaration from its base.
    for(let i=0;i<flat.length;i++)if(flat[i]==='readonly' && flat[i+1]==='property')delete result.properties[flat[i+3]];
    const objects=new Map();
    function collect(body){for(const block of directBlocks(body)){const id=field(block.body,'id');if(id)objects.set(id,block);collect(block.body);}}
    collect(root.body);
    for(let i=0;i<flat.length;i++)if(flat[i]==='property' && flat[i+1]==='alias') {
      const name=flat[i+2],target=flat[i+4]?.split('.');
      if(target?.length===2) {
        const object=objects.get(target[0]);
        if(object) {
          const declarations=resolve(nativeType(object.kind));
          const local=localDeclarations(`${object.kind} { ${object.body.join(' ')} }`);
          result.properties[name]=local.properties[target[1]] || declarations.properties[target[1]] || 'unknown';
        }
      }
    }
    active.delete(name);resolved[name]=result;return result;
  }
  for(const name of Object.keys(sources))resolve(name);
  return resolved;
}
export function toolingDeclarations(sources,module) {
  const components=new Map();
  for(const source of sources)for(const root of directBlocks(tokens(source)))for(const block of directBlocks(root.body)) {
    if(block.kind!=='Component')continue;
    const name=unquote(field(block.body,'name'));if(name)components.set(name,block.body);
  }
  function inherited(name,seen=new Set()) {
    if(seen.has(name))return {properties:{},events:{}};seen.add(name);
    const body=components.get(name);if(!body)return {properties:{},events:{}};
    const result=inherited(unquote(field(body,'prototype')),seen);
    const enums=new Set(directBlocks(body).filter(block=>block.kind==='Enum').map(block=>unquote(field(block.body,'name'))));
    for(const block of directBlocks(body)) {
      const name=unquote(field(block.body,'name'));if(!name)continue;
      if(block.kind==='Property' && field(block.body,'isReadonly')!=='true'){ const type=unquote(field(block.body,'type'));
        const value=enums.has(type)?'QmlEnum':scalar(type);
        result.properties[name]=field(block.body,'isList')==='true'?`ReadonlyArray<${value}>`:value; }
      if(block.kind==='Method') {
        result.methods ??= {};
        result.methods[name]={args:directBlocks(block.body).filter(b=>b.kind==='Parameter').map(b=>scalar(unquote(field(b.body,'type')))),returns:field(block.body,'type')?scalar(unquote(field(block.body,'type'))):'void'};
      }
      if(block.kind==='Signal')result.events[`on${name[0].toUpperCase()}${name.slice(1)}`]=directBlocks(block.body).filter(b=>b.kind==='Parameter').map(b=>scalar(unquote(field(b.body,'type'))));
    }
    return result;
  }
  const result=module==='QtQml' ? {QtObject:{properties:{},events:{},methods:{}},Component:{properties:{},events:{},methods:{}}} : {};
  for(const [name,body] of components) {
    const flat=rootTokens(body),i=flat.indexOf('exports');if(i<0)continue;
    for(let j=i+2;j<flat.length && flat[j]!==']';j++) {
      const value=unquote(flat[j]);if(!value?.startsWith(module+'/'))continue;
      const type=value.slice(module.length+1).split(' ')[0];
      if(/^[A-Z]\w*$/.test(type))result[type]=inherited(name);
    }
  }
  return result;
}
export function declarationSource(module,definitions) {
  const common='children?: unknown; objectName?: Binding<string>; width?: Binding<number | "fill">; height?: Binding<number | "fill">; visible?: Binding<boolean>; enabled?: Binding<boolean>; ref?: (object: QmlObject | null) => void; "Layout.fillWidth"?: Binding<boolean>;';
  const lines=['// Generated native declarations. Regenerate when the source module changes.',"import { importQml, type QmlObject, type QmlEnum, type QmlTypedObject } from '@nandomo/bridge-qml';",'type Binding<T> = T | (() => T);',`type ItemProps = { ${common} };`,'export interface ModuleTypes {'];
  for(const [name,{properties,events,methods={}}] of Object.entries(definitions).sort(([a],[b])=>a.localeCompare(b))) {
    lines.push(`  ${name}: Omit<ItemProps, 'ref'> & {`);
    lines.push('    ref?: (object: QmlTypedObject<{');
    for(const [method,{args,returns}] of Object.entries(methods))lines.push(`      ${JSON.stringify(method)}: (${args.map((type,i)=>`arg${i}: ${type}`).join(', ')}) => ${returns};`);
    lines.push('    }> | null) => void;');
    for(const [key,type] of Object.entries(properties))if(!['children','objectName','width','height','visible','enabled','ref'].includes(key))lines.push(`    ${JSON.stringify(key)}?: Binding<${type}>;`);
    for(const [key,args] of Object.entries(events))lines.push(`    ${JSON.stringify(key)}?: (${args.map((type,i)=>`arg${i}: ${type}`).join(', ')}) => void;`);
    lines.push('  };');
  }
  lines.push('}',`export const native = importQml<ModuleTypes>(${JSON.stringify(module)});`,'');
  return lines.join('\n');
}
async function main() {
  const [module,directory,output,...toolingFiles]=process.argv.slice(2);
  if(!module || !directory || !output)throw new Error('Usage: node generate-qml-module.mjs MODULE DIRECTORY OUTPUT [QMLTYPES ...]');
  let definitions;
  if(toolingFiles.length)definitions=toolingDeclarations(await Promise.all(toolingFiles.map(file=>readFile(file,'utf8'))),module);
  else {
    definitions={};
    for(const name of await readdir(directory))if(/^[A-Z]\w*\.qml$/.test(name))definitions[basename(name,'.qml')]=localDeclarations(await readFile(resolve(directory,name),'utf8'));
  }
  if(!Object.keys(definitions).length)throw new Error(`No exported components found for ${module}`);
  await writeFile(output,declarationSource(module,definitions));
  process.stdout.write(`Generated ${Object.keys(definitions).length} types for ${module}\n`);
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
