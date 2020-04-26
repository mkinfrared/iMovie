import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Imovie from "icons/imovie";

import css from "./Header.module.scss";
import { Navigation } from "./Header.type";

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

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      <AppBar position="static" className={css.Header}>
        <Toolbar className={css.toolbar}>
          <IconButton
            edge="start"
            className={css.menu}
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Imovie />
            <Typography variant="h6">iMovie</Typography>
          </Link>
          <Button color="inherit" className={css.loginButton}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <List className={css.list}>{list}</List>
      </Drawer>
    </>
  );
};

export default React.memo(Header);
