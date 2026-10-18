import { component } from '@nandomo/core';
import { importQml, createQmlScope, qmlExpression, qmlHandler } from '@nandomo/bridge-qml';
const qml=importQml('QtQuick');
const controls=importQml('QtQuick.Controls');
const layouts=importQml('QtQuick.Layouts');
const media=importQml('QtMultimedia');
declare const parent:any, MediaPlayer:any;
export const VideoPreview=component<Record<string,any>>('VideoPreview', props=>{
  const scope=createQmlScope({ ...(props.qmlId ? {root:props.qmlId} : {}), app:'app' });scope.id('root');scope.id('video');
  return <qml.Item qmlId={scope.id('root')}
    qmlDeclarations={{source:{type:'url',value:''},
      previewStatus:{type:'string',readonly:true,value:qmlExpression(scope,$qml=>$qml.video.error!==MediaPlayer.NoError ? 'error' : $qml.video.hasVideo ? 'ready' : 'loading')},
      aspectRatio:{type:'real',readonly:true,value:qmlExpression(scope,$qml=>$qml.video.implicitHeight>0 ? $qml.video.implicitWidth/$qml.video.implicitHeight : 16/9)},
    }} {...props}>
    <media.Video qmlId={scope.id('video')} objectName="previewVideo"
      width={qmlExpression(scope,()=>parent.width)} height={qmlExpression(scope,()=>Math.max(0,parent.height-44))}
      source={qmlExpression(scope,$qml=>$qml.root.source)} autoPlay={false}
    />
    <layouts.RowLayout height={40} width={qmlExpression(scope,()=>parent.width)}
      {...{'anchors.bottom':qmlExpression(scope,()=>parent.bottom)}}>
      <controls.Button objectName="videoPlayPause"
        text={qmlExpression(scope,$qml=>$qml.app.tr($qml.video.playbackState===MediaPlayer.PlayingState ? 'Pausar' : 'Reproduzir'))}
        enabled={qmlExpression(scope,$qml=>$qml.root.previewStatus==='ready')}
        onClicked={qmlHandler(scope,$qml=>{if($qml.video.playbackState===MediaPlayer.PlayingState)$qml.video.pause();else $qml.video.play();})} />
      <controls.Slider objectName="videoSeek" from={0} to={qmlExpression(scope,$qml=>$qml.video.duration)}
        value={qmlExpression(scope,$qml=>$qml.video.position)}
        enabled={qmlExpression(scope,$qml=>$qml.video.seekable)}
        {...{'Layout.fillWidth':true,'Accessible.name':qmlExpression(scope,$qml=>$qml.app.tr('Posição do vídeo'))}}
        onMoved={qmlHandler(scope,($qml)=>{$qml.video.seek(value);})} />
    </layouts.RowLayout>
  </qml.Item>;
});
declare const value:any;
