import {
  AutocompleteInputChangeReason,
  FilterOptionsState
} from "@material-ui/lab/useAutocomplete/useAutocomplete";
import React from "react";

export interface MultiSearchFieldProps<T> {
  options: T[];
  onChange: <U>(event: U, value: T[] | null) => void;
  onBlur?: React.FocusEventHandler;
  onInputChange?: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  renderOption?: (option: T, state: object) => React.ReactNode;
  loading?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  className?: string;
  name: string;
  label: string;
  getOptionLabel?: (option: T) => string;
  getOptionSelected?: (option: T, value: T) => boolean;
  value?: T[];
  filterSelectedOptions?: boolean;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
}
