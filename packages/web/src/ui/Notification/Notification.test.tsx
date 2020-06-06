import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Notification from "./Notification";

describe("<Notification />", () => {
  const onClose = jest.fn();
  const open = true;
  const className = "foobar";
  const message = "they took'er jobs!!";

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <Notification
        onClose={onClose}
        open={open}
        className={className}
        message={message}
      />
    );
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });
});
