import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import React from "react";

import Email from "icons/Email";
import Transition from "ui/Transition";

import css from "./RegistrationSuccess.module.scss";
import { RegistrationSuccessProps } from "./RegistrationSuccess.type";

const RegistrationSuccess = ({ onClose, open }: RegistrationSuccessProps) => {
  return (
    <Dialog
      open={open}
      className={css.RegistrationSuccess}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <DialogContent>
        <DialogContentText>
          <Email />
        </DialogContentText>
        <DialogContentText>
          Check your email to proceed with registration
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid="registerButton">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(RegistrationSuccess);
