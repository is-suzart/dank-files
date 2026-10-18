/** Serialize native mutations and wait for Quickshell's acknowledgement. */
export function createUiTransport(send:(message:object)=>void, timeoutMs=5000) {
  let sequence=0, closed=false, tail=Promise.resolve();
  const pending=new Map<number,{resolve(value:unknown):void;reject(error:Error):void;timer:ReturnType<typeof setTimeout>}>();
  function sendRequest(command:object):Promise<unknown> {
    if(closed) return Promise.reject(new Error('UI transport closed'));
    const request=sequence++;
    return new Promise<unknown>((resolve,reject)=>{
      const timer=setTimeout(()=>{pending.delete(request);reject(new Error('Quickshell UI patch timed out'));},timeoutMs);
      pending.set(request,{resolve,reject,timer});
      try {send({uiPatch:{request,command}});} catch(error) {
        pending.delete(request);clearTimeout(timer);reject(error);
      }
    });
  }
  function request(command:object) {
    const operation=tail.then(()=>sendRequest(command));
    tail=operation.then(()=>{},()=>{});
    return operation;
  }
  return {
    request,
    patch:(command:object):Promise<void>=>request(command).then(()=>{}),
    acknowledge(result:{request:number;error?:string;value?:unknown}) {
      const operation=pending.get(result.request);
      if(!operation) return;
      pending.delete(result.request);clearTimeout(operation.timer);
      if(result.error) operation.reject(new Error(result.error)); else operation.resolve(result.value);
    },
    close() {
      closed=true;
      for(const operation of pending.values()) {clearTimeout(operation.timer);operation.reject(new Error('UI transport closed'));}
      pending.clear();
    },
  };
}
