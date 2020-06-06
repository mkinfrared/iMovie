import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminEditAuditorium from "./AdminEditAuditorium";

describe("<AdminEditAuditorium />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminEditAuditorium />;
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
