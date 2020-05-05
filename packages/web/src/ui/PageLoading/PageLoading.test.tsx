import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import PageLoading from "./PageLoading";

describe("<PageLoading />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <PageLoading />;
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
