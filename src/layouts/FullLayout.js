import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { theme } from "../theme";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.contrastText,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

const FullLayout = () => {
  const themeLayout = useTheme(theme);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`${process.env.REACT_APP_API_URL}/me`)
        .then((response) => {
          if (response.data) {
            setIsAuthenticated(true);
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    }
  }, []);

  const handleLogin = () => {
    console.log(process.env.REACT_APP_API_URL);
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        setIsAuthenticated(true);
        setOpen(false);
        navigate("/admin-console");
      });
  };

  const handleOpen = () => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/admin-console");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        sx={{
          width: "80vw",
          height: "50px",
          backgroundColor: themeLayout.palette.primary.main,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            color: theme.palette.primary.contrastText,
          }}
        >
          <QueryStatsIcon />
          <Typography
            sx={{
              marginLeft: "5px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.2em",
              fontWeight: "500",
              letterSpacing: "-1px",
            }}
          >
            Informare Valorem
          </Typography>
        </Box>
        <ColorButton
          variant="contained"
          startIcon={<SupervisorAccountIcon />}
          onClick={handleOpen}
        >
          Espace Admin
        </ColorButton>
      </Box>
      <Outlet />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
            Connexion Admin
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Connexion
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default FullLayout;
