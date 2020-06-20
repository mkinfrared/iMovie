import { act, fireEvent, render, within } from "@testing-library/react";
import React, { ReactElement } from "react";

import { auditoriumsMock } from "store/reducers/cinemas/test/mocks";
import api from "utils/api";

import EditAuditoriumForm from "./EditAuditoriumForm";

jest.mock("utils/api");

describe("<EditAuditoriumForm />", () => {
  let Component: ReactElement;

  const apiMock = api as jest.Mocked<typeof api>;
  const [auditorium] = auditoriumsMock;
  const onCancel = jest.fn();
  const cinemaId = 42;
  const auditoriumId = auditorium.id;

  beforeEach(() => {
    Component = (
      <EditAuditoriumForm
        auditorium={auditorium}
        onCancel={onCancel}
        cinemaId={cinemaId}
        auditoriumId={auditoriumId}
      />
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

  it("should render 2 select inputs", () => {
    const { container } = render(Component);

    const selectButton = container.parentNode?.querySelectorAll(
      "[role=button]"
    );

    expect(selectButton).toHaveLength(2);
  });

  it("should submit the form", async () => {
    const { container, findByRole, getByTestId, findAllByTestId } = render(
      Component
    );

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButtons = await findAllByTestId("addRowButton");
    const addButton = addButtons[addButtons.length - 1];
    const removeButtons = await findAllByTestId("removeRowButton");
    const removeButton = removeButtons[removeButtons.length - 1];
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(2);

    fireEvent.click(removeButton);

    selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

    fireEvent.mouseDown(selectButton);

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("7");

    fireEvent.click(listItem);

    await within(container).findByText("7");

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalled();

    expect(onCancel).toHaveBeenCalled();
  });

  it("should set errors on form", async () => {
    const {
      container,
      findByRole,
      getByTestId,
      findAllByTestId,
      getByText
    } = render(Component);

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButtons = await findAllByTestId("addRowButton");
    const addButton = addButtons[addButtons.length - 1];
    const removeButtons = await findAllByTestId("removeRowButton");
    const removeButton = removeButtons[removeButtons.length - 1];
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(2);

    fireEvent.click(removeButton);

    selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

    fireEvent.mouseDown(selectButton);

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("7");

    fireEvent.click(listItem);

    await within(container).findByText("7");

    const data = {
      name: ["they took'er jobs!!"]
    };

    apiMock.put.mockReturnValueOnce(
      Promise.reject({ response: { data, status: 409 } })
    );

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalled();

    expect(getByText(data.name[0])).toBeInTheDocument();
  });

  it("should not set errors on form", async () => {
    const {
      container,
      findByRole,
      getByTestId,
      findAllByTestId,
      queryByText
    } = render(Component);

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButtons = await findAllByTestId("addRowButton");
    const addButton = addButtons[addButtons.length - 1];
    const removeButtons = await findAllByTestId("removeRowButton");
    const removeButton = removeButtons[removeButtons.length - 1];
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(2);

    fireEvent.click(removeButton);

    selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

    fireEvent.mouseDown(selectButton);

    const listbox = await findByRole("listbox");
    const listItem = await within(listbox).findByText("7");

    fireEvent.click(listItem);

    await within(container).findByText("7");

    const data = {
      name: ["they took'er jobs!!"]
    };

    apiMock.put.mockReturnValueOnce(
      Promise.reject({ response: { data, status: 500 } })
    );

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(apiMock.put).toHaveBeenCalled();

    const error = queryByText(data.name[0]);

    expect(error).toBeNull();
  });
});
