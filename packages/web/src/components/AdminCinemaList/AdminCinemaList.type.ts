import { Dispatch } from "redux";

import { Cinema } from "store/reducers/cinemas/types";

export interface AdminCinemaListProps {
  dispatch: Dispatch;
  cinemas: Cinema[];
}
