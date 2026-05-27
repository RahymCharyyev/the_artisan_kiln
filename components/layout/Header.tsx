"use client";

import Link from "next/link";

import { CART_LINE_IDS, type TileId } from "@/data/tiles";
import { useAppSelector } from "@/store/hooks";
import { selectAllCartLines } from "@/store/selectors";

const DESKTOP_NAV = [
  { href: "#home", label: "HOME" },
  { href: "#shop", label: "SHOP" },
  { href: "#collections", label: "COLLECTIONS" },
  { href: "#about", label: "ABOUT US" },
  { href: "#faq", label: "FAQ" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#blog", label: "BLOG" },
];

const MOBILE_NAV = [
  { href: "#shop", label: "SHOP" },
  { href: "#collections", label: "COLLECTIONS" },
  { href: "#about", label: "ABOUT US" },
];

function activeLineCount(
  lines: ReturnType<typeof selectAllCartLines>,
  ids: readonly TileId[],
) {
  return ids.reduce((n, id) => {
    const q = lines.find((l) => l.tileId === id)?.quantity ?? 0;
    return n + (q > 0 ? 1 : 0);
  }, 0);
}

export function Header() {
  const lines = useAppSelector(selectAllCartLines);
  const badge = activeLineCount(lines, CART_LINE_IDS);

  return (
    <header className="relative z-30">
      {/* Mobile header */}
      <div className="flex items-center justify-between gap-3 px-3 py-3 lg:hidden">
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold tracking-[0.22em] text-ink"
        >
          {MOBILE_NAV.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="relative p-1 text-ink"
            aria-label={`Cart (${badge} items)`}
          >
            <CartIcon />
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ochre px-0.5 text-[9px] font-bold text-ink">
              {badge}
            </span>
          </button>
          <button
            type="button"
            className="rounded-full border-2 border-line bg-navy px-3 py-1 text-[9px] font-bold tracking-[0.18em] text-paper"
          >
            LOG IN
          </button>
        </div>
      </div>

      {/* Desktop header */}
      <div className="mx-auto hidden max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 lg:grid">
        <div aria-hidden />

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] font-semibold tracking-[0.26em] text-ink"
        >
          {DESKTOP_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="relative p-1.5 text-ink"
            aria-label={`Cart (${badge} items)`}
          >
            <CartIcon />
            <span className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-ochre px-1 text-[10px] font-bold text-ink">
              {badge}
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white text-[10px] font-bold">
              AS
            </div>
            <span className="text-[12px] font-semibold tracking-[0.1em]">
              A. SMITH
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 4h2.5l2.5 12h10l2-8H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
