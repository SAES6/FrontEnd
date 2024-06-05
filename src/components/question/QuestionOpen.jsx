import { Grid, Typography, TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../theme';
import Enonce from './Enonce';

const QuestionOpen = ({ onResponseChange, question, userResponse, mode }) => {
  const [responseValue, setResponseValue] = useState('');

  const themeSummary = useTheme(theme);

  const handleResponseChange = (event) => {
    setResponseValue(event.target.value);
    onResponseChange(event.target.value);
  };

  return (
    <Grid
      className='question'
      container
      sx={{
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        gap: '10px',
        padding: '10px 0',
      }}
    >
      <Grid
        className='first-row'
        sx={{
          width: '100%',
          height: '56px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '36px',
            color: themeSummary.palette.text.primary,
          }}
        >
          {question.title}
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon='fa-solid fa-feather'
            style={{ opacity: '0.50' }}
          />
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '24px',
              marginLeft: '5px',
            }}
          >
            Question Ouverte
          </Typography>
        </Grid>
      </Grid>
      <Enonce description={question.description} imgSrc={question.img_src} />
      {mode === 'question' ? (
        <Grid
          className='answer'
          sx={{
            width: '100%',
          }}
        >
          <TextField
            margin='normal'
            required
            value={responseValue}
            onChange={handleResponseChange}
            sx={{
              mt: '5px',
              width: '100%',
              borderRadius: '15px',
              border: '1px solid',
              borderColor: themeSummary.palette.secondary.main,
              input: {
                padding: '10px 15px',
                border: 'none',
                fontWeight: '400',
                color: themeSummary.palette.text.secondary,
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
              },
              fieldset: {
                border: 'none',
              },
            }}
            type='text'
            placeholder='Saisissez votre réponse'
          />
        </Grid>
      ) : (
        <Grid
          className='userResponse'
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              width: '8px',
              height: '24px',
              borderRadius: '15px',
              backgroundColor: themeSummary.palette.secondary.main,
            }}
          />
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
            }}
          >
            "{userResponse}"
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default QuestionOpen;
