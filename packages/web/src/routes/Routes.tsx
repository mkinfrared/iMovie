import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AdminShowtimes from "pages/AdminShowtimes";
import { loadablePage } from "utils/loadable";

import { AdminRoutes, RoutesProps } from "./Routes.type";

const AdminCinema = loadablePage(() => import("pages/AdminCinema"));
const AdminAuditoriums = loadablePage(() => import("pages/AdminAuditoriums"));

const AdminAddAuditorium = loadablePage(() =>
  import("pages/AdminAddAuditorium")
);

const AdminEditAuditorium = loadablePage(() =>
  import("pages/AdminEditAuditorium")
);

const AdminMovies = loadablePage(() => import("pages/AdminMovies"));
const AdminAddMovie = loadablePage(() => import("pages/AdminAddMovie"));

const Routes = ({ history, isAdmin }: RoutesProps) => {
  useEffect(() => {
    if (isAdmin && history.location.pathname === "/404") {
      history.goBack();
    }
  }, [isAdmin, history]);

  const renderAdminRoutes = () => {
    if (isAdmin) {
      return (
        <>
          <Route
            exact
            path={AdminRoutes.ADMIN_CINEMA}
            component={AdminCinema}
          />
          <Route
            exact
            path={`${AdminRoutes.ADMIN_CINEMA}/:cinemaId`}
            component={AdminAuditoriums}
          />
          <Route
            path={`${AdminRoutes.ADMIN_CINEMA}/:cinemaId/add`}
            component={AdminAddAuditorium}
          />
          <Route
            path={`${AdminRoutes.ADMIN_CINEMA}/:cinemaId/:auditoriumId/edit`}
            component={AdminEditAuditorium}
          />
          <Route
            exact
            path={AdminRoutes.ADMIN_MOVIES}
            component={AdminMovies}
          />
          <Route path={AdminRoutes.ADMIN_ADD_MOVIE} component={AdminAddMovie} />
          <Route
            path={AdminRoutes.ADMIN_SHOWTIMES}
            component={AdminShowtimes}
          />
          <Redirect to={AdminRoutes.NOT_FOUND} push />
        </>
      );
    }

    return null;
  };

  return <Switch>{renderAdminRoutes()}</Switch>;
};

export default React.memo(Routes);
