import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nativeCapturesIn, checkNativeCaptures, listSourceFiles, formatNativeCapture } from './native-captures.mjs';
import { prepareProject } from './prepare-project.mjs';

function analyze(source, file = 'src/view.tsx') {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return nativeCapturesIn(tree, file);
}
const names = (findings) => findings.map(finding => finding.name);

const header = [
  "import { importQml, createQmlScope, qmlExpression, qmlHandler } from '@nandomo/bridge-qml';",
  'declare let parent: any, Qt: any, modelData: any, index: any, Style: any, Image: any, Loader: any;',
  "const qml = importQml('QtQuick');",
  '',
].join('\n');

test('explicit native references, QML globals and local bindings are not captures', () => {
  const findings = analyze(header + [
    'export const View = (scope: any) => qml.Item({',
    '  color: qmlExpression(scope, ($qml) => $qml.theme.primary),',
    '  opacity: qmlExpression(scope, () => Style.cornerRadius),',
    '  visible: qmlExpression(scope, ($qml) => !!parent && !!modelData && index >= 0),',
    '  text: qmlExpression(scope, ($qml) => modelData.name),',
    '  radius: qmlExpression(scope, ($qml) => Math.min(Style.cornerRadius, 8)),',
    "  onClicked: qmlHandler(scope, ($qml, ...args: any[]) => (((mouse: any) => {",
    '    var point: any = Qt.point(mouse.x, mouse.y);',
    '    const entry = modelData;',
    "    $qml.app.send('select', entry.path);",
    '  }) as (...args: any[]) => unknown)(...args)),',
    '  icon: Image, loader: Loader,',
    '});',
  ].join('\n'));
  assert.deepEqual(findings, []);
});

test('an aliased import of the factory is still checked', () => {
  const findings = analyze([
    "import { qmlExpression as expr } from '@nandomo/bridge-qml';",
    'declare let Qt: any;',
    "const prefix = 'row:';",
    "export const value = (scope: any) => expr(scope, ($qml) => prefix + Qt.application.name);",
  ].join('\n'));
  assert.deepEqual(names(findings), ['prefix']);
  assert.equal(findings[0].line, 4);
  assert.match(formatNativeCapture(findings[0]), /view\.tsx:4:/);
});

test('module values, imports and component props used by a native closure are reported', () => {
  const findings = analyze([
    "import { importQml, qmlExpression } from '@nandomo/bridge-qml';",
    "import { paletteOf } from '../theme.js';",
    'declare let Qt: any;',
    "const prefix = 'row:';",
    'export const View = ({ accent }: { accent: string }) => (scope: any) => qmlExpression(scope, ($qml) =>',
    '  prefix + paletteOf(accent) + Qt.application.name);',
  ].join('\n'));
  assert.deepEqual(names(findings).sort(), ['accent', 'paletteOf', 'prefix']);
});

test('an indirect callback is reported because its captures cannot be seen', () => {
  const findings = analyze([
    "import { qmlExpression } from '@nandomo/bridge-qml';",
    'declare let Qt: any;',
    'const compute = () => Qt.application.name;',
    'export const value = (scope: any, compute: () => string) => qmlExpression(scope, compute);',
  ].join('\n'));
  assert.deepEqual(findings.map(finding => finding.name), [null]);
  assert.match(findings[0].message, /indirect callback/);
});

test('only the reported name is reported once per closure', () => {
  const findings = analyze(header + [
    "const label = 'prefix:';",
    'export const View = (scope: any) => qmlExpression(scope, ($qml) => label + label + $qml.app.state.path);',
  ].join('\n'));
  assert.deepEqual(findings.map(finding => finding.name), ['label']);
});

test('files without the factory import are ignored', () => {
  assert.deepEqual(analyze([
    "const prefix = 'x';",
    'export const value = (scope: any) => qmlExpressionLike(scope, () => prefix);',
  ].join('\n')), []);
});

test('the file walk reports every project source below src', async () => {
  const root = await mkdtemp('/tmp/nandomo-capture-walk-');
  try {
    await mkdir(join(root, 'src', 'nested'), { recursive: true });
    const clean = header + 'export const a = (scope: any) => qmlExpression(scope, ($qml) => $qml.app.state.path);';
    const broken = header + "const prefix = 'x:';\nexport const b = (scope: any) => qmlExpression(scope, ($qml) => prefix + $qml.app.state.path);";
    await writeFile(join(root, 'src', 'clean.tsx'), clean);
    await writeFile(join(root, 'src', 'nested', 'broken.tsx'), broken);
    const files = await listSourceFiles(join(root, 'src'));
    assert.deepEqual(files.map(file => file.slice(root.length)), ['/src/clean.tsx', '/src/nested/broken.tsx']);
    const findings = await checkNativeCaptures(root, files);
    assert.deepEqual(findings.map(finding => finding.name), ['prefix']);
    assert.equal(findings[0].file, join('src', 'nested', 'broken.tsx'));
    assert.equal(findings[0].line, 5);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('the file-manager pilot declares every native name it uses', async () => {
  const project = fileURLToPath(new URL('../../../examples/file-manager-qml/', import.meta.url));
  const findings = await checkNativeCaptures(project);
  assert.deepEqual(findings.map(formatNativeCapture), []);
});

test('project preparation reports the capture and can refuse the project', async () => {
  const root = await mkdtemp('/tmp/nandomo-capture-prepare-');
  try {
    await mkdir(join(root, 'src'), { recursive: true });
    await writeFile(join(root, 'src', 'view.tsx'), [
      "import { qmlExpression } from '@nandomo/bridge-qml';",
      'declare let Qt: any;',
      "const prefix = 'row:';",
      'export const value = (scope: any) => qmlExpression(scope, ($qml) => prefix + $qml.app.state.path);',
    ].join('\n'));
    const reported = [];
    const result = await prepareProject(root, { onCapture: finding => reported.push(formatNativeCapture(finding)) });
    assert.deepEqual(result.captures.map(finding => finding.name), ['prefix']);
    assert.deepEqual(reported, result.captures.map(formatNativeCapture));
    await assert.rejects(prepareProject(root, { strictCaptures: true, onCapture: () => {} }), /capture TypeScript variables/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
