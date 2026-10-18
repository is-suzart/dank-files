import { tsImport } from 'tsx/esm/api';
const { verifyDiagnostics } = await tsImport('./diagnostics-fixture.ts', {parentURL:import.meta.url});
await verifyDiagnostics();
console.log('NATIVE_TSX_DIAGNOSTIC_PASS');
