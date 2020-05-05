import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000000",
      white: "#FFFFFF"
    },
    type: "dark",
    primary: {
      main: orange["500"],
      dark: orange["700"],
      light: orange["300"]
    },
    secondary: {
      main: grey["900"],
      light: grey["700"]
    }
  }
});

export default theme;
