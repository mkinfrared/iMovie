import { act, fireEvent, render, within } from "@testing-library/react";
import React, { ReactElement } from "react";

import { cinemaMock } from "store/reducers/cinemas/test/mocks";
import api from "utils/api";

import EditCinemaForm from "./EditCinemaForm";

jest.mock("utils/api");

describe("<EditCinemaForm />", () => {
  const apiMock = api as jest.Mocked<typeof api>;
  const open = true;
  const { id } = cinemaMock;
  const cinema = cinemaMock;
  const onClose = jest.fn();
  const dispatch = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <EditCinemaForm
        onClose={onClose}
        open={open}
        dispatch={dispatch}
        id={id}
        cinema={cinema}
      />
    );

    jest.resetAllMocks();
  });

  it("should be defined", async () => {
    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [42] }));

    const { baseElement } = render(Component);

    expect(baseElement).toBeDefined();
  });

  it("should submit the form", async () => {
    const country = {
      alpha2Code: "US",
      name: "USA"
    };

    const zip = {
      id: 42,
      state: {
        name: "Colorado"
      },
      city: {
        name: "South Park"
      }
    };

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [country] } })
    );

    const { findByRole, getByTestId } = render(Component);

    expect(apiMock.get).toHaveBeenCalledWith("/country");

    const comboBox = await findByRole("combobox");

    const countryInput = comboBox.querySelector(
      'input[name="country"]'
    ) as HTMLInputElement;

    const zipcodeInput = getByTestId("zipcodeInput");
    const cinemaInput = getByTestId("cinemaName");
    const submitButton = getByTestId("submitButton");

    fireEvent.change(countryInput, { target: { value: "us" } });

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("USA");

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(countryInput);
    });

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: zip }));

    await act(async () => {
      fireEvent.change(zipcodeInput, { target: { value: "92506" } });

      await fireEvent.blur(zipcodeInput);
    });

    expect(api.get).toHaveBeenCalledWith(
      `/zipcode/${country.alpha2Code}/92506`
    );

    apiMock.post.mockReturnValueOnce(Promise.resolve({ data: "success" }));

    await act(async () => {
      fireEvent.change(cinemaInput, { target: { value: "marklar" } });

      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalledWith("/cinema", {
      id: cinema.id,
      name: "marklar",
      zipcodeId: zip.id
    });

    expect(dispatch).toHaveBeenCalled();

    expect(onClose).toHaveBeenCalled();
  });

  it("should set errors on form when status is 409", async () => {
    const country = {
      alpha2Code: "US",
      name: "USA"
    };

    const zip = {
      id: 42,
      state: {
        name: "Colorado"
      },
      city: {
        name: "South Park"
      }
    };

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [country] } })
    );

    const { findByRole, getByTestId, getByText } = render(Component);

    expect(apiMock.get).toHaveBeenCalledWith("/country");

    const comboBox = await findByRole("combobox");

    const countryInput = comboBox.querySelector(
      'input[name="country"]'
    ) as HTMLInputElement;

    const zipcodeInput = getByTestId("zipcodeInput");
    const cinemaInput = getByTestId("cinemaName");
    const submitButton = getByTestId("submitButton");

    fireEvent.change(countryInput, { target: { value: "us" } });

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("USA");

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(countryInput);
    });

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: zip }));

    await act(async () => {
      fireEvent.change(zipcodeInput, { target: { value: "92506" } });

      await fireEvent.blur(zipcodeInput);
    });

    expect(api.get).toHaveBeenCalledWith(
      `/zipcode/${country.alpha2Code}/92506`
    );

    const data = {
      cinemaName: ["they took'er jobs!!"]
    };

    apiMock.put.mockReturnValueOnce(
      Promise.reject({ response: { data, status: 409 } })
    );

    await act(async () => {
      fireEvent.change(cinemaInput, { target: { value: "marklar" } });

      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalledWith("/cinema", {
      id: cinema.id,
      name: "marklar",
      zipcodeId: zip.id
    });

    expect(dispatch).not.toHaveBeenCalled();

    expect(onClose).not.toHaveBeenCalled();

    expect(getByText(data.cinemaName[0])).toBeInTheDocument();
  });

  it("should not set errors on form when status is not 409", async () => {
    const country = {
      alpha2Code: "US",
      name: "USA"
    };

    const zip = {
      id: 42,
      state: {
        name: "Colorado"
      },
      city: {
        name: "South Park"
      }
    };

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [country] } })
    );

    const { findByRole, getByTestId, queryByText } = render(Component);

    expect(apiMock.get).toHaveBeenCalledWith("/country");

    const comboBox = await findByRole("combobox");

    const countryInput = comboBox.querySelector(
      'input[name="country"]'
    ) as HTMLInputElement;

    const zipcodeInput = getByTestId("zipcodeInput");
    const cinemaInput = getByTestId("cinemaName");
    const submitButton = getByTestId("submitButton");

    fireEvent.change(countryInput, { target: { value: "us" } });

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("USA");

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(countryInput);
    });

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: zip }));

    await act(async () => {
      fireEvent.change(zipcodeInput, { target: { value: "92506" } });

      await fireEvent.blur(zipcodeInput);
    });

    expect(api.get).toHaveBeenCalledWith(
      `/zipcode/${country.alpha2Code}/92506`
    );

    const data = {
      cinemaName: ["they took'er jobs!!"]
    };

    apiMock.put.mockReturnValueOnce(Promise.reject({ response: { data } }));

    await act(async () => {
      fireEvent.change(cinemaInput, { target: { value: "marklar" } });

      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalledWith("/cinema", {
      id: cinema.id,
      name: "marklar",
      zipcodeId: zip.id
    });

    expect(dispatch).not.toHaveBeenCalled();

    expect(onClose).not.toHaveBeenCalled();

    expect(queryByText(data.cinemaName[0])).not.toBeInTheDocument();
  });
});
