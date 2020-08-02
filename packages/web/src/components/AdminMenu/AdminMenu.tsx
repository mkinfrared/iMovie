import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CinemaIcon from "@material-ui/icons/Apartment";
import MovieIcon from "@material-ui/icons/LocalMovies";
import ScheduleIcon from "@material-ui/icons/Schedule";
import React, { useMemo } from "react";

import AdminMenuLink from "components/AdminMenuLink";
import { AdminRoutes } from "routes/Routes.type";

import css from "./AdminMenu.module.scss";
import { AdminMenuProps, Navigation } from "./AdminMenu.type";

const navigation: Navigation[] = [
  {
    text: "Cinemas",
    icon: <CinemaIcon />,
    path: AdminRoutes.ADMIN_CINEMA
  },
  {
    text: "Movies",
    icon: <MovieIcon />,
    path: AdminRoutes.ADMIN_MOVIES
  },
  {
    text: "Showtimes",
    icon: <ScheduleIcon />,
    path: AdminRoutes.ADMIN_SHOWTIMES
  }
];

const AdminMenu = ({ isOpen, onClose }: AdminMenuProps) => {
  const list = useMemo(
    () =>
      navigation.map(({ icon, text, path }) => (
        <AdminMenuLink key={path} icon={icon} name={text} path={path} />
      )),
    []
  );

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      className={css.AdminMenu}
      onClick={onClose}
    >
      <List className={css.list}>{list}</List>
    </Drawer>
  );
};

export default React.memo(AdminMenu);
