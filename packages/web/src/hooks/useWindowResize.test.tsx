import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import useWindowResize from "./useWindowResize";

describe("useTogglePassword", () => {
  it("should toggle adornment", async () => {
    const callback = jest.fn();

    renderHook(() => useWindowResize(callback));

    expect(callback).not.toHaveBeenCalled();

    await act(() => {
      (window as any).innerWidth = 500;

      (window as any).innerHeight = 500;

      // Trigger the window resize event.
      // window.dispatchEvent(new Event('resize'))
      fireEvent(window, new Event("resize"));
    });

    expect(callback).toHaveBeenCalled();
  });
});
