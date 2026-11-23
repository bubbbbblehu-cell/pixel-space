// Demo boards are small, single-size images.
export const imageVariants: Record<string, {
  width?: number;
  height?: number;
  thumbnail?: string;
  preview?: string;
  localThumbnail?: string;
  compactPreview?: string;
  compactWidth?: number;
  previewWidth?: number;
  avifSources?: { src: string; width: number }[];
}> = {};
