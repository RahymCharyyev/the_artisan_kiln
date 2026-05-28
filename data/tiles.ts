const TILE_NUMBERS = Array.from({ length: 22 }, (_, index) => index + 1);

export type TileId = `tile${(typeof TILE_NUMBERS)[number]}`;

function tileId(num: number): TileId {
  return `tile${num}` as TileId;
}

const FEATURED_NAMES: Partial<Record<number, string>> = {
  1: 'Ocean Wave',
  7: 'Yellow Star',
  8: 'Forest Fern',
  17: 'Terracotta Dot',
};

const FEATURED_PRICES: Partial<Record<number, number>> = {
  1: 28,
  7: 29,
  8: 30,
  17: 26,
};

const FEATURED_IMAGES: Partial<
  Record<number, { swatchSrc: string; patternSrc: string }>
> = {
  // Dedicated ocean icon + wave pattern for the design row.
  1: { swatchSrc: '/tiles/ocean_wave.png', patternSrc: '/tiles/11.png' },
  7: { swatchSrc: '/tiles/7.png', patternSrc: '/tiles/7.png' },
  8: { swatchSrc: '/tiles/8.png', patternSrc: '/tiles/8.png' },
  17: { swatchSrc: '/tiles/17.png', patternSrc: '/tiles/17.png' },
};

function tileName(num: number): string {
  return FEATURED_NAMES[num] ?? `Collection ${String(num).padStart(2, '0')}`;
}

function tilePrice(num: number): number {
  return FEATURED_PRICES[num] ?? 27 + (num % 4);
}

export interface TileCatalogEntry {
  id: TileId;
  name: string;
  unitPriceUSD: number;
  swatchSrc: string;
  patternSrc: string;
}

export const TILES: Record<TileId, TileCatalogEntry> = TILE_NUMBERS.reduce(
  (acc, num) => {
    const id = tileId(num);
    const image = FEATURED_IMAGES[num];
    acc[id] = {
      id,
      name: tileName(num),
      unitPriceUSD: tilePrice(num),
      swatchSrc: image?.swatchSrc ?? `/tiles/${num}.png`,
      patternSrc: image?.patternSrc ?? `/tiles/${num}.png`,
    };
    return acc;
  },
  {} as Record<TileId, TileCatalogEntry>,
);

/** All catalogue tiles (1.png … 22.png) for palette and add-to-cart. */
export const TILE_IDS = TILE_NUMBERS.map((num) => tileId(num));

/** Default shopping-cart rows from the design mockup. */
export const CART_LINE_IDS = [
  tileId(1),
  tileId(8),
  tileId(17),
  tileId(7),
] as const satisfies readonly TileId[];

export function getTile(tileId: TileId): TileCatalogEntry {
  return TILES[tileId];
}

export function isTileId(value: string): value is TileId {
  return value in TILES;
}
