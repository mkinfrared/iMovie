import { combineReducers } from "redux";

import user from "store/reducers/user/reducer";

const reducers = combineReducers({
  user
});

export default reducers;
