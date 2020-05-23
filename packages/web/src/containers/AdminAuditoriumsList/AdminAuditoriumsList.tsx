import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminAuditoriumsListFC from "components/AdminAuditoriumsList";
import { AdminAuditoriumsListProps } from "components/AdminAuditoriumsList/AdminAuditoriumsList.type";
import { selectCinemaAuditoriums } from "store/reducers/cinemas/selectors";

const AdminAuditoriumsList = ({
  cinemaId
}: Pick<AdminAuditoriumsListProps, "cinemaId">) => {
  const dispatch = useDispatch();
  const auditoriums = useSelector(selectCinemaAuditoriums(cinemaId)) ?? [];

  return (
    <AdminAuditoriumsListFC
      cinemaId={cinemaId}
      auditoriums={auditoriums}
      dispatch={dispatch}
    />
  );
};

export default React.memo(AdminAuditoriumsList);
