import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React, { ReactElement } from "react";
import { Router } from "react-router-dom";

import Routes from "./Routes";

describe("<Routes />", () => {
  const history = createMemoryHistory();
  const isAdmin = true;

  let Component: ReactElement;

  beforeEach(() => {
    history.push("/");

    Component = (
      <Router history={history}>
        <Routes isAdmin={isAdmin} history={history} />;
      </Router>
    );

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should invoke 'goBack' from history", () => {
    const routerHistory = createMemoryHistory();

    routerHistory.push("/404");

    jest.spyOn(routerHistory, "goBack");

    render(
      <Router history={routerHistory}>
        <Routes isAdmin={isAdmin} history={routerHistory} />;
      </Router>
    );

    expect(routerHistory.goBack).toHaveBeenCalled();
  });

  it("should not invoke 'goBack' from history", () => {
    const routerHistory = createMemoryHistory();

    routerHistory.push("/");

    jest.spyOn(routerHistory, "goBack");

    render(
      <Router history={routerHistory}>
        <Routes isAdmin={false} history={routerHistory} />;
      </Router>
    );

    expect(routerHistory.goBack).not.toHaveBeenCalled();
  });
});
