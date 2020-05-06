import { Dispatch } from "redux";

export interface AddCinemaFormProps {
  open: boolean;
  onClose: () => void;
  dispatch: Dispatch;
}
