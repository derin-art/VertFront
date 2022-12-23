import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  value: {
    itemsNo: number;
    cartItems: any[];
  };
}

const initialState: CartState = {
  value: {
    itemsNo: 0,
    cartItems: [],
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
    addToCart: (state, action) => {
      state.value.cartItems = [...state.value.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      state.value.cartItems = [...state.value.cartItems].filter((item: any) => {
        if (item._id != action.payload) {
          return item;
        } else return;
      });
    },
    addMultiple: (state, action: PayloadAction<number>) => {
      state.value.itemsNo += action.payload;
    },
  },
});

export const { increment, decrement, addMultiple, addToCart, removeFromCart } =
  cartSlice.actions;

export const selectCartNo = (state: RootState) => state.cart.value;

export default cartSlice.reducer;
