"use client";

import type { TileId } from "@/data/tiles";
import { getTile } from "@/data/tiles";
import { TilePatternImage } from "@/components/ui/TilePatternImage";

export function PaletteTilePreview({ tileId }: { tileId: TileId }) {
  const t = getTile(tileId);
  return (
    <div className="h-[76px] w-[76px] overflow-hidden rounded-lg border border-line shadow-xl sm:h-[88px] sm:w-[88px]">
      <TilePatternImage src={t.patternSrc} className="h-full w-full object-cover" />
    </div>
  );
}
