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
  id,
  loading = false,
  error = false
}: SearchFieldProps<T>) => {
  return (
    <Autocomplete
      freeSolo
      className={className}
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
          autoComplete="new-password"
          name={name}
          label={label}
          variant="outlined"
          id={id}
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

export default React.memo(SearchField) as typeof SearchField;
