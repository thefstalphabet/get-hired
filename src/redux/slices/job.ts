import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../interfaces/common";

interface IInitialStage {
  searchedJobs: IJob[] | null;
  selectedJob: IJob | null;
  searchedQuery: any | null
}
const initialState: IInitialStage = {
  searchedJobs: [],
  selectedJob: null,
  searchedQuery: null
};

const JobSlices = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSearchedJobs(state, action: PayloadAction<IJob[]>) {
      state.searchedJobs = action.payload;
    },
    setSelectedJob(state, action: PayloadAction<IJob>) {
      state.selectedJob = action.payload;
    },
    updateSelectedJob(state, action: PayloadAction<IJob>) {
      state.selectedJob = { ...state.selectedJob, ...action.payload };
    },
    setSelectedQuery(state, action: PayloadAction<IJob>) {
      state.searchedQuery = action.payload;
    },
  },
});
export const { setSearchedJobs, setSelectedJob, updateSelectedJob, setSelectedQuery } =
  JobSlices.actions;
export default JobSlices.reducer;
