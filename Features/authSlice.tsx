import { Slice, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebaseApp from "../pages/api/firebase";
import { RootState } from "../store";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { async } from "@firebase/util";
import { type } from "os";

interface UserAuthState {
  value: {
    email: any;
    uid: any;
    mongoData: any;
    openLoginRedux: boolean;
  };
}

const initialState: UserAuthState = {
  value: {
    email: null,
    mongoData: null,
    uid: null,
    openLoginRedux: false,
  },
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { ...state.value, email: null, uid: null, mongoData: null };
    },
    setOpenLoginRedux: (state) => {
      state.value = {
        ...state.value,
        openLoginRedux: !state.value.openLoginRedux,
      };
    },
    setOpenLoginReduxSet: (state, action: PayloadAction<boolean>) => {
      state.value = { ...state.value, openLoginRedux: action.payload };
    },
    addToMongoDataWishlist: (state, action) => {
      state.value = { ...state.value, mongoData: action.payload };
    },
  },
});

export const {
  login,
  logout,
  setOpenLoginRedux,
  setOpenLoginReduxSet,
  addToMongoDataWishlist,
} = authSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default authSlice.reducer;
