import { action } from "typesafe-actions";

import { CinemaActionTypes } from "store/reducers/cinemas/types";

const fetchCinemas = () => action(CinemaActionTypes.FETCH_CINEMAS_REQUEST);

export { fetchCinemas };
