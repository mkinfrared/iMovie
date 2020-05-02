export type Role = "user" | "admin";

export interface User {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  role?: Role;
  isActive?: boolean;
}

export enum UserActionsTypes {
  LOGOUT_REQUEST = "@@user/LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "@@user/LOGOUT_SUCCESS",
  LOGOUT_FAIL = "@@user/LOGOUT_FAIL"
}
