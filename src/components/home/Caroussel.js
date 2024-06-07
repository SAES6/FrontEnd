import { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid, Stack, Typography } from '@mui/material';

const Caroussel = ({ theme }) => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const themeCaroussel = theme;

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep < maxSteps - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        setActiveStep(0);
      }
    }, 10000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount or when activeStep changes
  }, [activeStep, maxSteps]);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: themeCaroussel.palette.background.main75,
      margin: '0 5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    activeDot: {
      backgroundColor: themeCaroussel.palette.background.main,
    },
    text: {
      color: themeCaroussel.palette.background.main,
      fontSize: '16px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400,
      lineHeight: '24px',
      textAlign: 'justify',
      mb: '5px',
    },
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const textSteps = [
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        height: '100%',
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '24px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '36px',
          mb: '5px',
        }}
      >
        Bienvenue !
      </Typography>
      <Typography sx={styles.text}>
        Dans un monde saturé d'informations, comprendre ce qui constitue une
        "information de valeur" peut varier grandement entre les professionnels
        de l'information et le grand public.
      </Typography>
      <Typography sx={styles.text}>
        Ce projet, initié par l'IMSIC, vise à explorer ces perceptions diverses
        à travers une série de scénarios interactifs où vous, les participants,
        pouvez exprimer vos opinions et choix.
      </Typography>
    </Grid>,
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '24px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '36px',
          mb: '5px',
        }}
      >
        Comment ça marche ?
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '24px',
          mb: '5px',
        }}
      >
        Exprimez votre avis
      </Typography>
      <Typography sx={styles.text}>
        Sélectionnez les options qui reflètent le mieux votre opinion sur la
        valeur de l'information présentée dans chaque scénario.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '24px',
          mb: '5px',
        }}
      >
        Contribuez à la Recherche
      </Typography>
      <Typography sx={styles.text}>
        Vos réponses anonymes aideront les chercheurs à mieux comprendre les
        différences de perception entre les journalistes et le grand public.
      </Typography>
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '16px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '24px',
          mb: '5px',
        }}
      >
        Explorez des Scénarios
      </Typography>
      <Typography sx={styles.text}>
        Parcourez une série de dilemmes et de situations qui vous amèneront à
        réfléchir sur ce que vous considérez comme une information précieuse.
      </Typography>
    </Grid>,
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        mb: '5px',
      }}
    >
      <Typography
        sx={{
          color: themeCaroussel.palette.background.main,
          fontSize: '24px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '36px',
          mb: '5px',
        }}
      >
        Objectif de la Plateforme
      </Typography>
      <Typography sx={styles.text}>
        Cette plateforme a été conçue pour recueillir de manière anonyme vos
        réponses et opinions. Les données collectées seront utilisées pour
        analyser les tendances et les modèles dans la perception de la valeur de
        l'information.
      </Typography>
      <Typography sx={styles.text}>
        Les résultats aideront à éclairer les pratiques des professionnels de
        l'information et à sensibiliser le public sur les critères qui
        influencent leur consommation d'informations.
      </Typography>
    </Grid>,
  ];

  return (
    <Stack
      sx={{ backgroundColor: 'secondary.main', borderRadius: '15px' }}
      width={'100%'}
      padding={'20px 25px'}
    >
      <SwipeableViews
        axis={'x'}
        index={activeStep}
        enableMouseEvents
        interval={5000}
        springConfig={{
          duration: '1s',
          easeFunction: 'ease-out',
          delay: '0s',
        }}
      >
        {textSteps.map((step, index) => (
          <div key={index}>{step}</div>
        ))}
      </SwipeableViews>
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
    </Stack>
  );
};

export default Caroussel;
