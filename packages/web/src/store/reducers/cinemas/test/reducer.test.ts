import { cinemaStateMock, fetchCinemaAuditoriumsPayloadMock } from "./mocks";
import reducer, {
  fetchCinemaAuditoriumsSuccess,
  fetchCinemasSuccess,
  initialState
} from "../reducer";

describe("reducer", () => {
  it("should return an initial state when state is undefined", () => {
    const state = undefined;
    const action = { type: "marklar" } as any;
    const result = reducer(state, action);

    expect(result).toMatchObject(initialState);
  });

  it("should return an updated state", () => {
    const state = cinemaStateMock;
    const action = {
      type: fetchCinemasSuccess.type,
      payload: { ...cinemaStateMock }
    };
    const result = reducer(state, action);

    expect(result).toMatchObject(cinemaStateMock);
  });

  it("should return an updated state", () => {
    const state = cinemaStateMock;
    const action = {
      type: fetchCinemaAuditoriumsSuccess.type,
      payload: fetchCinemaAuditoriumsPayloadMock
    };
    const { data } = reducer(state, action);
    const result = data.find(
      ({ id }) => id === fetchCinemaAuditoriumsPayloadMock.id
    );

    expect(result).toBeDefined();
    expect(result).toMatchObject(fetchCinemaAuditoriumsPayloadMock);
  });

  it("should should not update state when cinema is not present in state", () => {
    const state = cinemaStateMock;
    const action = {
      type: fetchCinemaAuditoriumsSuccess.type,
      payload: { id: 999 }
    };
    const { data } = reducer(state, action);
    const result = data.find(({ id }) => id === 999);

    expect(result).toBeUndefined();
    expect(data[0]).not.toHaveProperty("auditoriums");
  });
});
