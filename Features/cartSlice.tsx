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
      let deleteArray: any = [];
      [...state.value.cartItems].forEach((item: any, index) => {
        if (item._id != action.payload) {
          return item;
        } else {
          deleteArray.push({ ...item, index: index });
        }
      });
      let arr = [...state.value.cartItems];

      console.log(
        "dede",
        arr.splice(deleteArray[0].index, deleteArray[0].index + 1)
      );
      state.value.cartItems = [...state.value.cartItems].filter(
        (item: any, index) => {
          if (index === deleteArray[0].index) return;
          else {
            return item;
          }
        }
      );
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
