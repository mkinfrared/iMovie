import { userStateMock } from "store/reducers/user/test/mocks";
import { loginUser } from "../reducer";

describe("actions", () => {
  it("should return a correct action", () => {
    const action = { type: loginUser.type, payload: userStateMock };
    const result = loginUser(userStateMock);

    expect(result).toMatchObject(action);
  });
});
