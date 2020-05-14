import Fab from "@material-ui/core/Fab";
import React from "react";

import css from "./FloatButton.module.scss";
import { FloatButtonProps } from "./FloatButton.type";

const FloatButton = ({ onClick, children }: FloatButtonProps) => {
  return (
    <div className={css.FloatButton}>
      <Fab
        className={css.button}
        color="primary"
        onClick={onClick}
        data-testid="floatButton"
      >
        {children}
      </Fab>
    </div>
  );
};

export default React.memo(FloatButton);
