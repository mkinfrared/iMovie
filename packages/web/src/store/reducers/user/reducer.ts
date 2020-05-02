import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "./types";

const initialState: User = {};

const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<User>) {
      state = action.payload;

      return state;
    },
    logoutUser(state) {
      state = initialState;

      return state;
    }
  }
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
