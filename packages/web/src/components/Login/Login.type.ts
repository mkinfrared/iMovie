import { Dispatch } from "redux";

export interface LoginProps {
  open: boolean;
  onClose: () => void;
  openSingUp: () => void;
  dispatch: Dispatch;
}
