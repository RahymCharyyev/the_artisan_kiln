import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import canvasReducer from "./slices/canvasSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
  canvas: canvasReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
