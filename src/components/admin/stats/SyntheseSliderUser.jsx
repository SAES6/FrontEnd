import React, { useEffect, useState } from "react";
import { Grid, Slider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gauge, gaugeClasses } from "@mui/x-charts";
const SyntheseSliderUser = ({
  question,
  theme,
  isJournalist,
  isUser,
  userAnswer,
}) => {
  const themeSynthese = theme;
  const generateMarks = (min, max, step) => {
    const marks = [];
    for (let i = min; i <= max; i += step) {
      marks.push({ value: i, label: i.toString() });
    }
    return marks;
  };

  const marks = generateMarks(
    question.question.slider_min,
    question.question.slider_max,
    question.question.slider_gap
  );

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        border: "solid 1px",
        borderColor: themeSynthese.palette.secondary.main,
        width: "100%",
        height: "fit-content",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "36px",
          marginBottom: "10px",
          color: themeSynthese.palette.text.primary,
        }}
      >
        {question.question.title}
      </Typography>

      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          borderTop: "solid 1px",
          paddingTop: "20px",
          borderColor: themeSynthese.palette.secondary.main,
          height: "fit-content",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {question.question.img_src != null && (
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  borderRadius: "15px",
                  objectFit: "cover",
                }}
                src={question.question.img_src}
              ></img>
            </Grid>
          )}
          <Grid
            item
            xs={question.question.img_src != null ? 6 : 12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              alignSelf: "baseline",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",

                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "36px",
                color: themeSynthese.palette.text.primary,
              }}
            >
              Énoncé
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                mt: "10px",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                color: themeSynthese.palette.text.primary,
              }}
            >
              {question.question.description}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          sx={{
            mt: "20px",
            mb: "20px",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Slider
            aria-label="Temperature"
            valueLabelDisplay="auto"
            value={userAnswer}
            step={question.question.slider_gap}
            marks={marks}
            min={question.question.slider_min}
            max={question.question.slider_max}
            sx={{
              "&.MuiSlider-root": {
                pointerEvents: "none !important",
              },
              "&.MuiSlider-thumb": {
                pointerEvents: "none !important",
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SyntheseSliderUser;
