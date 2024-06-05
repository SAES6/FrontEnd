import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

const QuestionnaireNavigation = ({
  screenSize,
  themeQuestions,
  currentSection,
  nextSection,
  totalSections,
}) => {
  return (
    <Grid
      sx={{
        padding: '20px 0 40px',
        width: screenSize ? '1500px' : '1300px',
      }}
    >
      {currentSection < totalSections && (
        <Grid>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              color: themeQuestions.palette.text.secondary,
            }}
          >
            Prochaine section :
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '24px',
              color: themeQuestions.palette.primary.main,
            }}
          >
            Section {currentSection + 1}
          </Typography>
        </Grid>
      )}
      <Button
        type='submit'
        variant='contained'
        sx={{
          mt: 3,
          mb: 2,
        }}
        onClick={nextSection}
      >
        Valider mes réponses
      </Button>
    </Grid>
  );
};

export default QuestionnaireNavigation;
