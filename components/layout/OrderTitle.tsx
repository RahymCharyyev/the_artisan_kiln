import { TilePatternImage } from "@/components/ui/TilePatternImage";

const MOBILE_TITLE_TILES = [1, 3, 7, 8, 2, 4] as const;

export function OrderTitle() {
  return (
    <div className="relative z-20 mx-auto max-w-[1320px] px-3 pb-3 pt-1 text-center lg:px-4">
      <h1 className="font-display text-[clamp(1.65rem,6vw,3.35rem)] font-extrabold leading-[0.95] tracking-[0.02em] text-ink">
        CERAMIC TILE ORDER FORM
      </h1>

      {/* Mobile: row of 6 tile icons (desktop uses bg_top.png) */}
      <div className="mt-2 flex items-center justify-center gap-1.5 lg:hidden">
        {MOBILE_TITLE_TILES.map((n) => (
          <TilePatternImage
            key={n}
            src={`/tiles/${n}.png`}
            alt=""
            className="h-7 w-7 rounded-sm border border-line object-cover"
          />
        ))}
      </div>
      <p className="mt-1.5 font-display text-base tracking-[0.28em] text-ink sm:text-lg lg:mt-2 lg:text-xl">
        THE ARTISAN KILN
      </p>
    </div>
  );
}
