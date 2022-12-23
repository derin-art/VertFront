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
  };
}

const initialState: UserAuthState = {
  value: {
    email: null,
    uid: null,
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
      state.value = { email: null, uid: null };
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default authSlice.reducer;
