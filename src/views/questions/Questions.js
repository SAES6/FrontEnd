import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import QuestionSimple from "../../components/QuestionSimple";
import QuestionEchelle from "../../components/QuestionEchelle";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setTotalSections, setProgression, addResponse } from "../../_store/_slices/questionnaire-slice";

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const dispatch = useDispatch();
  const { section: currentSection, totalSections, progression, userResponses } = useSelector(state => state.questionnaire);

  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const { id } = useParams();

  const loadQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
        const uniqueSections = [...new Set(response.data.map(question => question.page))];
        dispatch(setTotalSections(uniqueSections.length));
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
  }, [id]);

  useEffect(() => {
    if (questions.length > 0) {
      const array = questions.filter((question) => question.page === currentSection).sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
    }
  }, [questions, currentSection]);

  const handleResponseChange = (questionId, questionType, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value,
    }));
    dispatch(addResponse({ questionId, questionType, value }));
    updateProgression();
  };

  const updateProgression = () => {
    const newProgression = (currentSection / totalSections) * 100;
    dispatch(setProgression(newProgression));
  };

  const nextSection = () => {
    if (questions.length > 0) {
      const array = questions.filter((question) => question.page === currentSection + 1).sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection(newSection));
      updateProgression();
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
