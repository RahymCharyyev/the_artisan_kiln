/**
 * Per-edge decorative frame from `/public/decor/`.
 */
/* eslint-disable @next/next/no-img-element */

export function CornerDecor() {
  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-0 overflow-hidden'
    >
      {/* Mobile decor: dedicated composition (different from desktop). */}
      <div className='lg:hidden'>
        <img
          src='/decor/bg_left_corner_mobile.png'
          alt=''
          className='absolute left-0 top-12 z-[1] h-20 w-8 object-contain object-left-top'
        />
        <img
          src='/decor/bg_right_corner_mobile.png'
          alt=''
          className='absolute right-0 top-12 z-[1] h-20 w-8 object-contain object-right-top'
        />
        <img
          src='/decor/bg_bottom_mobile.png'
          alt=''
          className='absolute bottom-0 left-0 right-0 z-[1] h-32 w-full object-cover object-bottom'
        />
      </div>

      {/* Desktop decor */}
      <div className='hidden lg:block'>
        <img
          src='/decor/bg_left_top_corner.png'
          alt=''
          className='absolute left-0 top-12 z-[1] h-[var(--frame-corner-top-left)] w-[var(--frame-corner-top-left)] object-contain object-left-top'
        />
        <img
          src='/decor/bg_right_top_corner.png'
          alt=''
          className='absolute right-0 top-12 z-[1] h-[var(--frame-corner-top-right)] w-[var(--frame-corner-top-right)] object-contain object-right-top'
        />
        <img
          src='/decor/bg_left_bottom_corner.png'
          alt=''
          className='absolute bottom-0 left-0 z-[1] h-[var(--frame-corner-bottom-left)] w-[var(--frame-corner-bottom-left)] object-contain object-left-bottom'
        />
        <img
          src='/decor/bg_right_bottom_corner.png'
          alt=''
          className='absolute bottom-0 right-0 z-[1] h-[var(--frame-corner-bottom-right)] w-[var(--frame-corner-bottom-right)] object-contain object-right-bottom'
        />
        <img
          src='/decor/bg_left_corner.png'
          alt=''
          className='absolute left-0 z-[1] w-[var(--frame-side-left-width)] object-contain object-left'
          style={{
            top: 'var(--frame-corner-top-left)',
            height: 'var(--frame-side-left-height)',
          }}
        />
        <div
          className='absolute right-0 z-[1] flex w-[var(--frame-side-right-width)] justify-end overflow-hidden'
          style={{
            top: 'var(--frame-corner-top-right)',
            height: 'var(--frame-side-right-height)',
          }}
        >
          <img
            src='/decor/bg_right_corner.png'
            alt=''
            className='h-full w-full object-contain object-right'
          />
        </div>
      </div>
    </div>
  );
}
