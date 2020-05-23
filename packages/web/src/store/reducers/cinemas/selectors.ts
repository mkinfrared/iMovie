import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "store/store.type";

const getCinemas = (state: AppState) => state.cinemas;
const selectCinemas = createSelector(getCinemas, (cinemas) => cinemas.data);

const selectCinema = (cinemaId: number) =>
  createSelector(getCinemas, (cinemas) =>
    cinemas.data.find(({ id }) => id === cinemaId)
  );

const selectCinemaAuditoriums = (cinemaId: number) =>
  createSelector(selectCinema(cinemaId), (cinema) => cinema?.auditoriums);

export { selectCinemas, selectCinema, selectCinemaAuditoriums };
