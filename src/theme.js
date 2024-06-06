import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D5282',
      contrastText: '#F7F9FB',
    },
    secondary: {
      main: '#A5C2D7',
      main85: 'rgba(165, 194, 215, 0.85)',
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
      main: '#F7F9FB',
      main10: 'rgba(247, 249, 251, 0.1)',
      default: '#F7F9FB',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    button: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: 'normal',
      textTransform: 'none',
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
          borderRadius: '10px',
          padding: '10px 15px',
        },
        startIcon: {
          marginLeft: '0px',
          marginRight: '10px',
        },
        iconSizeMedium: {
          '& > *:first-of-type': {
            fontSize: 'inherit',
          },
        },
        colorSecondary: {
          fontWeight: 500,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: '#A5C2D7',
          input: {
            '&::placeholder': {
              color: 'rgba(14, 20, 25, 0.5)',
            },
            padding: '10px 15px',
            fontWeight: '400',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
          },
          fieldset: {
            border: 'none',
          },
        },
        multiline: {
          fontSize: '16px',
          padding: '10px 15px !important',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '16px',
        },
        select: {
          fontSize: '16px',
          padding: '10px 15px',
          letterSpacing: 'normal',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          fontWeight: '600',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          fontSize: '16px',
        },
        gutters: {
          gap: '7px',
        },
      },
    },
  },
});

const graphColors = [
  '#0D5282',
  '#76A4C5',
  '#A5C2D7',
  '#276793',
  '#82ACCA',
  '#427BA4',
  '#8EB3CE',
  '#5C90B4',
  '#99BBD3',
];
