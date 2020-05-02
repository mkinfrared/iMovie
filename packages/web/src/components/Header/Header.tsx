import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import AdminMenu from "components/AdminMenu";
import Menu from "containers/Menu";
import Imovie from "icons/imovie";
import loadableModal from "utils/loadable";

import css from "./Header.module.scss";
import { HeaderProps } from "./Header.type";

const Login = loadableModal(() => import("containers/Login"));
const SignUp = loadableModal(() => import("components/SignUp"));

type ActiveForm = "signin" | "signup" | null;

const Header = ({ isAuth }: HeaderProps) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);

  const openDrawer = useCallback(() => {
    setIsAdminOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsAdminOpen(false);
  }, []);

  const openLogin = useCallback(() => {
    setActiveForm("signin");
  }, []);

  const openSignUp = useCallback(() => {
    setActiveForm("signup");
  }, []);

  const closeForms = useCallback(() => {
    setActiveForm(null);
  }, []);

  const renderButton = () => {
    if (isAuth) {
      return <Menu className={css.loginButton} />;
    }

    return (
      <Button
        color="inherit"
        className={css.loginButton}
        onClick={openLogin}
        aria-label="login"
      >
        Login
      </Button>
    );
  };

  const renderForm = () => {
    switch (activeForm) {
      case "signin":
        return (
          <Login
            open={activeForm === "signin"}
            onClose={closeForms}
            openSingUp={openSignUp}
          />
        );
      case "signup":
        return (
          <SignUp
            open={activeForm === "signup"}
            onClose={closeForms}
            openLogin={openLogin}
          />
        );
      default:
        return null;
    }
  };

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
          {renderButton()}
        </Toolbar>
      </AppBar>
      <AdminMenu isOpen={isAdminOpen} onClose={closeDrawer} />
      {renderForm()}
    </>
  );
};

export default React.memo(Header);
