"use client";

import { useState } from "react";

import { TILE_IDS, getTile } from "@/data/tiles";
import type { TileId } from "@/data/tiles";
import { TilePatternImage } from "@/components/ui/TilePatternImage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTileLine } from "@/store/slices/cartSlice";
import { selectAllCartLines } from "@/store/selectors";

export function AddNewTileButton() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectAllCartLines);
  const inCart = new Set(lines.map((l) => l.tileId));

  function pick(id: TileId) {
    dispatch(addTileLine({ tileId: id, quantity: 1 }));
    setOpen(false);
  }

  return (
    <div className="relative mt-6 flex justify-start">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="group inline-flex max-w-[260px] rounded-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decor/bg_add_new_tile.png"
          alt="Add new tile to cart"
          className="h-auto w-full max-w-[240px] select-none transition group-hover:opacity-90"
        />
      </button>

      {open ? (
        <div
          className="absolute left-0 top-full z-30 mt-2 w-[min(360px,calc(100vw-32px))] max-h-[min(50vh,360px)] overflow-y-auto rounded-lg border border-line bg-paper p-3 shadow-xl"
          role="listbox"
          aria-label="Choose a tile collection to add"
        >
          <p className="mb-2 text-[10px] font-bold tracking-[0.28em] text-ink-muted">
            ALL COLLECTIONS ({TILE_IDS.length})
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {TILE_IDS.map((id) => {
              const t = getTile(id);
              const added = inCart.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  className={`flex flex-col items-center gap-1 rounded-md border p-1 text-center transition hover:bg-paper-muted ${added ? "border-navy/60 bg-white/90" : "border-line/70 bg-white/80"}`}
                  onClick={() => pick(id)}
                  title={t.name}
                >
                  <TilePatternImage
                    src={t.patternSrc}
                    className="h-12 w-12 rounded-sm border border-line/60 object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
