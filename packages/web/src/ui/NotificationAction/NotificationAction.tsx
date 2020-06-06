import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";

const NotificationAction = (key: string) => {
  const { closeSnackbar } = useSnackbar();

  const handleClick = useCallback(() => {
    closeSnackbar(key);
  }, [closeSnackbar, key]);

  return <Button onClick={handleClick}>Dismiss</Button>;
};

export default NotificationAction;
