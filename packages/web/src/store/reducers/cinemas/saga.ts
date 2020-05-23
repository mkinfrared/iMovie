import { put } from "redux-saga-test-plan/matchers";
import { all, fork, takeEvery } from "redux-saga/effects";

import { fetchCinemaAuditoriums } from "store/reducers/cinemas/actions";
import api from "utils/api";

import { fetchCinemaAuditoriumsSuccess, fetchCinemasSuccess } from "./reducer";
import { Cinema, CinemaActionTypes, Cinemas } from "./types";

function* fetchCinemasSaga() {
  try {
    const response = yield api.get("/cinema");
    const { result, total, page } = response.data;

    const cinemas: Cinemas = {
      data: result,
      total,
      page
    };

    yield put(fetchCinemasSuccess(cinemas));
  } catch (e) {}
}

function* watchCinemasRequest() {
  yield takeEvery(CinemaActionTypes.FETCH_CINEMAS_REQUEST, fetchCinemasSaga);
}

function* fetchCinemaAuditoriumsSaga(
  action: ReturnType<typeof fetchCinemaAuditoriums>
) {
  const { payload } = action;

  try {
    const { data } = yield api.get(`/cinema/${payload}`);
    const cinema: Cinema = data;

    yield put(fetchCinemaAuditoriumsSuccess(cinema));
  } catch (e) {}
}

function* watchFetchCinemaAuditoriums() {
  yield takeEvery(
    CinemaActionTypes.FETCH_CINEMA_AUDITORIUMS_REQUEST,
    fetchCinemaAuditoriumsSaga
  );
}

function* cinemaSaga() {
  yield all([fork(watchCinemasRequest), fork(watchFetchCinemaAuditoriums)]);
}

export {
  watchCinemasRequest,
  fetchCinemasSaga,
  watchFetchCinemaAuditoriums,
  fetchCinemaAuditoriumsSaga
};

export default cinemaSaga;
