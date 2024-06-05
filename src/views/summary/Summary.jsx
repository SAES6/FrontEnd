import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/question/QuestionOpen";
import QuestionSimple from "../../components/question/QuestionSimple";
import QuestionEchelle from "../../components/question/QuestionEchelle";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGET from "../../hooks/useGET";
import { selectCurrentSelection } from "../../_store/_slices/questionnaire-slice";

const Summary = () => {
  const questionnaireState = useSelector(selectCurrentSelection);

  const [response, setRequest] = useGET();

  const [questions, setQuestions] = useState([]);

  const screenSize = useMediaQuery("(min-width:1600px)");
  const themeSummary = useTheme(theme);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setRequest({ url: `/questionnaire/loadById?id=${id}` });
  }, []);

  useEffect(() => {
    if (!questionnaireState || questionnaireState?.length === 0) navigate("/");
  }, [questionnaireState]);

  useEffect(() => {
    if (response?.status >= 200 || response?.status < 300) {
      setQuestions(response?.data);
    }
  }, [response]);

  const getResponseForQuestion = (questionId) => {
    const response = questionnaireState.responses?.find(
      (res) => res.questionId === questionId
    );
    return response ? response.value : "";
  };

  const handleFinishQuestionnaire = () => navigate("/");

  return (
    <Grid
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        padding: "50px 0",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Grid>
        {Object.entries(
          questions.reduce((sections, question) => {
            const section = question.section.order;
            if (!sections[section]) {
              sections[section] = [];
            }
            sections[section].push(question);
            return sections;
          }, {})
        ).map(([section, sectionQuestions]) => (
          <Grid
            key={section + 1}
            sx={{
              width: screenSize ? "1500px" : "1300px",
              padding: "20px 25px",
              border: "solid 1px",
              borderRadius: "15px",
              borderColor: themeSummary.palette.secondary.main,
              marginBottom: "40px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                width: "100%",
                textAlign: "center",
                paddingBottom: "15px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "600",
                color: themeSummary.palette.text.primary,
                borderBottom: "solid 1px",
                borderBottomColor: theme.palette.secondary.main,
                marginBottom: "10px",
              }}
            >
              Section {section}
            </Typography>
            {sectionQuestions.map((question) => (
              <React.Fragment key={question.id}>
                {question.type === "text" && (
                  <QuestionOpen
                    question={question}
                    mode={"summary"}
                    userResponse={getResponseForQuestion(question.id)}
                    preview={false}
                  />
                )}
                {(question.type === "single_choice" ||
                  question.type === "multiple_choice") && (
                  <QuestionSimple
                    question={question}
                    userResponse={getResponseForQuestion(question.id)}
                    mode={"summary"}
                    preview={false}
                  />
                )}
                {question.type === "slider" && (
                  <QuestionEchelle
                    question={question}
                    userResponse={getResponseForQuestion(question.id)}
                    mode={"summary"}
                    preview={false}
                  />
                )}
              </React.Fragment>
            ))}
          </Grid>
        ))}
        <Button onClick={handleFinishQuestionnaire} variant="contained">
          Terminer le formulaire
        </Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
