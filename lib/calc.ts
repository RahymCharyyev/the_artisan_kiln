import type { CartLine } from "@/types";
import { TILES } from "@/data/tiles";

export const SHIPPING_FLAT_USD = 25;
export const FREE_SHIPPING_THRESHOLD_USD = 500;

export function calcSubtotal(lines: readonly CartLine[]): number {
  return lines.reduce(
    (sum, line) =>
      sum + Math.max(0, line.quantity) * TILES[line.tileId].unitPriceUSD,
    0,
  );
}

export function calcShipping(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD_USD ? 0 : SHIPPING_FLAT_USD;
}

export function calcGrandTotal(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}
