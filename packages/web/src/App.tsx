import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Content from "components/Content";
import Header from "containers/Header";
import { loginUser } from "store/reducers/user/reducer";
import api from "utils/api";

import css from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/user");
      const user = response.data;

      dispatch(loginUser(user));
    } catch (e) {}
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  });

  return (
    <BrowserRouter>
      <div className={css.App}>
        <Header />
        <main>
          <Content />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
