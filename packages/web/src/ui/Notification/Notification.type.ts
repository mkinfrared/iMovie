import { Color } from "@material-ui/lab/Alert";

export interface NotificationProps {
  onClose: () => void;
  open: boolean;
  severity?: Color;
  message: string;
  className?: string;
}
