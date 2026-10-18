import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,readlink} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {findDmsSource,mountDmsSource,adaptDmsQml} from '../scripts/dms-source.mjs';
test('discovery and mounting accept both released and current DMS layouts',async()=>{
 const root=await mkdtemp(join(tmpdir(),'dank-dms-layout-'));
 try {
  for(const [folder,type,legacy] of [['DankCommon','DankButton',true],['DCommon','DButton',false]]) {
   const source=join(root,folder,'quickshell'),runtime=join(root,folder,'runtime');
   await mkdir(join(source,folder,'Widgets'),{recursive:true});await mkdir(join(source,folder,'Common'));await mkdir(runtime);
   await writeFile(join(source,folder,'Widgets',type+'.qml'),'');await writeFile(join(source,folder,'Common/Style.qml'),'');
   assert.equal(await findDmsSource({NANDOMO_DMS_SOURCE:join(root,folder)}),source);
   const mounted=await mountDmsSource(source,runtime);assert.equal(mounted.legacy,legacy);assert.equal(await readlink(join(runtime,folder)),join(source,folder));
  }
  await assert.rejects(findDmsSource({NANDOMO_DMS_SOURCE:join(root,'missing')}),/Invalid DMS source/);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('the legacy adapter only maps generated module/type references',()=>{
 const source='import qs.DCommon.Common\nimport qs.DCommon.Widgets as W\nW.DButton { text: "DButton" }\nW.DIcon {}\nW.StyledText {}\nDTextField {}';
 assert.equal(adaptDmsQml(source,false),source);
 assert.equal(adaptDmsQml(source,true),'import qs.DankCommon.Common\nimport qs.DankCommon.Widgets as W\nW.DankButton { text: "DButton" }\nW.DankIcon {}\nW.StyledText {}\nDankTextField {}');
});
