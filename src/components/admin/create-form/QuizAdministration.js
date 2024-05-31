import React, {useState, useRef, useEffect} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewQuestion from "./NewQuestion";
import {v4 as uuid} from "uuid";
import {Box, Button, IconButton} from "@mui/material";
import {useSelector} from "react-redux";

const QuizAdministration = () => {
    const savedSectionInfos = useSelector(state => state.quiz.currentSectionInfos);
    const [sectionInfos, setSectionInfos] = useState([]);
console.log(sectionInfos)
    const questionRefs = useRef([]);

    useEffect(() => {
        if (savedSectionInfos.length > 0)
            setSectionInfos(savedSectionInfos)
    }, [savedSectionInfos]);

    useEffect(() => {
        if (questionRefs.current.length !== sectionInfos.length) {
            questionRefs.current = sectionInfos.map(
                (info, index) => questionRefs.current[index] || React.createRef()
            );
        }
    }, [sectionInfos]);

    const gatherData = () => {
        const allData = questionRefs.current.map((ref) => ref.current?.getData());
    };

    const addNewQuestionHandler = () => {
        setSectionInfos((prevState) => [
            ...prevState,
            {id: uuid(), qNumber: prevState.length},
        ]);
        questionRefs.current.push(React.createRef());
    };

    const handleClose = (qNumber) => {
        setSectionInfos((prevState) => {
            const newArray = [...prevState];
            newArray.splice(qNumber, 1);
            newArray.forEach((item, index) => (item.qNumber = index));
            return newArray;
        });
    };

    const previewHandler = () => {
    };

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
                <NewQuestion
                    key={section.id + section.order}
                    ref={questionRefs.current[index]}
                    handleClose={() => handleClose(index)}
                    index={index}
                    sectionInfos={section}
                />
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
