import { renderHook } from "@testing-library/react-hooks";
import reactRedux from "react-redux";

import useIsAdmin from "./useIsAdmin";

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));

describe("useIsAdmin", () => {
  const { useSelector } = reactRedux as jest.Mocked<typeof reactRedux>;

  it("should return true", () => {
    useSelector.mockReturnValueOnce("admin");

    const { result } = renderHook(() => useIsAdmin());

    expect(result.current).toBe(true);
  });

  it("should return false", () => {
    useSelector.mockReturnValueOnce("user");

    const { result } = renderHook(() => useIsAdmin());

    expect(result.current).toBe(false);
  });
});
