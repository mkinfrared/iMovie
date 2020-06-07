import React, { useCallback, useEffect, useMemo, useState } from "react";

import CinemaCard from "components/CinemaCard";
import { fetchCinemas } from "store/reducers/cinemas/actions";
import { loadableModal } from "utils/loadable";

import css from "./AdminCinemaList.module.scss";
import { AdminCinemaListProps } from "./AdminCinemaList.type";

const EditCinemaForm = loadableModal(() => import("containers/EditCinemaForm"));

const AdminCinemaList = ({ dispatch, cinemas }: AdminCinemaListProps) => {
  const [cinemaId, setCinemaId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  const handleEditClick = useCallback((id: number) => {
    setCinemaId(id);
  }, []);

  const closeForm = useCallback(() => {
    setCinemaId(null);
  }, []);

  const cards = useMemo(
    () =>
      cinemas.map(({ id, name, zipcode }) => (
        <CinemaCard
          key={id}
          zipcode={zipcode.code}
          cinemaId={id}
          cinemaName={name}
          cityName={zipcode.city.name}
          countryName={zipcode.country.name}
          stateName={zipcode.state.name}
          onEdit={handleEditClick}
        />
      )),
    [cinemas]
  );

  return (
    <div className={css.AdminCinemaList}>
      {cards}
      {cinemaId && (
        <EditCinemaForm id={cinemaId} onClose={closeForm} open={!!cinemaId} />
      )}
    </div>
  );
};

export default React.memo(AdminCinemaList);
