import React, { useState } from "react";

import ImagePlaceholder from "ui/ImagePlaceholder";

import { ImageProps } from "./Image.type";

const Image = ({
  loadWidth,
  loadHeight,
  alt,
  src,
  imageRef,
  onImageLoad,
  ...rest
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);

    onImageLoad && onImageLoad();
  };

  const handleImageError = () => {
    setFailed(true);
  };

  return (
    <>
      {!failed && (
        <img
          src={src}
          alt={alt}
          ref={imageRef}
          {...rest}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {!loaded && <ImagePlaceholder width={loadWidth} height={loadHeight} />}
    </>
  );
};

export default React.memo(Image);
