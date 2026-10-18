# Runtime dependency licenses

BSD-3-Clause covers the Dank Files code owned by this project. It does not
replace the licenses of third-party dependencies or grant rights to their
trademarks. The current plugin distribution does not bundle Qt, Quickshell,
DMS, GTK or icon-theme binaries/assets; they are installed separately.

- **Dank Material Shell**: MIT. [Upstream license](https://github.com/AvengeMedia/DankMaterialShell/blob/master/LICENSE).
- **Quickshell**: LGPL version 3. [Upstream license](https://github.com/quickshell-mirror/quickshell/blob/master/LICENSE).
- **Qt**: module-specific licensing, including LGPL, GPL and commercial options.
  [Qt licensing](https://doc.qt.io/qt-6/licensing.html).
  [Qt PDF](https://doc.qt.io/qt-6/qtpdf-index.html) offers LGPLv3, GPLv2 and commercial options;
  [Qt PDF third-party notices](https://doc.qt.io/qt-6/qtpdf-licensing.html) also apply to that dependency.
- **GTK, GLib/GIO, PyGObject, libarchive, GVfs, codecs and icon themes**: separate
  system dependencies, each distributed under its upstream license. Refer to
  the notices installed with the exact packages used on the target system.

When distributing a larger bundle, AppImage, container or device image that
includes these components, preserve their required notices and comply with
applicable source, modification, replacement/relinking and installation-information
obligations. Do not assume the application's BSD license licenses the whole bundle.
A GPL-only module can add obligations to a combined distribution; changing the
application authoring language from QML to TSX does not remove those obligations.

These notes describe the current dependency boundary, not an exhaustive audit of
all Nandomo framework adapters or all possible Qt deployment configurations.
