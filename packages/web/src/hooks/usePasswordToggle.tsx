import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useCallback, useState } from "react";

const usePasswordToggle = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prevState) => !prevState);
  }, []);

  const renderAdornment = useCallback(() => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? (
            <Visibility data-testid="visible" />
          ) : (
            <VisibilityOff data-testid="invisible" />
          )}
        </IconButton>
      </InputAdornment>
    );
  }, [passwordVisible, togglePasswordVisibility]);

  return { passwordVisible, renderAdornment };
};

export default usePasswordToggle;
