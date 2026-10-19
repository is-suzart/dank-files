import {readFile, mkdir, access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join, resolve} from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const sdk = JSON.parse(await readFile(new URL('../toolchain/sdk.json', import.meta.url), 'utf8'));
const source = process.env.NANDOMO_DMS_SOURCE ? resolve(process.env.NANDOMO_DMS_SOURCE) : join(root, '.build/dms-sdk');
const git = args => execFileSync('git', args, {encoding:'utf8'}).trim();
try { await access(join(source, '.git')); }
catch {
  if (process.env.NANDOMO_DMS_SOURCE) throw new Error('NANDOMO_DMS_SOURCE must be a checkout of the pinned SDK.');
  await mkdir(join(root, '.build'), {recursive:true});
  git(['clone', '--no-checkout', sdk.repository, source]);
  git(['-C', source, 'checkout', '--detach', sdk.commit]);
}
if (git(['-C', source, 'rev-parse', 'HEAD']) !== sdk.commit || git(['-C', source, 'status', '--porcelain'])) {
  throw new Error('Build requires a clean SDK checkout at '+sdk.commit+'; see source/README.md.');
}
execFileSync('pnpm', ['--filter', '@nandomo/dank-files', 'plugin:build'], {
  cwd:root, stdio:'inherit', env:{...process.env, NANDOMO_DMS_SOURCE:source},
});
