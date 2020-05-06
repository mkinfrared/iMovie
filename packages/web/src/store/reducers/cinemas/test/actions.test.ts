import { cinemaMock } from "store/reducers/cinemas/test/mocks";
import { CinemaActionTypes } from "store/reducers/cinemas/types";
import { fetchCinemasSuccess } from "../reducer";
import { fetchCinemas } from "../actions";

describe("actions", () => {
  it("should return a correct action", () => {
    const action = {
      type: fetchCinemasSuccess.type,
      payload: {
        data: [cinemaMock],
        page: null
      }
    };
    const result = fetchCinemasSuccess({ data: [cinemaMock], page: null });

    expect(result).toMatchObject(action);
  });

  it("should return a correct action", () => {
    const action = { type: CinemaActionTypes.FETCH_CINEMAS_REQUEST };
    const result = fetchCinemas();

    expect(result).toMatchObject(action);
  });
});
