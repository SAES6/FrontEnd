import React from 'react';
import { Grid, Modal, Typography, Checkbox, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const RoleModal = ({modalRole, userRole, handleSetJournalist, handleValidateRole, themeQuestions,}) => {
  return (
    <Modal open={modalRole}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          bgcolor: 'background.paper',
          borderRadius: '15px',
          padding: '20px 25px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='space-between'
          sx={{ mb: 3, width: '100%' }}
        >
          <Grid item xs={12}>
            <Typography
              variant='h6'
              component='h2'
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '36px',
                color: '#0E1419',
                textAlign: 'center',
              }}
            >
              Avant de commencer...
            </Typography>
          </Grid>
        </Grid>
        <Typography
          sx={{
            mt: 2,
            padding: '10px 15px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px',
            maxWidth: '500px',
          }}
        >
          Vous allez participer à votre premier questionnaire. Nous avons besoin
          d’en savoir plus sur votre statut.
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justifyContent='center'
          sx={{
            mt: 3,
            padding: '15px 20px',
            borderRadius: '15px',
            width: '60%',
            minWidth: '300px',
            position: 'relative',
            backgroundColor: themeQuestions.palette.primary.main,
            flexWrap: 'nowrap',
          }}
        >
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0',
            }}
          >
            <Checkbox
              checked={userRole === 'journalist'}
              onChange={() => handleSetJournalist()}
              icon={
                <CheckBoxOutlineBlankIcon
                  sx={{
                    color: themeQuestions.palette.primary.contrastText,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxIcon
                  sx={{
                    color: themeQuestions.palette.primary.contrastText,
                  }}
                />
              }
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '36px',
                padding: '0',
                mr: 1,
                color: themeQuestions.palette.primary.contrastText,
              }}
            />
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '36px',
                color: themeQuestions.palette.primary.contrastText,
              }}
            >
              Je suis journaliste
            </Typography>
          </Grid>
          <Grid
            sx={{
              position: 'absolute',
              right: -20, // Adjust position as needed
              alignItems: 'center',
              justifyContent: 'center',
              opacity: '0.5',
              height: '100%',
            }}
          >
            <FontAwesomeIcon
              icon='fa-solid fa-user-secret'
              color={themeQuestions.palette.primary.contrastText}
              style={{ fontSize: '70px' }}
            />
          </Grid>
        </Grid>
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px',
            maxWidth: '500px',
            textAlign: 'center',
            opacity: '0.5',
            color: themeQuestions.palette.text.secondary,
          }}
        >
          Nous comptons sur votre bonne foi !
        </Typography>
        <Button
          onClick={handleValidateRole}
          sx={{
            mt: 3,
          }}
          variant='contained'
        >
          Continuer
        </Button>
      </Grid>
    </Modal>
  );
};

export default RoleModal;
