import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialStage {
  selectedJob: any | null;
  searchedJobs: any[];
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
    setSearchedJobs(state, action: PayloadAction<any[]>) {
      state.searchedJobs = action.payload;
    },
    setSelectedJob(state, action: PayloadAction<any>) {
      state.selectedJob = action.payload;
    },
    updateSelectedJob(state, action: PayloadAction<any>) {
      state.selectedJob = { ...state.selectedJob, ...action.payload };
    },
    setSelectedQuery(state, action: PayloadAction<any>) {
      state.searchedQuery = action.payload;
    },
  },
});
export const { setSearchedJobs, setSelectedJob, updateSelectedJob, setSelectedQuery } =
  JobSlices.actions;
export default JobSlices.reducer;
