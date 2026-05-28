"use client";

import { TILE_IDS } from "@/data/tiles";

import { PaletteTile } from "./PaletteTile";

export function DesignPalette() {
  return (
    <aside className="w-[100px] shrink-0 xl:w-[108px]" aria-label="Design palette">
      <div className="panel-bordered palette-scroll grid max-h-[min(340px,42vh)] grid-cols-2 gap-1 overflow-y-auto p-1">
        {TILE_IDS.map((id) => (
          <PaletteTile key={id} tileId={id} />
        ))}
      </div>
    </aside>
  );
}
