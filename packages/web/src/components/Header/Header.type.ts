import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export interface Navigation {
  text: string;
  icon: JSX.Element;
}
