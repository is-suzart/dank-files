export interface Preferences {gridSize:number;thumbnails:boolean;foldersFirst:boolean;singleClick:boolean;showTerminal:boolean;detailsAlwaysVisible:boolean;reduceAnimations:boolean;showSidebarSpecial:boolean;showSidebarPlaces:boolean;showSidebarVolumes:boolean;showSidebarGames:boolean;}
export const defaultPreferences:Preferences={gridSize:96,thumbnails:true,foldersFirst:true,singleClick:false,showTerminal:true,detailsAlwaysVisible:false,reduceAnimations:false,showSidebarSpecial:true,showSidebarPlaces:true,showSidebarVolumes:true,showSidebarGames:true};
export function normalizePreferences(raw:unknown):Preferences {
  const value=raw && typeof raw==='object' ? raw as Record<string,unknown> : {};
  const result={...defaultPreferences};
  if(typeof value.gridSize==='number' && Number.isFinite(value.gridSize))result.gridSize=Math.max(48,Math.min(160,Math.round(value.gridSize)));
  for(const key of ['thumbnails','foldersFirst','singleClick','showTerminal','detailsAlwaysVisible','reduceAnimations','showSidebarSpecial','showSidebarPlaces','showSidebarVolumes','showSidebarGames'] as const)if(typeof value[key]==='boolean')result[key]=value[key];
  return result;
}
