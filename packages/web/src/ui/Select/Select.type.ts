export interface Option {
  label: string | number;
  value: string | number | string[];
}

export interface SelectProps<T> {
  label: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLOptionElement>) => void;
  className?: string;
  ref?: React.Ref<T>;
  error?: boolean;
  helperText?: React.ReactNode;
}
