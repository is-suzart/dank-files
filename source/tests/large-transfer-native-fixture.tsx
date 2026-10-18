import { renderShell } from '../src/native/renderShell.js';
import { importQml,qmlHandler,type QmlScope } from '@nandomo/bridge-qml';
const qt=importQml('QtQml');
declare const Quickshell:any,Qt:any;
declare let stage:number,ticks:number,started:number,lastTick:number,maxGap:number,activeTicks:number,progressSeen:boolean,toggleSent:boolean,toggleAcknowledged:boolean,initialHidden:boolean;
function Probe({scope}:{scope:QmlScope}) {
 return <qt.Timer interval={25} repeat={true} running={true}
  qmlDeclarations={{stage:{type:'int',value:0},ticks:{type:'int',value:0},started:{type:'double',value:0},lastTick:{type:'double',value:0},maxGap:{type:'double',value:0},activeTicks:{type:'int',value:0},progressSeen:{type:'bool',value:false},toggleSent:{type:'bool',value:false},toggleAcknowledged:{type:'bool',value:false},initialHidden:{type:'bool',value:false}}}
  onTriggered={qmlHandler(scope,q=>{
   try {
    const now=Date.now();if(++ticks>2400)throw new Error('Large transfer timeout');
    if(!q.app.toolbarObject || q.app.state.busy)return;
    const cancel=Quickshell.env('TRANSFER_CANCEL')==='1';
    if(stage===0){
     if(q.app.state.path!==Quickshell.env('TRANSFER_START'))throw new Error('Unsafe start path');
     started=now;lastTick=now;initialHidden=!!q.app.state.hidden;
     q.app.send('drop',{urls:[Quickshell.env('TRANSFER_SOURCE_URL')],folder:Quickshell.env('TRANSFER_DESTINATION'),mode:'move'});stage=1;
    }else if(stage===1){
     maxGap=Math.max(maxGap,now-lastTick);lastTick=now;
     if(q.app.state.mutating){activeTicks++;
      if(q.app.state.operationProgress && q.app.state.operationProgress.completed>0){
       progressSeen=true;if(q.app.state.transferStatus.indexOf('Moving: ')!==0)throw new Error('Transfer status was not translated: '+q.app.state.transferStatus);
       if(cancel){
        const button=q.app.findUi('footerCancelTransfer',q.window);
        if(!button || !button.visible || button.text!==q.app.tr('Cancelar'))throw new Error('Footer cancel is unavailable');
        button.clicked();stage=2;
       }
       else if(!toggleSent){q.app.send('hidden');toggleSent=true;}
      }
      if(toggleSent && q.app.state.hidden!==initialHidden)toggleAcknowledged=true;
     }
     if(!q.app.state.mutating && progressSeen)stage=3;
    }else if(stage===2){maxGap=Math.max(maxGap,now-lastTick);lastTick=now;if(q.app.state.mutating)activeTicks++;else stage=3;}
    if(stage===3){
     if(cancel){if(q.app.state.error!==q.app.tr('Operação cancelada. Itens já concluídos foram preservados.'))throw new Error('Cancellation was not reported: '+q.app.state.error);}
     else {if(q.app.state.error)throw new Error(q.app.state.error);if(!toggleAcknowledged)throw new Error('Backend did not respond to an interaction during transfer');}
     if(activeTicks<2 || maxGap>2000)throw new Error('UI heartbeat stalled: '+maxGap+' ms');
     console.warn('LARGE_TRANSFER_NATIVE_PASS '+JSON.stringify({cancel:cancel,elapsedMs:now-started,uiTicksDuringTransfer:activeTicks,maxUiGapMs:maxGap,backendInteraction:toggleAcknowledged,progress:progressSeen}));Qt.quit();
    }
   }catch(error:any){console.warn('LARGE_TRANSFER_NATIVE_FAIL',error);Qt.exit(1);}
  })} />;
}
export const renderLargeTransferShell=()=>renderShell(scope=><Probe scope={scope}/>);
