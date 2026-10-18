import { test } from 'node:test';
import assert from 'node:assert/strict';
import { translate } from '@nandomo/core';
import { catalogs, detectOsLocale, formattingLocale, FALLBACK_LOCALE, SOURCE_LOCALE } from '../src/infrastructure/i18n.js';

test('detects the OS locale and keeps C/POSIX unresolved', () => {
  assert.equal(detectOsLocale({ LC_ALL: 'pt_BR.UTF-8', LANG: 'en_US.UTF-8' }), 'pt_BR.UTF-8');
  assert.equal(detectOsLocale({ LANG: 'C' }), 'C');
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, 'Nova pasta'), 'New folder');
});

test('GNU LANGUAGE preferences fall through unsupported languages and respect C/POSIX', () => {
  assert.equal(detectOsLocale({LANG:'en_US.UTF-8',LANGUAGE:'de:zh_CN:en'}),'zh_CN');
  assert.equal(detectOsLocale({LANG:'en_US.UTF-8',LANGUAGE:'pt_BR:en'}),'pt_BR');
  assert.equal(detectOsLocale({LC_ALL:'C',LANGUAGE:'pt_BR:en'}),'C');
  assert.equal(detectOsLocale({LANG:'en_US.UTF-8',LANGUAGE:'de:fr'}),'en_US.UTF-8');
});

test('date and number formatting retain region and category overrides', () => {
  const env={LANG:'en_GB.UTF-8',LC_TIME:'pt_BR.UTF-8',LC_NUMERIC:'de_DE.UTF-8',LANGUAGE:'zh_CN'};
  assert.equal(formattingLocale('LC_TIME',env),'pt-BR');
  assert.equal(formattingLocale('LC_NUMERIC',env),'de-DE');
  assert.equal(formattingLocale('LC_TIME',{LANG:'en_GB.UTF-8'}),'en-GB');
  assert.equal(formattingLocale('LC_TIME',{...env,LC_ALL:'en_US.UTF-8'}),'en-US');
});

test('ships pt-BR, English and Simplified Chinese', () => {
  assert.deepEqual(Object.keys(catalogs).sort(), ['en', 'pt-BR', 'zh-Hans']);
  assert.equal(translate(catalogs, 'zh-Hans', FALLBACK_LOCALE, 'Nova pasta'), '新建文件夹');
  assert.equal(translate(catalogs, 'pt-BR', FALLBACK_LOCALE, 'Nova pasta', undefined, SOURCE_LOCALE), 'Nova pasta');
});

test('plural forms and interpolation reach the status bar strings', () => {
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, '{count} itens', { count: 1 }), '1 item');
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, '{count} itens', { count: 7 }), '7 items');
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, '{count} itens', { count: 7 }), '7 items');
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, 'Tamanho: {size}', { size: '2 KB' }), 'Size: 2 KB');
});

test('a missing key falls back to the Portuguese source string', () => {
  assert.equal(translate(catalogs, 'en', FALLBACK_LOCALE, 'Chave nova'), 'Chave nova');
});

test('en and zh-Hans cover the same authored keys', () => {
  const missing = Object.keys(catalogs.en ?? {}).filter((key) => !(key in (catalogs['zh-Hans'] ?? {})));
  assert.deepEqual(missing, []);
});

test('catalogs preserve interpolation placeholders and plural categories', () => {
  const placeholders=(value:string)=>[...value.matchAll(/\{(\w+)\}/g)].map(match=>match[1]).sort();
  for(const [locale,catalog] of Object.entries(catalogs))for(const [key,value] of Object.entries(catalog)) {
    for(const form of typeof value==='string'?[value]:Object.values(value))assert.deepEqual(placeholders(form),placeholders(key),`${locale}: ${key}`);
    if(typeof value!=='string')assert.ok(value.other,`${locale}: ${key} has no other form`);
  }
  assert.deepEqual(Object.keys(catalogs.en!).sort(),Object.keys(catalogs['zh-Hans']!).sort());
});

test('authored UI translations and Portuguese errors have catalog entries', async () => {
  const ts=await import('typescript');
  const {readdir,readFile}=await import('node:fs/promises');
  const missing=new Set<string>();
  async function walk(dir:URL):Promise<void> {
    for(const item of await readdir(dir,{withFileTypes:true})) {
      if(item.name==='locales'||item.name==='NativeSmokeChecks.tsx')continue;
      const url=new URL(item.name+(item.isDirectory()?'/':''),dir);
      if(item.isDirectory()){await walk(url);continue;}
      if(!/\.tsx?$/.test(item.name))continue;
      const source=ts.createSourceFile(url.pathname,await readFile(url,'utf8'),ts.ScriptTarget.Latest,true);
      function strings(node:import('typescript').Node|undefined,errors=false) {
        if(!node)return;
        if(ts.isStringLiteralLike(node)&&node.text&&(!errors||/[À-ÿ]|(?:indisponível|pasta|arquivo|lixeira|inválid)/.test(node.text))) {
          for(const locale of ['en','zh-Hans'])if(!Object.hasOwn(catalogs[locale]!,node.text))missing.add(`${locale}: ${node.text}`);
        }else if(ts.isConditionalExpression(node)){strings(node.whenTrue,errors);strings(node.whenFalse,errors);}
      }
      function visit(node:import('typescript').Node) {
        if(ts.isJsxAttribute(node)&&/^(text|title|placeholderText|caption)$/.test(node.name.getText(source))) {
          const value=node.initializer&&ts.isJsxExpression(node.initializer)?node.initializer.expression:node.initializer;
          if(value&&ts.isStringLiteral(value)&&/[a-zA-ZÀ-ÿ]/.test(value.text))missing.add(`Untranslated ${url.pathname}: ${value.text}`);
        }
        if(ts.isCallExpression(node)||ts.isNewExpression(node)) {
          const fn=node.expression.getText(source);
          if(/(?:^t$|\.tr$|translate$)/.test(fn))strings(node.arguments?.[0]);
          else if(/(?:^Error$|reportError$|onError$)/.test(fn))strings(node.arguments?.[0],true);
        }
        ts.forEachChild(node,visit);
      }
      visit(source);
    }
  }
  await walk(new URL('../src/',import.meta.url));
  assert.deepEqual([...missing].sort(),[]);
});

test('desktop app names follow LANGUAGE without rewriting launchers', async () => {
  const {mkdtemp,mkdir,writeFile,readFile,rm}=await import('node:fs/promises');
  const {join}=await import('node:path');const {tmpdir}=await import('node:os');
  const {desktopActions}=await import('../src/infrastructure/desktopActions.js');
  const root=await mkdtemp(join(tmpdir(),'nandomo-app-language-'));
  const keys=['XDG_DATA_HOME','XDG_DATA_DIRS','XDG_CONFIG_HOME','NANDOMO_FM_CONFIG_DIR','LANG','LC_MESSAGES','LC_ALL','LANGUAGE'];
  const saved=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
  try {
    const apps=join(root,'applications');await mkdir(apps);
    const launcher=join(apps,'fixture.desktop');const text='[Desktop Entry]\nType=Application\nName=Original name\nName[pt_BR]=Nome original\nName[zh_CN]=原名称\nExec=true\n';await writeFile(launcher,text);
    Object.assign(process.env,{XDG_DATA_HOME:root,XDG_DATA_DIRS:join(root,'empty'),XDG_CONFIG_HOME:join(root,'config'),NANDOMO_FM_CONFIG_DIR:join(root,'config'),LC_ALL:'en_US.UTF-8',LANGUAGE:'de:zh_CN:en'});
    assert.equal((await desktopActions(root).applications())[0]?.name,'原名称');
    process.env.LANGUAGE='pt_BR:en';assert.equal((await desktopActions(root).applications())[0]?.name,'Nome original');
    process.env.LC_ALL='C';assert.equal((await desktopActions(root).applications())[0]?.name,'Original name');
    assert.equal(await readFile(launcher,'utf8'),text);
  }finally{for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}await rm(root,{recursive:true,force:true});}
});
