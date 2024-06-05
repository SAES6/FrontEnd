import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const SyntheseChoicesQuestionUser = ({
  question,
  theme,
  filterType,
  isJournalist,
  isUser,
  userAnswer,
}) => {
  const themeSynthese = theme;

  const calculPourcentage = (item, stats) => {
    let total = null;
    for (let i = 0; i < stats.length; i++) {
      total += stats[i].total;
    }
    console.log("total", total);
    console.log("item", item);
    const percentage = (item.value / total) * 100;
    return percentage.toFixed(1);
  };

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
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "20px",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          {question.question.choices.map((choice) => {
            return (
              <Grid item xs={12} key={choice.id}>
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",
                      color: themeSynthese.palette.text.primary,
                    },
                  }}
                  control={
                    <Checkbox checked={userAnswer.includes(choice.id)} />
                  }
                  label={choice.text}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SyntheseChoicesQuestionUser;
