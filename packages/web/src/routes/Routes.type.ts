import { History } from "history";

export interface RoutesProps {
  history: History;
  isAdmin: boolean;
}

export enum MainRoutes {}

export enum AdminRoutes {
  ADMIN_CINEMA = "/admin/cinema",
  ADMIN_ADD_AUDITORIUM = "/admin/auditoriums/add",
  ADMIN_MOVIES = "/admin/movies",
  ADMIN_ADD_MOVIE = "/admin/movies/add",
  ADMIN_SHOWTIMES = "/admin/showtimes",
  ADMIN_ADD_SHOWTIMES = "/admin/showtimes/add",
  NOT_FOUND = "/404"
}
