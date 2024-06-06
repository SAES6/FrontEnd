import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewQuestion from './NewQuestion';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postSectionInfos } from '../../../_store/_actions/quiz-actions';
import NewQuiz from './NewQuiz';
import { Preview } from '@mui/icons-material';
import PreviewQuestion from './PreviewQuestion';
import { quizActions } from '../../../_store/_slices/quiz-slice';
const QuizAdministration = () => {
  const savedSectionInfos = useSelector(
    (state) => state.quiz.currentSectionInfos
  );

  const currentSectionId = useSelector((state) => state.quiz.currentSectionId);
  const currentSectionOrder = useSelector(
    (state) => state.quiz.currentSectionOrder
  );
  console.log('currentSectionId', currentSectionId);
  const [sectionInfos, setSectionInfos] = useState([]);
  const quizzInfos = useSelector((state) => state.quiz.quizzesInfos);
  const currentQuizId = useSelector((state) => state.quiz.currentQuizId);
  const [isPreview, setIsPreview] = useState(false);
  const [quizInfos, setQuizInfos] = useState({
    name: '',
    duree: 0,
    description: '',
  });

  const changeQuizzInfos = (newName, duree, description) => {
    if (duree) setQuizInfos((prevState) => ({ ...prevState, duree: duree }));
    if (description)
      setQuizInfos((prevState) => ({ ...prevState, description: description }));
    if (newName) {
      setQuizInfos((prevState) => ({ ...prevState, name: newName }));
      dispatch(quizActions.rename({ isQuiz: true, name: newName }));
    }
  };

  useEffect(() => {
    if (currentQuizId) {
      // change seulement le name de quizInfos
      const name = quizzInfos.find((quiz) => quiz.id === currentQuizId).name;
      setQuizInfos((prevState) => ({ ...prevState, name }));
    }
  }, [quizzInfos]);

  const questionRefs = useRef([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setSectionInfos(savedSectionInfos.questions);
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

    dispatch(postSectionInfos({ quizInfos, questions: allData }));
  };

  const addNewQuestionHandler = () => {
    setSectionInfos((prevState) => [
      ...prevState,
      { id: prevState.length + 1, order: prevState.length + 1 },
    ]);
    questionRefs.current.push(React.createRef());
  };

  const handleClose = (order) => {
    setSectionInfos((prevState) => {
      const newArray = [...prevState];
      newArray.splice(order, 1);

      return newArray.map((item, index) => {
        return { ...item, order: index + 1 };
      });
    });
  };

  const previewHandler = () => {
    setIsPreview(!isPreview);
  };

  return (
    <Stack
      className={'sneakyScroll'}
      sx={{ width: '100%', height: '100%', overflow: 'auto' }}
      spacing={5}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {!isPreview && sectionInfos.length > 0 && (
          <Button onClick={() => gatherData()} variant='contained'>
            Sauvegarder
          </Button>
        )}
        {sectionInfos.length > 0 && (
          <Button onClick={previewHandler} variant='contained' sx={{ ml: 1 }}>
            {isPreview ? 'Édition' : 'Prévisualiser'}
          </Button>
        )}
      </Box>
      {currentSectionOrder === 1 && !isPreview && (
        <NewQuiz setQuizInfos={changeQuizzInfos} quizInfos={quizInfos} />
      )}
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
            {isPreview && <PreviewQuestion sectionInfos={section} />}
          </React.Fragment>
        ))}
      {!isPreview && currentSectionId && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton onClick={addNewQuestionHandler}>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default QuizAdministration;
