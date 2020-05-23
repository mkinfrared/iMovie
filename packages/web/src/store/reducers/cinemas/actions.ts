import { action } from "typesafe-actions";

import { CinemaActionTypes } from "store/reducers/cinemas/types";

const fetchCinemas = () => action(CinemaActionTypes.FETCH_CINEMAS_REQUEST);

const fetchCinemaAuditoriums = (cinemaId: number) =>
  action(CinemaActionTypes.FETCH_CINEMA_AUDITORIUMS_REQUEST, cinemaId);

export { fetchCinemas, fetchCinemaAuditoriums };
