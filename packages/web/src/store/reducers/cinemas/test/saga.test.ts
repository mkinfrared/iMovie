import { testSaga } from "redux-saga-test-plan";
import { fork } from "redux-saga/effects";
import { CinemaActionTypes } from "store/reducers/cinemas/types";
import cinemaSaga, {
  fetchCinemaAuditoriumsSaga,
  fetchCinemasSaga,
  watchCinemasRequest,
  watchFetchCinemaAuditoriums
} from "../saga";
import api from "utils/api";
import { fetchCinemaAuditoriumsSuccess, fetchCinemasSuccess } from "../reducer";

jest.mock("utils/api");

describe("Cinema saga", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  it("should yield all watchSagas", () => {
    const saga = testSaga(cinemaSaga);
    const watchSagas = [
      fork(watchCinemasRequest),
      fork(watchFetchCinemaAuditoriums)
    ];

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

  it("should yield takeEvery and call 'fetchCinemaAuditoriumsSaga'", () => {
    const saga = testSaga(watchFetchCinemaAuditoriums);

    saga
      .next()
      .takeEvery(
        CinemaActionTypes.FETCH_CINEMA_AUDITORIUMS_REQUEST,
        fetchCinemaAuditoriumsSaga
      )
      .next()
      .isDone();
  });

  it("should yield '/cinema/:auditoriumId' request and put", () => {
    const cinema = {
      id: 42,
      name: "Marklar",
      auditoriums: [
        {
          id: 33,
          seats: [
            {
              id: 11,
              auditoriumId: 33,
              number: 10,
              row: "A"
            }
          ]
        }
      ]
    };
    const responseMock = { data: cinema };

    const saga = testSaga(fetchCinemaAuditoriumsSaga as any, { payload: 21 });

    saga
      .next()
      .next(responseMock)
      .put(fetchCinemaAuditoriumsSuccess(cinema as any))
      .next()
      .isDone();

    expect(apiMock.get).toHaveBeenCalledWith("/cinema");
  });
});
