import { describe, expect, it } from "vitest";

import {
  addTileLine,
  cartSlice,
  decrement,
  increment,
  removeItem,
  setQuantity,
} from "@/store/slices/cartSlice";
import { CART_LINE_IDS } from "@/data/tiles";
import { CART_MOCK_QUANTITIES } from "@/data/mock";

const reduce = cartSlice.reducer;

describe("cartSlice", () => {
  const initial = cartSlice.getInitialState();

  it("starts with four default cart lines and mock quantities from design", () => {
    expect(initial.lines).toHaveLength(4);
    expect(
      CART_LINE_IDS.every((id) => initial.lines.some((l) => l.tileId === id)),
    ).toBe(true);
    expect(initial.lines.find((l) => l.tileId === "tile1")?.quantity).toBe(
      CART_MOCK_QUANTITIES.tile1,
    );
    expect(initial.lines.find((l) => l.tileId === "tile7")?.quantity).toBe(
      CART_MOCK_QUANTITIES.tile7,
    );
    expect(initial.lines.find((l) => l.tileId === "tile3")?.quantity).toBe(
      CART_MOCK_QUANTITIES.tile3,
    );
    expect(initial.lines.find((l) => l.tileId === "tile8")?.quantity).toBe(
      CART_MOCK_QUANTITIES.tile8,
    );
  });

  it("increment updates line", () => {
    const next = reduce(initial, increment("tile1"));
    expect(next.lines.find((l) => l.tileId === "tile1")?.quantity).toBe(151);
  });

  it("decrement floors at 0", () => {
    const s1 = reduce(initial, setQuantity({ tileId: "tile7", quantity: 0 }));
    const s2 = reduce(s1, decrement("tile7"));
    expect(s2.lines.find((l) => l.tileId === "tile7")?.quantity).toBe(0);
  });

  it("removeItem sets quantity to 0", () => {
    const s2 = reduce(initial, removeItem("tile8"));
    expect(s2.lines.find((l) => l.tileId === "tile8")?.quantity).toBe(0);
  });

  it("addTileLine can create a new line if missing", () => {
    const empty = { ...initial, lines: [] };
    const next = reduce(empty, addTileLine({ tileId: "tile12", quantity: 2 }));
    expect(next.lines).toEqual([{ tileId: "tile12", quantity: 2 }]);
  });
});
