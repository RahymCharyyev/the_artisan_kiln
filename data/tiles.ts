const TILE_NUMBERS = Array.from({ length: 22 }, (_, index) => index + 1);

export type TileId = `tile${(typeof TILE_NUMBERS)[number]}`;

function tileId(num: number): TileId {
  return `tile${num}` as TileId;
}

const FEATURED_NAMES: Partial<Record<number, string>> = {
  1: "Ocean Wave",
  3: "Terracotta Dot",
  7: "Forest Fern",
  8: "Yellow Star",
};

const FEATURED_PRICES: Partial<Record<number, number>> = {
  1: 28,
  3: 26,
  7: 30,
  8: 29,
};

function tileName(num: number): string {
  return FEATURED_NAMES[num] ?? `Collection ${String(num).padStart(2, "0")}`;
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
    acc[id] = {
      id,
      name: tileName(num),
      unitPriceUSD: tilePrice(num),
      swatchSrc: `/tiles/${num}.png`,
      patternSrc: `/tiles/${num}.png`,
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
  tileId(7),
  tileId(3),
  tileId(8),
] as const satisfies readonly TileId[];

export function getTile(tileId: TileId): TileCatalogEntry {
  return TILES[tileId];
}

export function isTileId(value: string): value is TileId {
  return value in TILES;
}
