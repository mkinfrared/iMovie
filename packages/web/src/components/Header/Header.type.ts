import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
  isAuth: boolean;
  isAdmin: boolean;
}
