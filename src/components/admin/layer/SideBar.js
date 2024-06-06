import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { quizActions } from '../../../_store/_slices/quiz-slice';
import {
  getQuizDetails,
  getSectionDetails,
} from '../../../_store/_actions/quiz-actions';
import InteractiveListItem from './InteractiveListItem';

const ModalConfirmation = ({ isOpen, setIsOpen, deleteHandler }) => {
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
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-title' variant='h6' component='h2'>
          Confirmer la suppression
        </Typography>
        <Typography id='modal-description' sx={{ mt: 2 }}>
          Si vous poursouvez, l'entrée sera définitivement supprimée.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button color='primary' onClick={() => deleteHandler()}>
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
  const quizzesInfos = useSelector((state) => state.quiz.quizzesInfos);

  const [newSectionName, setNewSectionName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizDetails());
  }, []);

  const newNameHandle = (name) => {
    setNewSectionName(name);
  };

  const newSectionHandler = () => {
    dispatch(quizActions.addSection(newSectionName || 'Nouvelle section'));
    setNewSectionName('');
  };

  const newQuizHandler = () => {
    dispatch(quizActions.addQuiz());
  };

  const onClickModalHandler = (
    quizId,
    sectionId,
    isQuiz = false,
    sectionOrder
  ) => {
    console.log(sectionId);
    dispatch(getSectionDetails(quizId, sectionId, isQuiz, sectionOrder));
    setSelectedItem(sectionId);
  };

  const beforeDelete = (isQuiz) => {
    setIsOpen(true);
    setIsQuiz(isQuiz);
  };

  const deleteHandler = () => {
    dispatch(quizActions.deleteQuizOrSection(isQuiz));
    setIsOpen(false);
  };

  return (
    <Stack
      p={2}
      backgroundColor='primary.main'
      color='primary.contrastText'
      width={'250px'}
      minWidth={'250px'}
      sx={{ borderRadius: '15px' }}
      spacing={2}
    >
      <ModalConfirmation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteHandler={deleteHandler}
      />
      <Typography align='center' fontWeight='600' fontSize={'24px'}>
        Questionnaires
      </Typography>
      <Stack alignItems='center' gap={1}>
        {quizzesInfos?.map((quiz, index) => (
          <React.Fragment key={quiz.id + quiz.name}>
            <InteractiveListItem
              isQuiz={true}
              item={quiz}
              id={index}
              onClickHandler={() =>
                onClickModalHandler(
                  quiz.id,
                  quiz.sections.reduce((min, section) =>
                    section.order < min.order ? section : min
                  ).id,
                  true,
                  quiz.sections.reduce((min, section) =>
                    section.order < min.order ? section : min
                  ).order
                )
              }
              deleteHandler={() => beforeDelete(true)}
              selected={selectedItem === quiz.id}
            />
            {currentQuizId === quiz.id && (
              <Stack alignItems='flex-start' gap={1}>
                {quiz.sections.map((section, index) => (
                  <InteractiveListItem
                    isQuiz={false}
                    key={section.id}
                    item={section}
                    id={index}
                    onClickHandler={() =>
                      onClickModalHandler(
                        quiz.id,
                        section.id,
                        false,
                        section.order
                      )
                    }
                    deleteHandler={() => beforeDelete(false)}
                    moreSx={{ box: {}, typo: { pl: 3 } }}
                    selected={selectedItem === section.id}
                  />
                ))}
                <Box
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    width: '100%',
                    display: 'flex',
                    border: 'solid',
                    borderRadius: '15px',
                    borderColor: 'red',
                  }}
                >
                  <TextField
                    value={newSectionName || ''}
                    onChange={(e) => newNameHandle(e.target.value)}
                    placeholder='Nouvelle section'
                    variant='standard'
                    sx={{ flexGrow: 1, pr: 1, pl: 3, width: '80%' }}
                    size='small'
                  />
                  <IconButton
                    onClick={() => newSectionHandler()}
                    sx={{ width: '20%' }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Stack>
            )}
          </React.Fragment>
        ))}

        <AddCircleOutlineIcon
          fontSize='large'
          sx={{ p: 1, width: '80%', borderRadius: '15px', cursor: 'pointer' }}
          onClick={() => newQuizHandler()}
        />
      </Stack>
    </Stack>
  );
};

export default React.memo(SideBar);
