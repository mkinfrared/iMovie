import React from "react";
import { useDispatch } from "react-redux";

import AddCinemaFormFC from "components/AddCinemaForm";
import { AddCinemaFormProps } from "components/AddCinemaForm/AddCinemaForm.type";

const AddCinemaForm: React.FC<Omit<AddCinemaFormProps, "dispatch">> = (
  props
) => {
  const dispatch = useDispatch();

  return <AddCinemaFormFC {...props} dispatch={dispatch} />;
};

export default React.memo(AddCinemaForm);
