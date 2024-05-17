import { Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Home = () => {
  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");

  // load the questionnaires from the API
  const [questionnaires, setQuestionnaires] = useState([]);

  const loadQuestionnaires = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/questionnaire/byToken?token=${localStorage.getItem("token_access")}`
      )
      .then((response) => {
        setQuestionnaires(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        spacing={2}
        sx={{
          height: "fit-content",
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
          mt: 0,
        }}
      >
        <Grid item xs={6} md={6} sx={{}}>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "64px",
              fontWeight: "700",
              lineHeight: "1.2",
              letterSpacing: "-2px",
            }}
          >
            Projet Informare Valorem
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "300",
              letterSpacing: "-1px",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            height: "350px",
            backgroundColor: themeLayout.palette.secondary.main,
            borderRadius: "20px",
          }}
        />
      </Grid>
      <Grid
        container
        gap={2}
        sx={{
          mt: "50px",
          overflow: "auto",
          maxHeight: "300px",
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        {questionnaires.map((questionnaire) => (
          <Grid>
            <ColorButton
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
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              variant="contained"
            >
              <Grid>
                <Typography
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "24px",
                    fontWeight: "600",
                    lineHeight: "36px",
                    color: themeLayout.palette.primary.contrastText,
                    overflowWrap: "break-word",
                    textTransform: "none",
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
                }}
              >
                {questionnaire.description}
              </Typography>
              <Grid>
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
              <Grid>
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
            </ColorButton>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
