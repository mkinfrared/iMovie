import { combineReducers } from "redux";

import cinemas from "store/reducers/cinemas/reducer";
import user from "store/reducers/user/reducer";

const reducers = combineReducers({
  user,
  cinemas
});

export default reducers;
