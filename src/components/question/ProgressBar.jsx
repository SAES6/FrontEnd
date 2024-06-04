import React from 'react';
import { Grid } from '@mui/material';

const ProgressBar = ({ themeQuestions, progression }) => {
  return (
    <Grid
      sx={{
        width: '100%',
        minHeight: '10px',
        position: 'fixed',
        bottom: 0,
        backgroundColor: themeQuestions.palette.secondary.main,
      }}
    >
      <Grid
        sx={{
          transition: 'ease 0.5s',
          width: `${progression}%`,
          height: '10px',
          position: 'fixed',
          borderRadius: '0 15px 15px 0',
          backgroundColor: themeQuestions.palette.primary.main,
          bottom: 0,
        }}
      />
    </Grid>
  );
};

export default ProgressBar;
