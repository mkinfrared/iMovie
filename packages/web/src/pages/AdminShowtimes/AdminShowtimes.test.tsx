import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminShowtimes from "./AdminShowtimes";

jest.mock("containers/AddShowtimeForm", () => (props: any) => (
  <div data-testid="containers/AddShowtimeForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminShowtimes />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminShowtimes />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should open a modal", () => {
    const { getByTestId } = render(Component);
    const floatButton = getByTestId("floatButton");

    fireEvent.click(floatButton);

    const modal = getByTestId("containers/AddShowtimeForm");

    expect(modal).toBeInTheDocument();
  });
});
