import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  RESPONSE_CANCELLED, RESPONSE_FAILED, RESPONSE_SUCCESS, buildResults, decodeByteArray,
  isPlainName, matchesFilter, normalizeRequest, toFileUri, uniquePath, validateSelection,
} from '../src/portal/chooserCore.js';
import { createChooserController } from '../src/portal/chooserController.js';

const bytes = (value: string) => [...Buffer.from(value + '\0', 'utf8')];
const root = mkdtempSync(join(tmpdir(), 'chooser-core-'));
after(()=>rmSync(root,{recursive:true,force:true}));
mkdirSync(join(root, 'pasta'), { recursive: true });
writeFileSync(join(root, 'foto.png'), 'x');
writeFileSync(join(root, 'nota.txt'), 'x');

function openFile(options: Record<string, unknown> = {}, method: 'OpenFile' | 'SaveFile' | 'SaveFiles' = 'OpenFile') {
  return normalizeRequest(method, 'org.test.App', '', 'Titulo', options);
}

test('byte arrays decode and reject non-local values', () => {
  assert.equal(decodeByteArray(bytes('/tmp')), '/tmp');
  assert.equal(decodeByteArray(undefined), undefined);
  assert.throws(() => decodeByteArray(['x']));
  assert.throws(() => openFile({ current_folder: bytes('file:///tmp') }), TypeError);
  assert.throws(() => openFile({ current_folder: bytes('relativo') }), TypeError);
});

test('filters use the a(sa(us)) schema and reject unknown rule kinds', () => {
  const request = openFile({ filters: [['Imagens', [[0, '*.png'], [1, 'image/jpeg']]]] });
  assert.equal(request.filters[0]?.patterns[0], '*.png');
  assert.equal(request.filters[0]?.mimeTypes[0], 'image/jpeg');
  assert.throws(() => openFile({ filters: [['Ruim', [[7, 'x']]]] }), TypeError);
  assert.throws(() => openFile({ filters: [['Ruim', [[1, 'nao-mime']]]] }), TypeError);
  // Rules inside a filter are alternatives: either the glob or the MIME type can accept.
  assert.equal(matchesFilter('foto.jpg', request.filters[0]!), true);
  assert.equal(matchesFilter('foto.png', request.filters[0]!), true);
  assert.equal(matchesFilter('nota.txt', request.filters[0]!), false);
  // A MIME-only filter still validates the selected file.
  const mimeOnly = openFile({ filters: [['Fotos', [[1, 'image/jpeg']]]] });
  assert.equal(matchesFilter('foto.jpg', mimeOnly.filters[0]!), true);
  assert.equal(matchesFilter('foto.jpg', mimeOnly.filters[0]!), true);
  assert.equal(matchesFilter('foto.png', mimeOnly.filters[0]!), false);
});

test('SaveFile takes a string current_name and SaveFiles takes aay files', () => {
  const save = normalizeRequest('SaveFile', 'app', '', 't', { current_name: 'relatorio.txt', current_folder: bytes(root) });
  assert.equal(save.suggestedName, 'relatorio.txt');
  assert.throws(() => normalizeRequest('SaveFiles', 'app', '', 't', { filenames: [['a.txt']] }), TypeError);
  const many = normalizeRequest('SaveFiles', 'app', '', 't', { files: [bytes('a.txt'), bytes('b.txt')] });
  assert.deepEqual(many.filenames, ['a.txt', 'b.txt']);
  assert.throws(() => normalizeRequest('SaveFiles', 'app', '', 't', { files: [bytes('../fuga')] }), TypeError);
});

test('choices are decoded and echoed back in the results', () => {
  const request = openFile({ choices: [['confirmar', 'Confirmar', [['sim', 'Sim'], ['nao', 'Nao']], 'sim']] });
  assert.equal(request.choices[0]?.options.length, 2);
  const results = buildResults(request, { paths: [join(root, 'foto.png')], choices: { confirmar: 'nao' } });
  assert.deepEqual(results.choices, [['confirmar', 'nao']]);
  assert.deepEqual(results.uris, ['file://' + root + '/foto.png']);
  assert.deepEqual(toFileUri('/tmp/a b'), 'file:///tmp/a%20b');
});

test('open selection must exist, match the mode and the filter', () => {
  const info = (path: string) => ({ exists: path === join(root, 'foto.png') || path === join(root, 'nota.txt') || path === join(root, 'pasta'), directory: path.endsWith('pasta') });
  const open = openFile({});
  assert.equal(validateSelection(open, { paths: [join(root, 'foto.png')] }, info).response, RESPONSE_SUCCESS);
  assert.equal(validateSelection(open, { paths: [join(root, 'pasta')] }, info).response, RESPONSE_FAILED);
  assert.equal(validateSelection(open, { paths: [] }, info).response, RESPONSE_CANCELLED);
  const folder = openFile({ directory: true });
  assert.equal(validateSelection(folder, { paths: [join(root, 'pasta')] }, info).response, RESPONSE_SUCCESS);
  const filtered = openFile({ filters: [['Imagens', [[0, '*.png']]]] });
  assert.equal(validateSelection(filtered, { paths: [join(root, 'nota.txt')] }, info).response, RESPONSE_FAILED);
  assert.equal(validateSelection(openFile({ multiple: true }), { paths: [join(root, 'nota.txt'), join(root, 'foto.png')] }, info).response, RESPONSE_SUCCESS);
  assert.equal(validateSelection(open, { paths: ['relativo'] }, info).response, RESPONSE_FAILED);
});

test('SaveFile needs an explicit overwrite and SaveFiles picks unique names', () => {
  const info = (path: string) => ({ exists: path === join(root, 'nota.txt'), directory: path === root });
  const save = normalizeRequest('SaveFile', 'app', '', 't', { current_name: 'nota.txt', current_folder: bytes(root) });
  const first = validateSelection(save, { paths: [join(root, 'nota.txt')] }, info);
  assert.equal(first.error, 'OVERWRITE_CONFIRMATION_REQUIRED');
  assert.equal(validateSelection(save, { paths: [join(root, 'nota.txt')], overwrite: true }, info).response, RESPONSE_SUCCESS);
  const many = normalizeRequest('SaveFiles', 'app', '', 't', { files: [bytes('nota.txt'), bytes('nota.txt')] });
  const outcome = validateSelection(many, { paths: [], folder: root }, info);
  assert.equal(outcome.response, RESPONSE_SUCCESS);
  assert.deepEqual(outcome.paths, [join(root, 'nota (2).txt'), join(root, 'nota (3).txt')]);
  assert.equal(isPlainName('a/b'), false);
  assert.equal(uniquePath('/tmp', 'a.txt', () => false), 'a.txt');
});

test('the controller answers the portal once and requires confirmation to overwrite', () => {
  const request = normalizeRequest('SaveFile', 'app', '', 't', { current_name: 'nota.txt', current_folder: bytes(root) });
  const answers: Array<{ response: number }> = [];
  const controller = createChooserController(request, {
    folder: () => root, selection: () => [], select: () => {},
    exists: path => ({ exists: path === join(root, 'nota.txt'), directory: path === join(root, 'pasta') || path === root }),
    close: answer => { answers.push(answer); },
  });
  assert.equal(controller.canAccept(), true);
  controller.accept();
  assert.equal(answers.length, 0);
  assert.equal(controller.overwritePrompt(), true);
  controller.accept();
  assert.equal(answers.length, 1);
  assert.equal(answers[0]?.response, RESPONSE_SUCCESS);
  controller.cancel();
  assert.equal(answers.length, 1);
});

test('SaveFiles confirms the browsed folder and keeps the requested order', () => {
  const request = normalizeRequest('SaveFiles', 'app', '', 't', { files: [bytes('a.txt'), bytes('b.txt')], current_folder: bytes(root) });
  const answers: Array<{ response: number; results: Record<string, unknown> }> = [];
  const controller = createChooserController(request, {
    folder: () => root, selection: () => [], select: () => {},
    exists: () => ({ exists: false, directory: true }),
    close: answer => { answers.push(answer as never); },
  });
  assert.equal(controller.canAccept(), true);
  controller.accept();
  assert.equal(answers[0]?.response, RESPONSE_SUCCESS);
  assert.deepEqual((answers[0]?.results['uris'] as string[]).map(uri => uri.split('/').pop()), ['a.txt', 'b.txt']);
});

test('directory mode accepts the browsed folder without a selection', () => {
  const request = openFile({ directory: true });
  const answers: Array<{ response: number; results: Record<string, unknown> }> = [];
  const controller = createChooserController(request, {
    folder: () => join(root, 'pasta'), selection: () => [], select: () => {},
    exists: path => ({ exists: true, directory: path === join(root, 'pasta') }),
    close: answer => { answers.push(answer as never); },
  });
  assert.equal(controller.canAccept(), true);
});

test('directory confirmation defaults to the current folder and checkbox choices round-trip',()=>{
 const request=openFile({directory:true,choices:[['toggle','Option',[],'false']]});let answer:any;
 const controller=createChooserController(request,{folder:()=>root,selection:()=>[],select:()=>{},exists:()=>({exists:true,directory:true}),close:value=>answer=value});
 controller.setChoice('toggle','true');controller.accept();
 assert.equal(answer.response,0);assert.deepEqual(answer.results.uris,[toFileUri(root)]);assert.deepEqual(answer.results.choices,[['toggle','true']]);
});
test('MIME wildcards and common desktop glob character classes work',()=>{
 assert.equal(matchesFilter('photo.png',openFile({filters:[['Images',[[1,'image/*']]]]}).filters[0]!),true);
 assert.equal(matchesFilter('photo.PNG',openFile({filters:[['Images',[[0,'*.[pP][nN][gG]']]]]}).filters[0]!),true);
});
