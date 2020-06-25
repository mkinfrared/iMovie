import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

import { SearchFieldProps } from "./SearchField.type";

const SearchField = <T,>({
  onChange,
  onBlur,
  onInputChange,
  getOptionSelected,
  getOptionLabel,
  options,
  helperText,
  className,
  name,
  label,
  value,
  renderOption,
  loading = false,
  error = false
}: SearchFieldProps<T>) => {
  return (
    <Autocomplete
      freeSolo
      onChange={onChange}
      onBlur={onBlur}
      onInputChange={onInputChange}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      value={value}
      color="secondary"
      renderOption={renderOption}
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
              <CircularProgress color="primary" size={20} />
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
