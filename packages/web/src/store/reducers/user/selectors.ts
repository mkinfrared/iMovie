import { AppState } from "store/store.type";

const getUser = (state: AppState) => state.user;

export { getUser };
