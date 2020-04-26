import { UserActions } from "../types";
import { fetchUser } from "../actions";

describe("actions", () => {
  it("should return a correct action", () => {
    const username = "marklar";
    const action = { type: UserActions.FETCH_USER, payload: username };
    const result = fetchUser(username);

    expect(result).toMatchObject(action);
  });
});
