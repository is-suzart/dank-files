import { importQml, createNativeScene } from '@nandomo/bridge-qml';
import { sourceOrigin } from '@nandomo/core';
const qml=importQml('QtQuick');
const sourceFixture=<qml.Item objectName="sourceFixture" />;
export function fixtureLocation() {
  const scene=createNativeScene(sourceFixture,()=>{});
  try {return {origin:sourceOrigin(sourceFixture),source:scene.source};}
  finally {scene.dispose();}
}
