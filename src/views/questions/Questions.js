import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Questions = () => {
  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const [questions, setQuestions] = useState([]);
  // recupere l'id du questionnaire via l'url
  const id = window.location.pathname.split("/")[2];

  const loadQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaires/${id}`)
      .then((response) => {
        setQuestions(response.data.questions);
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
      <Grid>
        <Grid>
          <QuestionOpen>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga
          </QuestionOpen>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Questions;
