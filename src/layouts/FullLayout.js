import React, {useState, useEffect} from "react";
import {
    Grid,
    Typography,
    Button,
    Modal,
    TextField,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Outlet, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import {styled} from "@mui/material/styles";
import axios from "axios";
import {theme} from "../theme";
import {toast} from "react-toastify";

const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
    transition: "ease 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.primary.contrastText,
    },
}));

const FullLayout = () => {
    const themeLayout = useTheme(theme);
    const screenSize = useMediaQuery("(min-width:1600px)");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const createToken = async () => {
                const tokenUser = localStorage.getItem("token_access");
                if (!tokenUser) {
                    try {
                        const response = await axios.get(
                            `${process.env.REACT_APP_API_URL}/createToken`
                        );
                        localStorage.setItem("token_access", response.data.token);
                    } catch (error) {
                        console.error("Error fetching the token:", error);
                        localStorage.removeItem("token_access");
                    }
                }
            }

            await createToken();
        };

        checkToken();

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
            .post(`${process.env.REACT_APP_API_URL}/login`, {email, password})
            .then((response) => {
                localStorage.setItem("authToken", response.data.token);
                setIsAuthenticated(true);
                setOpen(false);
                toast.success("Connexion réussie", {
                    position: "top-center",
                    style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                    },
                });
                navigate("/admin-console");
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                toast.error("Identifiants incorrect", {
                    position: "top-center",
                    style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                    },
                });
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
                        padding: "15px 0",
                    }}
                >
                    <Grid
                        item
                        container
                        alignItems="center"
                        xs={6}
                        gap={1}
                        sx={{cursor: "pointer"}}
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
                        <ColorButton
                            sx={{
                                borderRadius: "10px",
                                padding: "10px 15px",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                                fontSize: "16px",
                                lineHeight: "24px",
                                textTransform: "none",
                            }}
                            variant="contained"
                            startIcon={
                                <FontAwesomeIcon
                                    icon="fa-solid fa-user-tie"
                                    style={{fontSize: "16px", margin: "0 5px"}}
                                />
                            }
                            onClick={handleOpen}
                        >
                            Espace Admin
                        </ColorButton>
                    </Grid>
                </Grid>
            </Grid>
            <Outlet/>
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
                        sx={{mb: 3, width: "100%"}}
                    >
                        <Grid item xs={2}/>
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
                        <Grid item xs={2} sx={{textAlign: "right"}}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item sx={{mb: 2}}>
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
                    <Grid item sx={{mb: 3}}>
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
                                fieldset: {
                                    border: "none",
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
                                borderRadius: "15px",
                                backgroundColor: "#0D5282",
                                color: "#F7F9FB",
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                                fontSize: "16px",
                                lineHeight: "24px",
                                padding: "10px 15px",
                                textTransform: "none",
                                boxShadow: "none",
                            }}
                            onClick={handleLogin}
                        >
                            Connexion
                        </Button>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    );
};

export default FullLayout;
