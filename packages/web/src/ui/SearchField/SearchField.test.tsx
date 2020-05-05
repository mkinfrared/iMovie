import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import SearchField from "./SearchField";

describe("<SearchField />", () => {
  const options = [42];
  const onChange = jest.fn();
  const getOptionSelected = jest.fn();
  const getOptionLabel = jest.fn();
  const onBlur = jest.fn();
  const name = "marklar";
  const label = "Marklar";
  const helperText = "they took'er jobs!!";
  const error = true;
  const loading = true;
  const className = "searchField";

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <SearchField
        options={options}
        onChange={onChange}
        name={name}
        label={label}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        error={error}
        onBlur={onBlur}
        helperText={helperText}
        className={className}
        loading={loading}
      />
    );
  });

  it("should be defined", async () => {
    const { container } = await render(
      <SearchField
        options={options}
        onChange={onChange}
        name={name}
        label={label}
        getOptionSelected={getOptionSelected}
        getOptionLabel={getOptionLabel}
        onBlur={onBlur}
        helperText={helperText}
        className={className}
      />
    );

    expect(container).toBeDefined();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });
});
