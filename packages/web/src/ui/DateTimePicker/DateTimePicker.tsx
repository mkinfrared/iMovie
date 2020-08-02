import DayjsUtils from "@date-io/dayjs";
import {
  DateTimePicker as MaterialPicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React from "react";

import { DateTimePickerProps } from "./DateTimePicker.type";

const DateTimePicker = (props: DateTimePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MaterialPicker {...props} inputVariant="outlined" />
    </MuiPickersUtilsProvider>
  );
};

export default React.memo(DateTimePicker);
