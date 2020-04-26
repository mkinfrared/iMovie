import reducer from "../reducer";
import { User, UserActions } from "../types";

export const initialState: User = {
  loading: false,
  username: ""
};
describe("reducer", () => {
  it("should return an initial state when state is undefined", () => {
    const state = undefined;
    const action = { type: "marklar" } as any;
    const result = reducer(state, action);

    expect(result).toMatchObject(initialState);
  });

  it("should return an updated state", () => {
    const state = initialState;
    const action = { type: UserActions.FETCH_USER, payload: "marklar" };
    const result = reducer(state, action);

    expect(result).toMatchObject(initialState);
  });
});
