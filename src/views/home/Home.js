import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { theme } from '../../theme';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGET from '../../hooks/useGET';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_store/_slices/user-slice';
import Caroussel from '../../components/home/Caroussel';
import ConsentModal from '../../components/home/ConsentModal';
import QuizBox from '../../components/home/QuizBox';

const Home = () => {
  const tokenUser = useSelector((state) => state.user.tokenUser);

  const [response, setInitialRequest] = useGET();
  const [responseCreateToken, setInitialRequestCreateToken] = useGET();

  const [openConsentPopup, setOpenConsentPopup] = useState(false);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [suggestedQuestionnaire, setSuggestedQuestionnaire] = useState({}); //[1]
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);

  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('home');

  useEffect(() => {
    if (!tokenUser) {
      setInitialRequestCreateToken({ url: '/createToken' });
    }

    setInitialRequest({
      url: '/questionnaire/byToken?token=' + tokenUser,
      errorMessage: 'Aucun questionnaire',
    });
  }, []);

  useEffect(() => {
    if (response?.status >= 200 && response?.status < 300) {
      const fetchedQuestionnaires = response.data;

      if (fetchedQuestionnaires.length > 0) {
        setQuestionnaires(fetchedQuestionnaires);
        // set the suggested questionnaire to the first one that is not completed
        let suggested = fetchedQuestionnaires.find((q) => !q.completed);
        if (suggested) {
          setSuggestedQuestionnaire(suggested);
        } else {
          setSuggestedQuestionnaire(fetchedQuestionnaires[0]);
        }
      }
    }
  }, [response]);

  useEffect(() => {
    if (
      responseCreateToken?.status >= 200 &&
      responseCreateToken?.status < 300
    ) {
      console.log(responseCreateToken.data.token);
      dispatch(userActions.setTokenUser(responseCreateToken.data.token));
    } else {
      dispatch(userActions.removeTokenUser());
    }
  }, [responseCreateToken]);

  const goToQuestionnaire = (quizId) => {
    if (localStorage.getItem('user_consent') === 'true') {
      navigate(`/questions/${quizId}`);
    } else {
      setOpenConsentPopup(true);
      setSelectedQuestionnaire(quizId);
    }
  };

  return (
    <Grid
      container
      sx={{
        maxWidth: screenSize ? '1500px' : '1300px',
        height: '100%',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          mt: 5,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '55,2px',
            letterSpacing: '-5%',
          }}
        >
          Projet Informare Valorem
        </Typography>
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          height: 'fit-content',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-start',
          mt: 0,
        }}
      >
        <Caroussel theme={themeLayout} />
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            borderRadius: '15px',
            height: '350px',
          }}
        >
          <Button
            onClick={() => goToQuestionnaire(suggestedQuestionnaire.id)}
            disabled={suggestedQuestionnaire.completed}
            sx={{
              backgroundColor: suggestedQuestionnaire.completed
                ? themeLayout.palette.secondary.main
                : themeLayout.palette.primary.main,
              height: '100%',
              padding: '20px 25px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              '&:disabled': {
                backgroundColor: themeLayout.palette.secondary.main, // Exemple de couleur lorsque le bouton est désactivé
              },
            }}
            variant='contained'
          >
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {suggestedQuestionnaire.completed && (
                  <FontAwesomeIcon
                    icon='fa-solid fa-lock'
                    style={{
                      fontSize: '24px',
                      color: themeLayout.palette.primary.contrastText,
                      marginRight: '10px',
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '24px',
                    fontWeight: '600',
                    lineHeight: '36px',
                    color: themeLayout.palette.primary.contrastText,
                    overflowWrap: 'break-word',
                    textTransform: 'none',
                    width: '100%',
                    overflowX: 'auto',
                    textAlign: 'left',
                  }}
                >
                  {suggestedQuestionnaire.name}
                </Typography>
              </Grid>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '24px',
                  color: themeLayout.palette.primary.contrastText,
                  overflowWrap: 'break-word',
                  textTransform: 'none',
                  width: '100%',
                  maxHeight: '40%',
                  overfloX: 'auto',
                  textAlign: 'left',
                }}
              >
                {suggestedQuestionnaire.description}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                width: '100%',
                maxHeight: '20%',
              }}
            >
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FontAwesomeIcon
                  icon='fa-solid fa-circle-question'
                  style={{
                    fontSize: '16px',
                    color: themeLayout.palette.primary.contrastText,
                    opacity: '0.75',
                    marginRight: '5px',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    color: themeLayout.palette.primary.contrastText,
                    opacity: '0.75',
                    textTransform: 'none',
                  }}
                >
                  {suggestedQuestionnaire.number_of_questions === 1
                    ? '1 question'
                    : suggestedQuestionnaire.number_of_questions + ' questions'}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FontAwesomeIcon
                  icon='fa-solid fa-clock'
                  style={{
                    fontSize: '16px',
                    color: themeLayout.palette.primary.contrastText,
                    opacity: '0.75',
                    marginRight: '5px',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    color: themeLayout.palette.primary.contrastText,
                    opacity: '0.75',
                    textTransform: 'none',
                  }}
                >
                  {suggestedQuestionnaire.duree + ' min'}
                </Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          mt: '50px',
          overflow: 'auto',
          maxHeight: '350px',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {questionnaires.map((quiz) => (
          <QuizBox
            key={quiz.id}
            quiz={quiz}
            goToQuestionnaire={goToQuestionnaire}
          />
        ))}
      </Grid>
      <ConsentModal
        open={openConsentPopup}
        setOpen={setOpenConsentPopup}
        qId={selectedQuestionnaire}
      />
    </Grid>
  );
};

export default Home;
