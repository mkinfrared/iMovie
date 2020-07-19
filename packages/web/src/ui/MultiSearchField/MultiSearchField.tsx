import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

import { MultiSearchFieldProps } from "./MultiSearchField.type";

const MultiSearchField = <T,>({
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
  filterOptions,
  filterSelectedOptions = false,
  loading = false,
  error = false
}: MultiSearchFieldProps<T>) => {
  return (
    <Autocomplete
      freeSolo
      multiple
      filterSelectedOptions={filterSelectedOptions}
      filterOptions={filterOptions}
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
          autoComplete="off"
          name={name}
          label={label}
          variant="outlined"
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

export default MultiSearchField;
