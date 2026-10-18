export interface Entry { name: string; path: string; directory: boolean; symlink: boolean; size: number; modified: number; icon: string; folderColor?:string; emblem?:string; }
export interface Place { device?:string; id?: string; icon?: string; name: string; path: string; mounted?: boolean; }
export interface GameGroup { name: string; places: Place[]; }
export type Sort = 'name' | 'size' | 'modified' | 'type';
export type ViewMode = 'list' | 'grid' | 'columns';
export interface DirectoryColumn { path: string; entries: Entry[]; }
export interface DesktopTheme { palette: Record<string,string>; icons: Record<string,string>; }
