import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import useGET from "../../hooks/useGET";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_store/_slices/user-slice";

import Caroussel from "../../components/home/Caroussel";

const Home = () => {
    const tokenUser = useSelector((state) => state.user.tokenUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeLayout = useTheme(theme);
  const [response, setInitialRequest] = useGET();
console.log('home')
  const [responseCreateToken, setInitialRequestCreateToken] = useGET();
  const screenSize = useMediaQuery("(min-width:1600px)");
  const [openConsentPopup, setOpenConsentPopup] = useState(false);

  // load the questionnaires from the API
  const [questionnaires, setQuestionnaires] = useState([]);
  const [suggestedQuestionnaire, setSuggestedQuestionnaire] = useState({}); //[1]
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({});
  const userToken = useSelector((state) => state.user.tokenUser);

  useEffect(() => {
    if (response?.status >= 200 && response?.status < 300) {
      setQuestionnaires(response.data);
    }
  }, [response]);

  const loadQuestionnaires = () => {
    setInitialRequest({
      url: "/questionnaire/byToken?token=" + userToken,
      errorMessage: "Aucun questionnaire",
    });
  };

  const goToQuestionnaire = (questionnaire) => {
    if (localStorage.getItem("user_consent") === "true") {
      navigate(`/questions/${questionnaire.id}`);
    } else {
      setOpenConsentPopup(true);
      setSelectedQuestionnaire(questionnaire);
    }
  };

  useEffect(() => {
    if (questionnaires.length > 0) {
      // set the suggested questionnaire to the first one that is not completed
      let suggested = questionnaires.find((q) => !q.completed);
      if (suggested) {
        setSuggestedQuestionnaire(suggested);
      } else {
        setSuggestedQuestionnaire(questionnaires[0]);
      }
    }
  }, [questionnaires]);

  const handleConsent = () => {
    localStorage.setItem("user_consent", "true");
    setOpenConsentPopup(false);
    navigate(`/questions/${selectedQuestionnaire.id}`);
  };

  const handleCloseConsent = () => {
    setOpenConsentPopup(false);
  };

  useEffect(() => {
      if (!tokenUser)
          setInitialRequestCreateToken({url: "/createToken",});
    loadQuestionnaires();
  }, []);

    useEffect(() => {
        if (responseCreateToken?.status >= 200 && responseCreateToken?.status < 300) {
            dispatch(userActions.setTokenUser(responseCreateToken.data.token));
        } else {
            dispatch(userActions.removeTokenUser());
        }
    }, [responseCreateToken]);

  return (
    <Grid
      container
      sx={{
        maxWidth: screenSize ? "1500px" : "1300px",
        height: "100%",
        width: "auto",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          mt: 5,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "48px",
            fontWeight: "700",
            lineHeight: "55,2px",
            letterSpacing: "-5%",
          }}
        >
          Projet Informare Valorem
        </Typography>
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          height: "fit-content",
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
          mt: 0,
        }}
      >
        <Caroussel theme={themeLayout} />
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            borderRadius: "15px",
            height: "350px",
          }}
        >
          <Button
            onClick={() => goToQuestionnaire(suggestedQuestionnaire)}
            disabled={suggestedQuestionnaire.completed}
            sx={{
              backgroundColor: suggestedQuestionnaire.completed
                ? themeLayout.palette.secondary.main
                : themeLayout.palette.primary.main,
              height: "100%",
              padding: "20px 25px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              "&:disabled": {
                backgroundColor: themeLayout.palette.secondary.main, // Exemple de couleur lorsque le bouton est désactivé
              },
            }}
            variant="contained"
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {suggestedQuestionnaire.completed && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-lock"
                    style={{
                      fontSize: "24px",
                      color: themeLayout.palette.primary.contrastText,
                      marginRight: "10px",
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "24px",
                    fontWeight: "600",
                    lineHeight: "36px",
                    color: themeLayout.palette.primary.contrastText,
                    overflowWrap: "break-word",
                    textTransform: "none",
                    width: "100%",
                    overflowX: "auto",
                    textAlign: "left",
                  }}
                >
                  {suggestedQuestionnaire.name}
                </Typography>
              </Grid>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: themeLayout.palette.primary.contrastText,
                  overflowWrap: "break-word",
                  textTransform: "none",
                  width: "100%",
                  maxHeight: "40%",
                  overfloX: "auto",
                  textAlign: "left",
                }}
              >
                {suggestedQuestionnaire.description}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                width: "100%",
                maxHeight: "20%",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-circle-question"
                  style={{
                    fontSize: "16px",
                    color: themeLayout.palette.primary.contrastText,
                    opacity: "0.75",
                    marginRight: "5px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    color: themeLayout.palette.primary.contrastText,
                    opacity: "0.75",
                    textTransform: "none",
                  }}
                >
                  {suggestedQuestionnaire.number_of_questions == 1
                    ? "1 question"
                    : suggestedQuestionnaire.number_of_questions + " questions"}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-clock"
                  style={{
                    fontSize: "16px",
                    color: themeLayout.palette.primary.contrastText,
                    opacity: "0.75",
                    marginRight: "5px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    color: themeLayout.palette.primary.contrastText,
                    opacity: "0.75",
                    textTransform: "none",
                  }}
                >
                  {suggestedQuestionnaire.duree + " min"}
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
          mt: "50px",
          overflow: "auto",
          maxHeight: "350px",
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {questionnaires.map((questionnaire) => (
          <Grid>
            <Button
              onClick={() => goToQuestionnaire(questionnaire)}
              disabled={questionnaire.completed}
              sx={{
                height: "200px",
                maxHeight: "200px",
                maxWidth: "285px",
                width: "285px",
                backgroundColor: questionnaire.completed
                  ? themeLayout.palette.secondary.main
                  : themeLayout.palette.primary.main,

                borderRadius: "15px",
                padding: "20px 25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                "&:disabled": {
                  backgroundColor: themeLayout.palette.secondary.main, // Exemple de couleur lorsque le bouton est désactivé
                },
              }}
              variant="contained"
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {questionnaire.completed && (
                    <FontAwesomeIcon
                      icon="fa-solid fa-lock"
                      style={{
                        fontSize: "24px",
                        color: themeLayout.palette.primary.contrastText,
                        marginRight: "10px",
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      color: themeLayout.palette.primary.contrastText,
                      overflowWrap: "break-word",
                      textTransform: "none",
                      width: "100%",
                      overflowX: "auto",
                      textAlign: "left",
                    }}
                  >
                    {questionnaire.name}
                  </Typography>
                </Grid>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: themeLayout.palette.primary.contrastText,
                    overflowWrap: "break-word",
                    textTransform: "none",
                    width: "100%",
                    maxHeight: "40%",
                    overfloX: "auto",
                    textAlign: "left",
                  }}
                >
                  {questionnaire.description}
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  width: "100%",
                  maxHeight: "20%",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-question"
                    style={{
                      fontSize: "16px",
                      color: themeLayout.palette.primary.contrastText,
                      opacity: "0.75",
                      marginRight: "5px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeLayout.palette.primary.contrastText,
                      opacity: "0.75",
                      textTransform: "none",
                    }}
                  >
                    {questionnaire.number_of_questions == 1
                      ? "1 question"
                      : questionnaire.number_of_questions + " questions"}
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-clock"
                    style={{
                      fontSize: "16px",
                      color: themeLayout.palette.primary.contrastText,
                      opacity: "0.75",
                      marginRight: "5px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeLayout.palette.primary.contrastText,
                      opacity: "0.75",
                      textTransform: "none",
                    }}
                  >
                    {questionnaire.duree + " min"}
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
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "fit-content",
            bgcolor: "background.paper",
            borderRadius: "15px",
            padding: "20px 25px",
            boxShadow: 24,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3, width: "100%" }}
          >
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "36px",
                  color: "#0E1419",
                  textAlign: "center",
                }}
              >
                Un instant !
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <IconButton onClick={handleCloseConsent}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 3, width: "500px" }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#0E1419",
                textAlign: "start",
                mb: 2,
              }}
            >
              Avant de commencer, veuillez lire et accepter les conditions
              d’utilisation générales :
            </Typography>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{
                border: "1px solid",
                borderColor: themeLayout.palette.secondary.main,
                borderRadius: "15px",
                padding: "10px 15px",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                  mt: 1,
                }}
              >
                Projet sur la Valeur de l'Information
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
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
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                  mt: 1,
                }}
              >
                Objectif de l'Étude:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
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
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                  mt: 1,
                }}
              >
                Procédure:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
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
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                  mt: 1,
                }}
              >
                Confidentialité et Anonymat:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                }}
              >
                Vos réponses seront collectées de manière anonyme et aucune
                information permettant de vous identifier ne sera enregistrée.
                Toutes les données seront stockées de manière sécurisée et
                utilisées uniquement à des fins de recherche.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
                  mt: 1,
                }}
              >
                Droit de Retrait:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "24px",
                  opacity: "0.5",
                  textAlign: "start",
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
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              textAlign: "start",
              padding: "10px 15px",
              width: "500px",
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
            <Button onClick={handleConsent} variant="contained">
              J’accepte
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default Home;
