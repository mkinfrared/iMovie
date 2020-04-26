import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { User, UserActions } from "./types";

const initialState: User = {
  username: "",
  loading: false
};

type Actions = ActionType<typeof actions>;

const reducer: Reducer<User, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.FETCH_USER:
      return state;
    default:
      return state;
  }
};

export default reducer;
