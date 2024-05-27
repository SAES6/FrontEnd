import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import QuestionSimple from "../../components/QuestionSimple";
import QuestionEchelle from "../../components/QuestionEchelle";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionnaire, setCurrentSection, setTotalSections, setProgression, addResponse } from "../../_store/_slices/questionnaire-slice";

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const questionnaireState = useSelector(state => state.questionnaire.questionnaires[id] || {});
  const { currentSection = 1, totalSections = 1, progression = 0, responses = [] } = questionnaireState;

  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [localResponses, setLocalResponses] = useState({});

  const loadQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
        const uniqueSections = [...new Set(response.data.map(question => question.page))];
        dispatch(setTotalSections({ id, totalSections: uniqueSections.length }));
        dispatch(setQuestionnaire({ id, totalSections: uniqueSections.length }));
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
    loadQuestions();
    console.log(questionnaireState)
  }, [id]);

  useEffect(() => {
    if (questions.length > 0) {
      const array = questions.filter((question) => question.page === currentSection).sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
    }
  }, [questions, currentSection]);

  const handleResponseChange = (questionId, questionType, value) => {
    setLocalResponses(prev => ({
      ...prev,
      [questionId]: { questionId, questionType, value }
    }));
  };

  const updateProgression = (newSection) => {
    const newProgression = (newSection / totalSections) * 100;
    dispatch(setProgression({ id, progression: newProgression }));
  };

  const nextSection = () => {
    Object.values(localResponses).forEach(response => {
      dispatch(addResponse({ questionnaireId: id, ...response }));
    });

    if (currentSection >= totalSections) {
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection({ id, section: newSection }));
      navigate('/accueil');
    } else {
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection({ id, section: newSection }));
      setLocalResponses({});
    }
  };

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
              <QuestionOpen
                key={question.id}
                questionTitle={question.title}
                onResponseChange={(value) => handleResponseChange(question.id, question.type, value)}
              >
                {question.description}
              </QuestionOpen>
            );
          }
          if (question.type === "single_choice" || question.type === "multiple_choice") {
            return (
              <QuestionSimple
                key={question.id}
                questionTitle={question.title}
                questionType={question.type}
                questionChoices={question.choices}
                onResponseChange={(value) => handleResponseChange(question.id, question.type, value)}
              >
                {question.description}
              </QuestionSimple>
            );
          }
          if (question.type === "slider") {
            return (
              <QuestionEchelle
                key={question.id}
                questionTitle={question.title}
                questionSliderMin={question.slider_min}
                questionSliderMax={question.slider_max}
                questionSliderGap={question.slider_gap}
                onResponseChange={(value) => handleResponseChange(question.id, question.type, value)}
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
      <Grid
        sx={{
          width: "100%",
          minHeight: "10px",
          position: "fixed",
          bottom: 0,
          backgroundColor: themeQuestions.palette.secondary.main,
        }}
      >
        <Grid
          sx={{
            transition: "ease 0.5s",
            width: `${progression}%`,
            height: "10px",
            position: "fixed",
            borderRadius: "0 15px 15px 0",
            backgroundColor: themeQuestions.palette.primary.main,
            bottom: 0,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Questions;
