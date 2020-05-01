/* eslint-disable global-require */
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = configureStore({ reducer: reducers, middleware });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers", () => {
    const newRootReducer = require("./reducers").default;

    store.replaceReducer(newRootReducer);
  });
}

sagaMiddleware.run(rootSaga);

export default store;
