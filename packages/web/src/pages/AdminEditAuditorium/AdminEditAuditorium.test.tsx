import { render } from "@testing-library/react";
import React, { ReactElement } from "react";

import AdminEditAuditorium from "./AdminEditAuditorium";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => "42"),
  useHistory: jest.fn(() => ({
    goBack: jest.fn()
  }))
}));

jest.mock("containers/EditAuditoriumForm", () => (props: any) => (
  <div data-testid="containers/EditAuditoriumForm">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AdminEditAuditorium />", () => {
  let Component: ReactElement;

  beforeEach(() => {
    Component = <AdminEditAuditorium />;
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
