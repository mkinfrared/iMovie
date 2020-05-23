import { ReduxConnectedComponent } from "react-app-env";
import { Auditorium } from "store/reducers/cinemas/types";

export interface AdminAuditoriumsListProps extends ReduxConnectedComponent {
  cinemaId: number;
  auditoriums: Auditorium[];
}
