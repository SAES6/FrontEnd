import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
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

const Questions = () => {
  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState(1);
  // recupere l'id du questionnaire via l'url
  const { id } = useParams();

  const loadQuestions = () => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        console.log(response);
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
    loadQuestions();
  }, []);

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

  useEffect(() => {
    console.log("mdr");
    console.log(currentQuestions);
  }, [currentQuestions]);
  return (
    <Grid
      container
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "40px 0",
        overflow: "auto",
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
          question.type === "simple_choice" ||
          question.type === "multiple_choice"
        ) {
          return (
            <QuestionSimple
              questionTitle={question.title}
              questionType={question.type}
            >
              {question.description}
            </QuestionSimple>
          );
        }
        if (question.type === "slider") {
          return (
            <QuestionEchelle questionTitle={question.title}>
              {question.description}
            </QuestionEchelle>
          );
        }
      })}
    </Grid>
  );
};

export default Questions;
