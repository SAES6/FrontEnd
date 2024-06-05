import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Grid, Typography, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const SyntheseChoicesQuestionImage = ({
  question,
  theme,
  isJournalist,
  isUser,
  statTypeUser,
}) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJournalists, setTotalJournalists] = useState(0);

  useEffect(() => {
    setTotalJournalists(statTypeUser[0]?.total || 0);
    setTotalUsers(statTypeUser[1]?.total || 0);
  }, [statTypeUser]);

  const findCorrectResponseUsers = (choice_id) => {
    const response = question.stats?.others?.find(
      (res) => res.choice_id === choice_id
    );
    return response ? response.total : 0;
  };

  const findCorrectResponseJournalists = (choice_id) => {
    const response = question.stats?.journalists?.find(
      (res) => res.choice_id === choice_id
    );
    return response ? response.total : 0;
  };

  const calculatePercentage = (total, value) => {
    return (value / total) * 100;
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
              padding: "15px",
              pb: "0",
              alignItems: "flex-end",
              borderRadius: "15px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${choice.image_src})`,
            }}
          >
            {isUser && (
              <Grid
                sx={{
                  width: isJournalist ? "48%" : "98%",
                  display: "flex",
                  ml: "1%",
                  mr: "1%",
                  height: `${calculatePercentage(
                    totalUsers,
                    findCorrectResponseUsers(choice.id)
                  )}%`,
                  flexDirection: "column",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  backgroundColor: themeSynthese.palette.primary.main,
                  borderRadius: "15px 15px 0 0",
                  opacity: 0.85,
                  position: "relative",
                }}
              >
                <Grid
                  sx={{
                    position: "absolute",
                    width: "100%",
                    pt:
                      calculatePercentage(
                        totalUsers,
                        findCorrectResponseUsers(choice.id)
                      ) >= 50
                        ? "15px"
                        : 0,
                    top:
                      calculatePercentage(
                        totalUsers,
                        findCorrectResponseUsers(choice.id)
                      ) >= 50
                        ? "0"
                        : "-100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      calculatePercentage(
                        totalUsers,
                        findCorrectResponseUsers(choice.id)
                      ) >= 50
                        ? "space-between"
                        : "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-user"
                      fontSize={"20px"}
                      fixedWidth
                      color={themeSynthese.palette.primary.contrastText}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "24px",
                        fontWeight: "600",
                        lineHeight: "36px",
                        color: themeSynthese.palette.primary.contrastText,
                      }}
                    >
                      {findCorrectResponseUsers(choice.id)}
                    </Typography>
                  </Grid>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      visibility:
                        calculatePercentage(
                          totalUsers,
                          findCorrectResponseUsers(choice.id)
                        ) >= 1
                          ? "visible"
                          : "hidden",
                      color: themeSynthese.palette.primary.contrastText,
                    }}
                  >
                    {calculatePercentage(
                      totalUsers,
                      findCorrectResponseUsers(choice.id)
                    ).toFixed(2)}
                    %
                  </Typography>
                </Grid>
              </Grid>
            )}
            {isJournalist && (
              <Grid
                sx={{
                  width: isUser ? "48%" : "98%",
                  display: "flex",
                  ml: "1%",
                  mr: "1%",
                  height: `${calculatePercentage(
                    totalJournalists,
                    findCorrectResponseJournalists(choice.id)
                  )}%`,
                  flexDirection: "column",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  backgroundColor: themeSynthese.palette.secondary.main,
                  borderRadius: "15px 15px 0 0",
                  opacity: 0.85,
                  position: "relative",
                }}
              >
                <Grid
                  sx={{
                    position: "absolute",
                    width: "100%",
                    pt:
                      calculatePercentage(
                        totalJournalists,
                        findCorrectResponseJournalists(choice.id)
                      ) >= 50
                        ? "15px"
                        : 0,
                    top:
                      calculatePercentage(
                        totalJournalists,
                        findCorrectResponseJournalists(choice.id)
                      ) >= 50
                        ? "0"
                        : "-100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      calculatePercentage(
                        totalJournalists,
                        findCorrectResponseJournalists(choice.id)
                      ) >= 50
                        ? "space-between"
                        : "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-user-secret"
                      fontSize={"20px"}
                      fixedWidth
                      color={themeSynthese.palette.primary.contrastText}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "24px",
                        fontWeight: "600",
                        lineHeight: "36px",
                        color: themeSynthese.palette.primary.contrastText,
                      }}
                    >
                      {findCorrectResponseJournalists(choice.id)}
                    </Typography>
                  </Grid>
                  <Typography
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "24px",
                      fontWeight: "600",
                      lineHeight: "36px",
                      visibility:
                        calculatePercentage(
                          totalJournalists,
                          findCorrectResponseJournalists(choice.id)
                        ) >= 1
                          ? "visible"
                          : "hidden",
                      color: themeSynthese.palette.primary.contrastText,
                    }}
                  >
                    {calculatePercentage(
                      totalJournalists,
                      findCorrectResponseJournalists(choice.id)
                    ).toFixed(2)}
                    %
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default SyntheseChoicesQuestionImage;
