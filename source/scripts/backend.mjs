import { register, tsImport } from 'tsx/esm/api';
import { fileURLToPath } from 'node:url';
if(process.env.NANDOMO_FM_DEV==='1') {
  register({tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
  await import('../src/main.ts');
} else await tsImport('../src/main.ts', { parentURL: import.meta.url, tsconfig: fileURLToPath(new URL('../tsconfig.json',import.meta.url)) });
