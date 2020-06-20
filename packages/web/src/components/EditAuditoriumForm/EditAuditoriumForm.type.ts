import { Auditorium } from "store/reducers/cinemas/types";

export interface EditAuditoriumFormProps {
  auditoriumId: number;
  auditorium: Auditorium;
  cinemaId: number;
  onCancel: () => void;
}
