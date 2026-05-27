import {
  calcGrandTotal,
  calcShipping,
  calcSubtotal,
  FREE_SHIPPING_THRESHOLD_USD,
  SHIPPING_FLAT_USD,
} from "@/lib/calc";
import type { CartLine } from "@/types";

import { describe, expect, it } from "vitest";

const line = (tileId: CartLine["tileId"], quantity: number): CartLine => ({
  tileId,
  quantity,
});

describe("calcSubtotal", () => {
  it("sums quantity * unit price across lines", () => {
    const lines: CartLine[] = [
      line("tile1", 2),
      line("tile8", 1),
    ];
    // 2*28 + 1*29 = 85
    expect(calcSubtotal(lines)).toBe(85);
  });

  it("treats negative quantity as 0 via reducer", () => {
    const lines: CartLine[] = [line("tile7", -1)];
    expect(calcSubtotal(lines)).toBe(0);
  });
});

describe("calcShipping", () => {
  it("charges flat shipping when not above threshold", () => {
    expect(calcShipping(0)).toBe(SHIPPING_FLAT_USD);
    expect(calcShipping(FREE_SHIPPING_THRESHOLD_USD)).toBe(SHIPPING_FLAT_USD);
  });

  it("is free strictly above threshold", () => {
    expect(calcShipping(FREE_SHIPPING_THRESHOLD_USD + 0.01)).toBe(0);
  });
});

describe("calcGrandTotal", () => {
  it("adds subtotal and shipping", () => {
    expect(calcGrandTotal(120, 25)).toBe(145);
  });
});
