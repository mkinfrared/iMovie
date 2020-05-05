import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Content from "components/Content";
import Header from "containers/Header";
import Routes from "containers/Routes";
import { loginUser } from "store/reducers/user/reducer";
import api from "utils/api";
import theme from "utils/theme";

import css from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={css.App}>
          <Header />
          <main>
            <Content>
              <Routes />
            </Content>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
