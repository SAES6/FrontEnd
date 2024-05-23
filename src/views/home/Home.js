import {Grid, Button, Typography, useMediaQuery, Modal, IconButton} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {styled} from "@mui/material/styles";
import {theme} from "../../theme";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import {toast} from "react-toastify";
import axios from "axios";

const ColorButton = styled(Button)(({theme}) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: "ease 0.3s",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
    },
}));

const Home = () => {
    const navigate = useNavigate();
    const themeLayout = useTheme(theme);
    const screenSize = useMediaQuery("(min-width:1600px)");
    const [openConsentPopup, setOpenConsentPopup] = useState(false);

    // load the questionnaires from the API
    const [questionnaires, setQuestionnaires] = useState([]);
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({});

    const loadQuestionnaires = () => {
        axios
            .get(
                `${
                    process.env.REACT_APP_API_URL
                }/questionnaire/byToken?token=${localStorage.getItem("token_access")}`
            )
            .then((response) => {
                setQuestionnaires(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Aucun questionnaire", {
                    position: "top-center",
                    style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                    },
                });
            });
    };

    const goToQuestionnaire = (questionnaire) => {
        if (localStorage.getItem("user_consent") === "true") {
            navigate(`/questions/${questionnaire.id}`);
        } else {
            setOpenConsentPopup(true);
            setSelectedQuestionnaire(questionnaire);
        }
    };

    const handleConsent = () => {
        localStorage.setItem("user_consent", "true");
        setOpenConsentPopup(false);
        navigate(`/questions/${selectedQuestionnaire.id}`);
    };

    const handleCloseConsent = () => {
        setOpenConsentPopup(false);
    };

    useEffect(() => {
        loadQuestionnaires();
    }, []);

    useEffect(() => {
        console.log(questionnaires);
    }, [questionnaires]);

    return (
        <Grid
            container
            sx={{
                maxWidth: screenSize ? "1500px" : "1300px",
                height: "100%",
                width: "auto",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Grid
                container
                spacing={4}
                sx={{
                    height: "fit-content",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    mt: 0,
                }}
            >
                <Grid item xs={6} md={6} sx={{}}>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "64px",
                            fontWeight: "700",
                            lineHeight: "1.2",
                            letterSpacing: "-2px",
                        }}
                    >
                        Projet Informare Valorem
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "300",
                            letterSpacing: "-1px",
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                    md={6}
                    sx={{
                        height: "350px",
                        backgroundColor: themeLayout.palette.secondary.main,
                        borderRadius: "20px",
                    }}
                />
            </Grid>
            <Grid
                container
                gap={2}
                sx={{
                    mt: "50px",
                    overflow: "auto",
                    maxHeight: "300px",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                }}
            >
                {questionnaires.map((questionnaire) => (
                    <Grid>
                        <ColorButton
                            onClick={() => goToQuestionnaire(questionnaire)}
                            disabled={questionnaire.completed}
                            sx={{
                                height: "200px",
                                maxHeight: "200px",
                                maxWidth: "285px",
                                width: "285px",
                                backgroundColor: questionnaire.completed
                                    ? themeLayout.palette.secondary.main
                                    : themeLayout.palette.primary.main,

                                borderRadius: "15px",
                                padding: "20px 25px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                "&:disabled": {
                                    backgroundColor: themeLayout.palette.secondary.main, // Exemple de couleur lorsque le bouton est désactivé
                                },
                            }}
                            variant="contained"
                        >
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    width: "100%",
                                }}
                            >
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    {questionnaire.completed && (
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-lock"
                                            style={{
                                                fontSize: "24px",
                                                color: themeLayout.palette.primary.contrastText,
                                                marginRight: "10px",
                                            }}
                                        />
                                    )}
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            lineHeight: "36px",
                                            color: themeLayout.palette.primary.contrastText,
                                            overflowWrap: "break-word",
                                            textTransform: "none",
                                            width: "100%",
                                            overflow: "scroll",
                                            textAlign: "left",
                                        }}
                                    >
                                        {questionnaire.name}
                                    </Typography>
                                </Grid>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        color: themeLayout.palette.primary.contrastText,
                                        overflowWrap: "break-word",
                                        textTransform: "none",
                                        width: "100%",
                                        maxHeight: "40%",
                                        overflow: "scroll",
                                        textAlign: "left",
                                    }}
                                >
                                    {questionnaire.description}
                                </Typography>
                            </Grid>
                            <Grid
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                    width: "100%",
                                    maxHeight: "20%",
                                }}
                            >
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-circle-question"
                                        style={{
                                            fontSize: "16px",
                                            color: themeLayout.palette.primary.contrastText,
                                            opacity: "0.75",
                                            marginRight: "5px",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            lineHeight: "24px",
                                            color: themeLayout.palette.primary.contrastText,
                                            opacity: "0.75",
                                            textTransform: "none",
                                        }}
                                    >
                                        {questionnaire.number_of_questions === 1
                                            ? "1 question"
                                            : questionnaire.number_of_questions + " questions"}
                                    </Typography>
                                </Grid>
                                <Grid
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon="fa-solid fa-clock"
                                        style={{
                                            fontSize: "16px",
                                            color: themeLayout.palette.primary.contrastText,
                                            opacity: "0.75",
                                            marginRight: "5px",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            lineHeight: "24px",
                                            color: themeLayout.palette.primary.contrastText,
                                            opacity: "0.75",
                                            textTransform: "none",
                                        }}
                                    >
                                        {questionnaire.duree + " min"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ColorButton>
                    </Grid>
                ))}
            </Grid>
            <Modal open={openConsentPopup} onClose={handleCloseConsent}>
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
                        padding: "20px 25px",
                        boxShadow: 24,
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
                                Un instant !
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sx={{textAlign: "right"}}>
                            <IconButton onClick={handleCloseConsent}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{mb: 3, width: "500px"}}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#0E1419",
                                textAlign: "start",
                                mb: 2,
                            }}
                        >
                            Avant de commencer, veuillez lire et accepter les conditions
                            d’utilisation générales :
                        </Typography>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                                border: "1px solid",
                                borderColor: themeLayout.palette.secondary.main,
                                borderRadius: "15px",
                                padding: "10px 15px",
                                maxHeight: "200px",
                                overflow: "scroll",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    opacity: "0.5",
                                    textAlign: "start",
                                }}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid>
                        <ColorButton
                            onClick={handleConsent}
                            sx={{
                                backgroundColor: themeLayout.palette.primary.main,
                                borderRadius: "10px",
                                padding: "10px 15px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            variant="contained"
                        >
                            <Typography
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    color: themeLayout.palette.primary.contrastText,
                                    textAlign: "center",
                                    textTransform: "none",
                                }}
                            >
                                J’accepte
                            </Typography>
                        </ColorButton>
                    </Grid>
                </Grid>
            </Modal>
        </Grid>
    );
};

export default Home;
