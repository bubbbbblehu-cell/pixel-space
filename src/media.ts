export function mediaKey(src: string): string {
  return src.slice(import.meta.env.BASE_URL.length);
}

export function mediaAsset(key: string): string {
  return import.meta.env.BASE_URL + key;
}
