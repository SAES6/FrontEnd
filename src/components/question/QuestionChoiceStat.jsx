import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../theme';
import { useTheme } from '@mui/material/styles';

const QuestionChoiceStat = ({ userPercent, journalistPercent }) => {
  const themeStat = useTheme(theme);

  return (
    <Grid
      sx={{
        padding: '10px 15px',
        border: 'solid 1px',
        borderColor: themeStat.palette.secondary.main,
        gap: '5px',
        borderRadius: '15px',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <FontAwesomeIcon
          icon='fa-solid fa-user'
          style={{
            fontSize: '16px',
            color: themeStat.palette.primary.main,
          }}
        />
        <Typography
          sx={{
            marginLeft: '5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            fontWeight: '400',
            color: themeStat.palette.primary.main,
          }}
        >
          {userPercent}% des utilisateurs sont d’accord
        </Typography>
      </Grid>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <FontAwesomeIcon
          icon='fa-solid fa-user-secret'
          style={{
            fontSize: '16px',
            color: themeStat.palette.secondary.main,
          }}
        />
        <Typography
          sx={{
            marginLeft: '5px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            fontWeight: '400',
            color: themeStat.palette.secondary.main,
          }}
        >
          {journalistPercent}% des journalistes sont d’accord
        </Typography>
      </Grid>
    </Grid>
  );
};

export default QuestionChoiceStat;
