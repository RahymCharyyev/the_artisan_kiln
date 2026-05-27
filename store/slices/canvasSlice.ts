import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { TileId } from "@/data/tiles";
import { CANVAS_MOCK_GRID } from "@/data/mock";

const CELL_COUNT = 36;

function emptyGrid(): (TileId | null)[] {
  return Array.from({ length: CELL_COUNT }, () => null);
}

export interface CanvasSliceState {
  grid: (TileId | null)[];
}

const initialState: CanvasSliceState = {
  grid: [...CANVAS_MOCK_GRID],
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    placeTile: (
      state,
      action: PayloadAction<{ index: number; tileId: TileId }>,
    ) => {
      const { index, tileId } = action.payload;
      if (index >= 0 && index < CELL_COUNT) state.grid[index] = tileId;
    },
    clearCell: (state, action: PayloadAction<number>) => {
      const i = action.payload;
      if (i >= 0 && i < CELL_COUNT) state.grid[i] = null;
    },
    clearGrid: (state) => {
      state.grid = emptyGrid();
    },
  },
});

export const { placeTile, clearCell, clearGrid } = canvasSlice.actions;

export default canvasSlice.reducer;
