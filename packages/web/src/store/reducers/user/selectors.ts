import { createSelector } from "@reduxjs/toolkit";

import { AppState } from "store/store.type";

const selectUser = (state: AppState) => state.user;
const selectUserId = createSelector(selectUser, ({ id }) => id);
const selectUserRole = createSelector(selectUser, ({ role }) => role);

export { selectUserId, selectUserRole };
