import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import classNames from "utils/classNames";

import css from "./AdminMenuLink.module.scss";
import { AdminMenuLinkProps } from "./AdminMenuLink.type";

const AdminMenuLink = ({ icon, name, path }: AdminMenuLinkProps) => {
  const match = useRouteMatch({ path });

  return (
    <Link
      to={path}
      className={classNames([css.AdminMenuLink, match && css.active])}
    >
      <ListItem button className={css.list}>
        <ListItemIcon className={css.icon}>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
};

export default React.memo(AdminMenuLink);
