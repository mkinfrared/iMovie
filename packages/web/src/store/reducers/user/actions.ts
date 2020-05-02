import { action } from "typesafe-actions";

import { UserActionsTypes } from "store/reducers/user/types";

const logoutUserRequest = () => action(UserActionsTypes.LOGOUT_REQUEST);
const logoutUserSuccess = () => action(UserActionsTypes.LOGOUT_SUCCESS);

export { logoutUserRequest, logoutUserSuccess };
