import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from './slices/job/jobs';
import selectedJobReducer from './slices/job/selected-job';
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    selectedJob: selectedJobReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
