import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Menu from "./Menu";

describe("<Menu />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <Menu />;
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
});
