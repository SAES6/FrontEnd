import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { theme } from '../../theme';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import QuestionList from '../../components/question/QuestionList';
import QuestionnaireNavigation from '../../components/question/QuestionnaireNavigation';
import ProgressBar from '../../components/question/ProgressBar';
import RoleModal from '../../components/question/RoleModal';
import {
  questionnaireActions,
  selectCurrentSelection,
} from '../../_store/_slices/questionnaire-slice';
import useGET from '../../hooks/useGET';
import { postResponses } from '../../_store/_actions/questionnaire-actions';
import { userActions } from '../../_store/_slices/user-slice';

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const [response, setInitialRequest] = useGET();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentQuestionnaire = useSelector(selectCurrentSelection);
  const userRoleStored = useSelector((state) => state.user.roleUser);

  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [modalRole, setModalRole] = useState(false);

  const [localResponses, setLocalResponses] = useState([]);

  useEffect(() => {
    setInitialRequest({
      url: `/questionnaire/loadById?id=${id}`,
      errorMessage: 'Erreur lors du chargement des questions',
    });

    if (userRoleStored) setUserRole(userRoleStored);
    else setModalRole(true);
  }, []);

  useEffect(() => {
    if (response?.status >= 200 && response?.status < 300) {
      setQuestions(response.data);
      const uniqueSections = new Set(
        response.data.map((question) => question.section.id)
      );
      dispatch(
        questionnaireActions.setQuestionnaire({
          id: id,
          totalSections: uniqueSections.size,
        })
      );
    }
  }, [response, dispatch, id]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionnaire) {
      setCurrentQuestions(
        questions.filter(
          (question) =>
            question.section.order === currentQuestionnaire.currentSection
        )
      );
    }
  }, [questions, currentQuestionnaire]);

  const handleResponseChange = (questionId, value) => {
    setLocalResponses((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.questionId === questionId
      );

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, value: value } : item
        );
      } else {
        return [...prev, { questionId, value }];
      }
    });
  };

  const nextSection = () => {
    if (currentQuestions.length != localResponses.length) {
      toast.error(
        'Veuillez répondre à toutes les questions avant de continuer.',
        {
          position: 'top-center',
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '15px',
            textAlign: 'center',
          },
        }
      );
      return;
    }
    if (
      currentQuestionnaire &&
      currentQuestionnaire.currentSection >= currentQuestionnaire.totalSections
    ) {
      dispatch(postResponses(localResponses, id, navigate));
    } else if (currentQuestionnaire) {
      const newSection = currentQuestionnaire.currentSection + 1;
      dispatch(
        questionnaireActions.nextSectionHandler({
          responses: localResponses,
          progression:
            ((newSection - 1) / currentQuestionnaire.totalSections) * 100,
          currentSection: newSection,
        })
      );
      setLocalResponses([]);
    }
  };

  const handleSetJournalist = () => {
    dispatch(userActions.setRoleUser('journalist'));
    setUserRole('journalist');
  };

  const handleValidateRole = () => {
    if (!userRole) dispatch(userActions.setRoleUser('user'));
    setModalRole(false);
  };

  return (
    <Grid
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      <QuestionList
        screenSize={screenSize}
        currentQuestions={currentQuestions}
        handleResponseChange={handleResponseChange}
      />
      {currentQuestionnaire && (
        <>
          <QuestionnaireNavigation
            screenSize={screenSize}
            themeQuestions={themeQuestions}
            currentSection={currentQuestionnaire.currentSection}
            nextSection={nextSection}
            totalSections={currentQuestionnaire.totalSections}
          />
          <ProgressBar
            themeQuestions={themeQuestions}
            progression={currentQuestionnaire.progression}
          />
        </>
      )}
      <RoleModal
        modalRole={modalRole}
        userRole={userRole}
        handleSetJournalist={handleSetJournalist}
        handleValidateRole={handleValidateRole}
        themeQuestions={themeQuestions}
      />
    </Grid>
  );
};

export default Questions;
