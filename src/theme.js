import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0d5282',
            contrastText: '#f7f9fa',
        },
        secondary: {
            main: '#99c4e3',
            contrastText: '#101416',
        },
        divider: '#60ade3',
        text: {
            primary: 'rgb(16, 20, 22)',
            secondary: 'rgba(16, 20, 22, 0.6)',
            disabled: 'rgba(16, 20, 22, 0.38)',
            hint: 'rgb(96, 173, 227)',
        },
        background: {
            default: '#f7f9fa',
        },
    },
});