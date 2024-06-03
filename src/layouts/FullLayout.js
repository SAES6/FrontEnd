import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { theme } from "../theme";
import { toast } from "react-toastify";
import usePOST from "../hooks/usePOST";
import useGET from "../hooks/useGET";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../_store/_slices/user-slice";
import ColorButton from "../components/ColorButton";

const FullLayout = () => {
  const [response, setInitialRequest] = usePOST();

  const [responseCreateToken, setInitialRequestCreateToken] = useGET();

  const [responseMe, setInitialRequestMe] = useGET();

  const themeLayout = useTheme(theme);
  const screenSize = useMediaQuery("(min-width:1600px)");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const tokenUser = useSelector((state) => state.user.tokenUser);

  useEffect(() => {
      const responseTarget = response['login'];
      if (responseTarget?.status >= 200 && responseTarget?.status < 300) {
          dispatch(userActions.login(responseTarget.data.token));
          dispatch(userActions.setAdminPrincipal(responseTarget.data.user.principal));
          setOpen(false);
          handleInfos();
          navigate("/admin-console");
      }
  }, [response]);

  useEffect(() => {
    if (
      responseCreateToken?.status >= 200 &&
      responseCreateToken?.status < 300
    ) {
      dispatch(userActions.setTokenUser(responseCreateToken.data.token));
    } else {
      dispatch(userActions.removeTokenUser());
    }
  }, [responseCreateToken]);

  useEffect(() => {
    console.log(responseMe, "responseMe");
    if (responseMe?.status >= 200 && responseMe?.status < 300) {
      console.log(responseMe.data.principal, "responseMe.data.principal");
      dispatch(userActions.setAdminPrincipal(responseMe.data.principal));
      setIsAuthenticated(true);
    } else if(responseMe?.status >= 400) {
      dispatch(userActions.removeAdminPrincipal());
      dispatch(userActions.logout());
    }
  }, [responseMe]);

  useEffect(() => {
    const checkToken = async () => {
      const createToken = async () => {
        if (!tokenUser) {
          setInitialRequestCreateToken({
            url: "/createToken",
          });
        }
      };
      await createToken();
    };

    checkToken();
    handleInfos();
  }, []);

  const handleLogout = () => {
    dispatch(userActions.logout());
    dispatch(userActions.removeAdminPrincipal());
    toast.success("Vous avez été deconnecté", {
      position: "top-center",
      style: {
        fontFamily: "Poppins, sans-serif",
        borderRadius: "15px",
        textAlign: "center",
      },
    });
    // si je ne suis pas sur la page / je redirige vers la page /
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/acceuil"
    ) {
      navigate("/");
    }
  };

  const handleInfos = async () => {
    if (token) {
      setInitialRequestMe({
        url: "/me",
        authorization: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  };

  const handleLogin = () => {
      setInitialRequest({
          id: 'login',
          url: '/login',
          data: {
              email: email,
              password: password,
          },
          authorization: { headers: { Authorization: 'Bearer token' } },
          errorMessage: 'Erreur lors de la connexion'
      });
  };

  const handleOpen = () => {
    if (token) {
      navigate("/admin-console");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        sx={{
          flexWrap: "nowrap",
          filter: open ? "blur(5px)" : "none",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: themeLayout.palette.primary.main,
            width: "100%",
          }}
        >
          <Grid
            container
            alignItems="center"
            alignContent={"center"}
            justifyContent="space-between"
            sx={{
              maxWidth: screenSize ? "1500px" : "1300px",
              padding: "10px 0",
            }}
          >
            <Grid
              item
              container
              alignItems="center"
              xs={6}
              gap={1}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon
                icon="fa-solid fa-chart-pie"
                style={{
                  fontSize: "24px",
                  color: themeLayout.palette.primary.contrastText,
                }}
              />
              <Typography
                sx={{
                  marginLeft: "5px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1.2em",
                  fontWeight: "500",
                  letterSpacing: "-1px",
                  color: themeLayout.palette.primary.contrastText,
                }}
              >
                Informare Valorem
              </Typography>
            </Grid>
            <Grid item>
              {token && (
                <Button
                  variant="outlined"
                  color="background"
                  sx={{ marginRight: "10px" }}
                  startIcon={
                    <FontAwesomeIcon icon="fa-fw fa-solid fa-arrow-right-from-bracket" />
                  }
                  onClick={handleLogout}
                >
                  Deconnexion
                </Button>
              )}

              <ColorButton
                variant="contained"
                startIcon={
                  <FontAwesomeIcon icon="fa-fw fa-solid fa-user-tie" />
                }
                onClick={handleOpen}
              >
                Espace Admin
              </ColorButton>
            </Grid>
          </Grid>
        </Grid>
        <Outlet />
        <Modal open={open} onClose={handleClose}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              bgcolor: "background.paper",
              borderRadius: "15px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3, width: "100%" }}
            >
              <Grid item xs={2} />
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "36px",
                    color: "#0E1419",
                    textAlign: "center",
                  }}
                >
                  Identifiez-vous
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Identifiant
              </Typography>
              <TextField
                margin="normal"
                required
                placeholder="Votre adresse email"
                sx={{
                  width: "400px",
                  mt: "5px",
                  borderRadius: "15px",
                  border: "1px solid",
                  borderColor: themeLayout.palette.secondary.main,
                  input: {
                    padding: "10px 15px",
                    border: "none",
                    color: themeLayout.palette.text.secondary,
                    fontWeight: "400",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                  },
                  fieldset: {
                    border: "none",
                  },
                }}
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Mot de passe
              </Typography>
              <TextField
                margin="normal"
                required
                sx={{
                  mt: "5px",
                  width: "400px",
                  borderRadius: "15px",
                  border: "1px solid",
                  borderColor: themeLayout.palette.secondary.main,
                  input: {
                    padding: "10px 15px",
                    border: "none",
                    fontWeight: "400",
                    color: themeLayout.palette.text.secondary,
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                  },
                }}
                type="password"
                placeholder="Votre mot de passe"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                onClick={handleLogin}
              >
                Connexion
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    </ThemeProvider>
  );
};

export default FullLayout;
