import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { loadablePage } from "utils/loadable";

import { AdminRoutes, RoutesProps } from "./Routes.type";

const AdminCinema = loadablePage(() => import("pages/AdminCinema"));

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
          <Route path={AdminRoutes.ADMIN_CINEMA} component={AdminCinema} />
          <Redirect to="/404" push />
        </>
      );
    }

    return null;
  };

  return <Switch>{renderAdminRoutes()}</Switch>;
};

export default React.memo(Routes);
