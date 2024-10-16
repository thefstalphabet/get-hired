import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../interfaces/common";
import { IGetJobPayload } from "../../api/jobs";

interface IInitialStage {
  searchedJobs: any[] | null;
  selectedJob: IJob | null;
  searchedQuery: IGetJobPayload | null
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

    updateSearchedJob(state, action: PayloadAction<{ job_id: string, updates: any, alreadySaved?: boolean }>) {
      if (state?.searchedJobs?.length) {
        const jobIndex = state.searchedJobs.findIndex((ele: any) => ele.id === action.payload.job_id);
        if (jobIndex !== -1) {
          const job = state.searchedJobs[jobIndex];

          let updatedJob = { ...job, ...action.payload.updates };
          if (action.payload.alreadySaved !== undefined) {
            if (action.payload.alreadySaved) {
              updatedJob = {
                ...job,
                saved: (job.saved || []).filter((savedJob: any) => savedJob.job_id !== action.payload.job_id)
              };
            } else if (!action.payload.alreadySaved) {
              updatedJob = {
                ...job,
                saved: [...(job.saved || []), { job_id: action.payload.job_id }]
              };
            }
          }

          state.searchedJobs = [
            ...state.searchedJobs.slice(0, jobIndex),
            updatedJob,
            ...state.searchedJobs.slice(jobIndex + 1)
          ];
        }
      }
    },

    setSelectedJob(state, action: PayloadAction<IJob>) {
      state.selectedJob = action.payload;
    },
    updateSelectedJob(state, action: PayloadAction<any>) {
      state.selectedJob = { ...state.selectedJob, ...action.payload };
    },
    setSearchedQuery(state, action: PayloadAction<IGetJobPayload | null>) {
      state.searchedQuery = action.payload;
    },
  },
});
export const { setSearchedJobs, setSelectedJob, updateSelectedJob, setSearchedQuery, updateSearchedJob } =
  JobSlices.actions;
export default JobSlices.reducer;
