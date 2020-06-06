import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import api from "utils/api";

import App from "./App";

jest.mock("utils/api");

jest.mock("containers/Header");

jest.mock("components/Content");

describe("<App />", () => {
  const mockStore = configureStore();
  const store = mockStore();
  const apiMock = api as jest.Mocked<typeof api>;

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
    );

    store.dispatch = jest.fn();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const container = render(Component);

    expect(container).toMatchSnapshot();
  });

  it("should fetch current user on mount", () => {
    apiMock.get.mockReturnValueOnce(Promise.resolve(42));

    render(Component);

    expect(apiMock.get).toHaveBeenCalled();
  });
});
