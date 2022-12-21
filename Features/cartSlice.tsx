import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  value: {
    itemsNo: number;
  };
}

const initialState: CartState = {
  value: {
    itemsNo: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value.itemsNo += 1;
    },
    decrement: (state) => {
      state.value.itemsNo -= 1;
    },
    addMultiple: (state, action: PayloadAction<number>) => {
      state.value.itemsNo += action.payload;
    },
  },
});

export const { increment, decrement, addMultiple } = cartSlice.actions;

export const selectCartNo = (state: RootState) => state.cart.value;

export default cartSlice.reducer;
