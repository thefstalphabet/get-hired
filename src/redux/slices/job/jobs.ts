import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../../interfaces/common";

interface IInitialStage {
    jobs: any[];
}
const initialState: IInitialStage = {
    jobs: []
};

const JobsSlices = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobs(state, action: PayloadAction<IJob[]>) {
            state.jobs = action.payload;
        },
        updateOneJob(state, action: PayloadAction<{ job_id: string, updates: any, alreadySaved?: boolean }>) {
            if (state?.jobs?.length) {
                const jobIndex = state.jobs.findIndex((ele: any) => ele.id === action.payload.job_id);
                if (jobIndex !== -1) {
                    const job = state.jobs[jobIndex];

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

                    state.jobs = [
                        ...state.jobs.slice(0, jobIndex),
                        updatedJob,
                        ...state.jobs.slice(jobIndex + 1)
                    ];
                }
            }
        },
        removeOneJob(state, action: PayloadAction<string>) {
            const newJobs = state.jobs.filter((job: IJob) => job.id !== action.payload)
            state.jobs = newJobs
        }
    },
});
export const { setJobs, updateOneJob, removeOneJob } =
    JobsSlices.actions;
export default JobsSlices.reducer;
