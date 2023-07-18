import { createSlice } from "@reduxjs/toolkit";
import { type } from "os";
import { RootState } from "../store";

type initialStateType = {
  loading: boolean;
};

const initial: initialStateType = {
  loading: false,
};

const loadingSlice = createSlice({
  initialState: initial,
  name: "LoadingState",
  reducers: {
    change: (state) => {
      state.loading = !state.loading;
    },
    changeSpecific: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default loadingSlice.reducer;
export const { change, changeSpecific } = loadingSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
