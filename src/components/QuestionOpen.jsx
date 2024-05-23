import {Grid, Typography, useMediaQuery, TextField} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {theme} from "../theme";

const QuestionOpen = ({children, questionTitle}) => {
    const themeQuestion = useTheme(theme);
    const screenSize = useMediaQuery("(min-width:1600px)");

    return (
        <Grid
            className="question"
            container
            sx={{
                width: screenSize ? "1500px" : "1300px",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                gap: "10px",
                padding: "10px 0",
            }}
        >
            <Grid
                className="first-row"
                sx={{
                    width: "100%",
                    height: "56px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "24px",
                        fontWeight: "600",
                        lineHeight: "36px",
                        color: themeQuestion.palette.text.primary,
                    }}
                >
                    {questionTitle}
                </Typography>
                <Grid
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-feather"
                        style={{opacity: "0.50"}}
                    />
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "24px",
                            marginLeft: "5px",
                        }}
                    >
                        Question Ouverte
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                className="enonce"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        fontWeight: "600",
                        lineHeight: "24px",
                    }}
                >
                    Enoncé
                </Typography>
                <Typography
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "24px",
                    }}
                >
                    {children}
                </Typography>
            </Grid>
            <Grid
                className="answer"
                sx={{
                    width: "100%",
                }}
            >
                <TextField
                    margin="normal"
                    required
                    sx={{
                        mt: "5px",
                        width: "100%",
                        borderRadius: "15px",
                        border: "1px solid",
                        borderColor: themeQuestion.palette.secondary.main,
                        input: {
                            padding: "10px 15px",
                            border: "none",
                            fontWeight: "400",
                            color: themeQuestion.palette.text.secondary,
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                        },
                        fieldset: {
                            border: "none",
                        },
                    }}
                    type="text"
                    placeholder="Saisissez votre réponse"
                />
            </Grid>
        </Grid>
    );
};

export default QuestionOpen;
