import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import CinemaCard from "./CinemaCard";

jest.mock("containers/AddCinemaForm", () => (props: any) => (
  <div data-testid="containers/AddCinemaForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<CinemaCard />", () => {
  const onEdit = jest.fn();
  const cinemaId = 42;
  const cinemaName = "marklar";
  const cityName = "foobar";
  const countryName = "USA";
  const stateName = "Colorado";
  const zipcode = "424242";

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <MemoryRouter>
        <CinemaCard
          onEdit={onEdit}
          cinemaId={cinemaId}
          cinemaName={cinemaName}
          cityName={cityName}
          countryName={countryName}
          stateName={stateName}
          zipcode={zipcode}
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

  it("should call 'onEdit'", () => {
    const { getByTestId } = render(Component);
    const editButton = getByTestId("editButton");

    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(cinemaId);
  });
});
