import {Grid, Button, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {theme} from "../../theme";
import QuestionOpen from "../../components/QuestionOpen";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import QuestionSimple from "../../components/QuestionSimple";
import QuestionEchelle from "../../components/QuestionEchelle";

const Questions = () => {
    const themeQuestions = useTheme(theme);
    const screenSize = useMediaQuery("(min-width:1600px)");
    const [questions, setQuestions] = useState([]);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [currentSection, setCurrentSection] = useState(1);
    // recupere l'id du questionnaire via l'url
    const {id} = useParams();
    const getLocalStorageKey = (id) => `currentSection_${id}`;

    const loadQuestions = () => {
        console.log(id);
        axios
            .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
            .then((response) => {
                setQuestions(response.data);
            })
            .catch(() => {
                toast.error("Aucune question", {
                    position: "top-center",
                    style: {
                        fontFamily: "Poppins, sans-serif",
                        borderRadius: "15px",
                        textAlign: "center",
                    },
                });
            });
    };

    useEffect(() => {
        const storedSection = localStorage.getItem(getLocalStorageKey(id));
        if (storedSection) {
            setCurrentSection(parseInt(storedSection, 10));
        }
        loadQuestions();
    }, [id]);

    useEffect(() => {
        console.log(questions);
        if (questions.length > 0) {
            console.log("mdr2");
            let array = questions.filter((question) => question.page === currentSection);
            array = array.sort((a, b) => a.order - b.order);
            setCurrentQuestions(array);
        }
    }, [questions, currentSection]);

    const nextSection = () => {
        console.log(questions);
        if (questions.length > 0) {
            console.log("mdr3");
            let array = questions.filter((question) => question.page === currentSection + 1);
            array = array.sort((a, b) => a.order - b.order);
            setCurrentQuestions(array);
            setCurrentSection(currentSection + 1)
            localStorage.setItem(getLocalStorageKey(id), currentSection + 1);
        }
    };

    useEffect(() => {
        console.log("mdr");
        console.log(currentQuestions);
    }, [currentQuestions]);
    return (
        <Grid
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
            }}
        >
            <Grid
                sx={{
                    padding: "40px 0 20px",
                }}
            >
                {currentQuestions.map((question) => {
                    if (question.type === "text") {
                        return (
                            <QuestionOpen questionTitle={question.title}>
                                {question.description}
                            </QuestionOpen>
                        );
                    }
                    if (
                        question.type === "single_choice" ||
                        question.type === "multiple_choice"
                    ) {
                        return (
                            <QuestionSimple
                                questionTitle={question.title}
                                questionType={question.type}
                                questionChoices={question.choices}
                            >
                                {question.description}
                            </QuestionSimple>
                        );
                    }
                    if (question.type === "slider") {
                        return (
                            <QuestionEchelle
                                questionTitle={question.title}
                                questionSliderMin={question.slider_min}
                                questionSliderMax={question.slider_max}
                                questionSliderGap={question.slider_gap}
                            >
                                {question.description}
                            </QuestionEchelle>
                        );
                    }
                })}
            </Grid>
            <Grid
                sx={{
                    padding: "20px 0 40px",
                    width: screenSize ? "1500px" : "1300px",
                }}
            >
                <Grid>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: themeQuestions.palette.text.secondary,
                        }}
                    >
                        Prochaine section :
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "24px",
                            fontWeight: "600",
                            lineHeight: "24px",
                            color: themeQuestions.palette.primary.main,
                        }}
                    >
                        Section {currentSection + 1}
                    </Typography>
                </Grid>
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
                    onClick={nextSection}
                >
                    Valider mes réponses
                </Button>
            </Grid>
        </Grid>
    );
};

export default Questions;
