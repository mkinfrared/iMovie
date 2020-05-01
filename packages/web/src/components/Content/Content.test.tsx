import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Content from "./Content";

describe("<Content />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <Content />;
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
