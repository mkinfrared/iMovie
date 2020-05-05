export interface SearchFieldProps<T extends {}> {
  options: T[];
  onChange: <U>(event: U, value: T | null) => void;
  onBlur?: React.FocusEventHandler;
  loading?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  className?: string;
  name: string;
  label: string;
  getOptionLabel?: (option: T) => string;
  getOptionSelected?: (option: T, value: T) => boolean;
}
