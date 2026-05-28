import { TilePatternImage } from '@/components/ui/TilePatternImage';

const MOBILE_TITLE_TILES = [1, 3, 7, 8, 2, 4] as const;
const MOBILE_LEFT_TILES = MOBILE_TITLE_TILES.slice(0, 3);
const MOBILE_RIGHT_TILES = MOBILE_TITLE_TILES.slice(3);

export function OrderTitle() {
  return (
    <div className='relative z-20 mx-auto max-w-[1320px] px-3 pb-3 pt-2 text-center lg:px-4 lg:pt-6'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-4  hidden lg:block'
      >
        <TilePatternImage
          src='/decor/bg_top_left_side.png'
          alt=''
          className='absolute left-[12%] top-0 h-[74px] w-auto object-contain'
        />
        <TilePatternImage
          src='/decor/bg_top_right_side.png'
          alt=''
          className='absolute right-[12%] top-0 h-[74px] w-auto object-contain'
        />
      </div>
      <h1 className='font-display text-[clamp(1.65rem,6vw,3.35rem)] font-extrabold leading-[0.95] tracking-[0.02em] text-ink'>
        CERAMIC TILE ORDER FORM
      </h1>

      <div className='mt-2 hidden items-center justify-center gap-3 lg:flex'>
        <TilePatternImage
          src='/decor/bg_top_left_tiles.png'
          alt=''
          className='h-9 w-auto object-contain'
        />
        <p className='font-display text-base tracking-[0.28em] text-ink sm:text-lg lg:text-xl'>
          THE ARTISAN KILN
        </p>
        <TilePatternImage
          src='/decor/bg_top_right_tiles.png'
          alt=''
          className='h-9 w-auto object-contain'
        />
      </div>

      {/* Mobile title row: text centered with three tiles per side */}
      <div className='mt-2 flex items-center justify-center gap-2 lg:hidden'>
        <div className='flex items-center gap-1'>
          {MOBILE_LEFT_TILES.map((n) => (
            <TilePatternImage
              key={`left-${n}`}
              src={`/tiles/${n}.png`}
              alt=''
              className='h-7 w-7 rounded-sm border border-line object-cover'
            />
          ))}
        </div>
        <p className='font-display text-[clamp(1rem,4.4vw,1.2rem)] tracking-[0.18em] text-ink'>
          THE ARTISAN KILN
        </p>
        <div className='flex items-center gap-1'>
          {MOBILE_RIGHT_TILES.map((n) => (
            <TilePatternImage
              key={`right-${n}`}
              src={`/tiles/${n}.png`}
              alt=''
              className='h-7 w-7 rounded-sm border border-line object-cover'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
