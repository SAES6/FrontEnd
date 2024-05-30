import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { theme } from '../../theme';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const [openConsentPopup, setOpenConsentPopup] = useState(false);

  // load the questionnaires from the API
  const [questionnaires, setQuestionnaires] = useState([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({});

  const loadQuestionnaires = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/questionnaire/byToken?token=${localStorage.getItem('token_access')}`
      )
      .then((response) => {
        setQuestionnaires(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Aucun questionnaire', {
          position: 'top-center',
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '15px',
            textAlign: 'center',
          },
        });
      });
  };

  const goToQuestionnaire = (questionnaire) => {
    if (localStorage.getItem('user_consent') === 'true') {
      navigate(`/questions/${questionnaire.id}`);
    } else {
      setOpenConsentPopup(true);
      setSelectedQuestionnaire(questionnaire);
    }
  };

  const handleConsent = () => {
    localStorage.setItem('user_consent', 'true');
    setOpenConsentPopup(false);
    navigate(`/questions/${selectedQuestionnaire.id}`);
  };

  const handleCloseConsent = () => {
    setOpenConsentPopup(false);
  };

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  useEffect(() => {
    console.log(questionnaires);
  }, [questionnaires]);

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
        spacing={4}
        sx={{
          height: 'fit-content',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          mt: 0,
        }}
      >
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            pr: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '64px',
              fontWeight: '700',
              lineHeight: '1.2',
              letterSpacing: '-2px',
            }}
          >
            Projet Informare Valorem
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: '600',
              letterSpacing: '-1px',
              mb: 1,
              mt: 1,
            }}
          >
            Bienvenue sur notre Plateforme d'Étude de la Valeur de l'Information
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '300',
              letterSpacing: '-1px',
              mb: 1,
              mt: 1,
            }}
          >
            Dans un monde saturé d'informations, comprendre ce qui constitue une
            "information de valeur" peut varier grandement entre les
            professionnels de l'information et le grand public. Ce projet,
            initié par l'IMSIC, vise à explorer ces perceptions diverses à
            travers une série de scénarios interactifs où vous, les
            participants, pouvez exprimer vos opinions et choix.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            height: '350px',
            backgroundColor: themeLayout.palette.secondary.main,
            borderRadius: '20px',
          }}
        />
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          mt: '50px',
          overflow: 'auto',
          maxHeight: '300px',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {questionnaires.map((questionnaire) => (
          <Grid>
            <Button
              onClick={() => goToQuestionnaire(questionnaire)}
              disabled={questionnaire.completed}
              sx={{
                height: '200px',
                maxHeight: '200px',
                maxWidth: '285px',
                width: '285px',
                backgroundColor: questionnaire.completed
                  ? themeLayout.palette.secondary.main
                  : themeLayout.palette.primary.main,

                borderRadius: '15px',
                padding: '20px 25px',
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
                  {questionnaire.completed && (
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
                    {questionnaire.name}
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
                  {questionnaire.description}
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
                    {questionnaire.number_of_questions == 1
                      ? '1 question'
                      : questionnaire.number_of_questions + ' questions'}
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
                    {questionnaire.duree + ' min'}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
      <Modal open={openConsentPopup} onClose={handleCloseConsent}>
        <Grid
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            bgcolor: 'background.paper',
            borderRadius: '15px',
            padding: '20px 25px',
            boxShadow: 24,
          }}
        >
          <Grid
            container
            alignItems='center'
            justifyContent='space-between'
            sx={{ mb: 3, width: '100%' }}
          >
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Typography
                variant='h6'
                component='h2'
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '36px',
                  color: '#0E1419',
                  textAlign: 'center',
                }}
              >
                Un instant !
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: 'right' }}>
              <IconButton onClick={handleCloseConsent}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{ mb: 3, width: '500px' }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
                color: '#0E1419',
                textAlign: 'start',
                mb: 2,
              }}
            >
              Avant de commencer, veuillez lire et accepter les conditions
              d’utilisation générales :
            </Typography>
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              sx={{
                border: '1px solid',
                borderColor: themeLayout.palette.secondary.main,
                borderRadius: '15px',
                padding: '10px 15px',
                maxHeight: '200px',
                overflow: 'scroll',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                  mt: 1,
                }}
              >
                Projet sur la Valeur de l'Information
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                }}
              >
                Nous vous remercions de votre intérêt à participer à notre étude
                sur la perception de la valeur de l'information, conduite par
                l'Institut Méditerranéen des Sciences de l'Information et de la
                Communication (IMSIC). Avant de débuter, veuillez lire
                attentivement les informations suivantes et donner votre
                consentement pour participer.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                  mt: 1,
                }}
              >
                Objectif de l'Étude:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                }}
              >
                Cette étude vise à comparer et comprendre comment les
                journalistes et le grand public évaluent la valeur de
                l'information à travers différents scénarios présentés sur cette
                plateforme interactive. Les résultats nous aideront à mieux
                saisir les critères utilisés par différents groupes pour juger
                l'importance des informations.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                  mt: 1,
                }}
              >
                Procédure:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                }}
              >
                En tant que participant, vous serez invité à répondre à une
                série de scénarios qui vous seront présentés sur notre site web.
                Chaque scénario vous proposera plusieurs réponses possibles, et
                vous devrez choisir celle qui reflète le mieux votre opinion sur
                la valeur de l'information dans le contexte donné.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                  mt: 1,
                }}
              >
                Confidentialité et Anonymat:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                }}
              >
                Vos réponses seront collectées de manière anonyme et aucune
                information permettant de vous identifier ne sera enregistrée.
                Toutes les données seront stockées de manière sécurisée et
                utilisées uniquement à des fins de recherche.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                  mt: 1,
                }}
              >
                Droit de Retrait:
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  opacity: '0.5',
                  textAlign: 'start',
                }}
              >
                Votre participation à cette étude est entièrement volontaire.
                Vous avez le droit de vous retirer de l'étude à tout moment sans
                aucune conséquence.
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'start',
              padding: '10px 15px',
              width: '500px',
              mb: 3,
            }}
          >
            En cliquant sur le bouton ci-dessous et en continuant à participer à
            cette étude, vous confirmez que vous avez lu et compris les
            informations fournies concernant votre participation. Vous acceptez
            de participer à cette étude sur la base du volontariat et vous êtes
            conscient que vous pouvez retirer votre consentement et cesser la
            participation à tout moment.
          </Typography>

          <Grid>
            <Button onClick={handleConsent} variant='contained'>
              J’accepte
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default Home;
