import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import AdminMoviesList from "components/AdminMoviesList";
import { AdminRoutes } from "routes/Routes.type";
import FloatButton from "ui/FloatButton/FloatButton";

import css from "./AdminMovies.module.scss";

const AdminMovies = () => {
  const history = useHistory();

  const handleFloatButtonClick = useCallback(() => {
    history.push(AdminRoutes.ADMIN_ADD_MOVIE);
  }, [history]);

  return (
    <>
      <div className={css.AdminMovies}>
        <Typography variant="h3" align="center">
          Admin Movies
        </Typography>
      </div>
      <AdminMoviesList />
      <FloatButton onClick={handleFloatButtonClick}>
        <AddIcon />
      </FloatButton>
    </>
  );
};

export default React.memo(AdminMovies);
