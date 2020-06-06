import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import theme from "utils/theme";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import "./index.scss";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
