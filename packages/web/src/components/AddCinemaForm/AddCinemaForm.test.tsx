import { act, findByTestId, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import api from "utils/api";

import AddCinemaForm from "./AddCinemaForm";

jest.mock("utils/api");

jest.mock("ui/SearchField", () => (props: any) => (
  <div data-testid="ui/SearchField">
    <code>{JSON.stringify(props)}</code>
  </div>
));

describe("<AddCinemaForm />", () => {
  const apiMock = api as jest.Mocked<typeof api>;
  const open = true;
  const onClose = jest.fn();
  const dispatch = jest.fn();

  let Component: ReactElement;

  beforeEach(() => {
    Component = (
      <AddCinemaForm onClose={onClose} open={open} dispatch={dispatch} />
    );
  });

  it("should be defined", async () => {
    apiMock.get.mockReturnValueOnce(Promise.resolve({ data: [42] }));

    await act(async () => {
      const { baseElement } = await render(Component);

      await findByTestId(baseElement, "ui/SearchField");
    });
  });

  it("should match a snapshot", () => {
    const { baseElement } = render(Component);

    expect(baseElement).toMatchSnapshot();
  });
});
