import React, {useEffect, useState} from "react";
import {Box, IconButton, Stack, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {quizActions} from "../../../_store/_slices/quiz-slice";
import {getQuizOrPageDetails} from "../../../_store/_actions/quiz-actions";

const DropDownTypography = ({text, onClick}) => (
    <Typography
        sx={{
            cursor: 'pointer',
            pl: 2,
            transition: 'background-color 0.3s',
            borderRadius: '15px',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: 'black'
            }
        }}
        onClick={onClick}
    >
        {text}
    </Typography>
);

const SideBar = () => {
    const currentQuizId = useSelector(state => state.quiz.currentQuizId);
    const quizzesInfos = useSelector(state => state.quiz.quizzesInfos);

    const [newPageNames, setNewPageNames] = useState('');

    const dispatch = useDispatch();

    // todo useEffect for query the list of quiz

    const handleNameChange = (name) => {
        setNewPageNames(name);
    };

    const newPageHandler = () => {
        dispatch(quizActions.addPage(newPageNames || 'Nouvelle section'));
        setNewPageNames('');
    };

    const newQuizHandler = () => {
        dispatch(quizActions.addQuiz());
    };

    const onClickModalHandler = (quizId, pageId = null) => {
        dispatch(getQuizOrPageDetails(quizId, pageId));
    };

    // todo add modal for confirmation
    const deleteHandler = () => {
        dispatch(quizActions.deleteQuizOrPage());
    };

    console.log("e")
    return (
        <Box sx={{p: 1}}>
            <Typography align='center' variant='h5' sx={{mb: 2}} fontWeight='bold'>Questionnaires</Typography>
            <Stack alignItems="center" gap={1}>

                {quizzesInfos?.map(quiz => (
                    <React.Fragment key={quiz.id}>
                        <Box sx={{width: '100%'}}>
                            <Box justifyContent='space-between' alignItems='center'
                                 sx={{
                                     width: '100%', borderRadius: '15px', bgcolor: 'red', display: 'flex',
                                     transition: 'background-color 0.3s',
                                     '&:hover': {
                                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                         color: 'black'
                                     }
                                 }}
                                 onClick={() => onClickModalHandler(quiz.id)}>
                                <Typography
                                    align='left'
                                    variant='h6'
                                    sx={{pl: 2, cursor: 'pointer', width: '80%'}}>
                                    {quiz.name}
                                </Typography>
                                <IconButton>
                                    <MoreHorizIcon/>
                                </IconButton>
                            </Box>
                            {quiz.dropdownOpen && (
                                <Box sx={{width: '100%'}}>
                                    <DropDownTypography text="Renommer" onClick={() => console.log('ff')}/>
                                    <DropDownTypography text="Supprimer" onClick={() => deleteHandler()}/>
                                </Box>
                            )}
                        </Box>
                        {currentQuizId === quiz.id && (
                            <Stack alignItems='flex-start' gap={1} sx={{width: '100%'}}>
                                {quiz.pages.slice().sort((a, b) => a.pos - b.pos).map(page => (
                                    <Box key={page.id} sx={{width: '100%'}}>
                                        <Box justifyContent='space-between' alignItems='center'
                                             sx={{
                                                 width: '100%',
                                                 display: 'flex',
                                                 transition: 'background-color 0.3s',
                                                 borderRadius: '15px',
                                                 '&:hover': {
                                                     backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                     color: 'black'
                                                 }
                                             }}
                                             onClick={() => onClickModalHandler(quiz.id, page.id)}>
                                            <Typography
                                                align='left'
                                                variant='h6'
                                                sx={{pl: 3, cursor: 'pointer', width: '80%',}}
                                            >
                                                {page.name}
                                            </Typography>
                                            <IconButton>
                                                <MoreHorizIcon/>
                                            </IconButton>
                                        </Box>
                                        {page.dropdownOpen && (
                                            <Box sx={{width: '100%'}}>
                                                <DropDownTypography text="Renommer" onClick={() => console.log('ff')}/>
                                                <DropDownTypography text="Supprimer"
                                                                    onClick={() => deleteHandler()}/>
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                                <Box justifyContent='space-between' alignItems='center'
                                     sx={{
                                         width: '100%',
                                         display: 'flex',
                                         border: 'solid',
                                         borderRadius: '15px',
                                         borderColor: 'red'
                                     }}>
                                    <TextField
                                        value={newPageNames || ''}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        placeholder="Nouvelle section"
                                        variant="standard"
                                        sx={{flexGrow: 1, pr: 1, pl: 3, width: '80%'}}
                                        size="small"
                                    />
                                    <IconButton onClick={() => newPageHandler()} sx={{width: '20%'}}>
                                        <AddIcon/>
                                    </IconButton>
                                </Box>
                            </Stack>
                        )}
                    </React.Fragment>
                ))}

                <AddCircleOutlineIcon
                    fontSize='large'
                    sx={{p: 1, width: '80%', borderRadius: '15px', cursor: 'pointer'}}
                    onClick={() => newQuizHandler()}/>
            </Stack>
        </Box>
    );
};

export default React.memo(SideBar);
