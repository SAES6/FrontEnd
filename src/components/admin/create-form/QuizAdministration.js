import React, {useEffect, useRef, useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewQuestion from "./NewQuestion";
import {Box, Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {postSectionInfos} from "../../../_store/_actions/quiz-actions";
import NewQuiz from "./NewQuiz";

const QuizAdministration = () => {
    const savedSectionInfos = useSelector(state => state.quiz.currentSectionInfos);
    const currentSectionId = useSelector(state => state.quiz.currentSectionId);
    const [sectionInfos, setSectionInfos] = useState([]);
    const [quizInfos, setQuizInfos] = useState({name: '', duree: 0, description: ''});

    const questionRefs = useRef([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setSectionInfos(savedSectionInfos.questions)
    }, [savedSectionInfos]);

    useEffect(() => {
        if (questionRefs.current.length !== sectionInfos.length) {
            questionRefs.current = sectionInfos.map((info, index) => questionRefs.current[index] || React.createRef());
        }
    }, [sectionInfos]);

    const gatherData = () => {
        const allData = questionRefs.current.map((ref) => ref.current?.getData());

        dispatch(postSectionInfos({quizInfos, questions: allData}));
    };

    const addNewQuestionHandler = () => {
        setSectionInfos(prevState => [
            ...prevState,
            {id: prevState.length + 1, order: prevState.length + 1},
        ]);
        questionRefs.current.push(React.createRef());
    };

    const handleClose = (order) => {
        setSectionInfos(prevState => {
            const newArray = [...prevState];
            newArray.splice(order, 1);

            return newArray.map((item, index) => {
                return {...item, order: index + 1};
            });
        });
    };

    const previewHandler = () => {};

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Button onClick={() => gatherData()} variant="contained">
                    Save
                </Button>
                <Button onClick={previewHandler} variant="contained" sx={{ml: 3}}>
                    Preview
                </Button>
            </Box>
            {sectionInfos.length > 0 && sectionInfos.map((section, index) => (
                <React.Fragment key={section.id + section.order}>
                    {currentSectionId === 1 &&
                        <NewQuiz setQuizInfos={setQuizInfos} quizInfos={quizInfos}/>
                    }
                    <NewQuestion
                        ref={questionRefs.current[index]}
                        handleClose={() => handleClose(index)}
                        index={index}
                        sectionInfos={section}
                    />
                </React.Fragment>
            ))}
            <Box
                sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                <IconButton onClick={addNewQuestionHandler}>
                    <AddCircleOutlineIcon fontSize="large"/>
                </IconButton>
            </Box>
        </>
    );
};

export default QuizAdministration;
