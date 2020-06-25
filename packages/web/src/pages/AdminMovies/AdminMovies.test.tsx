import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminMovies from "./AdminMovies";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => "42"),
  useHistory: jest.fn(() => ({
    goBack: jest.fn(),
    push: jest.fn()
  }))
}));

describe("<AdminMovies />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminMovies />;
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
