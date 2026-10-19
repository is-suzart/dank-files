# Building Dank Files

This repository includes the application TSX and the build toolchain it uses.
No private package, global workspace link or full Nandomo checkout is required.
The scoped toolchain is source code, not an opaque precompiled compiler.

## Requirements

Use Node.js 20+ and pnpm 9.0.0 on Linux. Install the native application dependencies
listed in the root README, including Qt QML development metadata (`qmltypes`),
Quickshell and Qt Quick PDF/Multimedia. Qt metadata is read from the installed
modules to generate TypeScript declarations; those declarations are not bundled
runtime code. Qt packages must expose the APIs used by the TSX source.

Run from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm verify:build
pnpm test:source
```

The build downloads the upstream shared SDK pinned in `toolchain/sdk.json` to
`.build/dms-sdk`. To avoid this download, set `NANDOMO_DMS_SOURCE` to a clean git
checkout at that exact commit. The installed DMS is never changed. The lockfile
pins the JavaScript tool versions and integrity hashes.

`pnpm build` typechecks and builds into `source/dist/dankFiles/` and creates the
installation archive. `pnpm verify:build` also compares `plugin.json`,
`FilesWidget.qml` and every `app/` file against the checked-in distribution,
byte for byte. It fails if a source change has not been published to runtime.
Archive timestamps and documentation are not part of the byte comparison.

To update the distribution deliberately after editing source, copy the generated
`app/`, `FilesWidget.qml` and `plugin.json` from `source/dist/dankFiles/` to the
repository root, review the diff, then run the verification again.

## Scope

- `source/src/`: application UI, domain, use cases and infrastructure.
- `toolchain/core/`: reactive core used by the app and QML bridge.
- `toolchain/bridge-runtime/`: shared transport contracts and native update helpers.
- `toolchain/bridge-qml/`: TSX/native scene compiler, JSX runtime and QML tooling.

These are matching source snapshots of the three required packages. They are
included under BSD-3-Clause to make the app rebuildable and auditable; this is
not a release or a readiness claim for the entire Nandomo framework. Other
adapters and applications are not part of this plugin or its runtime. The
Nandomo native-host executable is not required: Dank Files uses Quickshell.
System dependencies and the upstream SDK retain their own licenses.

The build reads metadata without launching the GUI. Source tests cover application
behavior but do not prove browser integration or inter-app drag and drop in every
compositor. Native smoke scripts require a compatible desktop/test environment.
`WORKSPACE.md` retains older monorepo development notes; its absolute workspace
commands are historical and are not needed for this standalone build.
