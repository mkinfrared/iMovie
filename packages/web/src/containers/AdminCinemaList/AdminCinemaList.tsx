import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminCinemaListFC from "components/AdminCinemaList";
import { selectCinemas } from "store/reducers/cinemas/selectors";

const AdminCinemaList = () => {
  const dispatch = useDispatch();
  const cinemas = useSelector(selectCinemas);

  return <AdminCinemaListFC dispatch={dispatch} cinemas={cinemas} />;
};

export default React.memo(AdminCinemaList);
