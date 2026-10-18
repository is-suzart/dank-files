# Dank Files

A file manager for Dank Material Shell, launched in its own Quickshell window.
The interface is authored in TypeScript/TSX using Nandomo; the installed QML and
JavaScript backend are generated and bundled. Installing does not require the
Nandomo checkout, pnpm, TypeScript or a build step.

## Requirements

- Linux, Node.js 20+, Dank Material Shell 1.5+ and Quickshell.
- Qt Quick Controls, Layouts, Dialogs, PDF and Multimedia modules.
- GLib/GIO (`gio`) and libarchive (`bsdtar`).
- Python 3, PyGObject and GTK 4 for desktop clipboard, D-Bus and network integration.
- Optional: GVfs/FUSE and the appropriate GVfs backends for network locations;
  `ffmpegthumbnailer` for video thumbnails; `udisksctl` for volume actions.
- Video playback also depends on the codecs available to Qt Multimedia.

Package names vary by distribution. On Arch, the relevant optional integration
packages include `python-gobject`, `gtk4`, `gvfs`, `ffmpegthumbnailer` and `udisks2`.

## Install in DMS

Copy the complete plugin directory to
`~/.config/DankMaterialShell/plugins/dankFiles`.
In DMS Settings → Plugins, scan and enable **Dank Files**, then add its widget to
DankBar. Hovering does not launch it; clicking opens one independent window.

To run directly from the plugin directory:

```bash
node app/launch.mjs /path/to/folder
```

The launcher finds the running DMS DankCommon directory. If discovery fails,
set `NANDOMO_DMS_SOURCE` to the DMS directory containing `DankCommon`.
Wayland sessions prefer native Wayland over an inherited `xcb` setting;
`NANDOMO_FM_QT_PLATFORM` is an explicit diagnostic override.
Icons follow the theme configured in DMS, including inherited themes.

## Register as a file manager

```bash
node app/register-desktop.mjs
```

This creates the Dank Files application entry and advertises folder support.
It does not change your default file manager. Optional FileManager1 D-Bus
activation is available with `--dbus`; it refuses to replace an existing user
activation file.

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

## Source

Project: https://github.com/is-suzart/dank-files

Application sources are TypeScript/TSX; generated `.qml` files are installation
artifacts. The distribution repository includes the application source snapshot
but not the entire Nandomo framework workspace. See its README for build details.

No license has been selected for this initial public preview.
