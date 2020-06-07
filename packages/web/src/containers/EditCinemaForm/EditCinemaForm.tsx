import React from "react";
import { useDispatch, useSelector } from "react-redux";

import EditCinemaFormFC from "components/EditCinemaForm";
import { EditCinemaFormProps } from "components/EditCinemaForm/EditCinemaForm.type";
import { selectCinema } from "store/reducers/cinemas/selectors";

const EditCinemaForm = ({
  id,
  ...rest
}: Omit<EditCinemaFormProps, "dispatch" | "cinema">) => {
  const cinema = useSelector(selectCinema(id));
  const dispatch = useDispatch();

  if (!cinema) {
    throw new Error("Cinema not found");
  }

  return (
    <EditCinemaFormFC
      {...rest}
      dispatch={dispatch}
      cinema={cinema}
      id={cinema?.id}
    />
  );
};

export default React.memo(EditCinemaForm);
