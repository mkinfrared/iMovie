import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import "react-redux";

import AdminAuditoriums from "./AdminAuditoriums";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => "42"),
  useHistory: jest.fn()
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(() => "42")
}));

jest.mock("containers/AdminAuditoriumsList", () => (props: any) => (
  <div data-testid="containers/AdminAuditoriumsList">
    <code>{JSON.stringify(props)}</code>
  </div>
));

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
