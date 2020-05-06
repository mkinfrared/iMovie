import { cinemaStateMock } from "./mocks";
import reducer, { fetchCinemasSuccess, initialState } from "../reducer";

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
});
