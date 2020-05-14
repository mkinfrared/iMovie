import React from "react";

import { IconProps } from "icons/Icon.type";

const Screen = ({ className, style }: IconProps) => {
  return (
    <svg
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 830 69.59"
    >
      <path d="M.5.5h829V69Q415,.5.5,69Z" strokeMiterlimit="10" />
    </svg>
  );
};

export default React.memo(Screen);
