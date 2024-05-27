import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  Box,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import QuestionSimple from "../../components/QuestionSimple";
import QuestionEchelle from "../../components/QuestionEchelle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Example detective icon

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState(1);
  const [userRole, setUserRole] = useState(null);
  const [modalRole, setModalRole] = useState(false);
  // recupere l'id du questionnaire via l'url
  const { id } = useParams();
  const getLocalStorageKey = (id) => `currentSection_${id}`;
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: "ease 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  }));
  const loadQuestions = () => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch(() => {
        toast.error("Aucune question", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  useEffect(() => {
    const storedSection = localStorage.getItem(getLocalStorageKey(id));
    if (storedSection) {
      setCurrentSection(parseInt(storedSection, 10));
    }
    loadQuestions();
  }, [id]);

  const handleSetJournalist = () => {
    if (userRole === "journalist") {
      setUserRole("user");
    } else {
      setUserRole("journalist");
    }
  };

  const handleValidateRole = () => {
    if (userRole === null) {
      let finalUserRole = "user";
      localStorage.setItem("userRole", finalUserRole);
      setUserRole(finalUserRole);
      setModalRole(false);
    } else {
      localStorage.setItem("userRole", userRole);
      setUserRole(userRole);
      setModalRole(false);
    }
  };

  useEffect(() => {
    console.log(questions);
    if (questions.length > 0) {
      console.log("mdr2");
      let array = [];
      array = questions.filter((question) => question.page === currentSection);
      array = array.sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
    }
  }, [questions, currentSection]);

  const nextSection = () => {
    console.log(questions);
    if (questions.length > 0) {
      console.log("mdr3");
      let array = [];
      array = questions.filter(
        (question) => question.page === currentSection + 1
      );
      array = array.sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
      setCurrentSection(currentSection + 1);
      localStorage.setItem(getLocalStorageKey(id), currentSection + 1);
    }
  };

  useEffect(() => {
    console.log("mdr5555");
    console.log(localStorage.getItem("userRole"));
    if (localStorage.getItem("userRole") != null) {
      setUserRole(localStorage.getItem("userRole"));
      setModalRole(false);
    } else {
      console.log("mdr6");
      setModalRole(true);
    }
  }, []);

  useEffect(() => {
    console.log("mdr");
    console.log(currentQuestions);
  }, [currentQuestions]);
  return (
    <Grid
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Grid
        sx={{
          padding: "40px 0 20px",
        }}
      >
        {currentQuestions.map((question) => {
          if (question.type === "text") {
            return (
              <QuestionOpen questionTitle={question.title}>
                {question.description}
              </QuestionOpen>
            );
          }
          if (
            question.type === "single_choice" ||
            question.type === "multiple_choice"
          ) {
            return (
              <QuestionSimple
                questionTitle={question.title}
                questionType={question.type}
                questionChoices={question.choices}
              >
                {question.description}
              </QuestionSimple>
            );
          }
          if (question.type === "slider") {
            return (
              <QuestionEchelle
                questionTitle={question.title}
                questionSliderMin={question.slider_min}
                questionSliderMax={question.slider_max}
                questionSliderGap={question.slider_gap}
              >
                {question.description}
              </QuestionEchelle>
            );
          }
        })}
      </Grid>
      <Grid
        sx={{
          padding: "20px 0 40px",
          width: screenSize ? "1500px" : "1300px",
        }}
      >
        <Grid>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              color: themeQuestions.palette.text.secondary,
            }}
          >
            Prochaine section :
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "24px",
              color: themeQuestions.palette.primary.main,
            }}
          >
            Section {currentSection + 1}
          </Typography>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: "15px",
            backgroundColor: "#0D5282",
            color: "#F7F9FB",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            padding: "10px 15px",
            textTransform: "none",
            boxShadow: "none",
          }}
          onClick={nextSection}
        >
          Valider mes réponses
        </Button>
      </Grid>
      <Modal open={modalRole}>
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
            outline: "none",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3, width: "100%" }}
          >
            <Grid item xs={12}>
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
                Avant de commencer...
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              mt: 2,
              padding: "10px 15px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              maxWidth: "500px",
            }}
          >
            Vous allez participer à votre premier questionnaire. Nous avons
            besoin d’en savoir plus sur votre statut.
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: 3,
              padding: "15px 20px",
              borderRadius: "15px",
              width: "60%",
              minWidth: "300px",
              position: "relative",
              backgroundColor: themeQuestions.palette.primary.main,
              flexWrap: "nowrap",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
              }}
            >
              <Checkbox
                checked={userRole === "journalist"}
                onChange={() => handleSetJournalist()}
                icon={
                  <CheckBoxOutlineBlankIcon
                    sx={{
                      color: themeQuestions.palette.primary.contrastText,
                    }}
                  />
                }
                checkedIcon={
                  <CheckBoxIcon
                    sx={{
                      color: themeQuestions.palette.primary.contrastText,
                    }}
                  />
                }
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "36px",
                  padding: "0",
                  mr: 1,
                  color: themeQuestions.palette.primary.contrastText,
                }}
              />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "36px",
                  color: themeQuestions.palette.primary.contrastText,
                }}
              >
                Je suis journaliste
              </Typography>
            </Grid>
            <Grid
              sx={{
                position: "absolute",
                right: -20, // Adjust position as needed
                alignItems: "center",
                justifyContent: "center",
                opacity: "0.5",
                height: "100%",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-user-secret"
                color={themeQuestions.palette.primary.contrastText}
                style={{ fontSize: "70px" }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              maxWidth: "500px",
              textAlign: "center",
              opacity: "0.5",
              color: themeQuestions.palette.text.secondary,
            }}
          >
            Nous comptons sur votre bonne foi !
          </Typography>
          <ColorButton
            onClick={handleValidateRole}
            sx={{
              backgroundColor: themeQuestions.palette.primary.main,
              mt: 3,
              borderRadius: "10px",
              padding: "10px 15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="contained"
          >
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "24px",
                color: themeQuestions.palette.primary.contrastText,
                textAlign: "center",
                textTransform: "none",
              }}
            >
              Continuer
            </Typography>
          </ColorButton>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default Questions;
