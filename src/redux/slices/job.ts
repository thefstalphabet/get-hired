import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialStage {
  searchedJobs: any[];
  selectedJob: any | null
}
const initialState: IInitialStage = {
  searchedJobs: [],
  selectedJob: null
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
      state.selectedJob = {...state.selectedJob, ...action.payload};
    },
    // updateaddress(
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     addressData: any;
    //   }>
    // ) {
    //   const index = state.address.findIndex(
    //     (address) => address._id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.address[index] = {
    //       ...state.address[index],
    //       ...action.payload.addressData,
    //     };
    //   }
    // },
    // deleteaddress(state, action: PayloadAction<string>) {
    //   const addressData = state.address.filter(
    //     (address: any) => address._id !== action.payload
    //   );
    //   state.address = addressData;
    // },
  },
});
export const { setSearchedJobs, setSelectedJob, updateSelectedJob} =
  JobSlices.actions;
export default JobSlices.reducer;
