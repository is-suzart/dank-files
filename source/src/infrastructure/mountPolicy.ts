import { readFile } from 'node:fs/promises';
export function isRemoteMount(path:string,mountinfo:string):boolean {
  const decode=(value:string)=>value.replace(/\\([0-7]{3})/g,(_,octal)=>String.fromCharCode(parseInt(octal,8)));
  let longest=-1,remote=false;
  for(const line of mountinfo.split('\n')) {
    const [record,kind]=line.split(' - ');const target=decode(record?.split(' ')[4] ?? '');
    if(!target || !(path===target || path.startsWith(target==='/' ? '/' : target+'/')) || target.length<=longest)continue;
    longest=target.length;remote=/^(fuse\.|nfs|cifs|smb|davfs|9p)/.test(kind ?? '');
  }
  return remote;
}
export async function remotePath(path:string):Promise<boolean>{return isRemoteMount(path,await readFile('/proc/self/mountinfo','utf8'));}
