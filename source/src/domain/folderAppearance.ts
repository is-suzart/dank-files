export interface FolderAppearance {color?:string;emblem?:string;icon?:string;}
export type FolderAppearances=Record<string,FolderAppearance>;
export function normalizeFolderAppearance(value:FolderAppearance):FolderAppearance {
  const result:FolderAppearance={};
  if(value.color && /^#[0-9a-f]{6}$/i.test(value.color))result.color=value.color;
  if(value.emblem && /^emblem-[a-z0-9-]+$/.test(value.emblem))result.emblem=value.emblem;
  if(value.icon && (/^file:\/\//.test(value.icon) || /^[a-z0-9-]+$/.test(value.icon)))result.icon=value.icon;
  return result;
}
