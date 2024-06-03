import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid, Typography } from "@mui/material";

const Caroussel = ({ theme }) => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const themeCaroussel = theme;

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    },
    dot: {
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      backgroundColor: themeCaroussel.palette.secondary.main,
      margin: "0 5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease", // Transition for dot color
    },
    activeDot: {
      backgroundColor: themeCaroussel.palette.primary.main,
    },
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const textSteps = [
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "24px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "36px",
          mb: "5px",
        }}
      >
        Bienvenue !
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Dans un monde saturé d'informations, comprendre ce qui constitue une
        "information de valeur" peut varier grandement entre les professionnels
        de l'information et le grand public.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Ce projet, initié par l'IMSIC, vise à explorer ces perceptions diverses
        à travers une série de scénarios interactifs où vous, les participants,
        pouvez exprimer vos opinions et choix.
      </Typography>
    </Grid>,
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "24px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "36px",
          mb: "5px",
        }}
      >
        Comment ça marche ?
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Exprimez votre avis
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Sélectionnez les options qui reflètent le mieux votre opinion sur la
        valeur de l'information présentée dans chaque scénario.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Contribuez à la Recherche
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Vos réponses anonymes aideront les chercheurs à mieux comprendre les
        différences de perception entre les journalistes et le grand public.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Explorez des Scénarios
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Parcourez une série de dilemmes et de situations qui vous amèneront à
        réfléchir sur ce que vous considérez comme une information précieuse.
      </Typography>
    </Grid>,
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        mb: "5px",
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.text.main,
          fontSize: "24px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          lineHeight: "36px",
          mb: "5px",
        }}
      >
        Objectif de la Plateforme
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Cette plateforme a été conçue pour recueillir de manière anonyme vos
        réponses et opinions. Les données collectées seront utilisées pour
        analyser les tendances et les modèles dans la perception de la valeur de
        l'information.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.text.secondary,
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          lineHeight: "24px",
          mb: "5px",
        }}
      >
        Les résultats aideront à éclairer les pratiques des professionnels de
        l'information et à sensibiliser le public sur les critères qui
        influencent leur consommation d'informations.
      </Typography>
    </Grid>,
  ];

  return (
    <Grid
      item
      xs={6}
      md={6}
      sx={{
        pr: 2,
      }}
    >
      <AutoPlaySwipeableViews
        axis={"x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
        sli
        springConfig={{
          duration: "1.2s",
          easeFunction: "ease-out",
          delay: "0s",
        }}
      >
        {textSteps.map((step, index) => (
          <div key={index}>{step}</div>
        ))}
      </AutoPlaySwipeableViews>
      <div style={styles.container}>
        {Array.from({ length: maxSteps }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.dot,
              ...(i === activeStep ? styles.activeDot : {}),
            }}
            onClick={() => handleStepChange(i)}
          ></span>
        ))}
      </div>
    </Grid>
  );
};

export default Caroussel;
