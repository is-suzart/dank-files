import { mkdtemp, mkdir, writeFile, readFile, stat, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root=await mkdtemp('/tmp/nandomo-ux-smoke-');
function pdf() {
  let text='%PDF-1.4\n';
  const content='BT /F1 16 Tf 20 100 Td (Native preview) Tj ET';
  const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',`<< /Length ${content.length} >>\nstream\n${content}\nendstream`];
  const offsets=[0];
  for(const [i,obj] of objects.entries()){offsets.push(Buffer.byteLength(text));text+=`${i+1} 0 obj\n${obj}\nendobj\n`;}
  const xref=Buffer.byteLength(text);
  text+=`xref\n0 6\n0000000000 65535 f \n`+offsets.slice(1).map(offset=>`${String(offset).padStart(10,'0')} 00000 n \n`).join('');
  return text+`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
}
try {
  await Promise.all([
    mkdir(join(root,'Move target')),
    mkdir(join(root,'Steam/steamapps/common'),{recursive:true}),
    writeFile(join(root,'existing.txt'),'preserve me'),
    writeFile(join(root,'picture #.svg'),'<svg xmlns="http://www.w3.org/2000/svg" width="120" height="360"><rect width="120" height="360" fill="#80b080"/><circle cx="120" cy="90" r="55" fill="#ffd080"/></svg>'),
    writeFile(join(root,'document.pdf'),pdf()),
  ]);
  const child=spawn(process.execPath,[fileURLToPath(new URL('./run.mjs',import.meta.url)),'--ux-smoke'],{env:{...process.env,NANDOMO_FM_START_PATH:root,NANDOMO_FM_CONFIG_DIR:join(root,'preferences')},stdio:'inherit'});
  const timer=setTimeout(()=>child.kill('SIGTERM'),30000);
  let code;
  try {code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});}
  finally {clearTimeout(timer);}
  assert.equal(code,0,'Native UX smoke failed');
  assert.equal(await readFile(join(root,'existing.txt'),'utf8'),'preserve me');
  assert.equal(await readFile(join(root,'Move target','renamed.txt'),'utf8'),'');
  assert.equal(await readFile(join(root,'Created folder','renamed.txt'),'utf8'),'');
  await assert.rejects(stat(join(root,'renamed.txt')),{code:'ENOENT'});
  assert.equal((await stat(join(root,'Created folder'))).isDirectory(),true);
  await assert.rejects(stat(join(root,'created.txt')), {code:'ENOENT'});
  assert.equal(JSON.parse(await readFile(join(root,'preferences/preferences.json'),'utf8')).gridSize,128);
  console.log('FM_UX_FILESYSTEM_PASS');
} finally {await rm(root,{recursive:true,force:true});}
