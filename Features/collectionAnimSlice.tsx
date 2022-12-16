import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CollectionState {
  value: boolean;
}

const initialState: CollectionState = {
  value: true,
};

export const collectionSlice = createSlice({
  name: "collectionAnim",
  initialState,
  reducers: {
    changeCollectionBool: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeCollectionBool } = collectionSlice.actions;

export const collectionSelector = (state: RootState) => state.collection.value;
export default collectionSlice.reducer;
