import { createSlice } from "@reduxjs/toolkit";

const initialState: object[] = [];

const movieSlice = createSlice({
  name: "@@movies",
  initialState,
  reducers: {}
});

const { reducer } = movieSlice;

export default reducer;
