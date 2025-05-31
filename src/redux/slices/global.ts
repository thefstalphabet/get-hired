// This slice is for string global variables values that can be used globaly

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialStage {
    loginModal: boolean;
}
const initialState: IInitialStage = {
    loginModal: false
};

const GlobalSlices = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLoginModal(state, action: PayloadAction<boolean>) {
            state.loginModal = action.payload;
        },
    },
});
export const { setLoginModal } =
    GlobalSlices.actions;
export default GlobalSlices.reducer;
