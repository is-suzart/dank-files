import { createNativeScene,createQmlScope,importQml,qmlExpression,qmlHandler,type QmlModule } from '@nandomo/bridge-qml';
import { FilePreview } from '../src/native/FilePreview.js';
const shell=importQml('Quickshell'), controls=importQml('QtQuick.Controls'), qt=importQml('QtQml');
const TestEvent=(importQml('QtTest') as QmlModule).TestEvent!;
declare const Quickshell:any, Qt:any;
export function renderPanFixture() {
  const scope=createQmlScope();for(const id of ['window','preview','mouse','timer'])scope.id(id);
  const scene=createNativeScene(<shell.ShellRoot qmlId="app" qmlMethods={{tr:qmlHandler(scope,(_q,text:any)=>text)}}>
    <controls.ApplicationWindow qmlId={scope.id('window')} visible={true} width={640} height={480}
      qmlDeclarations={{zoomValue:{type:'real',value:1},angleValue:{type:'real',value:0},resetIndex:{type:'int',value:0},imageMode:{type:'bool',value:true}}}>
      <FilePreview qmlId={scope.id('preview')} width={600} height={400} expanded={true}
        zoom={qmlExpression(scope,q=>q.window.zoomValue)} angle={qmlExpression(scope,q=>q.window.angleValue)} resetToken={qmlExpression(scope,q=>q.window.resetIndex)}
        kind={qmlExpression(scope,q=>q.window.imageMode ? 'image':'pdf')}
        source={qmlExpression(scope,q=>Quickshell.env(q.window.imageMode ? 'PAN_IMAGE':'PAN_PDF'))} />
      <TestEvent qmlId={scope.id('mouse')} />
      <qt.Timer qmlId={scope.id('timer')} interval={100} repeat={true} running={true}
        qmlDeclarations={{step:{type:'int',value:0},round:{type:'int',value:0},ticks:{type:'int',value:0},baseX:{type:'real',value:0},baseY:{type:'real',value:0}}}
        onTriggered={qmlHandler(scope,q=>{
          try {
            if(++q.timer.ticks>150)throw new Error('Pan timeout step '+q.timer.step+' '+q.preview.previewStatus);
            if(q.preview.previewStatus!=='ready')return;
            const area=q.preview.children.find(function(child:any){return child.objectName==='previewPan';});
            const content=q.preview.children.find(function(child:any){return child.objectName===(q.window.imageMode?'previewImage':'previewPdf');});
            if(q.timer.step===0){q.window.zoomValue=2;q.timer.step=1;}
            else if(q.timer.step===1 && area.enabled && content.scale===2){
              const point=content.mapToItem(q.preview,0,0);q.timer.baseX=point.x;q.timer.baseY=point.y;
              q.mouse.mousePress(area,250,150,Qt.LeftButton,Qt.NoModifier,0);
              q.mouse.mouseMove(area,300,190,0,Qt.LeftButton,Qt.NoModifier);q.timer.step=2;
            }else if(q.timer.step===2){
              q.mouse.mouseRelease(area,300,190,Qt.LeftButton,Qt.NoModifier,0);
              if(q.preview.panX!==50 || q.preview.panY!==40)throw new Error('Mouse pan failed '+q.preview.panX+','+q.preview.panY);
              const point=content.mapToItem(q.preview,0,0);
              if(Math.abs(point.x-q.timer.baseX-50)>1 || Math.abs(point.y-q.timer.baseY-40)>1)throw new Error('Content did not move');
              q.window.angleValue=90;q.timer.step=3;
            }else if(q.timer.step===3 && content.rotation===90){
              q.window.zoomValue=1;q.window.angleValue=0;q.window.resetIndex++;q.timer.step=4;
            }else if(q.timer.step===4 && content.scale===1 && content.rotation===0){
              if(q.preview.panX!==0 || q.preview.panY!==0)throw new Error('Reset retained pan');
              if(q.timer.round===0){q.timer.round=1;q.window.imageMode=false;q.timer.step=0;}
              else {console.warn('PAN_NATIVE_PASS: real mouse drag moves image and PDF; reset restores zoom, rotation and position');Qt.quit();}
            }
          }catch(error:any){console.warn('PAN_NATIVE_FAIL',error);Qt.exit(1);}
        })} />
    </controls.ApplicationWindow>
  </shell.ShellRoot>,()=>{},undefined,undefined,{fragment:true});
  try{return '//@ pragma UseQApplication\n'+scene.source;}finally{scene.dispose();}
}
