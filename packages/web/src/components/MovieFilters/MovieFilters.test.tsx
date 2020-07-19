import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import MovieFilters from "./MovieFilters";

jest.mock("utils/api");

describe("<MovieFilters />", () => {
  const apiMock = api as jest.Mocked<typeof api>;
  const onCastChange = jest.fn();
  const onDirectorChange = jest.fn();
  const onProducerChange = jest.fn();
  const onWriterChange = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <MovieFilters
        onCastChange={onCastChange}
        onDirectorChange={onDirectorChange}
        onProducerChange={onProducerChange}
        onWriterChange={onWriterChange}
      />
    );

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should make an api call", async () => {
    const { container } = render(Component);
    const data = [{ name: "marklar", profilePath: "foobar", id: 42 }];

    apiMock.get.mockResolvedValueOnce(Promise.resolve({ data }));

    const castInput = container.querySelector(
      'input[name="cast"]'
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(castInput, { target: { value: "Cartman" } });
    });

    const params = { name: "Cartman" };

    await waitFor(
      () => expect(apiMock.get).toHaveBeenCalledWith("/person", { params }),
      { timeout: 1000 }
    );
  });
});
