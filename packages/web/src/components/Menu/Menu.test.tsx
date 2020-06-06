import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Menu from "./Menu";

describe("<Menu />", () => {
  const dispatch = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = <Menu dispatch={dispatch} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should open menu", async () => {
    const { getByTestId, findByText } = render(Component);
    const menuButton = getByTestId("menuButton");

    fireEvent.click(menuButton);

    const result = await findByText("Username");

    expect(result).toBeInTheDocument();
  });

  it("should close menu and call 'dispatch'", async () => {
    const { getByTestId, findByText, getByText } = render(Component);
    const menuButton = getByTestId("menuButton");

    fireEvent.click(menuButton);

    const username = await findByText("Username");

    expect(username).toBeInTheDocument();

    const logoutButton = getByText("Logout");

    fireEvent.click(logoutButton);

    expect(dispatch).toHaveBeenCalled();
  });
});
