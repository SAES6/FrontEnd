import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  isQuizzDeployed,
  quizActions,
} from "../../../_store/_slices/quiz-slice";
import {
  deleteQuiz,
  deleteSection,
  getFirstSectionDetails,
  getQuizzesDetails,
  getSectionDetails,
} from "../../../_store/_actions/quiz-actions";
import InteractiveListItem from "./InteractiveListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalConfirmation = ({ isOpen, setIsOpen, deleteHandler }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "16px",
    width: "20rem",
    height: "10rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
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
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Si vous poursouvez, l'entrée sera définitivement supprimée.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button color="primary" onClick={() => deleteHandler()}>
            Je confirme
          </Button>
          <Button onClick={() => setIsOpen(false)} sx={{ ml: 2 }}>
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const SideBar = () => {
  const currentQuizId = useSelector((state) => state.quiz.currentQuizId);
  const currentSectionId = useSelector((state) => state.quiz.currentSectionId);
  const quizzesInfos = useSelector((state) => state.quiz.quizzesInfos);
  const isDeployed = useSelector(isQuizzDeployed);

  const [newSectionName, setNewSectionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentDeleteTarget, setCurrentDeleteTarget] = useState({
    id: null,
    isQuiz: false,
  });

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

  const onClickSection = (quizId, sectionId) => {
    dispatch(getSectionDetails(quizId, sectionId));
  };

  const onClickQuiz = (quizId, sectionId = null) => {
    dispatch(getFirstSectionDetails(quizId, sectionId));
  };

  const beforeDelete = (id, isQuiz) => {
    setIsOpen(true);
    setCurrentDeleteTarget({ id, isQuiz });
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
    <Stack
      p={2}
      backgroundColor="primary.main"
      color="primary.contrastText"
      width={"275px"}
      minWidth={"275px"}
      sx={{ borderRadius: "15px" }}
      gap={3}
    >
      {" "}
      <ModalConfirmation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteHandler={deleteHandler}
      />
      <Typography align="center" fontWeight="600" fontSize={"24px"}>
        Questionnaires
      </Typography>
      <Stack alignItems="center" gap={2}>
        {quizzesInfos?.map((quiz, index) => (
          <Stack width={"100%"} key={quiz.id + quiz.name}>
            <InteractiveListItem
              isQuiz={true}
              item={quiz}
              id={index}
              onClickHandler={() =>
                onClickQuiz(
                  quiz.id,
                  quiz.sections.reduce((min, section) =>
                    section.order < min.order ? section : min
                  ).id
                )
              }
              deleteHandler={() => beforeDelete(quiz.id, true)}
              selected={quiz.id === currentQuizId}
            />
            {currentQuizId === quiz.id && (
              <Stack
                alignItems="flex-start"
                gap={1}
                sx={{ width: "100%" }}
                pt={1}
              >
                {quiz.sections.map((section, index) => (
                  <InteractiveListItem
                    isQuiz={false}
                    key={section.id}
                    item={section}
                    id={index}
                    onClickHandler={() => onClickSection(quiz.id, section.id)}
                    deleteHandler={() => beforeDelete(section.id, false)}
                    moreSx={{ box: {}, typo: { pl: 3 } }}
                    selected={section.id === currentSectionId}
                  />
                ))}
                {!isDeployed && (
                  <Stack
                    direction={"row"}
                    gap={1}
                    justifyContent="space-between"
                    alignItems="center"
                    pl={"25px"}
                  >
                    <TextField
                      value={newSectionName || ""}
                      onChange={(e) => newNameHandle(e.target.value)}
                      placeholder="Nouvelle section"
                      sx={{
                        input: {
                          color: "background.main",
                          "::placeholder": {
                            color: "background.main75",
                          },
                        },
                      }}
                    />
                    <IconButton onClick={() => newSectionHandler()}>
                      <FontAwesomeIcon
                        icon={"fa-solid fa-plus-circle"}
                        fixedWidth
                        fontSize={20}
                        color="background"
                      />
                    </IconButton>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>
      <Stack
        borderTop={"1px solid"}
        borderColor={"primary.contrastText"}
        pt={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ cursor: "pointer" }}
        onClick={() => newQuizHandler()}
      >
        <IconButton color="background">
          <FontAwesomeIcon icon={"fa-solid fa-plus-circle"} fontSize={20} />
        </IconButton>
        <Typography fontSize={"16px"}>Ajouter un questionnaire</Typography>
      </Stack>
    </Stack>
  );
};

export default React.memo(SideBar);
