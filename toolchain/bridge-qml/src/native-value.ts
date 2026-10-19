/** Native enum reference. Only qualified identifiers are accepted, never executable QML. */
export interface QmlEnum { readonly __qmlEnum: string; }
export function qmlEnum(reference:string):QmlEnum {
  if(!/^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)+$/.test(reference))throw new TypeError('Invalid QML enum reference');
  return Object.freeze({__qmlEnum:reference});
}
export function isQmlEnum(value:unknown):value is QmlEnum {
  return typeof value==='object' && value!==null && '__qmlEnum' in value &&
    typeof value.__qmlEnum==='string' && /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)+$/.test(value.__qmlEnum);
}
