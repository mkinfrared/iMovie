import { fireEvent, render, waitForElement } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import { cinemaMock } from "store/reducers/cinemas/test/mocks";

import AdminCinemaList from "./AdminCinemaList";

jest.mock("containers/EditCinemaForm", () => (props: any) => (
  <div>
    <code>containers/EditCinemaForm</code>
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminCinemaList />", () => {
  const dispatch = jest.fn();
  const cinema = cinemaMock;

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

  it("should open 'EditCinemaForm'", async () => {
    const { queryByText, getByTestId } = render(Component);
    const editButton = getByTestId("editButton");

    let editCinemaForm = await queryByText("containers/EditCinemaForm");

    expect(editCinemaForm).not.toBeInTheDocument();

    fireEvent.click(editButton);

    await waitForElement(() => "containers/EditCinemaForm");

    editCinemaForm = await queryByText("containers/EditCinemaForm");

    expect(editCinemaForm).toBeInTheDocument();
  });
});
