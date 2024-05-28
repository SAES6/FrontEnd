import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import axios from "axios";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));
const AdminGestion = () => {
  const screenSize = useMediaQuery("(min-width:1600px)");
  const themeGestion = useTheme(theme);
  const [adminsList, setAdminsList] = useState([]);

  useEffect(() => {
    loadAdminsList();
  }, []);

  useEffect(() => {
    if (adminsList.length === 0) return;
    if (adminsList.length > 0 && adminsList[0].principal === true) return;
    const sortedAdmins = adminsList.sort((a, b) => {
      if (a.principal === true) {
        return -1;
      } else {
        return 1;
      }
    });
    setAdminsList(sortedAdmins);
  }, [adminsList]);

  const loadAdminsList = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admins/list`)
      .then((response) => {
        setAdminsList(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Aucun administrateur", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  return (
    <Grid
      container
      sx={{
        maxWidth: screenSize ? "1500px" : "1300px",
        height: "100%",
        width: "100%",
        alignItems: "start",
        justifyContent: "center",
        alignContent: "start",
        mt: "30px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          alignContent: "start",
        }}
      >
        <ColorButton
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            opacity: "75%",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-list"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: themeGestion.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: themeGestion.palette.text.primary,
            }}
          >
            Gestion des questionnaires
          </Typography>
        </ColorButton>
        <ColorButton
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            opacity: "75%",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-chart-pie"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: themeGestion.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: themeGestion.palette.text.primary,
            }}
          >
            Statistiques
          </Typography>
        </ColorButton>
        <ColorButton
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            borderRadius: "10px",
            padding: "10px 15px",
            mr: "10px",
          }}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-user-tie"
            style={{
              fontSize: "16px",
              marginRight: "10px",
              color: themeGestion.palette.text.primary,
            }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              lineHeight: "24px",
              textAlign: "center",
              textTransform: "none",
              color: themeGestion.palette.text.primary,
            }}
          >
            Gestion admin
          </Typography>
        </ColorButton>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          alignContent: "start",
          mt: "20px",
        }}
      >
        {adminsList.length > 0 &&
          adminsList.map((admin, index) => {
            return (
              <Grid
                container
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  alignContent: "start",
                  width: "400px",
                  height: "fit-content",
                  borderRadius: "15px",
                  backgroundColor:
                    admin.principal == true
                      ? themeGestion.palette.primary.main
                      : "transparent",
                  mt: "10px",
                  mr: "10px",
                  p: "20px",
                  border: admin.principal == true ? "none" : "1px solid",
                  borderColor: themeGestion.palette.secondary.main,
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "fit-content",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    value={admin.username}
                    onChange={(e) => {
                      let newAdminsList = [...adminsList];
                      newAdminsList[index].username = e.target.value;
                      setAdminsList(newAdminsList);
                    }}
                    sx={{
                      width: "100%",
                      borderRadius: "15px",
                      border: "1px solid",
                      borderColor: themeGestion.palette.secondary.main,
                      input: {
                        padding: "10px 15px",
                        border: "none",
                        color:
                          admin.principal == true
                            ? themeGestion.palette.primary.contrastText
                            : themeGestion.palette.secondary.contrastText,
                        fontWeight: "600",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "24px",
                      },
                      fieldset: {
                        border: "none",
                      },
                    }}
                  />
                  {admin.principal == false && (
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        padding: "10px 20px",

                        marginLeft: "10px",
                        borderRadius: "15px",
                        border: "1px solid",
                        borderColor: themeGestion.palette.secondary.main,
                      }}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash-can"
                        style={{
                          fontSize: "24px",
                          opacity: "50%",
                          color: themeGestion.palette.secondary.contrastText,
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "center",
                    textTransform: "none",
                    color:
                      admin.principal == true
                        ? themeGestion.palette.primary.contrastText
                        : themeGestion.palette.secondary.contrastText,
                    mt: "10px",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  value={admin.email}
                  onChange={(e) => {
                    let newAdminsList = [...adminsList];
                    newAdminsList[index].email = e.target.value;
                    setAdminsList(newAdminsList);
                  }}
                  sx={{
                    width: "100%",
                    borderRadius: "15px",
                    border: "1px solid",
                    mt: "10px",
                    borderColor: themeGestion.palette.secondary.main,
                    input: {
                      padding: "10px 15px",
                      border: "none",
                      color:
                        admin.principal == true
                          ? themeGestion.palette.primary.contrastText
                          : themeGestion.palette.secondary.contrastText,
                      fontWeight: "400",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                    },
                    fieldset: {
                      border: "none",
                    },
                  }}
                ></TextField>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "center",
                    textTransform: "none",
                    color:
                      admin.principal == true
                        ? themeGestion.palette.primary.contrastText
                        : themeGestion.palette.secondary.contrastText,
                    mt: "10px",
                  }}
                >
                  Mot de passe
                </Typography>
                <TextField
                  value={admin.password}
                  onChange={(e) => {
                    let newAdminsList = [...adminsList];
                    newAdminsList[index].password = e.target.value;
                    setAdminsList(newAdminsList);
                  }}
                  sx={{
                    width: "100%",
                    borderRadius: "15px",
                    border: "1px solid",
                    mt: "10px",
                    borderColor: themeGestion.palette.secondary.main,
                    input: {
                      padding: "10px 15px",
                      border: "none",
                      color:
                        admin.principal == true
                          ? themeGestion.palette.primary.contrastText
                          : themeGestion.palette.secondary.contrastText,
                      fontWeight: "400",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                    },
                    fieldset: {
                      border: "none",
                    },
                  }}
                ></TextField>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default AdminGestion;
