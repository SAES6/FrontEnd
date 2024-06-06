import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  Icon,
  Box,
} from '@mui/material';
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
import Logo from '../assets/logo.svg';

const FullLayout = () => {
  const token = useSelector((state) => state.user.token);

  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');

  const open = useSelector((state) => state.user.openLogin);

  const handleCloseLoginModal = () => {
    dispatch(userActions.closeLogin());
  };

  const goToAdminCoonsole = () => {
    navigate('/admin-console');
  };

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
              minHeight={'45px'}
            >
              <Box width={'35px'} height={'35px'} display={'flex'}>
                <img src={Logo} alt='Logo' />
              </Box>
              <Typography
                sx={{
                  ml: '5px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '20px',
                  fontWeight: '600',
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
              {token && (
                <ColorButton
                  variant='contained'
                  startIcon={
                    <FontAwesomeIcon icon='fa-fw fa-solid fa-user-tie' />
                  }
                  onClick={goToAdminCoonsole}
                >
                  Espace Admin
                </ColorButton>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Outlet />
        <LoginModal open={open} handleClose={handleCloseLoginModal} />
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(FullLayout);
