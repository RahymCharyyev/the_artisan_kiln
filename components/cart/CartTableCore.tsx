"use client";

import { AnimatePresence } from "framer-motion";

import { CART_LINE_IDS, getTile } from "@/data/tiles";
import type { TileId } from "@/data/tiles";
import {
  CartRow,
  ROW_TEMPLATE_DESKTOP,
  ROW_TEMPLATE_MOBILE,
} from "@/components/cart/CartRow";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, removeItem, setQuantity } from "@/store/slices/cartSlice";
import { selectAllCartLines } from "@/store/selectors";

const HEADER_CELLS = [
  { key: "collection", lines: ["Tile", "Collection"] },
  { key: "item", lines: ["Item"] },
  { key: "qty", lines: ["Quantity", "(sq.ft.)"] },
  { key: "price", lines: ["Unit Price", "($)"] },
  { key: "actions", lines: ["Actions"] },
] as const;

export function CartTableCore({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const lines = useAppSelector(selectAllCartLines);
  const dispatch = useAppDispatch();
  const isMobile = variant === "mobile";

  const byId = Object.fromEntries(
    lines.map((l) => [l.tileId, l.quantity]),
  ) as Record<TileId, number>;

  const headerCell = isMobile
    ? "flex flex-col items-center justify-center border border-line bg-paper-muted p-1 text-center text-[8px] font-bold uppercase leading-tight tracking-[0.1em]"
    : "";
  const rowTemplate = isMobile ? ROW_TEMPLATE_MOBILE : ROW_TEMPLATE_DESKTOP;
  const headerClass = isMobile
    ? rowTemplate
    : `${rowTemplate} border-b-2 border-line bg-paper-muted/50 px-2 py-2.5 text-center text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-ink`;

  return (
    <div className={isMobile ? "min-w-[480px] border-2 border-line" : "w-full min-w-0"}>
      <div className={headerClass}>
        {HEADER_CELLS.map((col) => (
          <span key={col.key} className={headerCell || undefined}>
            {col.lines.map((line, i) => (
              <span
                key={line}
                className={
                  i === 1 && col.key !== "collection"
                    ? "font-normal normal-case tracking-normal text-ink-muted"
                    : ""
                }
              >
                {line}
                {i < col.lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {CART_LINE_IDS.map((id) => {
          const qty = byId[id] ?? 0;
          const meta = getTile(id);
          return (
            <CartRow
              key={id}
              variant={variant}
              name={meta.name}
              swatchSrc={meta.swatchSrc}
              patternSrc={meta.patternSrc}
              unitPrice={meta.unitPriceUSD}
              quantity={qty}
              onQty={(n) => dispatch(setQuantity({ tileId: id, quantity: n }))}
              onRemove={() => dispatch(removeItem(id))}
              onAddInc={() => dispatch(increment(id))}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
