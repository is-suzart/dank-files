export function validateName(name: string): string {
  if (!name.trim() || name === '.' || name === '..' || /[/\\\0]/.test(name)) {
    throw new Error('Informe um nome sem separadores de diretório.');
  }
  return name;
}
export function previewKind(name: string): 'image'|'pdf'|'video'|'none' {
  if (/\.(mp4|mkv|webm|mov|avi|m4v|ogv|mpeg|mpg)$/i.test(name)) return 'video';
  if (/\.pdf$/i.test(name)) return 'pdf';
  return /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(name) ? 'image' : 'none';
}
