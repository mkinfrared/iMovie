import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Option from "components/Option/Option";

describe("<Option />", () => {
  let Component: ReactElement;

  const imageUrl = "marklar";
  const title = "foobar";

  beforeEach(() => {
    Component = <Option imageUrl={imageUrl} title={title} />;
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });
});
