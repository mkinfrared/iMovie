import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

import { SearchFieldProps } from "./SearchField.type";

const SearchField = <T,>({
  onChange,
  getOptionSelected,
  onBlur,
  getOptionLabel,
  options,
  helperText,
  className,
  name,
  label,
  loading = false,
  error = false
}: SearchFieldProps<T>) => {
  return (
    <Autocomplete
      freeSolo
      onChange={onChange}
      getOptionSelected={getOptionSelected}
      onBlur={onBlur}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          autoComplete="off"
          name={name}
          label={label}
          variant="outlined"
          className={className}
          InputProps={{
            ...params.InputProps,
            endAdornment: loading && (
              <CircularProgress color="inherit" size={20} />
            )
          }}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};

export default SearchField;
