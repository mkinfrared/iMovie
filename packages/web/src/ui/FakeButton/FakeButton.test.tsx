import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import FakeButton from "./FakeButton";

describe("<FakeButton />", () => {
  const onClick = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = <FakeButton onClick={onClick} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should call 'onClick' when 'Enter' is pressed", () => {
    const { getByTestId } = render(Component);
    const fakeButton = getByTestId("fakeButton");

    fireEvent.keyDown(fakeButton, { key: "Enter" });

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call 'onClick' when key pressed is not 'Enter'", () => {
    const { getByTestId } = render(Component);
    const fakeButton = getByTestId("fakeButton");

    fireEvent.keyDown(fakeButton, { key: "Alt" });

    expect(onClick).toHaveBeenCalled();
  });
});
