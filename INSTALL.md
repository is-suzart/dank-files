# Dank Files

A file manager for Dank Material Shell, launched in its own Quickshell window.
The interface is authored in TypeScript/TSX using Nandomo; the installed QML and
JavaScript backend are generated and bundled. Installing does not require the
Nandomo checkout, pnpm, TypeScript or a build step.

## Requirements

- Linux, Node.js 20+, Dank Material Shell 1.6.3+ and Quickshell.
- Qt Quick Controls, Layouts, Dialogs, PDF and Multimedia modules.
- GLib/GIO (`gio`), libarchive (`bsdtar`), udisks2 (`udisksctl`, mount/unmount)
  and xdg-utils (`xdg-mime` associations, `xdg-open` fallback).
- Python 3, PyGObject and GTK 4 for desktop clipboard, D-Bus and network integration.
- Optional: GVfs/FUSE and the appropriate GVfs backends for network locations;
  `ffmpegthumbnailer` for video thumbnails. Without it, video thumbnails are unavailable.
- Video playback also depends on the codecs available to Qt Multimedia.

Package names vary by distribution. On Arch, install `python-gobject`, `gtk4`,
`udisks2` and `xdg-utils`; `gvfs` and `ffmpegthumbnailer` are optional.

## Install in DMS

Copy the complete plugin directory to
`~/.config/DankMaterialShell/plugins/dankFiles`.
In DMS Settings → Plugins, scan and enable **Dank Files**, then add its widget to
DankBar. Hovering does not launch it; clicking opens one independent window.

To run directly from the plugin directory:

```bash
node app/launch.mjs /path/to/folder
```

The launcher finds the running DMS shared-widget directory (`DCommon` or legacy `DankCommon`). If discovery fails,
set `NANDOMO_DMS_SOURCE` to the DMS quickshell directory containing `DCommon` or `DankCommon`.
Wayland sessions prefer native Wayland over an inherited `xcb` setting;
`NANDOMO_FM_QT_PLATFORM` is an explicit diagnostic override.
Icons follow the theme configured in DMS, including inherited themes.

## Register as a file manager

```bash
node app/register-desktop.mjs
```

This creates the Dank Files application entry and advertises folder support.
It does not change your default file manager. Optional FileManager1 D-Bus
activation is available with `node app/register-desktop.mjs --dbus`; it refuses
to replace an existing user activation file. To enable it for a single window,
run `node app/launch.mjs --dbus`. Normal launches do not claim
`org.freedesktop.FileManager1`; clipboard and GIO support remain available.

Files open through `dms open <path>`. If the `dms` executable is unavailable,
Dank Files falls back to `xdg-open`; errors from an available `dms` are reported.

Preferences currently retain the `nandomo-file-manager` configuration directory
for compatibility with earlier local previews. Framework-related environment
variables also retain their `NANDOMO_` prefix.

## Updates and removal

Finish active file operations and close Dank Files before replacing or removing
its installation. Disable the plugin before removing its directory. Closing a
file manager window does not terminate DMS; preferences are preserved.

The application ships Brazilian Portuguese, English and Simplified Chinese UI
catalogs. Language is selected at startup; filenames and user labels are preserved.
Undo is session-local and does not cover every operation. Replacement operations
clear previous undo history. Real network behavior depends on the mounted backend.

## Qt PDF package names

Dank Files imports `QtQuick.Pdf`, not `QtWebEngine`. On Arch Linux the
`QtQuick/Pdf/qmldir` module is supplied by **qt6-webengine** (verified with
`pacman -Qo /usr/lib/qt6/qml/QtQuick/Pdf/qmldir`, package 6.11.2-2).
The package dependency is necessary for PDF previews even though no WebEngine
API is used. Other distributions may provide Qt PDF as a separate package.

## Source

Project: https://github.com/is-suzart/dank-files

Application sources are TypeScript/TSX; generated `.qml` files are installation
artifacts. The distribution repository includes the application source and the three
scoped Nandomo packages needed to rebuild it. See source/README.md for the pinned
build and byte-for-byte runtime verification instructions.

Dank Files is licensed under BSD-3-Clause. Third-party runtime dependencies retain their own licenses; see LICENSE and THIRD_PARTY_NOTICES.md in the distribution repository.

## Portal FileChooser backend (opt-in)

The bundle includes an `org.freedesktop.impl.portal.FileChooser` backend for
OpenFile, SaveFile and SaveFiles. Applications that use the desktop portal can
select files in Dank Files, including multiple files and folders, filters,
additional choices and explicit overwrite confirmation.

From an installed plugin directory:

```bash
node app/install-portal-backend.mjs             # preview; writes nothing
node app/install-portal-backend.mjs --enable
systemctl --user restart xdg-desktop-portal.service
```

Development: run `pnpm plugin:build`, then use
`node scripts/install-portal-backend.mjs --enable` from the application directory.
The installer registers the backend for the current user, backs up the active
portal configuration (including desktop-specific configurations), and changes
only `org.freedesktop.impl.portal.FileChooser` under `[preferred]` to
`dank-files;gtk`. Screen sharing, screenshots and other portal preferences stay
as configured. GTK remains an alternative preference, not a per-request crash
recovery guarantee. `--uninstall` removes the registration and restores the
configuration backup; restart the portal service afterward.

Requires `xdg-desktop-portal`, Python/PyGObject, Node, Quickshell and an available
DMS shared-widget source. Restart browsers after changing the portal. Browsers
which use their own file dialogs must first enable their portal integration;
setting `inode/directory` alone does not select upload/download dialogs.

The chooser currently opens as a separate window: foreign-parent attachment and
browser-relative modality are not implemented. MIME filters use the OS
shared-mime-info catalog, with common-type fallbacks on minimal installations.

Validation includes the D-Bus backend contract and public portal forwarding on
private buses. `pnpm exec tsx tests/portal-native-smoke.tsx` additionally runs the
public portal through a real Quickshell chooser, including subfolder navigation,
filtering and file selection; set `PORTAL_TEST_PLATFORM=wayland` for a native
Wayland run. No browser profiles are modified by the installer.

## DMS compatibility and overlapping plugins

See [compatibility notes](COMPATIBILITY.md) for the tested DMS layouts and the
comparison with the existing DMS File Manager plugin. Source builds require the
current DCommon SDK; prebuilt packages adapt to the detected runtime layout.
