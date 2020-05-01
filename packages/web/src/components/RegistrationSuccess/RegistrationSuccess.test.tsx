import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import RegistrationSuccess from "./RegistrationSuccess";

describe("<RegistrationSuccess />", () => {
  const open = true;
  const onClose = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = <RegistrationSuccess open={open} onClose={onClose} />;
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
