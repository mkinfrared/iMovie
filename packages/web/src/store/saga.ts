import { all, fork } from "redux-saga/effects";

import cinemaSaga from "store/reducers/cinemas/saga";
import userSaga from "store/reducers/user/saga";

function* rootSaga() {
  yield all([fork(userSaga), fork(cinemaSaga)]);
}

export default rootSaga;
