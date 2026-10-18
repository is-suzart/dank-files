import { createNativeScene,createQmlScope,importQml,qmlExpression,qmlHandler } from '@nandomo/bridge-qml';
import { FilePreview } from '../src/native/FilePreview.js';
const shell=importQml('Quickshell'), qml=importQml('QtQuick'), controls=importQml('QtQuick.Controls'), qt=importQml('QtQml');
declare const Quickshell:any, Qt:any, MediaPlayer:any;
export function renderVideoFixture() {
  const scope=createQmlScope();scope.id('preview');scope.id('timer');
  const scene=createNativeScene(<shell.ShellRoot qmlId="app" qmlMethods={{tr:qmlHandler(scope,(_q,text:any)=>text)}} qmlImports={['QtMultimedia']}>
    <controls.ApplicationWindow visible={true} width={640} height={480}>
      <FilePreview qmlId={scope.id('preview')} width={600} height={400} kind="video" expanded={true}
        source={qmlExpression(scope,()=>Quickshell.env('VIDEO_FIXTURE'))} />
      <qt.Timer qmlId={scope.id('timer')} interval={100} repeat={true} running={true}
        qmlDeclarations={{step:{type:'int',value:0},ticks:{type:'int',value:0}}}
        onTriggered={qmlHandler(scope,$qml=>{
          $qml.timer.ticks++;
          try {
            const loader=$qml.preview.children.find(function(child:any){return child.objectName==='previewVideoLoader';});
            if($qml.timer.ticks>150)throw new Error('Video timed out: '+$qml.preview.previewStatus);
            if($qml.timer.step===0 && $qml.preview.previewStatus==='ready') {
              const video=loader.item.children[0];
              if(video.playbackState!==MediaPlayer.StoppedState)throw new Error('Unexpected autoplay');
              video.play();$qml.timer.step=1;
            }else if($qml.timer.step===1 && loader.item.children[0].position>100) {
              loader.item.children[0].pause();loader.item.children[0].seek(1000);$qml.timer.step=2;
            }else if($qml.timer.step===2 && loader.item.children[0].position>=900) {
              if(loader.item.children[0].playbackState!==MediaPlayer.PausedState)throw new Error('Pause failed');
              $qml.preview.visible=false;$qml.timer.step=3;
            }else if($qml.timer.step===3 && !loader.item) {
              console.warn('VIDEO_NATIVE_PASS: loaded, no autoplay, play, pause, seek, unload on hide');Qt.quit();
            }
          }catch(error:any){console.warn('VIDEO_NATIVE_FAIL',error);Qt.exit(1);}
        })} />
    </controls.ApplicationWindow>
  </shell.ShellRoot>,()=>{},undefined,undefined,{fragment:true});
  try{return '//@ pragma UseQApplication\n'+scene.source;}finally{scene.dispose();}
}
