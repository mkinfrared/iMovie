import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import MaterialSelect from "@material-ui/core/Select";
import React from "react";

import { SelectProps } from "./Select.type";

const Select = <T,>({
  className,
  ref,
  label,
  options,
  onChange,
  helperText,
  defaultValue,
  error = false
}: SelectProps<T>) => {
  const menuItems = options.map(({ label: name, value }) => (
    <MenuItem key={`${name}${value}`} value={value}>
      {name}
    </MenuItem>
  ));

  return (
    <FormControl
      className={className}
      variant="outlined"
      error={error}
      fullWidth
    >
      <InputLabel id="select">{label}</InputLabel>
      <MaterialSelect
        ref={ref}
        labelId="select"
        label={label}
        onChange={onChange as any}
        defaultValue={defaultValue}
      >
        {menuItems}
      </MaterialSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(Select);
