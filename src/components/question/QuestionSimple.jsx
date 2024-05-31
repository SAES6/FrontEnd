import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../theme';
import Enonce from './Enonce';

const QuestionSimple = ({
  children,
  questionTitle,
  questionType,
  questionChoices,
  imgSrc,
  onResponseChange,
  userResponse,
  mode,
}) => {
  const themeQuestion = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const [selectedChoices, setSelectedChoices] = useState([]);

  useEffect(() => {
    if (mode === 'question' && selectedChoices.length > 0) {
      onResponseChange(selectedChoices);
    }
  }, [selectedChoices, onResponseChange, mode]);

  useEffect(() => {
    if (mode !== 'question') {
      setSelectedChoices(userResponse);
    }
  }, [userResponse, mode]);

  const handleCheckboxChange = (choiceId) => {
    setSelectedChoices((prevSelectedChoices) => {
      const newSelectedChoices = prevSelectedChoices.includes(choiceId)
        ? prevSelectedChoices.filter((id) => id !== choiceId)
        : [...prevSelectedChoices, choiceId];
      return newSelectedChoices;
    });
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
            color: themeQuestion.palette.text.primary,
          }}
        >
          {questionTitle}
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon='fa-solid fa-bullseye'
            style={{ opacity: '0.5' }}
          />
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '24px',
              marginLeft: '5px',
              color: themeQuestion.palette.text.primary,
            }}
          >
            Choix {questionType === 'simple_choice' ? 'simple' : 'multiple'}
          </Typography>
        </Grid>
      </Grid>
      <Enonce children={children} imgSrc={imgSrc} />
      {mode === 'question' ? (
        <Grid
          className='choices'
          sx={{
            width: '100%',
          }}
        >
          <FormGroup>
            {questionChoices.map((choice) => (
              <FormControlLabel
                key={choice.id}
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    color: themeQuestion.palette.text.primary,
                  },
                }}
                control={
                  <Checkbox
                    checked={selectedChoices.includes(choice.id)}
                    onChange={() => handleCheckboxChange(choice.id)}
                  />
                }
                label={choice.text}
              />
            ))}
          </FormGroup>
        </Grid>
      ) : (
        <Grid
          className='choices'
          sx={{
            width: '100%',
          }}
        >
          <FormGroup>
            {questionChoices.map((choice) => (
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <FormControlLabel
                  key={choice.id}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '24px',
                      color: themeQuestion.palette.text.primary,
                    },
                  }}
                  control={
                    <Checkbox checked={userResponse.includes(choice.id)} />
                  }
                  label={choice.text}
                />
                <Grid
                  sx={{
                    padding: '10px 15px',
                    border: 'solid 1px',
                    borderColor: themeQuestion.palette.secondary.main,
                    gap: '5px',
                    borderRadius: '15px',
                  }}
                >
                  <Grid
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <FontAwesomeIcon
                      icon='fa-solid fa-user'
                      style={{
                        fontSize: '16px',
                        color: themeQuestion.palette.primary.main,
                      }}
                    />
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        color: themeQuestion.palette.primary.main,
                      }}
                    >
                      23% des utilisateurs sont d’accord
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <FontAwesomeIcon
                      icon='fa-solid fa-user-secret'
                      style={{
                        fontSize: '16px',
                        color: themeQuestion.palette.secondary.main,
                      }}
                    />
                    <Typography
                      sx={{
                        marginLeft: '5px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        color: themeQuestion.palette.secondary.main,
                      }}
                    >
                      15% des journalistes sont d’accord
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </FormGroup>
        </Grid>
      )}
    </Grid>
  );
};

export default QuestionSimple;
