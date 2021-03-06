import { act, fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import Login from "./Login";

jest.mock("utils/api");

describe("<Login />", () => {
  const onClose = jest.fn();
  const open = true;
  const dispatch = jest.fn();
  const openSignUp = jest.fn();
  const apiMock = api as jest.Mocked<typeof api>;

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <Login
        open={open}
        onClose={onClose}
        dispatch={dispatch}
        openSingUp={openSignUp}
      />
    );

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    const { baseElement } = render(Component, {});

    expect(baseElement).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { baseElement } = render(Component);

    expect(baseElement).toMatchSnapshot();
  });

  it("should submit the form", async () => {
    apiMock.post.mockReturnValueOnce(Promise.resolve({ data: 42 }));

    const { getByTestId } = render(Component);
    const username = getByTestId("username") as HTMLInputElement;
    const password = getByTestId("password") as HTMLInputElement;
    const loginButton = getByTestId("loginButton");

    await act(async () => {
      await fireEvent.input(username, { target: { value: "marklar" } });

      await fireEvent.input(password, { target: { value: "foobar" } });
    });

    expect(username.value).toBe("marklar");

    expect(password.value).toBe("foobar");

    await act(async () => {
      await fireEvent.click(loginButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    expect(onClose).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalled();
  });

  it("should set errors on form fields", async () => {
    const data = { username: ["they took'er jobs!!"] };

    const fieldValues = {
      username: "marklar",
      password: "foobar"
    };

    apiMock.post.mockRejectedValueOnce({
      response: { data },
      status: 400
    });

    const { getByTestId, findByText, queryByText } = render(Component);
    const username = getByTestId("username") as HTMLInputElement;
    const password = getByTestId("password") as HTMLInputElement;
    const loginButton = getByTestId("loginButton");

    await act(async () => {
      await fireEvent.input(username, {
        target: { value: fieldValues.username }
      });

      await fireEvent.input(password, {
        target: { value: fieldValues.password }
      });
    });

    expect(username.value).toBe(fieldValues.username);

    expect(password.value).toBe(fieldValues.password);

    await act(async () => {
      await fireEvent.click(loginButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    expect(onClose).not.toHaveBeenCalled();

    expect(dispatch).not.toHaveBeenCalled();

    const result = await findByText(data.username[0]);

    expect(result).toBeInTheDocument();

    expect(queryByText(data.username[0])).toBeInTheDocument();
  });

  it("should not set errors on form fields when status is not 400", async () => {
    const data = { username: ["they took'er jobs!!"] };

    const fieldValues = {
      username: "marklar",
      password: "foobar"
    };

    apiMock.post.mockRejectedValueOnce({
      response: { data }
    });

    const { getByTestId, queryByText } = render(Component);
    const username = getByTestId("username") as HTMLInputElement;
    const password = getByTestId("password") as HTMLInputElement;
    const loginButton = getByTestId("loginButton");

    await act(async () => {
      await fireEvent.input(username, {
        target: { value: fieldValues.username }
      });

      await fireEvent.input(password, {
        target: { value: fieldValues.password }
      });
    });

    expect(username.value).toBe(fieldValues.username);

    expect(password.value).toBe(fieldValues.password);

    await act(async () => {
      await fireEvent.click(loginButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    expect(onClose).not.toHaveBeenCalled();

    expect(dispatch).not.toHaveBeenCalled();

    expect(queryByText(data.username[0])).not.toBeInTheDocument();
  });
});
