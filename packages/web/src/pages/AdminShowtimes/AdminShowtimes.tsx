import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from "react";

import AddShowtimeForm from "containers/AddShowtimeForm";
import FloatButton from "ui/FloatButton/FloatButton";

import css from "./AdminShowtimes.module.scss";

const AdminShowtimes = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className={css.AdminShowtimes}>
      <div>
        <Typography variant="h3" align="center">
          Showtimes
        </Typography>
        {modalOpen && <AddShowtimeForm open={modalOpen} onClose={closeModal} />}
      </div>
      <FloatButton onClick={openModal}>
        <AddIcon />
      </FloatButton>
    </div>
  );
};

export default React.memo(AdminShowtimes);
