import React, {useState} from "react";
import {Box, IconButton, Stack, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import {v4 as uuid} from 'uuid';

const initQuizzesInfos = [{
    id: 658745,
    name: 'Questionnaire 1',
    dropdownOpen: false,
    pages: [
        {id: 6494984, pos: 1, name: 'Section 1', dropdownOpen: false},
        {id: 65687, pos: 2, name: 'Section 2', dropdownOpen: false},
        {id: 965441, pos: 3, name: 'Section 3', dropdownOpen: false}
    ]
}];

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

const SideBar = ({currentSelection, setCurrentSelection}) => {
    const [quizzesInfos, setQuizzesInfos] = useState(initQuizzesInfos);
    const [newPageNames, setNewPageNames] = useState({});

    const handleNameChange = (quizId, name) => {
        setNewPageNames(prev => ({...prev, [quizId]: name}));
    };

    const newPageHandler = (quizId) => {
        const pageName = newPageNames[quizId] || 'Nouvelle section';
        setQuizzesInfos(prevState => {
            return prevState.map(quizz => {
                if (quizz.id === quizId) {
                    const updatedQuizz = {...quizz};
                    updatedQuizz.pages = [...quizz.pages, {id: uuid(), name: pageName, pos: quizz.pages.length + 1}];
                    return updatedQuizz;
                }
                return quizz;
            });
        });
        setNewPageNames(prev => ({...prev, [quizId]: ''}));
    };

    const newQuizHandler = () => {
        setQuizzesInfos(prevState => [
            ...prevState,
            {
                id: uuid(),
                name: 'Questionnaire ' + (prevState.length + 1),
                dropdownOpen: false,
                pages: []
            }
        ]);
    };

    const dropDownOptHandler = (quizId, pageId = null) => {
        setQuizzesInfos(prevState => prevState.map(quiz => {
            if (quiz.id === quizId) {
                const updatedPages = quiz.pages.map(page => {
                    return {
                        ...page,
                        dropdownOpen: pageId === page.id ? !page.dropdownOpen : false
                    };
                });
                return {
                    ...quiz,
                    dropdownOpen: pageId ? false : !quiz.dropdownOpen,
                    pages: updatedPages
                };
            } else {
                return {
                    ...quiz,
                    dropdownOpen: false,
                    pages: quiz.pages.map(page => ({
                        ...page,
                        dropdownOpen: false
                    }))
                };
            }
        }));
        setCurrentSelection({quizId, pageId});
    };

    const deleteHandler = (quizId, pageId = null) => {
        setQuizzesInfos(prevState => {
            if (pageId) {
                return prevState.map(quiz => {
                    if (quiz.id === quizId) {
                        const updatedPages = quiz.pages.filter(page => page.id !== pageId);
                        return {...quiz, pages: updatedPages};
                    }
                    return quiz;
                });
            } else {
                return prevState.filter(quiz => quiz.id !== quizId);
            }
        });
    };


    return (
        <Box sx={{p: 1}}>
            <Typography align='center' variant='h5' sx={{mb: 2}} fontWeight='bold'>Questionnaires</Typography>
            <Stack alignItems="center" gap={1}>

                {quizzesInfos.map(quiz => (
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
                                 onClick={() => dropDownOptHandler(quiz.id)}>
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
                                    <DropDownTypography text="Supprimer" onClick={() => deleteHandler(quiz.id)}/>
                                </Box>
                            )}
                        </Box>
                        {currentSelection.quizId === quiz.id && (
                            <Stack alignItems='flex-start' gap={1} sx={{width: '100%'}}>
                                {quiz.pages.map(page => (
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
                                             onClick={() => dropDownOptHandler(quiz.id, page.id)}>
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
                                                                    onClick={() => deleteHandler(quiz.id, page.id)}/>
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
                                        value={newPageNames[quiz.id] || ''}
                                        onChange={(e) => handleNameChange(quiz.id, e.target.value)}
                                        placeholder="Nouvelle section"
                                        variant="standard"
                                        sx={{flexGrow: 1, pr: 1, pl: 3, width: '80%'}}
                                        size="small"
                                    />
                                    <IconButton onClick={() => newPageHandler(quiz.id)}
                                                sx={{width: '20%'}}>
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
