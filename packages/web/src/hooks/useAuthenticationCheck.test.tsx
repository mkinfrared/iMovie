import { renderHook } from "@testing-library/react-hooks";

import useAuthenticationCheck from "./useAuthenticationCheck";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(() => true)
}));

describe("useAuthenticationCheck", () => {
  it("should return true", () => {
    const { result } = renderHook(() => useAuthenticationCheck());

    expect(result.current).toBe(true);
  });
});
