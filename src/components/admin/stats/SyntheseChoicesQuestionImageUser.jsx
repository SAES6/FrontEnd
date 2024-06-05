import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Grid, Typography, Box } from "@mui/material";

const SyntheseChoicesQuestionImageUser = ({
  question,
  theme,
  isJournalist,
  isUser,
  statTypeUser,
  userAnswer,
}) => {
  const checkIncludes = (userAnswer, choiceId) => {
    if (userAnswer) {
      return userAnswer.includes(choiceId);
    }
    return false;
  };

  const themeSynthese = theme;
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
      </Grid>
      <Grid
        container
        sx={{
          mt: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 éléments max par ligne
          gap: "10px", // écart de 10px entre les éléments
          width: "100%",
          height: "fit-content",
        }}
      >
        {question.question.choices.map((choice, index) => (
          <Grid
            item
            key={index}
            sx={{
              display: "flex",
              height: "200px",
              justifyContent: "space-between",

              alignItems: "flex-end",
              borderRadius: "15px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${choice.image_src})`,
            }}
          >
            {checkIncludes(userAnswer, choice.id) && (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "15px",
                  backgroundColor: themeSynthese.palette.secondary.main85,
                }}
              >
                <FontAwesomeIcon
                  fontSize={50}
                  icon={["fas", "check"]}
                  color={themeSynthese.palette.primary.contrastText}
                />
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default SyntheseChoicesQuestionImageUser;
