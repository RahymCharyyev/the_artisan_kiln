"use client";

import { useAppSelector } from "@/store/hooks";
import { selectCanvasGrid } from "@/store/selectors";

import { GridCell } from "./GridCell";

export function DesignGrid() {
  const grid = useAppSelector(selectCanvasGrid);

  return (
    <div
      className="grid aspect-square w-full grid-cols-6 grid-rows-6 gap-[2px] border-2 border-line bg-paper-muted/40 p-1"
      role="application"
      aria-label="Tile layout grid 6 by 6"
    >
      {grid.map((tileId, index) => (
        <GridCell key={index} index={index} tileId={tileId} />
      ))}
    </div>
  );
}
