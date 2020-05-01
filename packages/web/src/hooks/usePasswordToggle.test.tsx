import { fireEvent, render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import usePasswordToggle from "./usePasswordToggle";

describe("useTogglePassword", () => {
  it("should toggle adornment", async () => {
    const { result } = renderHook(() => usePasswordToggle());

    expect(result.current.passwordVisible).toBe(false);

    const { getByLabelText, getByTestId, rerender } = render(
      result.current.renderAdornment()
    );

    const button = getByLabelText("toggle password visibility");

    expect(getByTestId("invisible")).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(button);
    });

    expect(result.current.passwordVisible).toBe(true);

    rerender(result.current.renderAdornment());

    expect(getByTestId("visible")).toBeInTheDocument();
  });
});
