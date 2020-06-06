import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminMenuLink from "./AdminMenuLink";

jest.mock("react-router-dom", () => ({
  useRouteMatch: jest.fn(() => true),
  Link: jest.fn(({ children }) => <div>{children}</div>)
}));

describe("<AdminMenuLink />", () => {
  const path = "christmasPoo";
  const name = "Mr. Hankey";
  const icon = <div>icon</div>;

  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminMenuLink path={path} name={name} icon={icon} />;
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
