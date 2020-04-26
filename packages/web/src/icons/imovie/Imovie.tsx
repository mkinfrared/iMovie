import React from "react";

import { IconProps } from "icons/Icon.type";

const Imovie: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.01 512.01"
    >
      <title>iMovie</title>
      <circle cx="256" cy="256" r="256" fill="#f57c00" />
      <path
        d="M256,79.78h0L215.65,208.17l-134.57-1.3,101.7,101.7L147.89,412.5h0l99.34,99.33c2.91.1,5.83.17,8.77.17,131.17,0,239.29-98.67,254.22-225.83l-79.3-79.3-47.37.46Z"
        fill="#e65100"
      />
      <polygon
        points="256 79.78 296.35 208.17 430.92 206.87 321.28 284.92 364.11 412.5 256 332.35 147.89 412.5 190.72 284.92 81.08 206.87 215.65 208.17 256 79.78"
        fill="#fff"
      />
      <rect x="219.87" y="229.48" width="59.38" height="53.04" fill="#f57c00" />
      <rect x="210.14" y="238.56" width="6.7" height="12.54" fill="#f57c00" />
      <polygon
        points="282.48 248.56 282.48 263.44 301.86 276.25 301.86 235.75 282.48 248.56"
        fill="#f57c00"
      />
    </svg>
  );
};

export default React.memo(Imovie);
