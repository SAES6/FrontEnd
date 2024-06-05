import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gauge, gaugeClasses } from "@mui/x-charts";
const SyntheseSlider = ({ question, theme, isJournalist, isUser }) => {
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
                  mt: "20px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "48%",
                    ml: "1%",
                    mr: "1%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Gauge
                    value={question.stats.others.mean}
                    startAngle={-90}
                    endAngle={90}
                    outerRadius={100}
                    cornerRadius={5}
                    valueMax={question.question.slider_max}
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 24,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        textAnchor: "middle", // Pour centrer horizontalement
                        dominantBaseline: "middle", // Pour centrer verticalement
                      },
                      width: "100%",
                    }}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    width={200}
                    height={130} // Ajout de la hauteur
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeSynthese.palette.text.secondary,
                    }}
                  >
                    Moyenne
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "48%",
                    ml: "1%",
                    mr: "1%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Gauge
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 24,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                      },
                      width: "100%",
                    }}
                    cornerRadius={5}
                    value={question.stats.others.median}
                    valueMax={question.question.slider_max}
                    startAngle={-90}
                    endAngle={90}
                    outerRadius={100}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    width={200}
                    height={130} // Ajout de la hauteur
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeSynthese.palette.text.secondary,
                    }}
                  >
                    Médiane
                  </Typography>
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
                  mt: "20px",
                  justifyContent: "start",
                  width: "100%",
                  height: "100%",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "48%",
                    ml: "1%",
                    mr: "1%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Gauge
                    cornerRadius={5}
                    value={question.stats.journalists.mean}
                    startAngle={-90}
                    endAngle={90}
                    outerRadius={100}
                    valueMax={question.question.slider_max}
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 24,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                      },
                      width: "100%",
                    }}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    width={200}
                    height={130} // Ajout de la hauteur
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeSynthese.palette.text.secondary,
                    }}
                  >
                    Moyenne
                  </Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "48%",
                    ml: "1%",
                    mr: "1%",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <Gauge
                    sx={{
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 24,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                      },
                      width: "100%",
                    }}
                    cornerRadius={5}
                    value={question.stats.journalists.median}
                    valueMax={question.question.slider_max}
                    startAngle={-90}
                    endAngle={90}
                    outerRadius={100}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    width={200}
                    height={130} // Ajout de la hauteur
                  />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: themeSynthese.palette.text.secondary,
                    }}
                  >
                    Médiane
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SyntheseSlider;
