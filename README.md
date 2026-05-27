# The Artisan Kiln — Ceramic Tile Order Form

SPA-style order UI for handcrafted ceramic tiles: responsive **mobile-first** checkout and **desktop** three-column layout with a Redux-backed **drag-and-drop 6×6 design grid**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens via `@theme` in [`app/globals.css`](app/globals.css)
- **Redux Toolkit** — cart totals + canvas grid (see [`store/`](store/))
- **@dnd-kit** — palette → grid dragging (desktop)
- **Framer Motion** — row/cell animations
- **Vitest** — unit tests for pricing and validation helpers

## Business rules

- **Subtotal** = Σ(qty × unit price) for all catalogue lines (`data/tiles.ts`).
- **Shipping** = `$0` if subtotal **`> $500`**, otherwise **`$25`**.
- **Grand total** = subtotal + shipping.
- Checkout **customer + card** validations live in [`lib/validation.ts`](lib/validation.ts) (demo only — no backend).

### Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Turbopack dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run test` | Vitest (calc / validation / cart slice) |
| `npm run test:watch` | Vitest watch mode |
| `npm run extract-decor` | Crop corner/footer art from `design/*.png` into `public/decor/` (requires `sharp`) |

## Project layout

- [`app/layout.tsx`](app/layout.tsx) — fonts (Bebas Neue + Inter), global providers
- [`app/providers.tsx`](app/providers.tsx) — Redux `<Provider>`
- [`app/page.tsx`](app/page.tsx) — renders [`OrderPageShell`](components/order/OrderPageShell.tsx)
- [`components/order/MobileLayout.tsx`](components/order/MobileLayout.tsx) — single column (customer → cart → payment)
- [`components/order/DesktopLayout.tsx`](components/order/DesktopLayout.tsx) — cart | design grid (lazy) | checkout
- [`components/checkout/`](components/checkout/) — `CheckoutProvider` with `state` / `actions` / `meta` context; payment, toast, and submit composed for both layouts
- [`components/order/DesignToolLazy.tsx`](components/order/DesignToolLazy.tsx) — `next/dynamic` loads DnD tool only on desktop
- [`public/tiles/*.svg`](public/tiles/) — tile pattern previews
- [`public/decor/*.png`](public/decor/) — corner and footer artwork cropped from design mocks

### Deploy

Deploy to **[Vercel](https://vercel.com)** (push this repo → New Project → framework auto-detected). Env vars are optional for this static demo UI.

## Notes on requirement deviations

### Tailwind configuration (`tailwind.config.js`)

The brief asks for custom theme values in `tailwind.config.js`. This project was scaffolded with **Tailwind CSS v4** (`create-next-app@latest`), where the recommended approach is **CSS-first configuration** via `@theme` in [`app/globals.css`](app/globals.css). That block defines the same concerns as `theme.extend` in v3: colors (`paper`, `navy`, `terracotta`, …), fonts, and radii. Adding an empty or duplicate `tailwind.config.js` on v4 is unnecessary and can conflict with the PostCSS v4 pipeline.

### Currency (EUR in brief vs USD in UI)

The original brief text used euros; the **design mocks and updated assignment README use US dollars**. The app formats prices with `formatUSD` (`en-US`, `$28.00`) and applies free shipping when subtotal **exceeds $500** (flat **$25** otherwise), matching the mockups.

### Decorative artwork

Corner leaves, tile ornaments, hands, and the artist palette are **cropped from** [`design/design_desktop.png`](design/design_desktop.png) and [`design/design_mobile.png`](design/design_mobile.png) using [`scripts/extract-decor.mjs`](scripts/extract-decor.mjs) and served as static PNGs from [`public/decor/`](public/decor/). Re-run `npm run extract-decor` after changing crop regions in the script.

---

Design brief: see [`ТЗ.md`](ТЗ.md) and PNG references in [`design/`](design/).
