import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminAddMovie from "./AdminAddMovie";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({
    goBack: jest.fn()
  }))
}));

jest.mock("components/AddMovieForm", () => (props: any) => (
  <div data-testid="components/AddMovieForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminAddMovie />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminAddMovie />;
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
