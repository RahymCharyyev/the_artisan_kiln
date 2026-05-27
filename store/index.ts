import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./root";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState } from "./root";
