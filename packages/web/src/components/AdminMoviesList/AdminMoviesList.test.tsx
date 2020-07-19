import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import AdminMoviesList from "./AdminMoviesList";

jest.mock("utils/api");

describe("<AdminMoviesList />", () => {
  const apiMock = api as jest.Mocked<typeof api>;

  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminMoviesList />;

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should make an api call on mount", () => {
    render(Component);

    expect(apiMock.get).toHaveBeenCalledTimes(1);
  });
});
