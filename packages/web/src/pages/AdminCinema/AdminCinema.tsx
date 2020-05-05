import Typography from "@material-ui/core/Typography";
import React, { useCallback, useState } from "react";

import AddCinemaForm from "components/AddCinemaForm";
import FloatButton from "ui/FloatButton";

import css from "./AdminCinema.module.scss";

const AdminCinema = () => {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => {
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
  }, []);

  return (
    <>
      <div className={css.AdminCinema}>
        <Typography variant="h3" align="center">
          Cinemas
        </Typography>
        <AddCinemaForm open={formOpen} onClose={closeForm} />
      </div>
      <FloatButton onClick={openForm} data-testid="floatButton">
        +
      </FloatButton>
    </>
  );
};

export default React.memo(AdminCinema);
