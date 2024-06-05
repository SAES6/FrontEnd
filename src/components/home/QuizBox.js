import React from "react";
import {useTheme} from "@mui/material/styles";
import {theme} from "../../theme";
import {Button, Grid, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const QuizBox = ({quiz, goToQuestionnaire}) => {
    const themeLayout = useTheme(theme);

    return (
        <Grid key={quiz.id}>
            <Button
                onClick={() => goToQuestionnaire(quiz.id)}
                disabled={quiz.completed}
                sx={{
                    height: "200px",
                    maxHeight: "200px",
                    maxWidth: "285px",
                    width: "285px",
                    backgroundColor: quiz.completed
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
                        {quiz.completed && (
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
                                overflowX: "auto",
                                textAlign: "left",
                            }}
                        >
                            {quiz.name}
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
                            overfloX: "auto",
                            textAlign: "left",
                        }}
                    >
                        {quiz.description}
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
                            {quiz.number_of_questions === 1
                                ? "1 question"
                                : quiz.number_of_questions + " questions"}
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
                            {quiz.duree + " min"}
                        </Typography>
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    );
};

export default React.memo(QuizBox);
