import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

jest.mock("containers/Login", () => (props: any) => (
  <div data-testid="containers/Login">
    <code>{JSON.stringify(props)}</code>
  </div>
));

jest.mock("components/SignUp", () => (props: any) => (
  <div data-testid="containers/SignUp">
    <code>{JSON.stringify(props)}</code>
  </div>
));

jest.mock("components/AdminMenu", () => (props: any) => (
  <div data-testid="components/AdminMenu">
    <code>{JSON.stringify(props)}</code>
  </div>
));

jest.mock("components/Menu", () => (props: any) => (
  <div data-testid="components/Menu">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<Header />", () => {
  let Component: ReactElement;

  const isAuth = false;

  beforeEach(() => {
    Component = (
      <MemoryRouter>
        <Header isAuth={isAuth} />
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

  it("should render Menu when user is authenticated", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header isAuth />
      </MemoryRouter>
    );

    const menu = getByTestId("components/Menu");

    expect(menu).toBeInTheDocument();
  });

  it("should open a sidebar", () => {
    const { getByLabelText, getByTestId } = render(Component);
    const menuButton = getByLabelText("menu");

    fireEvent.click(menuButton);

    const admin = getByTestId("components/AdminMenu");
    const result = JSON.parse(admin.textContent as string);

    expect(result.isOpen).toBe(true);
  });

  it("should open a Login component", async () => {
    const { getByLabelText, findByTestId } = render(Component);
    const loginButton = getByLabelText("login");

    fireEvent.click(loginButton);

    const login = await findByTestId("containers/Login");

    expect(login).toBeInTheDocument();
  });
});
