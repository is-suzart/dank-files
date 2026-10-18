# Application source snapshot

This directory contains only the Dank Files application's TypeScript/TSX source, tests and packaging scripts. It does not contain the Nandomo framework or other example applications.

The current development package still uses `workspace:*` dependencies for `@nandomo/core` and `@nandomo/bridge-qml`. Those framework packages are not published independently yet. This is **not** a standalone `npm install` development package; the root repository is the standalone installable distribution.

To rebuild using a matching Nandomo workspace, place this application's contents in that workspace's `examples/file-manager-qml` directory, retain/regenerate its local QML metadata, and run there:

```bash
pnpm qml:prepare
pnpm test
pnpm plugin:test
```

The workspace's application `tsconfig.json` extends `../../tsconfig.base.json`; this snapshot includes a local copy of that configuration for reference. The workspace packaging command writes `dist/dankFiles/`. Publish the contents of that generated directory as the plugin runtime, and keep this source snapshot in sync.

`WORKSPACE.md` contains the longer development notes from the application. Some commands describe the original monorepo layout and are not installation instructions for this standalone repository.
