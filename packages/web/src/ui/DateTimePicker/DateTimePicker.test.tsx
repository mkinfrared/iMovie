import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import DateTimePicker from "./DateTimePicker";

describe("<DateTimePicker />", () => {
  const value = "marklar";
  const onChange = jest.fn();
  const label = "Foobar";

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <DateTimePicker
        value={value}
        onChange={onChange}
        label={label}
        name="date"
      />
    );
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });
});
