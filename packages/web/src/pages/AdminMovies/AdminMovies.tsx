import AddIcon from "@material-ui/icons/Add";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { AdminRoutes } from "routes/Routes.type";
import FloatButton from "ui/FloatButton/FloatButton";

// export interface AdminMoviesProps {}

const AdminMovies = () => {
  const history = useHistory();

  const handleFloatButtonClick = useCallback(() => {
    history.push(AdminRoutes.ADMIN_ADD_MOVIE);
  }, [history]);

  return (
    <>
      <div>AdminMovies</div>
      <FloatButton onClick={handleFloatButtonClick}>
        <AddIcon />
      </FloatButton>
    </>
  );
};

export default React.memo(AdminMovies);
