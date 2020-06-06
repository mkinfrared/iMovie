import axios, { AxiosError } from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

import NotificationAction from "ui/NotificationAction";
import { BASE_URL } from "utils/secrets";

type ShowSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject
) => SnackbarKey;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const configureInterceptors = (showSnackbar: ShowSnackbar) => {
  api.interceptors.response.use(
    (config) => config,
    (error: AxiosError) => {
      if (error.message === "Network Error") {
        showSnackbar("Network Error", {
          variant: "error",
          action: NotificationAction
        });

        return;
      }

      return Promise.reject(error);
    }
  );
};

export default api;

export { configureInterceptors };
