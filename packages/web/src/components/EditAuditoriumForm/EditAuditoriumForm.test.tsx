import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import EditAuditoriumForm from "./EditAuditoriumForm";

describe("<EditAuditoriumForm />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <EditAuditoriumForm />;
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
