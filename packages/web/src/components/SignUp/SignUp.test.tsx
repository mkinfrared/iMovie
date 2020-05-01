import { act, fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import SignUp from "./SignUp";

jest.mock("utils/api");

jest.mock("components/RegistrationSuccess", () => (props: any) => (
  <div data-testid="components/RegistrationSuccess">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<SignUp />", () => {
  const onClose = jest.fn();
  const open = true;
  const openLogin = jest.fn();
  const apiMock = api as jest.Mocked<typeof api>;

  let Component: ReactElement;

  beforeEach(() => {
    Component = <SignUp open={open} onClose={onClose} openLogin={openLogin} />;

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

  it("should submit the form and open <RegistrationSuccess />", async () => {
    const fieldValues = {
      username: "marklar",
      password: "Foobar2@",
      email: "foo@bar.com"
    };

    apiMock.post.mockReturnValueOnce(Promise.resolve({ data: 42 }));

    const { getByTestId, rerender } = render(Component);
    const username = getByTestId("username") as HTMLInputElement;
    const password = getByTestId("password") as HTMLInputElement;
    const email = getByTestId("email") as HTMLInputElement;
    const confirm = getByTestId("confirm") as HTMLInputElement;
    const registerButton = getByTestId("registerButton");

    await act(async () => {
      await fireEvent.input(username, {
        target: { value: fieldValues.username }
      });

      await fireEvent.input(password, {
        target: { value: fieldValues.password }
      });

      await fireEvent.input(email, {
        target: { value: fieldValues.email }
      });

      await fireEvent.input(confirm, {
        target: { value: fieldValues.password }
      });
    });

    expect(username.value).toBe(fieldValues.username);

    expect(password.value).toBe(fieldValues.password);

    expect(email.value).toBe(fieldValues.email);

    expect(confirm.value).toBe(fieldValues.password);

    await act(async () => {
      await fireEvent.click(registerButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    rerender(Component);

    expect(getByTestId("components/RegistrationSuccess")).toBeInTheDocument();
  });

  it("should set errors on form fields", async () => {
    const data = { username: ["foobar"] };

    const fieldValues = {
      username: "marklar",
      password: "Foobar2@",
      email: "foo@bar.com"
    };

    apiMock.post.mockRejectedValueOnce({
      response: { data }
    });

    const { getByTestId, findByText } = render(Component);
    const username = getByTestId("username") as HTMLInputElement;
    const password = getByTestId("password") as HTMLInputElement;
    const email = getByTestId("email") as HTMLInputElement;
    const confirm = getByTestId("confirm") as HTMLInputElement;
    const registerButton = getByTestId("registerButton");

    await act(async () => {
      await fireEvent.input(username, {
        target: { value: fieldValues.username }
      });

      await fireEvent.input(password, {
        target: { value: fieldValues.password }
      });

      await fireEvent.input(email, { target: { value: fieldValues.email } });

      await fireEvent.input(confirm, {
        target: { value: fieldValues.password }
      });
    });

    expect(username.value).toBe(fieldValues.username);

    expect(password.value).toBe(fieldValues.password);

    expect(email.value).toBe(fieldValues.email);

    expect(confirm.value).toBe(fieldValues.password);

    await act(async () => {
      await fireEvent.click(registerButton);
    });

    expect(apiMock.post).toHaveBeenCalled();

    const result = await findByText(data.username[0]);

    expect(result).toBeInTheDocument();
  });
});
