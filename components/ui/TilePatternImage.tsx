import type { ImgHTMLAttributes } from "react";

type TilePatternImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  src: string;
  alt?: string;
};

/** Lightweight SVG tile preview from `/public/tiles` (no next/image overhead for patterns). */
export function TilePatternImage({
  src,
  alt = "",
  className = "",
  draggable = false,
  ...props
}: TilePatternImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={draggable}
      className={className}
      {...props}
    />
  );
}
