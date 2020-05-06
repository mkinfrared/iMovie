import { put } from "redux-saga-test-plan/matchers";
import { all, fork, takeEvery } from "redux-saga/effects";

import { CinemaActionTypes, Cinemas } from "store/reducers/cinemas/types";
import api from "utils/api";

import { fetchCinemasSuccess } from "./reducer";

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

function* cinemaSaga() {
  yield all([fork(watchCinemasRequest)]);
}

export { watchCinemasRequest, fetchCinemasSaga };

export default cinemaSaga;
