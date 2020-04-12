import { ValidationError } from "yup";

interface FormattedError {
  [key: string]: string[];
}

const formatValidatorError = (err: ValidationError) => {
  const error: FormattedError = {};

  err.inner.forEach(({ path, errors }) => {
    if (!error[path]) {
      error[path] = [...errors];
    } else {
      error[path].push(...errors);
    }
  });

  return error;
};

export { FormattedError, formatValidatorError, ValidationError };
