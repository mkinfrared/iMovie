import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "store/store.type";

const getCinemas = (state: AppState) => state.cinemas;
const selectCinemas = createSelector(getCinemas, (cinemas) => cinemas.data);

const selectCinema = (cinemaId?: number) =>
  createSelector(selectCinemas, (cinemas) =>
    cinemas.find(({ id }) => id === cinemaId)
  );

const selectCinemaAuditoriums = (cinemaId?: number) =>
  createSelector(selectCinema(cinemaId), (cinema) => cinema?.auditoriums);

const selectCinemaAuditorium = (cinemaId?: number, auditoriumId?: number) =>
  createSelector(selectCinemaAuditoriums(cinemaId), (auditoriums) =>
    auditoriums?.find(({ id }) => id === auditoriumId)
  );

const selectAuditoriums = createSelector(selectCinemas, (cinemas) =>
  cinemas.map(({ auditoriums }) => auditoriums).flat()
);

const selectAuditorium = (auditoriumId?: number) =>
  createSelector(selectAuditoriums, (auditoriums) =>
    auditoriums.find((auditorium) => auditorium?.id === auditoriumId)
  );

export {
  selectCinemas,
  selectCinema,
  selectAuditorium,
  selectCinemaAuditoriums,
  selectCinemaAuditorium
};
