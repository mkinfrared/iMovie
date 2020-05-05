import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminMenu from "./AdminMenu";

jest.mock("components/AdminMenuLink", () => (props: any) => (
  <div data-testid="components/AdminMenuLink">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminMenu />", () => {
  let Component: ReactElement;

  const onClose = jest.fn();

  beforeEach(() => {
    Component = <AdminMenu isOpen onClose={onClose} />;
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
