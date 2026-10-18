import { tsImport } from 'tsx/esm/api';
import { fileURLToPath } from 'node:url';
await tsImport('../tests/sidebar-native-fixture.ts',{parentURL:import.meta.url,
  tsconfig:fileURLToPath(new URL('../tsconfig.json',import.meta.url))});
