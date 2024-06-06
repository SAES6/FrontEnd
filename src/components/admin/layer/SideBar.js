import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch, useSelector} from "react-redux";
import {quizActions} from "../../../_store/_slices/quiz-slice";
import {
    deleteQuiz,
    deleteSection,
    getFirstSectionDetails,
    getQuizzesDetails,
    getSectionDetails,
} from "../../../_store/_actions/quiz-actions";
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
        zIndex: 1001,
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
                <Box sx={{display: "flex", justifyContent: "flex-end", mt: 3}}>
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
    const currentQuizId = useSelector((state) => state.quiz.currentQuizId);
    const quizzesInfos = useSelector((state) => state.quiz.quizzesInfos);

    const [newSectionName, setNewSectionName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [currentDeleteTarget, setCurrentDeleteTarget] = useState({id: null, isQuiz: false});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getQuizzesDetails());
    }, []);

    const newNameHandle = (name) => {
        setNewSectionName(name);
    };

    const newSectionHandler = () => {
        dispatch(quizActions.addSection(newSectionName || "Nouvelle section"));
        setNewSectionName("");
    };

    const newQuizHandler = () => {
        dispatch(quizActions.addQuiz());
    };

    const onClickSection = (quizId, sectionId,) => {
        dispatch(getSectionDetails(quizId, sectionId));
    };

    const onClickQuiz = (quizId, sectionId) => {
        dispatch(getFirstSectionDetails(quizId, sectionId));
    };

    const beforeDelete = (id, isQuiz) => {
        setIsOpen(true);
        setCurrentDeleteTarget({id, isQuiz});
    };

    const deleteHandler = () => {
        if (currentDeleteTarget.isQuiz) {
            dispatch(deleteQuiz(currentDeleteTarget.id));
        } else {
            dispatch(deleteSection(currentDeleteTarget.id));
        }
        setIsOpen(false);
    };

    return (
        <Stack p={2} backgroundColor='primary.main' sx={{ borderRadius: '15px' }}>
            <ModalConfirmation
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                deleteHandler={deleteHandler}
            />
            <Typography align="center" variant="h5" sx={{mb: 2}} fontWeight="bold">
                Questionnaires
            </Typography>
            <Stack alignItems="center" gap={1}>
                {quizzesInfos?.map((quiz) => (
                    <React.Fragment key={quiz.id + quiz.name}>
                        <InteractiveListItem
                            isQuiz={true}
                            item={quiz}
                            onClickHandler={() =>
                                onClickQuiz(
                                    quiz.id,
                                    quiz.sections.reduce((min, section) =>
                                        section.order < min.order ? section : min
                                    ).id,)}
                            deleteHandler={() => beforeDelete(quiz.id, true)}
                            moreSx={{box: {bgcolor: "red"}, typo: {pl: 2}}}
                        />
                        {currentQuizId === quiz.id && (
                            <Stack alignItems="flex-start" gap={1} sx={{width: "100%"}}>
                                {quiz.sections.map((section) => (
                                    <InteractiveListItem
                                        isQuiz={false}
                                        key={section.id}
                                        item={section}
                                        onClickHandler={() =>
                                            onClickSection(
                                                quiz.id,
                                                section.id,
                                                false,
                                                section.order
                                            )
                                        }
                                        deleteHandler={() => beforeDelete(section.id, false)}
                                        moreSx={{box: {}, typo: {pl: 3}}}
                                    />
                                ))}
                                <Box
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        border: "solid",
                                        borderRadius: "15px",
                                        borderColor: "red",
                                    }}
                                >
                                    <TextField
                                        value={newSectionName || ""}
                                        onChange={(e) => newNameHandle(e.target.value)}
                                        placeholder="Nouvelle section"
                                        variant="standard"
                                        sx={{flexGrow: 1, pr: 1, pl: 3, width: "80%"}}
                                        size="small"
                                    />
                                    <IconButton
                                        onClick={() => newSectionHandler()}
                                        sx={{width: "20%"}}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                </Box>
                            </Stack>
                        )}
                    </React.Fragment>
                ))}

                <AddCircleOutlineIcon
                    fontSize="large"
                    sx={{p: 1, width: "80%", borderRadius: "15px", cursor: "pointer"}}
                    onClick={() => newQuizHandler()}
                />
            </Stack>
        </Stack>
    );
};

export default React.memo(SideBar);
