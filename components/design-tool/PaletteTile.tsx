"use client";

import { useDraggable } from "@dnd-kit/core";

import type { TileId } from "@/data/tiles";
import { getTile } from "@/data/tiles";
import { TilePatternImage } from "@/components/ui/TilePatternImage";

export function PaletteTile({ tileId }: { tileId: TileId }) {
  const t = getTile(tileId);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `palette-${tileId}`,
      data: { tileId },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      className={`relative aspect-square w-full overflow-hidden rounded-sm border border-line bg-white transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${isDragging ? "opacity-40" : ""}`}
      style={style}
      aria-label={`Drag ${t.name} pattern`}
      title={t.name}
    >
      <TilePatternImage
        src={t.patternSrc}
        className="h-full w-full object-cover"
      />
    </button>
  );
}
