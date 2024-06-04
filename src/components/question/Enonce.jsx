import { Grid, Typography } from '@mui/material';

const Enonce = ({ children, imgSrc }) => {
  return (
    <Grid
      className='enonce'
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid className='' container spacing={2}>
        {imgSrc && (
          <Grid item xs={6}>
            <img
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '250px',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
              src={imgSrc}
              alt='image de la question'
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '24px',
              }}
            >
              Enoncé
            </Typography>
            {children}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Enonce;
