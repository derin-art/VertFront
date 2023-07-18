import { configureStore } from "@reduxjs/toolkit";
import collectionSliceReducer from "./Features/collectionAnimSlice";
import cartReducer from "./Features/cartSlice";
import authSliceReducer from "./Features/authSlice";
import loadingReducer from "./Features/loadingSlice";

import { type } from "os";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    collection: collectionSliceReducer,
    user: authSliceReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
