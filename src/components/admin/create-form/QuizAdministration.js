import React, { useEffect, useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NewQuestion from './NewQuestion';
import { Stack, Box, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  deployOrStopQuiz,
  postSectionInfos,
} from '../../../_store/_actions/quiz-actions';
import NewQuiz from './NewQuiz';
import PreviewQuestion from './PreviewQuestion';
import { toast } from 'react-toastify';
import {
  isQuizzDeployed,
  isReadyToDeploy,
  selectCurrentSectionOrder,
} from '../../../_store/_slices/quiz-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const QuizAdministration = () => {
  const savedSectionInfos = useSelector(
    (state) => state.quiz.currentSectionInfos
  );
  const currentSectionId = useSelector((state) => state.quiz.currentSectionId);
  const currentSectionOrder = useSelector(selectCurrentSectionOrder);

  const isReadyToDeployQuiz = useSelector(isReadyToDeploy);

  const isQuizzDeploy = useSelector(isQuizzDeployed);

  const [sectionInfos, setSectionInfos] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  const questionRefs = useRef([]);
  const quizInfoRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    setSectionInfos(savedSectionInfos.questions);
    console.log('load');
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
    if (
      quizInfoRef.current &&
      (!quizInfos.name || !quizInfos.duree || !quizInfos.description)
    )
      toast.error('Merci de replire les informations du questionnaire', {
        position: 'top-center',
        style: {
          fontFamily: 'Poppins, sans-serif',
          borderRadius: '15px',
          textAlign: 'center',
        },
      });
    else {
      const questions = questionRefs.current.map((ref) =>
        ref.current?.getData()
      );
      console.log(quizInfos || {}, questions);
      dispatch(postSectionInfos({ quizInfos: quizInfos || {}, questions }));
    }
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

  const previewHandler = () => setIsPreview(!isPreview);

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
          justifyContent: 'flex-start',
        }}
      >
        {sectionInfos.length > 0 && (
          <Button
            variant={isQuizzDeploy ? 'outlined' : 'contained'}
            sx={{ mr: 1 }}
            startIcon={
              <FontAwesomeIcon
                icon={isQuizzDeploy ? 'fa-solid fa-stop' : 'fa-solid fa-play'}
                fontSize='16px'
                fixedWidth
              />
            }
            onClick={() => {
              if (!isReadyToDeployQuiz) {
                toast.error(
                  'Veuillez sauvegarder toutes les sections du questionnaire',
                  {
                    position: 'top-center',
                    style: {
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '15px',
                      textAlign: 'center',
                    },
                  }
                );
              } else {
                dispatch(deployOrStopQuiz());
              }
            }}
          >
            {isQuizzDeploy ? 'Arrêter' : 'Déployer'}
          </Button>
        )}

        {!isPreview && sectionInfos.length > 0 && !isQuizzDeploy && (
          <Button onClick={() => gatherData()} variant='contained'>
            Sauvegarder
          </Button>
        )}
        {sectionInfos.length > 0 && !isQuizzDeploy && (
          <Button onClick={previewHandler} variant='contained' sx={{ ml: 1 }}>
            {isPreview ? 'Édition' : 'Prévisualiser'}
          </Button>
        )}
      </Box>
      {(typeof currentSectionOrder === 'string'
        ? parseInt(currentSectionOrder) === 1
        : currentSectionOrder === 1) &&
        !isPreview &&
        !isQuizzDeploy && <NewQuiz ref={quizInfoRef} />}
      {sectionInfos.length > 0 &&
        sectionInfos.map((section, index) => (
          <React.Fragment key={section.id + section.order}>
            {!isPreview && !isQuizzDeploy && (
              <NewQuestion
                ref={questionRefs.current[index]}
                handleClose={() => handleClose(index)}
                index={index}
                sectionInfos={section}
              />
            )}
            {(isPreview || isQuizzDeploy) && (
              <PreviewQuestion sectionInfos={section} />
            )}
          </React.Fragment>
        ))}
      {!isPreview && currentSectionId && !isQuizzDeploy && (
        <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
          <IconButton
            onClick={addNewQuestionHandler}
            color='primary'
            sx={{ width: 'fit-content' }}
          >
            <FontAwesomeIcon icon='fa-solid fa-plus-circle' fontSize={'34px'} />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default QuizAdministration;
