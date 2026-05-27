/**
 * Per-edge decorative frame from `/public/decor/`.
 */
/* eslint-disable @next/next/no-img-element */
export function CornerDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <img
        src="/decor/bg_top.png"
        alt=""
        className="absolute inset-x-0 top-0 mx-auto h-[var(--frame-top)] w-full max-w-[min(100vw,1376px)] object-cover object-top"
      />
      <img
        src="/decor/bg_bottom.png"
        alt=""
        className="absolute inset-x-0 bottom-0 mx-auto h-[var(--frame-bottom)] w-full max-w-[min(100vw,1376px)] object-cover object-bottom"
      />
      <img
        src="/decor/bg_left.png"
        alt=""
        className="absolute left-0 top-[var(--frame-top)] w-[var(--frame-left)] object-cover object-left"
        style={{
          height: "calc(100% - var(--frame-top) - var(--frame-bottom))",
        }}
      />
      <div
        className="absolute right-0 top-[var(--frame-top)] w-[var(--frame-right)] overflow-hidden"
        style={{
          height: "calc(100% - var(--frame-top) - var(--frame-bottom))",
        }}
      >
        <img
          src="/decor/bg_right.png"
          alt=""
          className="absolute right-0 top-0 h-full w-auto max-w-none object-cover object-right"
        />
      </div>
    </div>
  );
}
