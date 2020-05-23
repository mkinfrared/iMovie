import React, { useEffect } from "react";

import AuditoriumCard from "components/AuditoriumCard";
import { fetchCinemaAuditoriums } from "store/reducers/cinemas/actions";

import css from "./AdminAuditoriumsList.module.scss";
import { AdminAuditoriumsListProps } from "./AdminAuditoriumsList.type";

const AdminAuditoriumsList = ({
  cinemaId,
  auditoriums,
  dispatch
}: AdminAuditoriumsListProps) => {
  useEffect(() => {
    dispatch(fetchCinemaAuditoriums(cinemaId));
  }, []);

  const list = auditoriums.map(({ id, name, seats }) => (
    <AuditoriumCard
      key={id}
      name={name}
      seats={seats.length}
      cinemaId={cinemaId}
      auditoriumId={id}
    />
  ));

  return <div className={css.AdminAuditoriumsList}>{list}</div>;
};

export default React.memo(AdminAuditoriumsList);
