import { AutocompleteInputChangeReason } from "@material-ui/lab/useAutocomplete/useAutocomplete";

export interface SearchFieldProps<T extends {}> {
  options: T[];
  onChange: <U>(event: U, value: T | null) => void;
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
  value?: T;
  id?: string;
}
