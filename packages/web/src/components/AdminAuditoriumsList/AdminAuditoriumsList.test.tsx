import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import AdminAuditoriumsList from "./AdminAuditoriumsList";

describe("<AdminAuditoriumsList />", () => {
  const dispatch = jest.fn();
  const cinemaId = 42;

  const auditorium = {
    id: 1,
    name: "Mercury",
    cinemaId: 1,
    createdAt: "2020-05-17T08:16:44.603Z",
    updatedAt: "2020-05-17T08:16:44.603Z",
    seats: [
      {
        id: 1,
        row: "A",
        number: 1,
        auditoriumId: 1
      }
    ]
  };

  const auditoriums = [auditorium];

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <MemoryRouter>
        <AdminAuditoriumsList
          dispatch={dispatch}
          cinemaId={cinemaId}
          auditoriums={auditoriums}
        />
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
