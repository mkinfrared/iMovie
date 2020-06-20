import React from "react";
import { useHistory, useParams } from "react-router-dom";

import EditAuditoriumForm from "containers/EditAuditoriumForm";

type RouteParams = {
  cinemaId: string;
  auditoriumId: string;
};

const AdminEditAuditorium = () => {
  const { cinemaId, auditoriumId } = useParams<RouteParams>();
  const { goBack } = useHistory();

  return (
    <EditAuditoriumForm
      cinemaId={parseInt(cinemaId, 0)}
      auditoriumId={parseInt(auditoriumId, 0)}
      onCancel={goBack}
    />
  );
};

export default React.memo(AdminEditAuditorium);
