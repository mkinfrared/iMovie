import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

import css from "./PageLoading.module.scss";

const PageLoading = () => {
  return (
    <div className={css.PageLoading}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default React.memo(PageLoading);
