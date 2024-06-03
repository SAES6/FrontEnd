import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../theme';
import Enonce from './Enonce';
import QuestionChoiceStat from './QuestionChoiceStat';

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
            Choix {questionType === 'single_choice' ? 'simple' : 'multiple'}
          </Typography>
        </Grid>
      </Grid>
      <Enonce children={children} imgSrc={imgSrc} />
      {mode === 'question' ? (
        //--------------------------------------------------------------------------------------------
        //-------------------------------------- Mode Question ---------------------------------------
        //--------------------------------------------------------------------------------------------

        <Grid container className='choices' spacing={2} sx={{ width: '100%' }}>
          {questionChoices.map((choice) => {
            const handleClick = () => {
              handleCheckboxChange(choice.id);
            };
            return (
              <Grid item xs={choice.image_src ? 6 : 12} key={choice.id}>
                {choice.image_src ? (
                  <Box
                    onClick={handleClick}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px',
                      border: selectedChoices.includes(choice.id)
                        ? `2px solid ${themeQuestion.palette.primary.main}`
                        : `2px solid transparent`,
                      borderRadius: '15px',
                      transition: 'border 0.3s ease',
                      '&:hover': {
                        border: `2px solid ${themeQuestion.palette.secondary.main}`,
                      },
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '250px',
                        objectFit: 'cover',
                        borderRadius: '15px',
                      }}
                      src={choice.image_src}
                      alt='image du choix'
                    />
                  </Box>
                ) : (
                  <FormControlLabel
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
                )}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        //--------------------------------------------------------------------------------------------
        //-------------------------------------- Mode Sommaire ---------------------------------------
        //--------------------------------------------------------------------------------------------

        <Grid container className='choices' spacing={2} sx={{ width: '100%' }}>
          {questionChoices.map((choice) => {
            return (
              <Grid item xs={choice.image_src ? 6 : 12} key={choice.id}>
                {choice.image_src ? (
                  <Grid
                    sx={{
                      cursor: 'pointer',
                      height: '250px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-evenly',
                      backgroundImage: `url(${choice.image_src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      outline: selectedChoices.includes(choice.id)
                        ? `2px solid ${themeQuestion.palette.primary.main}`
                        : `2px solid transparent`,
                      borderRadius: '15px',
                    }}
                  >
                    <Grid
                      xs={5}
                      sx={{
                        backgroundColor: themeQuestion.palette.primary.main,
                        padding: '10px',
                        opacity: '0.85',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '75%',
                        borderRadius: '15px 15px 0 0',
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <FontAwesomeIcon
                          icon='fa-solid fa-user'
                          style={{
                            fontSize: '16px',
                            color: themeQuestion.palette.primary.contrastText,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '24px',
                            fontWeight: '600',
                            color: themeQuestion.palette.primary.contrastText,
                          }}
                        >
                          736
                        </Typography>
                      </Grid>
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '24px',
                          fontWeight: '600',
                          color: themeQuestion.palette.primary.contrastText,
                        }}
                      >
                        75%
                      </Typography>
                    </Grid>
                    <Grid
                      xs={5}
                      sx={{
                        backgroundColor: themeQuestion.palette.secondary.main,
                        padding: '10px',
                        opacity: '0.85',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '35%',
                        borderRadius: '15px 15px 0 0',
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <FontAwesomeIcon
                          icon='fa-solid fa-user'
                          style={{
                            fontSize: '16px',
                            color: themeQuestion.palette.primary.contrastText,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '24px',
                            fontWeight: '600',
                            color: themeQuestion.palette.primary.contrastText,
                          }}
                        >
                          213
                        </Typography>
                      </Grid>
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '24px',
                          fontWeight: '600',
                          color: themeQuestion.palette.primary.contrastText,
                        }}
                      >
                        15%
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid sx={{ display: 'flex' }}>
                    <FormControlLabel
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
                        />
                      }
                      label={choice.text}
                    />
                    <QuestionChoiceStat
                      userPercent={23}
                      journalistPercent={15}
                    />
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default QuestionSimple;
