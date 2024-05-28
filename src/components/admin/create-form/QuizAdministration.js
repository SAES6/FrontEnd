import React, {useState, useRef, useEffect} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewQuestion from "./NewQuestion";
import {v4 as uuid} from 'uuid';
import {Box, Button, IconButton} from "@mui/material";
import useGET from "../../../hooks/useGET";

const QuizAdministration = ({currentSelection}) => {
    const [response, setRequest] = useGET({url: `${currentSelection}`, data: {}, api: ''});

    const [pageInfos, setPageInfos] = useState([]);

    const questionRefs = useRef((pageInfos || []).map(() => React.createRef()));

    useEffect(() => {
        if (response?.status >= 200 || response?.status < 300)
            setPageInfos(response?.data.features ? response?.data.features : []);
    }, [response]);

    useEffect(() => {
        setRequest({url: `${currentSelection}`, data: {}, api: ''})
    }, [currentSelection]);

    useEffect(() => {
        if (questionRefs.current.length !== pageInfos.length) {
            questionRefs.current = pageInfos.map((info, index) => questionRefs.current[index] || React.createRef());
        }
    }, [pageInfos]);

    const gatherData = () => {
        const allData = questionRefs.current.map(ref => ref.current?.getData());
        console.log(allData);
        // redux
    };

    const addNewQuestionHandler = () => {
        setPageInfos(prevState => [...prevState, {id: uuid(), qNumber: prevState.length}]);
        questionRefs.current.push(React.createRef());
    };

    const handleClose = (qNumber) => {
        setPageInfos(prevState => {
            const newArray = [...prevState];
            newArray.splice(qNumber, 1);
            newArray.forEach((item, index) => item.qNumber = index);
            return newArray;
        });
    };

    const previewHandler = () => {

    };

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Button onClick={() => gatherData()} variant='contained'>Save</Button>
                <Button onClick={previewHandler} variant='contained' sx={{ml: 3}}>Preview</Button>
            </Box>
            {pageInfos.map((page, index) =>
                <NewQuestion
                    key={page.id + page.qNumber}
                    ref={questionRefs.current[index]}
                    handleClose={() => handleClose(index)}
                    index={index}
                    pageInfos={page}
                />
            )}
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IconButton onClick={addNewQuestionHandler}>
                    <AddCircleOutlineIcon fontSize="large"/>
                </IconButton>
            </Box>
        </>
    );
};

export default QuizAdministration;
