import { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../theme';
import Enonce from './Enonce';
import QuestionChoiceStat from './QuestionChoiceStat';

const QuestionSimple = ({
  onResponseChange,
  question,
  mode,
  userResponse,
  stats,
  preview,
}) => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const themeQuestion = useTheme(theme);

  useEffect(() => {
    if (mode === 'question' && selectedChoices.length > 0) {
      onResponseChange(selectedChoices);
    } else if (mode !== 'question') {
      setSelectedChoices(userResponse);
    }
  }, [selectedChoices]);

  const handleCheckboxChange = (choiceId) => {
    setSelectedChoices((prevSelectedChoices) => {
      if (question.type === 'single_choice') {
        return [choiceId];
      } else {
        const newSelectedChoices = prevSelectedChoices.includes(choiceId)
          ? prevSelectedChoices.filter((id) => id !== choiceId)
          : [...prevSelectedChoices, choiceId];
        return newSelectedChoices;
      }
    });
  };

  const getStatById = (statsArray, choiceId) => {
    if (!statsArray) return { total: 0, pourcentage: 0 };
    const stat = statsArray.find((stat) => stat.choice_id === choiceId);
    return stat || { total: 0, pourcentage: 0 };
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
            Choix {question.type === 'single_choice' ? 'simple' : 'multiple'}
          </Typography>
        </Grid>
      </Grid>
      <Enonce description={question.description} imgSrc={question.img_src} />
      {mode === 'question' ? (
        //--------------------------------------------------------------------------------------------
        //-------------------------------------- Mode Question ---------------------------------------
        //--------------------------------------------------------------------------------------------

        <Grid container className='choices' spacing={2} sx={{ width: '100%' }}>
          {question.choices.map((choice) => (
            <Grid item xs={choice.image_src ? 6 : 12} key={choice.id}>
              {choice.image_src ? (
                <Box
                  onClick={() => handleCheckboxChange(choice.id)}
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
                      objectFit: 'contain',
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
                      disabled={preview}
                      checked={selectedChoices.includes(choice.id)}
                      onChange={() => handleCheckboxChange(choice.id)}
                    />
                  }
                  label={choice.text}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        //--------------------------------------------------------------------------------------------
        //-------------------------------------- Mode Sommaire ---------------------------------------
        //--------------------------------------------------------------------------------------------

        <Grid container className='choices' spacing={2} sx={{ width: '100%' }}>
          {question.choices.map((choice) => {
            const userStat = getStatById(stats?.others, choice.id);
            const journalistStat = getStatById(stats?.journalists, choice.id);
            return (
              <Grid item xs={choice.image_src ? 6 : 12} key={choice.id}>
                {choice.image_src ? (
                  <Grid
                    sx={{
                      height: '250px',
                      backgroundImage: `url(${choice.image_src})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      outline: selectedChoices.includes(choice.id)
                        ? `2px solid ${themeQuestion.palette.primary.main}`
                        : `2px solid transparent`,
                      borderRadius: '15px',
                    }}
                  >
                    {selectedChoices.includes(choice.id) && (
                      <Grid
                        sx={{
                          height: '250px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <Grid
                          sx={{
                            width: '48%',
                            display: 'flex',
                            ml: '1%',
                            mr: '1%',
                            height: `${userStat.pourcentage}%`,
                            flexDirection: 'column',
                            alignItems: 'space-between',
                            justifyContent: 'space-between',
                            backgroundColor: themeQuestion.palette.primary.main,
                            borderRadius: '15px 15px 0 0',
                            opacity: 0.85,
                            position: 'relative',
                          }}
                        >
                          <Grid
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              pt: userStat.pourcentage >= 33 ? '15px' : 0,
                              top: userStat.pourcentage >= 33 ? '0' : '-100%',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent:
                                userStat.pourcentage >= 33
                                  ? 'space-between'
                                  : 'center',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              textAlign: 'center',
                              alignSelf: 'stretch',
                            }}
                          >
                            <Grid
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: 'fit-content',
                              }}
                            >
                              <FontAwesomeIcon
                                icon='fa-solid fa-user'
                                fontSize={'20px'}
                                fixedWidth
                                color={
                                  themeQuestion.palette.primary.contrastText
                                }
                              />
                              <Typography
                                sx={{
                                  fontFamily: 'Poppins, sans-serif',
                                  fontSize: '24px',
                                  fontWeight: '600',
                                  lineHeight: '36px',
                                  color:
                                    themeQuestion.palette.primary.contrastText,
                                }}
                              >
                                {userStat.total}
                              </Typography>
                            </Grid>
                            <Typography
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '24px',
                                fontWeight: '600',
                                lineHeight: '36px',
                                visibility:
                                  userStat.pourcentage >= 1
                                    ? 'visible'
                                    : 'hidden',
                                color:
                                  themeQuestion.palette.primary.contrastText,
                              }}
                            >
                              {userStat.pourcentage}%
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          sx={{
                            width: '48%',
                            display: 'flex',
                            ml: '1%',
                            mr: '1%',
                            height: `${journalistStat.pourcentage}%`,
                            flexDirection: 'column',
                            alignItems: 'space-between',
                            justifyContent: 'space-between',
                            backgroundColor:
                              themeQuestion.palette.secondary.main,
                            borderRadius: '15px 15px 0 0',
                            opacity: 0.85,
                            position: 'relative',
                          }}
                        >
                          <Grid
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              pt: journalistStat.pourcentage >= 33 ? '15px' : 0,
                              top:
                                journalistStat.pourcentage >= 33
                                  ? '0'
                                  : '-100%',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent:
                                journalistStat.pourcentage >= 33
                                  ? 'space-between'
                                  : 'center',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              textAlign: 'center',
                              alignSelf: 'stretch',
                            }}
                          >
                            <Grid
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: 'fit-content',
                              }}
                            >
                              <FontAwesomeIcon
                                icon='fa-solid fa-user-secret'
                                fontSize={'20px'}
                                fixedWidth
                                color={
                                  themeQuestion.palette.primary.contrastText
                                }
                              />
                              <Typography
                                sx={{
                                  fontFamily: 'Poppins, sans-serif',
                                  fontSize: '24px',
                                  fontWeight: '600',
                                  lineHeight: '36px',
                                  color:
                                    themeQuestion.palette.primary.contrastText,
                                }}
                              >
                                {journalistStat.total}
                              </Typography>
                            </Grid>
                            <Typography
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '24px',
                                fontWeight: '600',
                                lineHeight: '36px',
                                visibility:
                                  journalistStat.pourcentage >= 1
                                    ? 'visible'
                                    : 'hidden',
                                color:
                                  themeQuestion.palette.primary.contrastText,
                              }}
                            >
                              {journalistStat.pourcentage}%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
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
                    {stats ? (
                      selectedChoices.includes(choice.id) && (
                        <QuestionChoiceStat
                          userPercent={userStat.pourcentage}
                          journalistPercent={journalistStat.pourcentage}
                        />
                      )
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          fontWeight: '400',
                          color: themeQuestion.palette.text.primary,
                        }}
                      >
                        Pas de statistiques disponibles
                      </Typography>
                    )}
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
