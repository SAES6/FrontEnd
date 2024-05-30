import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  IconButton,
  TextField,
  InputAdornment,
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
import { CoPresent } from "@mui/icons-material";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  transition: "ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AdminGestion = () => {
  const screenSize = useMediaQuery("(min-width:1600px)");
  const screenHeight = useMediaQuery("(min-height:900px)");
  const themeGestion = useTheme(theme);
  const [adminsList, setAdminsList] = useState([]);
  const [sortedAdmins, setSortedAdmins] = useState([]);

  const [editUsernameButton, setEditUsernameButton] = useState(false);
  const [editEmailButton, setEditEmailButton] = useState(false);
  const [editPasswordButton, setEditPasswordButton] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();

  const [addUsername, setAddUsername] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addPasswordConfirm, setAddPasswordConfirm] = useState("");
  const [showPasswordAdd, setShowPasswordAdd] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleAddAdmin = () => {
    if (addPassword !== addPasswordConfirm) {
      toast.error("Les mots de passe ne correspondent pas", {
        position: "top-center",
        style: {
          fontFamily: "Poppins, sans-serif",
          borderRadius: "15px",
          textAlign: "center",
        },
      });
      return;
    }
    if (
      addUsername === "" ||
      addEmail === "" ||
      addPassword === "" ||
      addPasswordConfirm === ""
    ) {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-center",

        style: {
          fontFamily: "Poppins, sans-serif",
          borderRadius: "15px",
          textAlign: "center",
        },
      });
      return;
    }
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/add`, {
        username: addUsername,
        email: addEmail,
        password: addPassword,
      })
      .then(() => {
        toast.success("Admin ajouté", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
        loadAdminsList();
        setOpenAdd(false);
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout de l'admin", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  const updateEmail = (admin) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/updateEmail`, {
        id: admin.id,
        email: admin.email,
      })
      .then(() => {
        toast.success("Email de l'admin mis à jour", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      })
      .catch(() => {
        toast.error("Erreur lors de la mise à jour de l'email", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  const updateUsername = (admin) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/updateUsername`, {
        id: admin.id,
        username: admin.username,
      })
      .then(() => {
        toast.success("Nom de l'admin mis à jour", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      })
      .catch(() => {
        toast.error("Erreur lors de la mise à jour du nom", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  const updatePassword = (admin) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/updatePassword`, {
        id: admin.id,
        password: newPassword,
      })
      .then(() => {
        toast.success("Mot de passe de l'admin mis à jour", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      })
      .catch(() => {
        toast.error("Erreur lors de la mise à jour du mot de passe", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  useEffect(() => {
    console.log("load");
    loadAdminsList();
  }, []);

  const handleBlur = () => {
    // Utilisez un timeout pour retarder la modification de l'état
    setTimeout(() => {
      setEditUsernameButton(false);
    }, 100);
  };

  const handleBlurEmail = () => {
    setTimeout(() => {
      setEditEmailButton(false);
    }, 100);
  };

  const handleBlurPassword = () => {
    setTimeout(() => {
      setEditPasswordButton(false);
    }, 100);
  };

  useEffect(() => {
    if (adminsList.length === 0) return;
    if (adminsList.length > 0 && adminsList[0].principal === true) return;
    console.log("sort");
    const sortedAdmins = adminsList.sort((a, b) => {
      if (a.principal === 1) {
        return -1;
      } else {
        return 1;
      }
    });
    setSortedAdmins(sortedAdmins);
  }, [adminsList]);

  const loadAdminsList = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("authToken")}`;
    axios
      .get(`${process.env.REACT_APP_API_URL}/admins/list`)
      .then((response) => {
        setAdminsList(response.data);
      })
      .catch(() => {
        toast.error("Aucun administrateur", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
        navigate("/");
      });
  };

  return (
    <Grid
      container
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "start",
        justifyContent: "center",
        alignContent: "start",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          alignContent: "start",
          height: "100%",
        }}
      >
        {sortedAdmins.length > 0 &&
          sortedAdmins.map((admin, index) => {
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
                  borderRadius: "15px",
                  backgroundColor:
                    admin.principal == true
                      ? themeGestion.palette.primary.main
                      : "transparent",
                  mr: "10px",
                  p: "20px",
                  height: screenHeight ? "15%" : "38%",
                  border: admin.principal == true ? "none" : "1px solid",
                  borderColor: themeGestion.palette.secondary.main,
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    value={admin.username}
                    disabled={admin.current == true ? false : true}
                    onChange={(e) => {
                      let newAdminsList = [...sortedAdmins];
                      newAdminsList[index].username = e.target.value;
                      setSortedAdmins(newAdminsList);
                    }}
                    onFocus={() => {
                      setEditUsernameButton(true);
                    }}
                    onBlur={() => {
                      handleBlur();
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
                  {admin.principal == false && admin.current == true && (
                    <ColorButton
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        padding: "10px 20px",
                        backgroundColor: "transparent",

                        marginLeft: "10px",
                        borderRadius: "15px",
                        border: "1px solid",
                        borderColor: themeGestion.palette.secondary.main,
                      }}
                      onClick={() => {
                        if (editUsernameButton) {
                          updateUsername(admin);
                        } else {
                          setOpenDelete(true);
                          setSelectedAdmin(admin);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          editUsernameButton
                            ? "fa-solid fa-check"
                            : "fa-solid fa-trash-can"
                        }
                        style={{
                          fontSize: "24px",
                          opacity: "50%",
                          color: themeGestion.palette.secondary.contrastText,
                        }}
                      />
                    </ColorButton>
                  )}
                  {admin.principal == true &&
                    editUsernameButton &&
                    admin.current == true && (
                      <ColorButton
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "transparent",

                          marginLeft: "10px",
                          borderRadius: "15px",
                          border: "1px solid",
                          borderColor: themeGestion.palette.secondary.main,
                        }}
                        onClick={() => {
                          if (editUsernameButton) {
                            updateUsername(admin);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={"fa-solid fa-check"}
                          style={{
                            fontSize: "24px",
                            opacity: "100%",
                            color: themeGestion.palette.primary.contrastText,
                          }}
                        />
                      </ColorButton>
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
                <Grid
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <TextField
                    value={admin.email}
                    disabled={admin.current == true ? false : true}
                    onFocus={() => {
                      if (admin.current == true) {
                        setEditEmailButton(true);
                      }
                    }}
                    onBlur={() => {
                      handleBlurEmail();
                    }}
                    onChange={(e) => {
                      let newAdminsList = [...sortedAdmins];
                      newAdminsList[index].email = e.target.value;
                      setSortedAdmins(newAdminsList);
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
                  {admin.principal == false &&
                    editEmailButton &&
                    admin.current == true && (
                      <ColorButton
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "transparent",
                          mt: "10px",

                          marginLeft: "10px",
                          borderRadius: "15px",
                          border: "1px solid",
                          borderColor: themeGestion.palette.secondary.main,
                        }}
                        onClick={() => {
                          if (editEmailButton) {
                            updateEmail(admin);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={"fa-solid fa-check"}
                          style={{
                            fontSize: "24px",
                            opacity: "50%",
                            color: themeGestion.palette.secondary.contrastText,
                          }}
                        />
                      </ColorButton>
                    )}
                  {admin.principal == true &&
                    editEmailButton &&
                    admin.current == true && (
                      <ColorButton
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "transparent",
                          mt: "10px",

                          marginLeft: "10px",
                          borderRadius: "15px",
                          border: "1px solid",
                          borderColor: themeGestion.palette.secondary.main,
                        }}
                        onClick={() => {
                          if (editEmailButton) {
                            updateEmail(admin);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={"fa-solid fa-check"}
                          style={{
                            fontSize: "24px",
                            opacity: "100%",
                            color: themeGestion.palette.primary.contrastText,
                          }}
                        />
                      </ColorButton>
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
                  {admin.current == true
                    ? "Nouveau mot de passe"
                    : "Mot de passe"}
                </Typography>
                <Grid
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <TextField
                    value={admin.current == true ? newPassword : "my-secret-pw"}
                    disabled={admin.current == true ? false : true}
                    placeholder={
                      admin.current == true ? "Saisir un mot de passe" : ""
                    }
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    onFocus={() => {
                      if (admin.current == true) {
                        setEditPasswordButton(true);
                      }
                    }}
                    onBlur={() => {
                      handleBlurPassword();
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
                    InputProps={
                      admin.current == true && newPassword !== ""
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  sx={{
                                    color:
                                      themeGestion.palette.secondary
                                        .contrastText,
                                  }}
                                >
                                  {showPassword ? (
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-eye-slash"
                                      style={{ fontSize: "16px" }}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon="fa-solid fa-eye"
                                      style={{ fontSize: "16px" }}
                                    />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        : {}
                    }
                  ></TextField>
                  {admin.principal == false &&
                    editPasswordButton &&
                    admin.current == true && (
                      <ColorButton
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "transparent",
                          mt: "10px",

                          marginLeft: "10px",
                          borderRadius: "15px",
                          border: "1px solid",
                          borderColor: themeGestion.palette.secondary.main,
                        }}
                        onClick={() => {
                          if (editPasswordButton) {
                            updatePassword(admin);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={"fa-solid fa-check"}
                          style={{
                            fontSize: "24px",
                            opacity: "50%",
                            color: themeGestion.palette.secondary.contrastText,
                          }}
                        />
                      </ColorButton>
                    )}
                  {admin.principal == true &&
                    editPasswordButton &&
                    admin.current == true && (
                      <ColorButton
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "transparent",
                          mt: "10px",

                          marginLeft: "10px",
                          borderRadius: "15px",
                          border: "1px solid",
                          borderColor: themeGestion.palette.secondary.main,
                        }}
                        onClick={() => {
                          if (editPasswordButton) {
                            updatePassword(admin);
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={"fa-solid fa-check"}
                          style={{
                            fontSize: "24px",
                            opacity: "100%",
                            color: themeGestion.palette.primary.contrastText,
                          }}
                        />
                      </ColorButton>
                    )}
                </Grid>
              </Grid>
            );
          })}
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "400px",
            height: screenHeight ? "15%" : "38%",
            alignContent: "center",
            borderRadius: "15px",
            backgroundColor: "transparent",
            p: "20px",
            border: "2px dashed",
            borderColor: themeGestion.palette.secondary.main,
          }}
        >
          <ColorButton
            onClick={() => {
              setOpenAdd(true);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              padding: "20px",
              backgroundColor: "transparent",
              borderRadius: "15px",
              border: "1px solid",
              borderColor: themeGestion.palette.secondary.main,
            }}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-plus"
              style={{
                fontSize: "24px",
                opacity: "50%",
                color: themeGestion.palette.secondary.contrastText,
              }}
            />
          </ColorButton>
        </Grid>
      </Grid>
      <Modal open={openAdd} onClose={handleCloseAdd}>
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
                Ajouter un admin
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <IconButton onClick={handleCloseAdd}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
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
              placeholder="Entrez un nom d'utilisateur"
              sx={{
                width: "400px",
                mt: "5px",
                borderRadius: "15px",
                border: "1px solid",
                borderColor: themeGestion.palette.secondary.main,
                input: {
                  padding: "10px 15px",
                  border: "none",
                  color: themeGestion.palette.text.secondary,
                  fontWeight: "400",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                },
                fieldset: {
                  border: "none",
                },
              }}
              autoFocus
              value={addUsername}
              onChange={(e) => setAddUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              placeholder="Entrez une adresse email"
              sx={{
                width: "400px",
                mt: "5px",
                borderRadius: "15px",
                border: "1px solid",
                borderColor: themeGestion.palette.secondary.main,
                input: {
                  padding: "10px 15px",
                  border: "none",
                  color: themeGestion.palette.text.secondary,
                  fontWeight: "400",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                },
                fieldset: {
                  border: "none",
                },
              }}
              autoFocus
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
            />
          </Grid>
          <Grid item sx={{ mb: 3, display: "flex", flexDirection: "column" }}>
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
                borderColor: themeGestion.palette.secondary.main,
                input: {
                  padding: "10px 15px",
                  border: "none",
                  fontWeight: "400",
                  color: themeGestion.palette.text.secondary,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                },
                fieldset: {
                  border: "none",
                },
              }}
              type={showPasswordAdd ? "text" : "password"}
              placeholder="Entrez un mot de passe"
              value={addPassword}
              onChange={(e) => setAddPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPasswordAdd(!showPasswordAdd);
                      }}
                      sx={{
                        color: themeGestion.palette.text.secondary,
                      }}
                    >
                      {showPasswordAdd ? (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye-slash"
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye"
                          style={{ fontSize: "16px" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              sx={{
                mt: "5px",
                width: "400px",
                borderRadius: "15px",
                border: "1px solid",
                borderColor: themeGestion.palette.secondary.main,
                input: {
                  padding: "10px 15px",
                  border: "none",
                  fontWeight: "400",
                  color: themeGestion.palette.text.secondary,
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                },
                fieldset: {
                  border: "none",
                },
              }}
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Confirmez le mot de passe"
              value={addPasswordConfirm}
              onChange={(e) => setAddPasswordConfirm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPasswordConfirm(!showPasswordConfirm);
                      }}
                      sx={{
                        color: themeGestion.palette.text.secondary,
                      }}
                    >
                      {showPasswordConfirm ? (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye-slash"
                          style={{ fontSize: "16px" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="fa-solid fa-eye"
                          style={{ fontSize: "16px" }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid
            item
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ColorButton
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "10px",
                padding: "10px 15px",
              }}
              onClick={handleAddAdmin}
            >
              Ajouter
            </ColorButton>
          </Grid>
        </Grid>
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete}>
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
                Avertissement
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <IconButton onClick={handleCloseDelete}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              color: "#0E1419",
              textAlign: "center",
              mb: 3,
            }}
          >
            Êtes-vous sûr de vouloir supprimer cet admin ?
          </Typography>
          <Grid
            item
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ColorButton
              sx={{
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "10px",
                border: "1px solid",
                borderColor: theme.palette.secondary.main,
                padding: "10px 15px",
                mr: "10px",
                color: theme.palette.secondary.main,
              }}
              variant="contained"
              onClick={handleCloseDelete}
            >
              Annuler
            </ColorButton>

            <ColorButton
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "10px",
                padding: "10px 15px",
              }}
              onClick={() => {
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${localStorage.getItem("authToken")}`;
                axios
                  .delete(
                    `${process.env.REACT_APP_API_URL}/admin/delete?id=${selectedAdmin.id}`
                  )
                  .then((response) => {
                    toast.success("Admin supprimé", {
                      position: "top-center",
                      style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                      },
                    });
                    if (response && response.data == "deconnect") {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("admin_principal");
                      navigate("/");
                    } else {
                      loadAdminsList();
                    }
                    setOpenDelete(false);
                  })
                  .catch(() => {
                    toast.error("Erreur lors de la suppression de l'admin", {
                      position: "top-center",
                      style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                      },
                    });
                  });
              }}
            >
              Valider
            </ColorButton>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default AdminGestion;
