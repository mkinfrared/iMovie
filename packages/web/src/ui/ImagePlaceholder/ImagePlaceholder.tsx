import React from "react";
import ContentLoader from "react-content-loader";

import theme from "utils/theme";

import { ImagePlaceholderProps } from "./ImagePlaceholder.type";

const ImagePlaceholder = ({ width, height }: ImagePlaceholderProps) => {
  return (
    <ContentLoader
      foregroundColor={theme.palette.primary.light}
      backgroundColor={theme.palette.primary.dark}
      speed={1.6}
      width={width}
      height={height}
    >
      <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  );
};

export default React.memo(ImagePlaceholder);
