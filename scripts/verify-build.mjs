import {readFile, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(process.execPath, ['scripts/build.mjs'], {cwd:root, stdio:'inherit'});
const built = join(root, 'source/dist/dankFiles');
const files = ['plugin.json', 'FilesWidget.qml', ...(await readdir(join(root,'app'))).sort().map(name=>'app/'+name)];
assert.deepEqual((await readdir(join(built,'app'))).sort(), (await readdir(join(root,'app'))).sort());
for (const file of files) {
  assert.ok((await readFile(join(root,file))).equals(await readFile(join(built,file))), 'Build differs from shipped runtime: '+file);
}
console.log('DANK_FILES_REPRODUCIBLE_BUILD_PASS: '+files.length+' shipped runtime files match byte for byte');
