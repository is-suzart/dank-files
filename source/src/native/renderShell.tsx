import { createNativeScene } from "@nandomo/bridge-qml";
import type { QmlScope } from "@nandomo/bridge-qml";
import { Shell } from "./Shell.js";
/** Only generated runtime output is QML; the application's UI source is TSX. */
export function renderShell(nativeProbe?: (scope: QmlScope) => unknown) {
  const scene = createNativeScene(<Shell nativeProbe={nativeProbe} />, () => {}, undefined, undefined, {
    fragment: true,
  });
  try {
    return (
      "//@ pragma UseQApplication\n//@ pragma AppId io.github.is_suzart.DankFiles\n" +
      scene.source
    );
  } finally {
    scene.dispose();
  }
}
