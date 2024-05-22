import {
  Grid,
  Typography,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../theme";

const QuestionSimple = ({ children, questionTitle, questionType, questionChoices }) => {
  const themeQuestion = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  console.log(questionChoices)

  return (
    <Grid
      className="question"
      container
      sx={{
        width: screenSize ? "1500px" : "1300px",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        gap: "10px",
        padding: "10px 0",
      }}
    >
      <Grid
        className="first-row"
        sx={{
          width: "100%",
          height: "56px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "36px",
            color: themeQuestion.palette.text.primary,
          }}
        >
          {questionTitle}
        </Typography>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-bullseye"
            style={{ opacity: "0.5" }}
          />
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "24px",
              marginLeft: "5px",
              color: themeQuestion.palette.text.primary,
            }}
          >
            Choix {questionType === "simple_choice" ? "simple" : "multiple"}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className="enonce"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "24px",
            color: themeQuestion.palette.text.primary,
          }}
        >
          Enoncé
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "24px",
            color: themeQuestion.palette.text.primary,
          }}
        >
          {children}
        </Typography>
      </Grid>
      <Grid
        className="choices"
        sx={{
          width: "100%",
        }}
      >
        <FormGroup>
          {questionChoices.map((choice) => (
            <FormControlLabel
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "24px",
                  color: themeQuestion.palette.text.primary,
                },
              }}
              control={<Checkbox />}
              label={choice.text}
            />
          ))
          }
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default QuestionSimple;
