# DMS compatibility and related plugins

## DMS shared widgets

Dank Files 0.1.1 uses the current `qs.DCommon` SDK and detects the DMS installation
layout at launch. DMS 1.6.3 exposes `DankCommon`; the current upstream checkout
(`v1.7-beta`) exposes `DCommon`, including the renamed `DButton`, `DTextField`,
`DSlider`, `DToggle` and `DIcon` types. Both use the real installed SDK, not a
bundled substitute.

For legacy installations, the launcher and dynamic UI compiler translate generated
QML import/type references to the legacy names. User file data and reactive
bindings are not rewritten. Missing SDKs produce an explicit error. A DMS source
checkout must initialize its `dank-qml-common` submodule. Explicit source paths
can point to the repository root or its `quickshell` directory.

The minimum advertised DMS version is 1.6.3. Package relocation and real Qt-window
checks passed against the installed 1.6.3 SDK and upstream DMS commit
`207cbe5aae538f250d241f40a10d087d0fbcd15d`, with shared SDK submodule
`2416d14b889d6dcba43d5ec010f7f7da1d3480ea`. Native workflow checks exercised
search, undo, archive, extraction, trash restoration and locale in both layouts.
The current SDK also passed the public FileChooser portal through a real Wayland
chooser. The widget test checks hover/click dispatch and reactive horizontal and
vertical icon sizes. This is not a claim that every DMS release was tested.

Application source builds require the current DCommon SDK for declaration
discovery: set `NANDOMO_DMS_SOURCE` to a current DMS checkout's `quickshell`
directory when developing on a legacy installed DMS. Prebuilt installations
support either detected runtime layout.

## Relationship to DMS File Manager

[DMS File Manager](https://github.com/suruibin/dms-filemanager) already provides
file browsing, multiple views, file operations, multi-selection, previews, trash
and drive management. Those overlapping features alone do not distinguish
Dank Files. The comparison below was checked against that repository's commit
`712154f3eb5dae789ce03f0700488163928395fa` and its 1.0.7 manifest/README/source.

Dank Files proposes a different scope:

- A DankBar launcher for a separate Quickshell application, with its own Node
  backend and GIO helper; the existing plugin is a `desktop-widget` inside DMS.
  This isolation costs additional processes and runtime dependencies.
- Optional Linux default-file-manager registration (`inode/directory`) and
  `org.freedesktop.FileManager1` integration for revealing files and folders.
- An optional `org.freedesktop.impl.portal.FileChooser` implementation for
  applications' open/save dialogs, including multiple selection and folder
  selection. Installing the widget does not automatically enable it.
- Steam/Proton, Heroic and Lutris library/prefix discovery and navigation.

No FileManager1/FileChooser implementation or game-provider discovery was found
in the compared source. This does not claim the existing project is abandoned,
or that its normal file-management features are inferior. The registry's
maintainers decide whether these additions meet the major-improvement exception
to their duplication policy.

## Rebuilding and dependency scope

The app is independently rebuildable from the source and scoped toolchain in
this repository; see [build instructions](source/README.md). The plugin review
surface is the shipped file manager and its included dependencies, not a release
of unrelated Nandomo adapters. `pnpm verify:build` checks TSX-to-runtime parity.

Arch packages `QtQuick.Pdf` inside `qt6-webengine`; the app does not import
QtWebEngine. Removing that package on Arch would remove PDF preview support.
See [package ownership verification](INSTALL.md#qt-pdf-package-names).
