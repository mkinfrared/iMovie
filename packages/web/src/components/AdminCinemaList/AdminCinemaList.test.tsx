import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import AdminCinemaList from "./AdminCinemaList";

jest.mock("containers/AddCinemaForm", () => (props: any) => (
  <div data-testid="containers/AddCinemaForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminCinemaList />", () => {
  const dispatch = jest.fn();

  const cinema = {
    id: 42,
    name: "marklar",
    zipcode: {
      code: 92506,
      city: {
        name: "South Park"
      },
      state: {
        name: "Colorado"
      },
      country: {
        name: "USA"
      }
    }
  } as any;

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <MemoryRouter>
        <AdminCinemaList dispatch={dispatch} cinemas={[cinema]} />
      </MemoryRouter>
    );
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
