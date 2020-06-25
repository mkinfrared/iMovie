import { fireEvent, render } from "@testing-library/react";
import React, { ReactElement } from "react";

import Image from "./Image";

describe("<Image />", () => {
  let Component: ReactElement;

  const loadWidth = 42;
  const loadHeight = 42;
  const alt = "foo";
  const src = "bar";
  const imageRef = jest.fn();
  const onImageLoad = jest.fn();

  beforeEach(() => {
    Component = (
      <Image
        loadWidth={loadWidth}
        loadHeight={loadHeight}
        alt={alt}
        src={src}
        imageRef={imageRef}
        onImageLoad={onImageLoad}
      />
    );

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    const { container } = render(Component);

    expect(container).toBeDefined();
  });

  it("should call onImageLoad after the image has been loaded", () => {
    const { container } = render(Component);
    const image = container.querySelector("img");

    fireEvent.load(image!);

    expect(onImageLoad).toHaveBeenCalled();
  });

  it("should not call onImageLoad after the image loading has failed", () => {
    const { container } = render(Component);
    const image = container.querySelector("img");

    fireEvent.error(image!);

    expect(onImageLoad).not.toHaveBeenCalled();
  });
});
