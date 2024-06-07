import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Stack,
  FormControl,
  Grid,
  TextField,
  Typography,
  colors,
} from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';

const NewQuiz = forwardRef((_, ref) => {
  const currentQuizInfos = useSelector((state) => state.quiz.currentQuizInfos);

  const [quizInfos, setQuizInfos] = useState({
    name: '',
    duree: 0,
    description: '',
  });

  useEffect(() => {
    if (currentQuizInfos)
      setQuizInfos({
        name: currentQuizInfos.name || '',
        duree: currentQuizInfos.duree || 0,
        description: currentQuizInfos.description || '',
      });
  }, [currentQuizInfos]);

  useImperativeHandle(ref, () => ({
    getData: () => quizInfos,
  }));

  return (
    <Stack sx={{ width: '100%' }}>
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          gap={1}
        >
          <FontAwesomeIcon
            icon='fa-solid fa-info-circle'
            fixedWidth
            opacity={0.6}
            fontSize={'20px'}
          />
          <Typography sx={{ fontWeight: '600', fontSize: '24px' }}>
            Informations générales
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: 'flex', justifyContent: 'flex-end', pl: 3, pr: 3 }}
        >
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TextField
              value={quizInfos.name}
              onChange={(e) =>
                setQuizInfos((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              fullWidth
              required
              placeholder='Nom du questionnaire'
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            pl: 3,
            alignItems: 'center',
          }}
          gap={2}
        >
          <Typography fontSize={'16px'} fontWeight={'600'}>
            Durée moyenne (min) :
          </Typography>
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100px',
            }}
          >
            <TextField
              value={quizInfos.duree}
              onChange={(e) =>
                setQuizInfos((prevState) => ({
                  ...prevState,
                  duree: e.target.value,
                }))
              }
              fullWidth
              type='number'
              inputProps={{ min: 0, max: 60 }}
              required
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', pl: 3 }}
        >
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TextField
              value={quizInfos.description}
              onChange={(e) =>
                setQuizInfos((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              fullWidth
              required
              placeholder='Description du questionnaire'
              size='small'
              multiline
            />
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
});

export default NewQuiz;
