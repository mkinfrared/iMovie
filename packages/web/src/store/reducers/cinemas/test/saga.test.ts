import { testSaga } from "redux-saga-test-plan";
import { fork } from "redux-saga/effects";
import { CinemaActionTypes } from "store/reducers/cinemas/types";
import cinemaSaga, { fetchCinemasSaga, watchCinemasRequest } from "../saga";
import api from "utils/api";
import { fetchCinemasSuccess } from "../reducer";

jest.mock("utils/api");

describe("Cinema saga", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should yield all watchSagas", () => {
    const saga = testSaga(cinemaSaga);
    const watchSagas = [fork(watchCinemasRequest)];

    saga.next().all(watchSagas);
  });

  it("should yield takeEvery and call 'fetchCinemasSaga'", () => {
    const saga = testSaga(watchCinemasRequest);

    saga
      .next()
      .takeEvery(CinemaActionTypes.FETCH_CINEMAS_REQUEST, fetchCinemasSaga)
      .next()
      .isDone();
  });

  it("should yield '/cinema' request and put", () => {
    const responseMock = { data: { result: ["marklar"], page: 42, total: 33 } };
    const result = { data: ["marklar"], page: 42, total: 33 };

    const saga = testSaga(fetchCinemasSaga);

    saga
      .next()
      .next(responseMock)
      .put(fetchCinemasSuccess(result as any))
      .next()
      .isDone();

    expect(apiMock.get).toHaveBeenCalledWith("/cinema");
  });
});
