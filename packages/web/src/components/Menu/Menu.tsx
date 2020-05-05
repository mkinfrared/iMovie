import IconButton from "@material-ui/core/IconButton";
import MaterialMenu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountIcon from "@material-ui/icons/AccountCircle";
import React, { useCallback, useState } from "react";

import { logoutUserRequest } from "store/reducers/user/actions";
import classNames from "utils/classNames";

import css from "./Menu.module.scss";
import { MenuProps } from "./Menu.type";

const Menu = ({ className, dispatch }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogoutClick = useCallback(() => {
    handleClose();

    dispatch(logoutUserRequest());
  }, [dispatch, handleClose]);

  return (
    <div className={classNames([className, css.Menu])}>
      <IconButton
        className={css.loginButton}
        color="inherit"
        onClick={handleClick}
        data-testid="menuButton"
      >
        <AccountIcon />
      </IconButton>
      <MaterialMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ list: css.menuList }}
      >
        <MenuItem onClick={handleClose} disabled>
          Username
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </MaterialMenu>
    </div>
  );
};

export default React.memo(Menu);
