import {Button, Grid, IconButton, Modal, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useTheme} from "@mui/material/styles";
import {theme} from "../../theme";
import {useNavigate} from "react-router-dom";
import {userActions} from "../../_store/_slices/user-slice";
import {useDispatch} from "react-redux";

const ConsentModal = ({open, setOpen, qId}) => {
    const themeLayout = useTheme(theme);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleConsent = () => {
        dispatch(userActions.setUserConsent(true));
        setOpen(false);
        navigate(`/questions/${qId}`);
    };

    const closeHandler = () => setOpen(false);

    return <Modal open={open} onClose={closeHandler}>
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
                    <IconButton onClick={closeHandler}>
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
                        overflow: "auto",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "24px",
                            opacity: "0.5",
                            textAlign: "start",
                            mt: 1,
                        }}
                    >
                        Projet sur la Valeur de l'Information
                    </Typography>
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
                        Nous vous remercions de votre intérêt à participer à notre étude
                        sur la perception de la valeur de l'information, conduite par
                        l'Institut Méditerranéen des Sciences de l'Information et de la
                        Communication (IMSIC). Avant de débuter, veuillez lire
                        attentivement les informations suivantes et donner votre
                        consentement pour participer.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "24px",
                            opacity: "0.5",
                            textAlign: "start",
                            mt: 1,
                        }}
                    >
                        Objectif de l'Étude:
                    </Typography>
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
                        Cette étude vise à comparer et comprendre comment les
                        journalistes et le grand public évaluent la valeur de
                        l'information à travers différents scénarios présentés sur cette
                        plateforme interactive. Les résultats nous aideront à mieux
                        saisir les critères utilisés par différents groupes pour juger
                        l'importance des informations.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "24px",
                            opacity: "0.5",
                            textAlign: "start",
                            mt: 1,
                        }}
                    >
                        Procédure:
                    </Typography>
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
                        En tant que participant, vous serez invité à répondre à une
                        série de scénarios qui vous seront présentés sur notre site web.
                        Chaque scénario vous proposera plusieurs réponses possibles, et
                        vous devrez choisir celle qui reflète le mieux votre opinion sur
                        la valeur de l'information dans le contexte donné.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "24px",
                            opacity: "0.5",
                            textAlign: "start",
                            mt: 1,
                        }}
                    >
                        Confidentialité et Anonymat:
                    </Typography>
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
                        Vos réponses seront collectées de manière anonyme et aucune
                        information permettant de vous identifier ne sera enregistrée.
                        Toutes les données seront stockées de manière sécurisée et
                        utilisées uniquement à des fins de recherche.
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "24px",
                            opacity: "0.5",
                            textAlign: "start",
                            mt: 1,
                        }}
                    >
                        Droit de Retrait:
                    </Typography>
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
                        Votre participation à cette étude est entièrement volontaire.
                        Vous avez le droit de vous retirer de l'étude à tout moment sans
                        aucune conséquence.
                    </Typography>
                </Grid>
            </Grid>
            <Typography
                sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "start",
                    padding: "10px 15px",
                    width: "500px",
                    mb: 3,
                }}
            >
                En cliquant sur le bouton ci-dessous et en continuant à participer à
                cette étude, vous confirmez que vous avez lu et compris les
                informations fournies concernant votre participation. Vous acceptez
                de participer à cette étude sur la base du volontariat et vous êtes
                conscient que vous pouvez retirer votre consentement et cesser la
                participation à tout moment.
            </Typography>

            <Grid>
                <Button onClick={handleConsent} variant="contained">
                    J’accepte
                </Button>
            </Grid>
        </Grid>
    </Modal>;
};

export default ConsentModal;
