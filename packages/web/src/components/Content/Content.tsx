import Paper from "@material-ui/core/Paper";
import React from "react";

import css from "./Content.module.scss";
import { ContentProps } from "./Content.type";

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <Paper className={css.Content} square>
      {children}
    </Paper>
  );
};

export default React.memo(Content);
