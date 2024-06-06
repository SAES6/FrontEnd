import React, {useEffect, useRef, useState} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewQuestion from "./NewQuestion";
import {Box, Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {postSectionInfos} from "../../../_store/_actions/quiz-actions";
import NewQuiz from "./NewQuiz";
import PreviewQuestion from "./PreviewQuestion";
import {selectCurrentSectionOrder} from "../../../_store/_slices/quiz-slice";

const QuizAdministration = () => {
    const savedSectionInfos = useSelector((state) => state.quiz.currentSectionInfos);
    const currentSectionId = useSelector((state) => state.quiz.currentSectionId);
    const currentSectionOrder = useSelector(selectCurrentSectionOrder);

    const [sectionInfos, setSectionInfos] = useState([])
    const [isPreview, setIsPreview] = useState(false);

    const questionRefs = useRef([]);
    const quizInfoRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        setSectionInfos(savedSectionInfos.questions);
        console.log('load')
    }, [savedSectionInfos]);

    useEffect(() => {
        if (questionRefs.current.length !== sectionInfos.length) {
            questionRefs.current = sectionInfos.map(
                (info, index) => questionRefs.current[index] || React.createRef()
            );
        }
    }, [sectionInfos]);

    const gatherData = () => {
        const quizInfos = quizInfoRef.current?.getData();
        const questions = questionRefs.current.map((ref) => ref.current?.getData());
        console.log(quizInfos || {}, questions)
        dispatch(postSectionInfos({quizInfos: quizInfos || {}, questions}));
    };

    const addNewQuestionHandler = () => {
        setSectionInfos((prevState) => [
            ...prevState,
            {id: prevState.length + 1, order: prevState.length + 1},
        ]);
        questionRefs.current.push(React.createRef());
    };

    const handleClose = (order) => {
        setSectionInfos((prevState) => {
            const newArray = [...prevState];
            newArray.splice(order, 1);

            return newArray.map((item, index) => {
                return {...item, order: index + 1};
            });
        });
    };

    const previewHandler = () => setIsPreview(!isPreview);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                {!isPreview && sectionInfos.length > 0 && (
                    <Button onClick={() => gatherData()} variant="contained">
                        Sauvegarder
                    </Button>
                )}
                {sectionInfos.length > 0 && (
                    <Button onClick={previewHandler} variant="contained" sx={{ml: 1}}>
                        {isPreview ? "Édition" : "Prévisualiser"}
                    </Button>
                )}
            </Box>
            {currentSectionOrder === 1 && !isPreview &&
                <NewQuiz ref={quizInfoRef}/>
            }
            {sectionInfos.length > 0 &&
                sectionInfos.map((section, index) => (
                    <React.Fragment key={section.id + section.order}>
                        {!isPreview && (
                            <NewQuestion
                                ref={questionRefs.current[index]}
                                handleClose={() => handleClose(index)}
                                index={index}
                                sectionInfos={section}
                            />
                        )}
                        {isPreview && <PreviewQuestion sectionInfos={section}/>}
                    </React.Fragment>
                ))}
            {!isPreview && currentSectionId && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <IconButton onClick={addNewQuestionHandler}>
                        <AddCircleOutlineIcon fontSize="large"/>
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default QuizAdministration;
