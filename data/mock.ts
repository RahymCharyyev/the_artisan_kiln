import type { TileId } from "@/data/tiles";

/** Quantities from design_desktop.png */
export const CART_MOCK_QUANTITIES: Record<
  "tile1" | "tile3" | "tile7" | "tile8",
  number
> = {
  tile1: 150,
  tile7: 75,
  tile3: 200,
  tile8: 50,
};

/** Partial 6×6 grid fill from design_desktop.png (left side). */
export const CANVAS_MOCK_GRID: (TileId | null)[] = [
  "tile1",
  "tile1",
  "tile7",
  "tile3",
  "tile3",
  "tile8",
  "tile7",
  "tile1",
  "tile7",
  null,
  "tile3",
  "tile8",
  "tile1",
  "tile3",
  "tile8",
  "tile1",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
