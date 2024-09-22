import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/job";
export const store = configureStore({
  reducer: {
    job: jobReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
