import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

for (const args of [[], ['--dbus']]) test(`FileManager1 is opt-in: ${args.length ? 'enabled' : 'default'}`, async () => {
  const helper = fileURLToPath(new URL('../scripts/linux-desktop-smoke.py', import.meta.url));
  const { stdout, stderr } = await promisify(execFile)('dbus-run-session', ['--', 'python3', helper, ...args], { timeout: 15000 });
  assert.match(stdout, /LINUX_DESKTOP_PASS/);
  assert.doesNotMatch(stderr, /Traceback/);
});
