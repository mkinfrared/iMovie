import { act, findByText, fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminCinema from "./AdminCinema";

jest.mock("components/AddCinemaForm", () => (props: any) => (
  <div data-testid="components/AddCinemaForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminCinema />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminCinema />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should open <AddCinemaForm />", async () => {
    const { container } = render(Component);
    const floatButton = await findByText(container, "+");

    await act(async () => {
      await fireEvent.click(floatButton);
    });

    const result = await findByText(container, /\{"open":true\}/gi);

    expect(result).toBeInTheDocument();
  });
});
