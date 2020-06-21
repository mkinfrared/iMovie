import React from "react";
import { useHistory } from "react-router-dom";

import AddMovieForm from "components/AddMovieForm";

const AdminAddMovie = () => {
  const { goBack } = useHistory();

  return <AddMovieForm onCancel={goBack} />;
};

export default React.memo(AdminAddMovie);
