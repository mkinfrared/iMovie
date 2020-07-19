import { fireEvent, render } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import React, { ReactElement } from "react";

import MoviePreviewCard from "./MoviePreviewCard";

describe("<MoviePreviewCard />", () => {
  let Component: ReactElement;

  const imageUrl = "marklar";
  const title = "foobar";
  const releaseDate = "42-42-4242";
  const popularity = 42;
  const overview = "they took'er jobs!!";
  const id = 77;

  beforeEach(() => {
    Component = (
      <MoviePreviewCard
        title={title}
        imageUrl={imageUrl}
        releaseDate={releaseDate}
        popularity={popularity}
        overview={overview}
        id={id}
      />
    );
  });

  it("should be defined", async () => {
    const { container } = render(Component);

    await act(() => {
      // Change the viewport to 500px.
      (window as any).innerWidth = 500;

      (window as any).innerHeight = 500;

      // Trigger the window resize event.
      // window.dispatchEvent(new Event('resize'))
      fireEvent(window, new Event("resize"));
    });

    expect(container).toBeDefined();
  });
});
