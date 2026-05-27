import { createSelector } from "@reduxjs/toolkit";

import {
  calcGrandTotal,
  calcShipping,
  calcSubtotal,
} from "@/lib/calc";
import type { RootState } from "@/store/root";

const selectCartLinesState = (state: RootState) => state.cart.lines;

export const selectCartLines = createSelector([selectCartLinesState], (lines) =>
  lines.filter((l) => l.quantity > 0),
);

export const selectAllCartLines = selectCartLinesState;

export const selectSubtotal = createSelector([selectCartLinesState], calcSubtotal);

export const selectShipping = createSelector([selectSubtotal], calcShipping);

export const selectGrandTotal = createSelector(
  [selectSubtotal, selectShipping],
  (sub, ship) => calcGrandTotal(sub, ship),
);

export const selectCanvasGrid = (state: RootState) => state.canvas.grid;
