import { History } from "history";

export interface RoutesProps {
  history: History;
  isAdmin: boolean;
}

export enum MainRoutes {}

export enum AdminRoutes {
  ADMIN_CINEMA = "/admin/cinema",
  ADMIN_ADD_AUDITORIUM = "/admin/auditoriums/add",
  NOT_FOUND = "/404"
}
