import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";

import css from "./ModalLoading.module.scss";

const ModalLoading = () => {
  useEffect(() => {
    document.body.style.height = "100vh";

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.height = "auto";

      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={css.ModalLoading}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default ModalLoading;
