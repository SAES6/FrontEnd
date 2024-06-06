import React, { useEffect } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SyntheseGlobal = ({ statsTypeUser }) => {
  const themeSynthese = useTheme();

  const calculPourcentage = (item, stats) => {
    let total = null;
    for (let i = 0; i < stats.length; i++) {
      total += stats[i].total;
    }
    console.log("total", total);
    console.log("item", item);
    const percentage = (item.data / total) * 100;
    return percentage.toFixed(1);

    return percentage;
  };
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
  return (
    <React.Fragment>
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
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "36px",
            marginBottom: "10px",
            color: themeSynthese.palette.text.primary,
          }}
        >
          Synthèse
        </Typography>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
            borderTop: "solid 1px",
            borderColor: themeSynthese.palette.secondary.main,
            padding: "10px 15px",
            backgroundColor: "white",
            height: "100%", // Ajout de la hauteur
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              alignContent: "start",

              width: "25%",
              height: "100%",
            }}
          >
            <PieChart
              colors={graphColors}
              tooltip={false}
              series={[
                {
                  arcLabel: (item) =>
                    `${calculPourcentage(item, statsTypeUser)}%`,
                  arcLabelMinAngle: 45,
                  data: statsTypeUser.map((item) => ({
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
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: themeSynthese.palette.primary.contrastText,
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: "24px",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
              width={200}
              height={300} // Ajout de la hauteur
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              alignContent: "center",
              width: "75",
              height: "100%",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "48px",
                  fontWeight: "700",
                  lineHeight: "55,2px",
                  letterSpacing: "-5%",
                  color: themeSynthese.palette.primary.main,
                }}
              >
                {statsTypeUser[0]?.total + statsTypeUser[1]?.total}
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "36px",
                  ml: 1,
                  color: themeSynthese.palette.text.primary,
                }}
              >
                réponses
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                width: "100%",
                alignItems: "center",
                height: "100%",
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-user"
                fontSize="24px"
                fixedWidth
                color={themeSynthese.palette.secondary.main}
              />
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "36px",
                  color: themeSynthese.palette.secondary.main,
                }}
              >
                {statsTypeUser[1]?.total} Utilisateurs
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
              }}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-user-secret"
                fontSize="24px"
                fixedWidth
                color={themeSynthese.palette.primary.main}
              />
              <Typography
                sx={{
                  textAlign: "left",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "600",
                  lineHeight: "36px",
                  color: themeSynthese.palette.primary.main,
                }}
              >
                {statsTypeUser[0]?.total} Journalistes
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SyntheseGlobal;
