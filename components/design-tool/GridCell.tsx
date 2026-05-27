"use client";

import { useDroppable } from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

import type { TileId } from "@/data/tiles";
import { getTile } from "@/data/tiles";
import { useAppDispatch } from "@/store/hooks";
import { clearCell } from "@/store/slices/canvasSlice";
import { TilePatternImage } from "@/components/ui/TilePatternImage";

export function GridCell({
  index,
  tileId,
}: {
  index: number;
  tileId: TileId | null;
}) {
  const dispatch = useAppDispatch();
  const id = `cell-${index}`;

  const { isOver, setNodeRef } = useDroppable({ id });

  const onDoubleClick = useCallback(() => {
    dispatch(clearCell(index));
  }, [dispatch, index]);

  const src = tileId ? getTile(tileId).patternSrc : "";

  return (
    <div ref={setNodeRef} className="relative aspect-square">
      <button
        type="button"
        onDoubleClick={onDoubleClick}
        className={`group relative h-full w-full overflow-hidden rounded-sm border border-line/70 bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${isOver ? "ring-2 ring-navy/50" : ""}`}
        aria-label={
          tileId
            ? `Cell ${index + 1}, ${getTile(tileId).name}. Double-click to clear.`
            : `Empty cell ${index + 1}. Drop a tile here.`
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {tileId ? (
            <motion.span
              key={`${tileId}-${index}`}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-0 block"
            >
              <TilePatternImage
                src={src}
                className="block h-full w-full object-cover"
              />
            </motion.span>
          ) : null}
        </AnimatePresence>

        {!tileId ? (
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="h-[58%] w-[58%] rounded-full border-2 border-line/45 bg-white/60" />
          </span>
        ) : null}
      </button>
    </div>
  );
}
