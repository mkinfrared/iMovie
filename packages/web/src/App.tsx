import React from "react";
import { BrowserRouter } from "react-router-dom";

import Content from "components/Content";
import Header from "components/Header";

import css from "./App.module.scss";

const App = () => {
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
