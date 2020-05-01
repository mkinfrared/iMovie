import { loginValidation } from "@imovie/common";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";

import usePasswordToggle from "hooks/usePasswordToggle";
import { loginUser } from "store/reducers/user/reducer";
import Transition from "ui/Transition";
import api from "utils/api";

import css from "./Login.module.scss";
import { LoginProps } from "./Login.type";

interface FormData {
  username: string;
  password: string;
}

const Login = ({ onClose, open, openSingUp, dispatch }: LoginProps) => {
  const { passwordVisible, renderAdornment } = usePasswordToggle();

  const { handleSubmit, errors, register, setError, formState } = useForm<
    FormData
  >({
    validationSchema: loginValidation,
    mode: "onBlur"
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await api.post("/auth", data);
      const user = response.data;

      onClose();

      dispatch(loginUser(user));
    } catch (e) {
      const responseErrors = Object.entries(e.response.data).map((entry) => {
        const [key, value] = entry as [keyof FormData, string[]];

        return {
          type: "required",
          name: key,
          message: value[0]
        };
      });

      setError(responseErrors);
    }
  });

  return (
    <Dialog
      open={open}
      className={css.Login}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className={css.form} data-testid="form">
          <TextField
            name="username"
            className={css.input}
            label="Username"
            variant="outlined"
            helperText={errors.username?.message || null}
            error={!!errors.username}
            inputRef={register}
            inputProps={{ "data-testid": "username" }}
            fullWidth
          />
          <TextField
            name="password"
            className={css.input}
            label="Password"
            variant="outlined"
            type={passwordVisible ? "text" : "password"}
            helperText={errors.password?.message}
            error={!!errors.password}
            InputProps={{ endAdornment: renderAdornment() }}
            inputProps={{ "data-testid": "password" }}
            inputRef={register}
            fullWidth
          />
        </form>
        <DialogContentText>
          Need an account? Consider{" "}
          <button className={css.textButton} onClick={openSingUp} type="button">
            sign up
          </button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          data-testid="loginButton"
          onClick={onSubmit}
          color="primary"
          disabled={formState.isSubmitting}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(Login);
