import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElement,
  within
} from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import AddShowtimeForm from "./AddShowtimeForm";

jest.mock("utils/api");

describe("<AddShowtimeForm />", () => {
  const apiMock = api as jest.Mocked<typeof api>;
  const open = true;
  const onClose = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = <AddShowtimeForm onClose={onClose} open={open} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should display errors when required fields are empty", async () => {
    const { getByTestId, findAllByText } = render(Component);
    const submitButton = getByTestId("submitButton");

    fireEvent.click(submitButton);

    await waitForElement(() => "required field");

    const elements = await findAllByText(/required field/gi);
    const [element] = elements;

    expect(element).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    const country = {
      alpha2Code: "US",
      name: "USA"
    };

    const state = {
      id: 12,
      name: "Colorado"
    };

    const city = {
      id: 17,
      name: "South Park"
    };

    const zipcode = {
      id: 33,
      code: "333666"
    };

    const cinema = {
      id: 42,
      name: "Majestic"
    };

    const auditorium = {
      id: 47,
      name: "Mercury"
    };

    const movie = {
      id: 55,
      title: "The Dark Knight",
      posterPath: "/broflowski"
    };

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [country] } })
    );

    const { getByTestId, findByRole, findByText, queryByRole } = render(
      Component
    );

    const submitButton = getByTestId("submitButton");

    const countryInput = document.querySelector(
      'input[name="country"]'
    ) as HTMLInputElement;

    const movieInput = document.querySelector(
      'input[name="movie"]'
    ) as HTMLInputElement;

    const dateInput = document.querySelector(
      'input[name="date"]'
    ) as HTMLInputElement;

    await waitFor(() => expect(apiMock.get).toHaveBeenCalledWith("/country"), {
      timeout: 1000
    });

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [state] }));

    act(() => {
      fireEvent.change(countryInput, { target: { value: "us" } });
    });

    let listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    let listItem = await within(listbox).findByText("USA");

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(countryInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    expect(dateInput).toBeDefined();

    fireEvent.click(dateInput);

    const okButton = await findByText(/^OK$/);

    act(() => {
      fireEvent.click(okButton);
    });

    const stateInput = document.querySelector(
      'input[name="state"]'
    ) as HTMLInputElement;

    expect(stateInput).toBeDefined();

    act(() => {
      fireEvent.mouseDown(stateInput);

      fireEvent.change(stateInput, { target: { value: "col" } });
    });

    listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("Colorado");

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [city] }));

    await act(async () => {
      await fireEvent.click(listItem);

      await fireEvent.blur(stateInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    let params: Record<string, any> = {
      stateId: state.id
    };

    await waitFor(
      () => expect(apiMock.get).toHaveBeenCalledWith("/city", { params }),
      { timeout: 1000 }
    );

    const cityInput = document.querySelector(
      'input[name="city"]'
    ) as HTMLInputElement;

    expect(cityInput).toBeDefined();

    fireEvent.change(cityInput, { target: { value: "sou" } });

    listbox = await findByRole("listbox", {}, { timeout: 5 });

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("South Park");

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [zipcode] }));

    await act(async () => {
      await fireEvent.click(listItem);

      await fireEvent.blur(cityInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    await waitFor(
      () =>
        expect(apiMock.get).toHaveBeenCalledWith(`/zipcode/city/${city.id}`),
      { timeout: 1000 }
    );

    const zipcodeInput = document.querySelector(
      'input[name="zipcode"]'
    ) as HTMLInputElement;

    fireEvent.change(zipcodeInput, { target: { value: "333" } });

    listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("333666");

    apiMock.get.mockReset();

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [cinema] } })
    );

    await act(async () => {
      await fireEvent.click(listItem);

      await fireEvent.blur(zipcodeInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    params = { zipcodeId: zipcode.id };

    await waitFor(
      () => expect(apiMock.get).toHaveBeenCalledWith("/cinema", { params }),
      { timeout: 1000 }
    );

    const cinemaInput = document.querySelector(
      'input[name="cinema"]'
    ) as HTMLInputElement;

    fireEvent.change(cinemaInput, { target: { value: "maj" } });

    listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("Majestic");

    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [auditorium] }));

    await act(async () => {
      await fireEvent.click(listItem);

      await fireEvent.blur(cinemaInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    params = {
      cinemaId: cinema.id
    };

    await waitFor(
      () => expect(apiMock.get).toHaveBeenCalledWith("/auditorium", { params }),
      { timeout: 1000 }
    );

    const auditoriumInput = document.querySelector(
      'input[name="auditorium"]'
    ) as HTMLInputElement;

    fireEvent.change(auditoriumInput, { target: { value: "mer" } });

    listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("Mercury");

    await act(async () => {
      await fireEvent.click(listItem);

      await fireEvent.blur(auditoriumInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    apiMock.get.mockRestore();

    apiMock.get.mockReturnValueOnce(
      Promise.resolve({ data: { result: [movie] } })
    );

    fireEvent.change(movieInput, { target: { value: "dar" } });

    params = {
      title: "dar"
    };

    await waitFor(
      () => expect(apiMock.get).toHaveBeenCalledWith("/movie", { params }),
      { timeout: 1000 }
    );

    listbox = await findByRole("listbox");

    expect(listbox).toBeDefined();

    listItem = await within(listbox).findByText("The Dark Knight");

    expect(listItem).toBeDefined();

    act(() => {
      fireEvent.click(listItem);

      fireEvent.blur(movieInput);
    });

    expect(queryByRole("listbox")).toBeNull();

    fireEvent.click(submitButton);

    await waitFor(() => expect(apiMock.post).toHaveBeenCalled(), {
      timeout: 1000
    });
  }, 30000);
});
