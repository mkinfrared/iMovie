import { registerValidation } from "@imovie/common";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import usePasswordToggle from "hooks/usePasswordToggle";
import Transition from "ui/Transition";
import api from "utils/api";
import loadableModal from "utils/loadable";

import css from "./SignUp.module.scss";
import { SignUpProps } from "./SignUp.type";

interface FormData {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const RegistrationSuccess = loadableModal(() =>
  import("components/RegistrationSuccess")
);

const SignUp = ({ onClose, open, openLogin }: SignUpProps) => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { passwordVisible, renderAdornment } = usePasswordToggle();

  const { handleSubmit, errors, register, setError } = useForm<FormData>({
    validationSchema: registerValidation,
    mode: "onBlur"
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await api.post("/user", data);

      setRegisterSuccess(true);
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

  if (registerSuccess) {
    return <RegistrationSuccess onClose={onClose} open={registerSuccess} />;
  }

  return (
    <Dialog
      open={open}
      className={css.SignUp}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className={css.form}>
          <TextField
            name="email"
            className={css.input}
            label="Email Address"
            variant="outlined"
            helperText={errors.email?.message}
            error={!!errors.email}
            inputRef={register}
            inputProps={{ "data-testid": "email" }}
            fullWidth
          />
          <TextField
            name="username"
            className={css.input}
            label="Username"
            variant="outlined"
            helperText={errors.username?.message}
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
            inputRef={register}
            inputProps={{ "data-testid": "password" }}
            fullWidth
          />
          <TextField
            name="passwordConfirm"
            className={css.input}
            label="Confirm"
            variant="outlined"
            type={passwordVisible ? "text" : "password"}
            helperText={errors.passwordConfirm?.message}
            error={!!errors.passwordConfirm}
            InputProps={{ endAdornment: renderAdornment() }}
            inputRef={register}
            inputProps={{ "data-testid": "confirm" }}
            fullWidth
          />
        </form>
        <DialogContentText>
          Already registered? Consider{" "}
          <button className={css.textButton} onClick={openLogin} type="button">
            login
          </button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" data-testid="registerButton">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SignUp);
