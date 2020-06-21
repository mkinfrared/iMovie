/* eslint-disable @typescript-eslint/camelcase */
import {
  act,
  fireEvent,
  render,
  waitForDomChange,
  within
} from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";
import tmdbApi from "utils/tmdbApi";

import AddMovieForm from "./AddMovieForm";

jest.mock("notistack", () => ({
  useSnackbar: jest.fn(() => ({
    enqueueSnackbar: jest.fn()
  }))
}));

jest.mock("components/MoviePreviewCard", () => (props: any) => (
  <div data-testid="components/MoviePreviewCard">
    <code>{JSON.stringify(props)}</code>
  </div>
));

jest.mock("utils/tmdbApi");

jest.mock("utils/api");

describe("<AddMovieForm />", () => {
  let Component: ReactElement;

  const apiMock = api as jest.Mocked<typeof api>;
  const tmdbMock = tmdbApi as jest.Mocked<typeof tmdbApi>;
  const onCancel = jest.fn();

  beforeEach(() => {
    Component = <AddMovieForm onCancel={onCancel} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should render <MoviePreviewCard />", async () => {
    const { queryByText, findByRole, getByTestId } = render(Component);

    const searchResult = {
      id: 42,
      overview: "they took'er jobs!!",
      popularity: 324252,
      poster_path: "marklar",
      release_date: "01-01-1979",
      title: "foobar"
    };

    const response = { data: { results: [searchResult] } };

    tmdbMock.get.mockReturnValueOnce(Promise.resolve(response as any));

    const submitButton = getByTestId("submitButton");

    let movieCard = queryByText(/movieCard/);

    expect(movieCard).not.toBeInTheDocument();

    expect(submitButton).toBeDisabled();

    const comboBox = await findByRole("combobox");

    const movieInput = comboBox.querySelector(
      'input[name="movie"]'
    ) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(movieInput, { target: { value: "foo" } });
    });

    await waitForDomChange();

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("foobar");

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(movieInput);
    });

    movieCard = queryByText(/movieCard/);

    expect(movieCard).toBeInTheDocument();

    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    apiMock.post.mockReturnValueOnce(Promise.resolve("marklar"));

    expect(apiMock.post).toHaveBeenCalledWith("/movie", {
      id: searchResult.id
    });

    expect(onCancel).toHaveBeenCalled();
  });
});
