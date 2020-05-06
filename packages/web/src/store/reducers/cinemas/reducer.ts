import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Cinemas } from "./types";

const initialState: Cinemas = {
  data: [],
  page: null
};

const cinemasSlice = createSlice({
  name: "@@cinema",
  initialState,
  reducers: {
    fetchCinemasSuccess: (state, action: PayloadAction<Cinemas>) => {
      state = action.payload;

      return state;
    }
  }
});

const { fetchCinemasSuccess } = cinemasSlice.actions;

export { initialState, fetchCinemasSuccess };

export default cinemasSlice.reducer;
