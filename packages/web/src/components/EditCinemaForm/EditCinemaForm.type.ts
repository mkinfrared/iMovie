import { Dispatch } from "redux";

import { Cinema } from "store/reducers/cinemas/types";

export interface EditCinemaFormProps {
  dispatch: Dispatch;
  onClose: () => void;
  open: boolean;
  cinema: Cinema;
  id: number;
}
