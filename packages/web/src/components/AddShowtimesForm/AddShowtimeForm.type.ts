import { Auditorium, Cinema } from "store/reducers/cinemas/types";

export interface AddShowtimeFormProps {
  open: boolean;
  onClose: () => void;
  cinemaId?: number;
  cinema?: Cinema;
  auditoriumId?: number;
  auditorium?: Auditorium;
}
