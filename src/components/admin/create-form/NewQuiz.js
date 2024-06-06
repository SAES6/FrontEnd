import {
  Card,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const FormattedTextField = ({ handleChange, placeholder, value, ...props }) => {
  return (
    <Grid
      item
      {...props}
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
          value={value}
          onChange={handleChange}
          fullWidth
          required
          placeholder={placeholder}
        />
      </FormControl>
    </Grid>
  );
};

const NewQuiz = ({ setQuizInfos, quizInfos }) => {
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
        >
          <Typography variant='h5' sx={{ fontWeight: 'bold', pl: 2, mb: 2 }}>
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
              onChange={(e) => setQuizInfos(e.target.value, null, null)}
              fullWidth
              required
              placeholder='Nom du questionnaire'
            />
          </FormControl>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{ display: 'flex', justifyContent: 'flex-end', pl: 3, pr: 3 }}
        >
          <Typography>Durée moyenne (min) :</Typography>
        </Grid>
        <Grid
          item
          xs={2}
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
              value={quizInfos.duree}
              onChange={(e) => setQuizInfos(null, e.target.value, null)}
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
              value={quizInfos.description}
              onChange={(e) => setQuizInfos(null, null, e.target.value)}
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
};

export default NewQuiz;
