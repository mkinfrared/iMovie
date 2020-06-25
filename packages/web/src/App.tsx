import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Content from "components/Content";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "containers/Header";
import Routes from "containers/Routes";
import { loginUser } from "store/reducers/user/reducer";
import api, { configureInterceptors } from "utils/api";

import css from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  configureInterceptors(enqueueSnackbar);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user");
      const user = response.data;

      dispatch(loginUser(user));
    } catch (e) {}
  };

  useEffect(() => {
    fetchCurrentUser();
  });

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className={css.App}>
          <Header />
          <main>
            <Content>
              <Routes />
            </Content>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
