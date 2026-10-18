import { tsImport } from 'tsx/esm/api';
import { mkdtemp,symlink,writeFile,rm } from 'node:fs/promises';
import { fileURLToPath,pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { findDmsSource } from './dms-source.mjs';
const root=await mkdtemp(join(tmpdir(),'nandomo-pan-native-'));
try {
  const image=join(root,'image.svg'), pdf=join(root,'document.pdf');
  await writeFile(image,'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="blue"/></svg>');
  let text='%PDF-1.4\n';const offsets=[0];
  const content='BT /F1 16 Tf 20 100 Td (Pan fixture) Tj ET';
  const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 400] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',`<< /Length ${content.length} >>\nstream\n${content}\nendstream`];
  objects.forEach((object,i)=>{offsets.push(Buffer.byteLength(text));text+=`${i+1} 0 obj\n${object}\nendobj\n`;});
  const xref=Buffer.byteLength(text);text+='xref\n0 6\n0000000000 65535 f \n'+offsets.slice(1).map(offset=>`${String(offset).padStart(10,'0')} 00000 n \n`).join('');
  await writeFile(pdf,text+`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  const {renderPanFixture}=await tsImport('../tests/pan-native-fixture.tsx',{parentURL:import.meta.url,tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
  await writeFile(join(root,'shell.qml'),renderPanFixture());
  await symlink(join(await findDmsSource(),'DankCommon'),join(root,'DankCommon'),'dir');
  const child=spawn('qs',['--path',join(root,'shell.qml')],{env:{...process.env,QT_QPA_PLATFORM:'offscreen',QT_QUICK_BACKEND:'software',PAN_IMAGE:pathToFileURL(image).href,PAN_PDF:pathToFileURL(pdf).href},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',data=>{logs+=data;});child.stderr.on('data',data=>{logs+=data;});
  const timer=setTimeout(()=>child.kill('SIGTERM'),20000);
  try {const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});assert.equal(code,0,logs);assert.ok(logs.includes('PAN_NATIVE_PASS'),logs);assert.doesNotMatch(logs,/ReferenceError|TypeError|is not a function/);console.log('PAN_NATIVE_PASS: real mouse drag moves image and PDF; reset restores zoom, rotation and position');}
  finally{clearTimeout(timer);}
}finally{await rm(root,{recursive:true,force:true});}
