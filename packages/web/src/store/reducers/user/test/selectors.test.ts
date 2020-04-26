import { initialState } from "./reducer.test";
import { getUser } from "../selectors";

describe("selectors", () => {
  it("should return user from store", () => {
    const result = getUser({ user: initialState });

    expect(result).toMatchObject(initialState);
  });
});
