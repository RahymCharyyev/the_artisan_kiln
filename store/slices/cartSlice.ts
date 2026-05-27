import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { CART_LINE_IDS } from "@/data/tiles";
import type { TileId } from "@/data/tiles";
import { CART_MOCK_QUANTITIES } from "@/data/mock";
import type { CartLine } from "@/types";

const initialCartLines = (): CartLine[] =>
  CART_LINE_IDS.map((id) => ({
    tileId: id,
    quantity: CART_MOCK_QUANTITIES[id as keyof typeof CART_MOCK_QUANTITIES] ?? 0,
  }));

export interface CartSliceState {
  lines: CartLine[];
}

const initialState: CartSliceState = {
  lines: initialCartLines(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQuantity: (
      state,
      action: PayloadAction<{ tileId: TileId; quantity: number }>,
    ) => {
      const line = state.lines.find((l) => l.tileId === action.payload.tileId);
      if (line)
        line.quantity = Math.max(0, Math.floor(action.payload.quantity));
    },
    increment: (state, action: PayloadAction<TileId>) => {
      const line = state.lines.find((l) => l.tileId === action.payload);
      if (line) line.quantity += 1;
    },
    decrement: (state, action: PayloadAction<TileId>) => {
      const line = state.lines.find((l) => l.tileId === action.payload);
      if (line) line.quantity = Math.max(0, line.quantity - 1);
    },
    removeItem: (state, action: PayloadAction<TileId>) => {
      const line = state.lines.find((l) => l.tileId === action.payload);
      if (line) line.quantity = 0;
    },
    addTileLine: (
      state,
      action: PayloadAction<{ tileId: TileId; quantity?: number }>,
    ) => {
      const line = state.lines.find((l) => l.tileId === action.payload.tileId);
      const add = Math.max(0, Math.floor(action.payload.quantity ?? 1));
      if (line) line.quantity += add;
      else state.lines.push({ tileId: action.payload.tileId, quantity: add });
    },
  },
});

export const { setQuantity, increment, decrement, removeItem, addTileLine } =
  cartSlice.actions;

export default cartSlice.reducer;
