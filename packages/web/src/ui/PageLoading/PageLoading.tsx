import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useRef } from "react";

import css from "./PageLoading.module.scss";

const PageLoading = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const { current } = ref;

    if (current) {
      current.style.height = `${current.parentElement?.clientHeight}px`;
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className={css.PageLoading} ref={ref}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default React.memo(PageLoading);
