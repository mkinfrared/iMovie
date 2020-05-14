import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Select from "./Select";

describe("<Select />", () => {
  const className = "marklar";
  const options = [{ value: 42, label: "foobar" }];
  const helperText = "they took'er jobs!!";
  const label = "Cartman";
  const onChange = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <Select
        className={className}
        options={options}
        helperText={helperText}
        label={label}
        onChange={onChange}
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
});
