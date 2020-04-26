import { action } from "typesafe-actions";

import { UserActions } from "store/reducers/user/types";

const fetchUser = (username: string) =>
  action(UserActions.FETCH_USER, username);

export { fetchUser };
