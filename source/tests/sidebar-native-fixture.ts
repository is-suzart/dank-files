import { i18n } from '../src/infrastructure/i18n.js';
import { signal, computed, effect, batch } from '@nandomo/core';
import { createInterface } from 'node:readline';
import { Sidebar } from '../src/components/Sidebar.js';
import { createQuickshellScene } from '../src/infrastructure/quickshellScene.js';
import { createUiTransport } from '../src/infrastructure/ui-transport.js';
import type { Place, GameGroup } from '../src/domain/files.js';
import type { VolumeUsage } from '../src/domain/volumeUsage.js';

// Native-only fixture: no filesystem access and no lsblk/xdg-open calls.
const drives=signal<Place[]>([]), games=signal<GameGroup[]>([]), path=signal('/fixture'), error=signal('');
const volumeUsage=signal<Record<string,VolumeUsage>>({});
const stage=signal('empty');
const send=(message:object)=>process.stdout.write(JSON.stringify(message)+'\n');
const transport=createUiTransport(send);
const scene=createQuickshellScene(Sidebar({manager:{home:'/fixture',drives,games,volumeUsage,navigate:async target=>{path.set(target);}}}),
  'app.sidebarBridge',problem=>error.set(String(problem)),transport.patch);
const state=computed(()=>({path:path(),home:'/fixture',error:error(),busy:false,view:'list',hidden:false,
  locale:i18n.locale(),themeReady:true,entries:[],columns:[],palette:{},icons:{},drives:drives(),games:games(),fixtureStage:stage(),
  sidebarUi:scene.snapshot()}));
const output=effect(()=>{send(state());});
const input=createInterface({input:process.stdin});
input.on('line',line=>{
  const command=JSON.parse(line);
  if(command.action==='uiMounted') scene.mount();
  if(command.action==='uiResult') transport.acknowledge(command.value);
  if(command.action==='uiEvent') scene.dispatch(command.value.handler,command.value.args);
  if(command.action==='fixture') batch(()=>{
    if(command.value==='populated') {
      drives.set([{id:'a',name:'Alpha',path:'/a',mounted:true},{id:'b',name:'Beta',path:'/b',mounted:false}]);
      games.set([{name:'Steam / Proton',places:[{name:'Proton',path:'/games/proton'}]}]);
    } else if(command.value==='updated') {
      drives.set([{id:'b',name:'Beta online',path:'/b-new',mounted:true},{id:'a',name:'Alpha renamed',path:'/a',mounted:true}]);
      games.set([{name:'Steam / Proton',places:[{name:'Proton renamed',path:'/games/proton'},{name:'Library',path:'/games/library'}]},
        {name:'Heroic',places:[{name:'Heroic prefix',path:'/games/heroic'}]}]);
    } else if(command.value==='removed') {
      drives.set([{id:'b',name:'Beta kept',path:'/b-new',mounted:true}]);
      games.set([{name:'Heroic',places:[{name:'Heroic kept',path:'/games/heroic'}]}]);
    } else {drives.set([]);games.set([]);}
    stage.set(command.value);
  });
});
input.on('close',()=>{output.dispose();scene.dispose();transport.close();state.dispose();process.exit(0);});
