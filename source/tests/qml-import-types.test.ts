import { test } from 'node:test';
import assert from 'node:assert/strict';
import { importQml, createQmlRef } from '@nandomo/bridge-qml';
const widgets=importQml('qs.DCommon.Widgets');
const dialogs=importQml('QtQuick.Dialogs');
const picker=createQmlRef(dialogs.FileDialog);
const layouts=importQml('QtQuick.Layouts');
// These compile-time assertions ensure module augmentation selects precise types.
if(false) {
  void picker.current?.invoke('open');
  // @ts-expect-error FileDialog.open has no arguments.
  void picker.current?.invoke('open',123);
  // @ts-expect-error The discovered method surface rejects nonexistent methods.
  void picker.current?.invoke('notAQtMethod');
  // @ts-expect-error Native text is a string binding, not a number.
  widgets.DButton({text:123});
  // @ts-expect-error A discovered module must reject nonexistent components.
  widgets.DoesNotExist({});
  widgets.StyledText({text:'Inherited Text property',color:'#ffffff'});
  widgets.DTextField({text:'Resolved alias'});
  // @ts-expect-error Inherited native text is still a string binding.
  widgets.StyledText({text:123});
  // @ts-expect-error A resolved text alias must not accept numbers.
  widgets.DTextField({text:123});
  // @ts-expect-error Native spacing is a numeric binding.
  layouts.ColumnLayout({spacing:'invalid'});
}
test('discovered module types still instantiate the original native components',()=>{
  assert.equal(widgets.DButton({text:'Native'}).kind,'qml:DButton');
  assert.equal(layouts.ColumnLayout({spacing:12}).kind,'qml:ColumnLayout');
});
