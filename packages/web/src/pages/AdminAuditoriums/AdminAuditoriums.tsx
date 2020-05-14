import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

import AdminAuditoriumsList from "components/AdminAuditoriumsList";
import { AdminRoutes } from "routes/Routes.type";
import FloatButton from "ui/FloatButton";

import css from "./AdminAuditoriums.module.scss";

const AdminAuditoriums = () => {
  const history = useHistory();
  const { cinemaId } = useParams();

  const handleAddClick = () => {
    history.push(`${AdminRoutes.ADMIN_CINEMA}/${cinemaId}/add`);
  };

  return (
    <>
      <div className={css.AdminAuditoriums}>
        <Typography variant="h3" align="center">
          Cinemas Auditoriums
        </Typography>
        <AdminAuditoriumsList />
      </div>
      <FloatButton onClick={handleAddClick} data-testid="floatButton">
        <AddIcon />
      </FloatButton>
    </>
  );
};

export default React.memo(AdminAuditoriums);
