# Scoped Dank Files build toolchain

Only the three Nandomo packages required by Dank Files are included here.
Sources are the same implementations used by the application, with package
manifests adjusted for this standalone workspace and pinned external dependencies.
No GTK/Compose/web adapters, applications, credentials, build caches or native
host binaries are included. This is not a separate framework release.

See [build instructions](../source/README.md). `sdk.json` pins the external DMS
shared-widget SDK; that SDK is fetched for development and is not bundled.
