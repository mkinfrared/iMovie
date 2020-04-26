import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

describe("<App />", () => {
  it("should be defined", () => {
    const { container } = render(<App />);

    expect(container).toBeDefined();
  });

  it("should match a snapshot", () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
