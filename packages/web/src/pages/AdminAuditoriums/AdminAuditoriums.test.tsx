import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminAuditoriums from "./AdminAuditoriums";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => "42"),
  useHistory: jest.fn()
}));

describe("<AdminAuditoriums />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminAuditoriums />;
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
