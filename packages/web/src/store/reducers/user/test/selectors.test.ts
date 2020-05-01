import { userStateMock } from "./mocks";
import { selectUserId } from "../selectors";

describe("selectors", () => {
  it("should return user from store", () => {
    const result = selectUserId({ user: userStateMock });

    expect(result).toBe(userStateMock.id);
  });
});
