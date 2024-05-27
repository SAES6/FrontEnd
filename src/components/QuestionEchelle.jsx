import { Grid, Typography, useMediaQuery, Slider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../theme";

const QuestionEchelle = ({ children, questionTitle, questionSliderMin, questionSliderMax, questionSliderGap, onResponseChange }) => {
  const themeQuestion = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const [sliderValue, setSliderValue] = useState(questionSliderMin);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    onResponseChange(newValue);
  };

  const generateMarks = (min, max, step) => {
    const marks = [];
    for (let i = min; i <= max; i += step) {
      marks.push({ value: i, label: i.toString() });
    }
    return marks;
  };

  const marks = generateMarks(questionSliderMin, questionSliderMax, questionSliderGap);

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
            icon="fa-solid fa-sliders"
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
            Echelle
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
        className="slider"
        sx={{
          width: "100%",
        }}
      >
        <Slider
          aria-label="Temperature"
          valueLabelDisplay="auto"
          value={sliderValue}
          onChange={handleSliderChange}
          step={questionSliderGap}
          marks={marks}
          min={questionSliderMin}
          max={questionSliderMax}
        />
      </Grid>
    </Grid>
  );
};

export default QuestionEchelle;