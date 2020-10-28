import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1eb588',
      light: '#dcefe2',
      dark: '#1b9c70',
      contrastText: 'white'
    },
    secondary: {
      main: '#019ddf',
    },
  },
  overrides: {
    MuiInput: {
      formControl: {
        "label + &": {
          marginTop: 0,
          paddingBottom: 0
        }
      }
    }
  }
});

export default theme;
