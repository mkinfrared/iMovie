import React from "react";
import { useDispatch } from "react-redux";

import LoginFC from "components/Login";
import { LoginProps } from "components/Login/Login.type";

const Login = (props: Omit<LoginProps, "dispatch">) => {
  const dispatch = useDispatch();

  return <LoginFC dispatch={dispatch} {...props} />;
};

export default React.memo(Login);
