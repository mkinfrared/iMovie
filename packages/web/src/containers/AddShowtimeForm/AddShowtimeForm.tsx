import React from "react";
import { useSelector } from "react-redux";

import AddShowtimeFormFC from "components/AddShowtimesForm";
import { AddShowtimeFormProps } from "components/AddShowtimesForm/AddShowtimeForm.type";
import {
  selectAuditorium,
  selectCinema
} from "store/reducers/cinemas/selectors";

const AddShowtimeForm = ({
  auditoriumId,
  cinemaId,
  ...props
}: Omit<AddShowtimeFormProps, "cinema" | "auditorium">) => {
  const auditorium = useSelector(selectAuditorium(auditoriumId));
  const cinema = useSelector(selectCinema(cinemaId));

  return (
    <AddShowtimeFormFC {...props} auditorium={auditorium} cinema={cinema} />
  );
};

export default React.memo(AddShowtimeForm);
