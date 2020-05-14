import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from "react";

import AddCinemaForm from "containers/AddCinemaForm";
import AdminCinemaList from "containers/AdminCinemaList";
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
        <AdminCinemaList />
        <AddCinemaForm open={formOpen} onClose={closeForm} />
      </div>
      <FloatButton onClick={openForm}>
        <AddIcon />
      </FloatButton>
    </>
  );
};

export default React.memo(AdminCinema);
