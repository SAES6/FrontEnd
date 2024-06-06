import {
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { theme } from "../theme";
import { userActions } from "../_store/_slices/user-slice";
import usePOST from "../hooks/usePOST";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginModal = ({ open, handleClose }) => {
  const [response, setInitialRequest] = usePOST();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const themeLayout = useTheme(theme);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const responseTarget = response["login"];
    if (responseTarget?.status >= 200 && responseTarget?.status < 300) {
      dispatch(
        userActions.login({
          token: responseTarget.data.token,
          admin: responseTarget.data.user.principal,
        })
      );
      handleClose();
      navigate("/admin-console");
    }
  }, [response["login"]]);
  console.log("modal");
  const handleLogin = () => {
    setInitialRequest({
      id: "login",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
      authorization: { headers: { Authorization: "Bearer token" } },
      errorMessage: "Erreur lors de la connexion",
    });
  };
  return (
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
  );
};

export default LoginModal;
