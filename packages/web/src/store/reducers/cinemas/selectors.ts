import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "store/store.type";

const getCinemas = (state: AppState) => state.cinemas;
const selectCinemas = createSelector(getCinemas, (cinemas) => cinemas.data);

export { selectCinemas };
