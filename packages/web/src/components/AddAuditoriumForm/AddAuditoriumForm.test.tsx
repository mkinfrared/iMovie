import { act, fireEvent, render, within } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import AddAuditoriumForm from "./AddAuditoriumForm";

jest.mock("utils/api");

describe("<AddAuditoriumForm />", () => {
  const apiMock = api as jest.Mocked<typeof api>;
  const cinemaId = 42;
  const onCancel = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = <AddAuditoriumForm cinemaId={cinemaId} onCancel={onCancel} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should submit the form", async () => {
    const { container, findByRole, getByTestId } = render(Component);

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButton = getByTestId("addRowButton");
    const removeButton = getByTestId("removeRowButton");
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

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

    expect(apiMock.post).toHaveBeenCalled();
  });

  it("should set errors on form", async () => {
    const { container, findByRole, getByTestId, getByText } = render(Component);

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButton = getByTestId("addRowButton");
    const removeButton = getByTestId("removeRowButton");
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

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

    apiMock.post.mockReturnValueOnce(
      Promise.reject({ response: { data, status: 409 } })
    );

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    expect(getByText(data.name[0])).toBeInTheDocument();
  });

  it("should not set errors on form", async () => {
    const { container, findByRole, getByTestId, queryByText } = render(
      Component
    );

    const selectButton = container.parentNode?.querySelector(
      "[role=button]"
    ) as HTMLElement;

    const addButton = getByTestId("addRowButton");
    const removeButton = getByTestId("removeRowButton");
    const submitButton = getByTestId("submitButton");
    const auditoriumName = getByTestId("auditoriumName") as HTMLInputElement;

    fireEvent.change(auditoriumName, { target: { value: "marklar" } });

    expect(auditoriumName.value).toBe("marklar");

    fireEvent.click(addButton);

    let selects = container.querySelectorAll(".select");

    expect(selects).toHaveLength(1);

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

    apiMock.post.mockReturnValueOnce(
      Promise.reject({ response: { data, status: 500 } })
    );

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    const error = queryByText(data.name[0]);

    expect(error).toBeNull();
  });
});
