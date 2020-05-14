import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminAddAuditorium from "./AdminAddAuditorium";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => "42")
}));

describe("<AdminAddAuditorium />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminAddAuditorium />;
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
