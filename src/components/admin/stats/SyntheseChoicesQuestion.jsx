import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Grid, Typography, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useCallback } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const SyntheseChoicesQuestion = ({
  question,
  theme,
  filterType,
  isJournalist,
  isUser,
}) => {
  const themeSynthese = theme;

  const graphColors = [
    "#0D5282",
    "#76A4C5",
    "#A5C2D7",
    "#276793",
    "#82ACCA",
    "#427BA4",
    "#8EB3CE",
    "#5C90B4",
    "#99BBD3",
  ];

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
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {isUser && (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                width: !isJournalist ? "100%" : "45%",
                height: "fit-content",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  mt: "20px",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "fit-content",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-fw fa-solid fa-user"
                  fixedWidth
                  fontSize={16}
                  color={themeSynthese.palette.text.secondary}
                />

                <Typography
                  sx={{
                    ml: "5px",

                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    color: themeSynthese.palette.text.primary,
                  }}
                >
                  Utilisateurs
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  width: "100%",
                  height: "100%",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40%",
                    height: "100%",
                    fontFamily: "Poppins, sans-serif",
                    textOverflow: "ellipsis",
                  }}
                >
                  <PieChart
                    tooltip={false}
                    colors={graphColors}
                    series={[
                      {
                        arcLabel: (item) =>
                          `${calculPourcentage(item, question.stats.others)}%`,
                        arcLabelMinAngle: 45,
                        data: question.stats.others.map((item) => ({
                          value: item.total,
                        })),
                        innerRadius: 2,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 300,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: themeSynthese.palette.primary.contrastText,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "24px",
                        fontFamily: "Poppins, sans-serif",
                      },
                    }}
                    margin={{ right: 0 }}
                    height={250}
                    width={205}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    marginLeft: "10px",
                    textAlign: "left",
                    width: "60%",
                    height: "100%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {question.stats.others.map((item, index) => (
                    <Grid
                      container
                      key={index}
                      sx={{
                        mt: "10px",
                        mb: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        width: "100%",
                        height: "100%",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <Grid item xs={1}>
                        <FontAwesomeIcon
                          icon="fa-fw fa-solid fa-square"
                          fixedWidth
                          fontSize={16}
                          color={
                            index < 9
                              ? graphColors[index]
                              : graphColors[index - 9]
                          }
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: themeSynthese.palette.text.primary,
                            textOverflow: "ellipsis",
                            textWrap: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {item.choice_text}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          sx={{
                            textAlign: "right",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "24px",
                            color: themeSynthese.palette.text.secondary,
                          }}
                        >
                          {item.total}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {isJournalist && (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                width: !isUser ? "100%" : "45%",
                height: "fit-content",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "20px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-user-secret"
                  fixedWidth
                  fontSize={16}
                  color={themeSynthese.palette.text.secondary}
                />

                <Typography
                  sx={{
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    color: themeSynthese.palette.text.primary,
                  }}
                >
                  Journalistes
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "start",
                  width: "100%",
                  height: "100%",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40%",
                    height: "100%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <PieChart
                    tooltip={false}
                    colors={graphColors}
                    series={[
                      {
                        arcLabel: (item) =>
                          `${calculPourcentage(
                            item,
                            question.stats.journalists
                          )}%`,
                        arcLabelMinAngle: 45,
                        data: question.stats.journalists.map((item) => ({
                          value: item.total,
                        })),
                        innerRadius: 2,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 300,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: themeSynthese.palette.primary.contrastText,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "24px",
                        fontFamily: "Poppins, sans-serif",
                      },
                    }}
                    margin={{ right: 0 }}
                    height={250}
                    width={205}
                  />
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    marginLeft: "10px",
                    textAlign: "left",
                    width: "60%",
                    height: "100%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {question.stats.journalists.map((item, index) => (
                    <Grid
                      container
                      key={index}
                      sx={{
                        display: "flex",
                        mt: "10px",
                        mb: "10px",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                        width: "100%",
                        height: "100%",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      <Grid item xs={1}>
                        <FontAwesomeIcon
                          icon="fa-fw fa-solid fa-square"
                          fixedWidth
                          fontSize={16}
                          color={
                            index < 9
                              ? graphColors[index]
                              : graphColors[index - 9]
                          }
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: themeSynthese.palette.text.primary,
                            textOverflow: "ellipsis",
                            textWrap: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {item.choice_text}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          sx={{
                            textAlign: "right",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "24px",
                            color: themeSynthese.palette.text.secondary,
                          }}
                        >
                          {item.total}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SyntheseChoicesQuestion;
