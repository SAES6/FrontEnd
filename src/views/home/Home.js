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
  const userConsent = useSelector((state) => state.user.userConsent);

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
      console.log('tokenUser');
      setInitialRequestCreateToken({ url: '/createToken' });
    } else
      setInitialRequest({
        url: '/questionnaire/byToken?token=' + tokenUser,
        errorMessage: 'Aucun questionnaire',
      });
  }, []);

  useEffect(() => {
    if (response?.status >= 200 && response?.status < 300) {
      const fetchedQuestionnaires = response.data;

      if (fetchedQuestionnaires.length > 0) {
        const sortedQuestionnaires = fetchedQuestionnaires.sort((a, b) => {
          if (a.completed === b.completed) {
            return a.id - b.id;
          }
          return a.completed - b.completed;
        });

        setQuestionnaires(sortedQuestionnaires);
        const suggested = sortedQuestionnaires.find((q) => !q.completed);
        setSuggestedQuestionnaire(suggested || sortedQuestionnaires[0]);
      }
    }
  }, [response]);

  useEffect(() => {
    if (
      responseCreateToken?.status >= 200 &&
      responseCreateToken?.status < 300
    ) {
      dispatch(userActions.setTokenUser(responseCreateToken.data.token));
      setInitialRequest({
        url: '/questionnaire/byToken?token=' + responseCreateToken.data.token,
        errorMessage: 'Aucun questionnaire',
      });
    }
  }, [responseCreateToken]);

  const goToQuestionnaire = (quizId) => {
    if (userConsent) {
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
        mt: 25,
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
      <Grid
        sx={{
          height: 'fit-content',
          width: '100%',
          mt: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: '24px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            lineHeight: '36px',
            mb: '5px',
            textAlign: 'center',
            paddingTop: 10,
            pb: '15px',
          }}
        >
          A Propos
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '15px',
            ml: '200px',
          }}
        >
          De l’évaluation de la crédibilité des sources d'information par les
          journalistes aux décisions quotidiennes prises par le grand public
          basées sur les nouvelles consommées, l'appréciation de la valeur de
          l'information joue un rôle crucial dans notre société de
          l'information.
        </Typography>

        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '20px',
            ml: '700px',
          }}
        >
          L'importance accordée à différentes types d'informations peut varier
          significativement entre professionnels de l'information et le grand
          public, entraînant des perspectives diverses sur ce qui est considéré
          comme « valeur de l'information ».
        </Typography>

        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '20px',
            ml: '200px',
          }}
        >
          Cette diversité de perceptions nécessite une analyse approfondie pour
          comprendre comment les différents groupes utilisent et valorisent
          l'information dans leurs prises de décisions.
        </Typography>

        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '20px',
            ml: '700px',
          }}
        >
          Les études récentes soulignent l’importance de saisir ces nuances, et
          notre site web est conçu pour explorer ces aspects en profondeur.
        </Typography>

        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '5px',
            ml: '450px',
          }}
        >
          Il offre une plateforme pour :
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '5px',
            ml: '450px',
          }}
        >
          1) examiner et comparer les perceptions de la valeur de l'information
          entre journalistes et le grand public à travers des réponses à des
          scénarios soigneusement élaborés,{' '}
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: '24px',
            width: 700,
            mb: '25px',
            ml: '450px',
          }}
        >
          1) examiner et comparer les perceptions de la valeur de l'information
          entre journalistes et le grand public à travers des réponses à des
          scénarios soigneusement élaborés,{' '}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
