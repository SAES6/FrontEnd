import React, {useEffect, useState} from "react";
import {Box, Button, IconButton, Modal, Stack, TextField, Typography} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {quizActions} from "../../../_store/_slices/quiz-slice";
import {getQuizOrPageDetails} from "../../../_store/_actions/quiz-actions";
import InteractiveListItem from "./InteractiveListItem";

const ModalConfirmation = ({isOpen, setIsOpen, deleteHandler}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '16px',
        width: '20rem',
        height: '10rem',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        zIndex: 1001
    };

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Confirmer la suppression
                </Typography>
                <Typography id="modal-description" sx={{mt: 2}}>
                    Si vous poursouvez, l'entrée sera définitivement supprimée.
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 3}}>
                    <Button color="primary" onClick={() => deleteHandler()}>
                        Je confirme
                    </Button>
                    <Button onClick={() => setIsOpen(false)} sx={{ml: 2}}>
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

const SideBar = () => {
    const currentQuizId = useSelector(state => state.quiz.currentQuizId);
    const quizzesInfos = useSelector(state => state.quiz.quizzesInfos);

    const [newPageName, setNewPageName] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    // todo useEffect for query the list of quiz

    const newNameHandle = (name) => {
        setNewPageName(name);
    };

    const newPageHandler = () => {
        dispatch(quizActions.addPage(newPageName || 'Nouvelle section'));
        setNewPageName('');
    };

    const newQuizHandler = () => {
        dispatch(quizActions.addQuiz());
    };

    const onClickModalHandler = (quizId, pageId = null) => {
        dispatch(getQuizOrPageDetails(quizId, pageId));
    };

    const beforeDelete = () => {
        setIsOpen(true);
    };

    const deleteHandler = () => {
        dispatch(quizActions.deleteQuizOrPage());
        setIsOpen(false)
    };

    console.log(isOpen)
    return (
        <Box sx={{p: 1}}>
            <ModalConfirmation isOpen={isOpen} setIsOpen={setIsOpen} deleteHandler={deleteHandler}/>
            <Typography align='center' variant='h5' sx={{mb: 2}} fontWeight='bold'>Questionnaires</Typography>
            <Stack alignItems="center" gap={1}>

                {quizzesInfos?.map(quiz => (
                    <React.Fragment key={quiz.id + quiz.name}>
                        <InteractiveListItem
                            item={quiz}
                            onClickHandler={() => onClickModalHandler(quiz.id)}
                            deleteHandler={beforeDelete}
                            moreSx={{box: {bgcolor: 'red'}, typo: {pl: 2}}}
                        />
                        {currentQuizId === quiz.id && (
                            <Stack alignItems='flex-start' gap={1} sx={{width: '100%'}}>
                                {quiz.pages.slice().sort((a, b) => a.pos - b.pos).map(page => (
                                    <InteractiveListItem
                                        item={page}
                                        onClickHandler={() => onClickModalHandler(quiz.id, page.id)}
                                        deleteHandler={beforeDelete}
                                        moreSx={{box: {}, typo: {pl: 3}}}
                                    />
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
                                        value={newPageName || ''}
                                        onChange={(e) => newNameHandle(e.target.value)}
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
