import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Cinema, Cinemas } from "./types";

const initialState: Cinemas = {
  data: [],
  page: null
};

const cinemasSlice = createSlice({
  name: "@@cinema",
  initialState,
  reducers: {
    fetchCinemasSuccess: (state, action: PayloadAction<Cinemas>) => {
      const { data, page, total } = action.payload;

      state.data = data;

      state.page = page;

      state.total = total;
    },
    fetchCinemaAuditoriumsSuccess: (state, action: PayloadAction<Cinema>) => {
      const { auditoriums } = action.payload;
      const cinema = state.data.find(({ id }) => id === action.payload.id);

      if (cinema) {
        cinema.auditoriums = auditoriums;
      }
    }
  }
});

const {
  fetchCinemasSuccess,
  fetchCinemaAuditoriumsSuccess
} = cinemasSlice.actions;

export { initialState, fetchCinemasSuccess, fetchCinemaAuditoriumsSuccess };

export default cinemasSlice.reducer;
