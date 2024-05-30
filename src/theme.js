import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D5282',
      contrastText: '#F7F9FB',
    },
    secondary: {
      main: '#A5C2D7',
      contrastText: '#0E1419',
    },
    divider: '#76A4C5',
    text: {
      primary: 'rgb(14, 20, 25)',
      secondary: 'rgba(14, 20, 25, 0.6)',
      disabled: 'rgba(14, 20, 25, 0.38)',
      hint: 'rgb(118, 164, 197)',
    },
    background: {
      default: '#F7F9FB',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: '16px',
          letterSpacing: 'normal',
          textTransform: 'none',
          borderRadius: '10px',
          padding: '10px 15px',
        },
      },
    },
  },
});
