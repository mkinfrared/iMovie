import React from "react";
import { useParams } from "react-router-dom";

import AddAuditoriumForm from "components/AddAuditoriumForm";

interface RouteParams {
  cinemaId: string;
}

const AdminAddAuditorium = () => {
  const { cinemaId } = useParams<RouteParams>();

  return <AddAuditoriumForm cinemaId={parseInt(cinemaId, 0)} />;
};

export default React.memo(AdminAddAuditorium);
