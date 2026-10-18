export function dmsLayout(source:string):Promise<{folder:string;legacy:boolean}>;
export function findDmsSource(env?:NodeJS.ProcessEnv):Promise<string>;
export function mountDmsSource(source:string,runtime:string):Promise<{folder:string;legacy:boolean}>;
export function adaptDmsQml(source:string,legacy?:boolean):string;
