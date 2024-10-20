import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../../interfaces/common";

interface IInitialStage {
    selectedJob: IJob | null;
}
const initialState: IInitialStage = {
    selectedJob: null,
};

const JobSlices = createSlice({
    name: "selectedJob",
    initialState,
    reducers: {
        setSelectedJob(state, action: PayloadAction<IJob>) {
            state.selectedJob = action.payload;
        },
        updateSelectedJob(state, action: PayloadAction<any>) {
            state.selectedJob = { ...state.selectedJob, ...action.payload };
        },
    },
});
export const { setSelectedJob, updateSelectedJob } =
    JobSlices.actions;
export default JobSlices.reducer;
