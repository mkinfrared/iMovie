export interface User {
  username: string;
  loading: boolean;
}

export enum UserActions {
  FETCH_USER = "@@user/FETCH_USER"
}
