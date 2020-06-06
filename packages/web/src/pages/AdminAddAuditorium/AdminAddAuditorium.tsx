import React from "react";
import { useHistory, useParams } from "react-router-dom";

import AddAuditoriumForm from "components/AddAuditoriumForm";

interface RouteParams {
  cinemaId: string;
}

const AdminAddAuditorium = () => {
  const { cinemaId } = useParams<RouteParams>();
  const { goBack } = useHistory();

  return (
    <AddAuditoriumForm cinemaId={parseInt(cinemaId, 0)} onCancel={goBack} />
  );
};

export default React.memo(AdminAddAuditorium);
