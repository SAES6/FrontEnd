import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0D5282",
      contrastText: "#F7F9FB",
    },
    secondary: {
      main: "#A5C2D7",
      contrastText: "#0E1419",
    },
    divider: "#76A4C5",
    text: {
      primary: "rgb(14, 20, 25)",
      secondary: "rgba(14, 20, 25, 0.6)",
      disabled: "rgba(14, 20, 25, 0.38)",
      hint: "rgb(118, 164, 197)",
    },
    background: {
      main: "#F7F9FB",
      default: "#F7F9FB",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    button: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "normal",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 15,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "10px 15px",
        },
        startIcon: {
          marginLeft: "0px",
          marginRight: "10px",
        },
        iconSizeMedium: {
          "& > *:first-of-type": {
            fontSize: "inherit",
          },
        },
        colorSecondary: {
          fontWeight: 500,
        },
      },
    },
  },
});
