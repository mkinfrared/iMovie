import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

describe("<Header />", () => {
  it("should be defined", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should open a sidebar", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const menuButton = getByLabelText("menu");

    fireEvent.click(menuButton);

    expect(getByText("Lorem")).toBeInTheDocument();
  });
});
