import React, { useEffect, useState } from 'react';
import { PieChart, BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { Grid, Typography, Box } from '@mui/material';
import { theme } from '../../../theme';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import SyntheseGlobal from './SyntheseGlobal';

const Synthese = () => {
  const themeSynthese = useTheme(theme);
  const [statsTypeUser, setStatsTypeUser] = useState([]);
  const [statsQuestion, setStatsQuestion] = useState([]);
  var id = 1;
  const loadStatsTypeUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/${id}`)
      .then((response) => {
        console.log('Response data:', response.data); // Log pour tester
        setStatsTypeUser(response.data.statsTypeUser);
        setStatsQuestion(response.data.statsQuestions);
      })
      .catch(() => {
        toast.error('Aucune stats', {
          position: 'top-center',
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '15px',
            textAlign: 'center',
          },
        });
      });
  };

  useEffect(() => {
    loadStatsTypeUser();
  }, [id]);
  console.log({ statsTypeUser });

  return (
    <React.Fragment>
      <SyntheseGlobal statsTypeUser={statsTypeUser} />
      {statsQuestion.map(
        (question, index) =>
          ['single_choice', 'multiple_choice'].includes(
            question.question.type
          ) && (
            <Grid
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'white',
                borderRadius: 2,
                border: 'solid 1px #A5C2D7',
                width: 1100,
                margin: '20px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h4'
                component='h2'
                gutterBottom
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '36px',
                  color: themeSynthese.palette.text.primary,
                }}
              >
                Question {index + 1}
              </Typography>

              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  borderTop: 'solid 1px #A5C2D7',
                  padding: 2,
                  backgroundColor: 'white',
                  height: '520px', // Ajout de la hauteur
                }}
              >
                <Typography variant='h6' sx={{ textAlign: 'left' }}>
                  Enoncé
                </Typography>
                <Typography variant='p' sx={{ textAlign: 'left' }}>
                  {question.question.title}
                </Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    padding: 2,
                    backgroundColor: 'white',
                    height: '520px', // Ajout de la hauteur
                  }}
                >
                  <Box>
                    <Typography variant='h6'>Journalistes</Typography>
                    <PieChart
                      series={[
                        {
                          arcLabel: (item) => `${item.value}`,
                          arcLabelMinAngle: 45,
                          data: question.stats.journalists.map((item) => ({
                            label: `Choice ${item.choice_id}`,
                            value: item.total,
                          })),
                          innerRadius: 50,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 300,
                        },
                      ]}
                      sx={{
                        [`& .${question.stats.journalists
                          .map((item) => item.total)
                          .join(', ')}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      width={400}
                      height={400} // Ajout de la hauteur
                    />
                  </Box>
                  <Box>
                    <Typography variant='h6'>Other</Typography>
                    <PieChart
                      series={[
                        {
                          arcLabel: (item) => `${item.value}`,
                          arcLabelMinAngle: 45,
                          data: question.stats.others.map((item) => ({
                            label: `Choice ${item.choice_id}`,
                            value: item.total,
                          })),
                          innerRadius: 50,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 300,
                        },
                      ]}
                      sx={{
                        [`& .${question.stats.others
                          .map((item) => item.total)
                          .join(', ')}`]: {
                          fill: 'white',
                          fontWeight: 'bold',
                        },
                      }}
                      width={400}
                      height={400} // Ajout de la hauteur
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )
      )}
      {statsQuestion.map(
        (question, index) =>
          ['slider'].includes(question.question.type) && (
            <Grid
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'white',
                borderRadius: 2,
                border: 'solid 1px #A5C2D7',
                width: 1100,
                margin: '20px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h4'
                component='h2'
                gutterBottom
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '36px',
                  color: themeSynthese.palette.text.primary,
                }}
              >
                Question {index + 1}
              </Typography>

              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  borderTop: 'solid 1px #A5C2D7',
                  padding: 2,
                  backgroundColor: 'white',
                  height: '520px', // Ajout de la hauteur
                }}
              >
                <Typography variant='h6' sx={{ textAlign: 'left' }}>
                  Enoncé
                </Typography>
                <Typography variant='p' sx={{ textAlign: 'left' }}>
                  {question.question.title}
                </Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    padding: 2,
                    backgroundColor: 'white',
                    height: '520px', // Ajout de la hauteur
                  }}
                >
                  <Box>
                    <Typography variant='h6'>Moyenne Journalistes</Typography>
                    <Gauge
                      value={question.stats.journalists.mean}
                      startAngle={-110}
                      endAngle={110}
                      valueMax={question.question.slider_max}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: 'translate(0px, 0px)',
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      width={200}
                      height={200} // Ajout de la hauteur
                    />
                  </Box>

                  <Box>
                    <Typography variant='h6'>Médiane Journalistes</Typography>
                    <Gauge
                      value={question.stats.journalists.median}
                      valueMax={question.question.slider_max}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: 'translate(0px, 0px)',
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      width={200}
                      height={200} // Ajout de la hauteur
                    />
                  </Box>
                  <Box>
                    <Typography variant='h6'>Moyenne Other</Typography>
                    <Gauge
                      value={question.stats.others.mean}
                      valueMax={question.question.slider_max}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: 'translate(0px, 0px)',
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      width={200}
                      height={200} // Ajout de la hauteur
                    />
                  </Box>

                  <Box>
                    <Typography variant='h6'>Médiane Other</Typography>
                    <Gauge
                      value={question.stats.others.median}
                      valueMax={question.question.slider_max}
                      startAngle={-110}
                      endAngle={110}
                      sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                          transform: 'translate(0px, 0px)',
                        },
                      }}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                      width={200}
                      height={200} // Ajout de la hauteur
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )
      )}
      {statsQuestion.map(
        (question, index) =>
          ['text'].includes(question.question.type) && (
            <Grid
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'white',
                borderRadius: 2,
                border: 'solid 1px #A5C2D7',
                width: 1100,
                margin: '20px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h4'
                component='h2'
                gutterBottom
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '24px',
                  fontWeight: '600',
                  lineHeight: '36px',
                  color: themeSynthese.palette.text.primary,
                }}
              >
                Question {index + 1}
              </Typography>

              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  borderTop: 'solid 1px #A5C2D7',
                  padding: 2,
                  backgroundColor: 'white',
                  height: '520px', // Ajout de la hauteur
                }}
              >
                <Typography variant='h6' sx={{ textAlign: 'left' }}>
                  Enoncé
                </Typography>
                <Typography variant='p' sx={{ textAlign: 'left' }}>
                  {question.question.title}
                </Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    padding: 2,
                    backgroundColor: 'white',
                    height: '520px', // Ajout de la hauteur
                  }}
                >
                  <Box>
                    <Typography variant='h6'>Journalistes</Typography>
                    {question.stats.journalists.responses.map(
                      (item) =>
                        'User ' + item.user_token + ' : ' + item.response_text
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )
      )}
    </React.Fragment>
  );
};

export default Synthese;
