import React, { useState } from 'react';
import { Grid, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../theme';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_store/_slices/user-slice';
import ColorButton from '../components/ColorButton';
import LoginModal from './LoginModal';

const FullLayout = () => {
  const token = useSelector((state) => state.user.token);

  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log('layout');

  const handleLogout = () => {
    dispatch(userActions.logout());
    toast.success('Vous avez été deconnecté', {
      position: 'top-center',
      style: {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '15px',
        textAlign: 'center',
      },
    });
    // si je ne suis pas sur la page / je redirige vers la page /
    if (
      window.location.pathname !== '/' &&
      window.location.pathname !== '/acceuil'
    )
      navigate('/');
  };

  const handleOpen = () => {
    if (token) navigate('/admin-console');
    else setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction='column'
        sx={{
          flexWrap: 'nowrap',
          filter: open ? 'blur(5px)' : 'none',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          sx={{
            backgroundColor: themeLayout.palette.primary.main,
            width: '100%',
          }}
        >
          <Grid
            container
            alignItems='center'
            alignContent={'center'}
            justifyContent='space-between'
            sx={{
              maxWidth: screenSize ? '1500px' : '1300px',
              padding: '10px 0',
            }}
          >
            <Grid
              item
              container
              alignItems='center'
              xs={6}
              gap={1}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <FontAwesomeIcon
                icon='fa-solid fa-chart-pie'
                style={{
                  fontSize: '24px',
                  color: themeLayout.palette.primary.contrastText,
                }}
              />
              <Typography
                sx={{
                  marginLeft: '5px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.2em',
                  fontWeight: '500',
                  letterSpacing: '-1px',
                  color: themeLayout.palette.primary.contrastText,
                }}
              >
                Informare Valorem
              </Typography>
            </Grid>
            <Grid item>
              {token && (
                <Button
                  variant='outlined'
                  color='background'
                  sx={{ marginRight: '10px' }}
                  startIcon={
                    <FontAwesomeIcon icon='fa-fw fa-solid fa-arrow-right-from-bracket' />
                  }
                  onClick={handleLogout}
                >
                  Deconnexion
                </Button>
              )}

              <ColorButton
                variant='contained'
                startIcon={
                  <FontAwesomeIcon icon='fa-fw fa-solid fa-user-tie' />
                }
                onClick={handleOpen}
              >
                Espace Admin
              </ColorButton>
            </Grid>
          </Grid>
        </Grid>
        <Outlet />
        <LoginModal open={open} setOpen={setOpen} />
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(FullLayout);
