import { adaptDmsQml } from '../../scripts/dms-source.mjs';
import { signal } from '@nandomo/core';
import { createNativeScene, createQmlScope, qmlExpression, type QmlObject } from '@nandomo/bridge-qml';

declare const Style: { surfaceContainerHigh: string; surfaceText: string };

/** Native compilation stays outside application components. */
export function createQuickshellScene(tree:unknown, context:string, onError:(error:unknown)=>void,
  patch?: (command:object)=>Promise<void>, request?: (command:object)=>Promise<unknown>) {
  const bindings=signal<Record<string,unknown>>({});
  const scene=createNativeScene(tree,
    (key,value)=>bindings.set({...bindings.peek(),[key]:value}),patch ? command=>patch('source' in command && typeof command.source==='string' ? {...command,source:adaptDmsQml(command.source)} : command) : undefined,onError,
    {fragment:true,dynamicFragments:!!patch,context,imports:['qs.DCommon.Common'],
      dialogAppearance:{background:qmlExpression(createQmlScope(),(_objects)=>Style.surfaceContainerHigh),foreground:qmlExpression(createQmlScope(),(_objects)=>Style.surfaceText)}});
  return {
    snapshot:()=>({source:adaptDmsQml(scene.source),bindings:bindings()}),
    dispatch:scene.dispatch,
    mount:()=>scene.mount(name => {
      if(!request) throw new Error('Native reference transport unavailable');
      const call=(operation:string, args:object)=>request({cmd:'native_object',object:name,operation,...args});
      const object:QmlObject={objectName:name,
        inspect:properties=>call('inspect',{properties}) as Promise<Record<string,unknown>>,
        set:(property,value)=>call('set',{property,value}).then(()=>{}),
        invoke:(method,...args)=>call('invoke',{method,args}),
      };
      return object;
    }),
    dispose:scene.dispose,
  };
}
