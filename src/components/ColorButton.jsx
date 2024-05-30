import { styled } from '@mui/system';
import { Button } from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.contrastText,
  transition: '0.3 s',
  '&:hover': {
    backgroundColor: '#EEF2F6',
  },
}));

export default ColorButton;
