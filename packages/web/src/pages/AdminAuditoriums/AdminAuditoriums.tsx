import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import AdminAuditoriumsList from "containers/AdminAuditoriumsList";
import { AdminRoutes } from "routes/Routes.type";
import { selectCinema } from "store/reducers/cinemas/selectors";
import FloatButton from "ui/FloatButton";

import css from "./AdminAuditoriums.module.scss";

type Params = {
  cinemaId: string;
};

const AdminAuditoriums = () => {
  const history = useHistory();
  const { cinemaId } = useParams<Params>();
  const id = parseInt(cinemaId, 0);
  const cinema = useSelector(selectCinema(id));

  const handleAddClick = () => {
    history.push(`${AdminRoutes.ADMIN_CINEMA}/${cinemaId}/add`);
  };

  return (
    <>
      <div className={css.AdminAuditoriums}>
        <Typography variant="h3" align="center">
          {cinema?.name} Auditoriums
        </Typography>
        <AdminAuditoriumsList cinemaId={id} />
      </div>
      <FloatButton onClick={handleAddClick} data-testid="floatButton">
        <AddIcon />
      </FloatButton>
    </>
  );
};

export default React.memo(AdminAuditoriums);
