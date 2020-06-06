import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";

import { NotificationProps } from "./Notification.type";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = ({
  onClose,
  open,
  className,
  message,
  severity = "error"
}: NotificationProps) => {
  return (
    <Snackbar className={className} onClose={onClose} open={open}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(Notification);
