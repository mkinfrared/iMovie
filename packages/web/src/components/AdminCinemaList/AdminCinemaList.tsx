import React, { useEffect, useMemo } from "react";

import CinemaCard from "components/CinemaCard";
import { fetchCinemas } from "store/reducers/cinemas/actions";

import css from "./AdminCinemaList.module.scss";
import { AdminCinemaListProps } from "./AdminCinemaList.type";

const AdminCinemaList = ({ dispatch, cinemas }: AdminCinemaListProps) => {
  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  const cards = useMemo(
    () =>
      cinemas.map(({ id, name, zipcode }) => (
        <CinemaCard
          key={id}
          zipcode={zipcode.code}
          cinemaName={name}
          cityName={zipcode.city.name}
          countryName={zipcode.country.name}
          stateName={zipcode.state.name}
        />
      )),
    [cinemas]
  );

  return <div className={css.AdminCinemaList}>{cards}</div>;
};

export default React.memo(AdminCinemaList);
