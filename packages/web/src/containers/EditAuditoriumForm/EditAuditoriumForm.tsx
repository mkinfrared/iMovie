import React from "react";
import { useSelector } from "react-redux";

import EditAuditoriumFormFC from "components/EditAuditoriumForm";
import { EditAuditoriumFormProps } from "components/EditAuditoriumForm/EditAuditoriumForm.type";
import { selectCinemaAuditorium } from "store/reducers/cinemas/selectors";

const EditAuditoriumForm = ({
  auditoriumId,
  cinemaId,
  ...rest
}: Omit<EditAuditoriumFormProps, "auditorium">) => {
  const auditorium = useSelector(
    selectCinemaAuditorium(cinemaId, auditoriumId)
  );

  if (!auditorium) {
    throw new Error("Auditorium was not found");
  }

  return (
    <EditAuditoriumFormFC
      {...rest}
      auditoriumId={auditoriumId}
      cinemaId={cinemaId}
      auditorium={auditorium}
    />
  );
};

export default React.memo(EditAuditoriumForm);
