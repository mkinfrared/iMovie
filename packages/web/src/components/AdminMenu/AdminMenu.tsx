import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { useMemo } from "react";

import css from "components/Header/Header.module.scss";

import { AdminMenuProps, Navigation } from "./AdminMenu.type";

const navigation: Navigation[] = [
  {
    text: "Lorem",
    icon: <InboxIcon />
  },
  {
    text: "Ipsum",
    icon: <MailIcon />
  }
];

const AdminMenu = ({ isOpen, onClose }: AdminMenuProps) => {
  const list = useMemo(
    () =>
      navigation.map(({ icon, text }) => (
        <ListItem button key={text}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      )),
    []
  );

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List className={css.list}>{list}</List>
    </Drawer>
  );
};

export default React.memo(AdminMenu);
