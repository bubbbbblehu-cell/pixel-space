import type { PortfolioCase } from '../game/planets';

export type ProjectImage = { src: string; alt: string; width?: number; height?: number };
export type MediaGroup = { kind: 'full'; images: ProjectImage[] };

export function projectMediaGroups(item: PortfolioCase): MediaGroup[] {
  const cover = item.image ? [{ src: item.image, alt: item.title, ...item.imageSize }] : [];
  return [{ kind: 'full', images: [...cover, ...(item.gallery ?? [])] }];
}

export function adjacentProject(index: number, delta: number, total: number): number {
  return Math.max(0, Math.min(total - 1, index + delta));
}
