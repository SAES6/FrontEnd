import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { theme } from '../../theme';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuestionList from '../../components/question/QuestionList';
import QuestionnaireNavigation from '../../components/question/QuestionnaireNavigation';
import ProgressBar from '../../components/question/ProgressBar';
import RoleModal from '../../components/question/RoleModal';
import {
  setQuestionnaire,
  setCurrentSection,
  setTotalSections,
  setProgression,
  addResponse,
} from '../../_store/_slices/questionnaire-slice';
import { toast } from 'react-toastify';
import useGET from '../../hooks/useGET';
import usePost from '../../hooks/usePOST';
import { postResponses } from '../../_store/_actions/questionnaire-actions';
import { userActions } from '../../_store/_slices/user-slice';

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const [response, setInitialRequest] = useGET();
  const [postReponse, setInitialPostRequest] = usePost();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const questionnaireState = useSelector(
    (state) => state.questionnaire.questionnaires[id] || {}
  );
  const {
    currentSection = 1,
    totalSections = 1,
    progression = 0,
    responses = [],
  } = questionnaireState;

  const [questions, setQuestions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [modalRole, setModalRole] = useState(false);

  const [localResponses, setLocalResponses] = useState({});

  const loadQuestions = () => {
    setInitialRequest({
      url: `/questionnaire/loadById?id=${id}`,
      errorMessage: 'Erreur lors du chargement des questions',
    });
  };

  useEffect(() => {
    if (response && response.status >= 200 && response.status < 300) {
      setQuestions(response.data);
      console.log(response.data);
      const uniqueSections = [
        ...new Set(response.data.map((question) => question.section.id)),
      ];
      // dispatch(setTotalSections({ id, totalSections: uniqueSections.length }));
      dispatch(setQuestionnaire({ id, totalSections: uniqueSections.length }));
    }
  }, [response]);

  useEffect(() => {
    loadQuestions();
    console.log(questionnaireState);
  }, [id]);

  const handleSetJournalist = () => {
    if (userRole === 'journalist') {
      setUserRole('user');
    } else {
      setUserRole('journalist');
    }
  };

  const handleValidateRole = () => {
    // localStorage.setItem('userRole', finalUserRole);
    dispatch(userActions.setRoleUser(userRole && 'user'));
    setUserRole(userRole && 'user');
    setModalRole(false);
  };

  useEffect(() => {
    if (questions.length > 0) {
      const array = questions
        .filter((question) => question.section.order === currentSection)
        .sort((a, b) => a.order - b.order);
      setCurrentQuestions(array);
    }
  }, [questions, currentSection]);

  const handleResponseChange = (questionId, questionType, value) => {
    setLocalResponses((prev) => ({
      ...prev,
      [questionId]: { questionId, questionType, value },
    }));
  };

  const updateProgression = (newSection) => {
    const newProgression = (newSection / totalSections) * 100;
    dispatch(setProgression({ id, progression: newProgression }));
  };

  const nextSection = () => {
    if (currentSection >= totalSections) {
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(postResponses(localResponses, id, navigate));
      // dispatch(setCurrentSection({ id, section: newSection }));
      // setInitialPostRequest({
      //   id: 'insertResponse',
      //   url: `/response/${userToken}/${userRole}`,
      //   data: {
      //     responses: JSON.stringify(responses),
      //   },
      //   errorMessage: "Erreur lors de l'ajout des réponses de l'utilisateur",
      // });
      // navigate(`/summary/${id}`);
    } else {
      Object.values(localResponses).forEach((response) => {
        dispatch(addResponse({ questionnaireId: id, ...response }));
      });
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection({ id, section: newSection }));
      setLocalResponses({});
    }
  };

  useEffect(() => {
    if (postReponse?.status >= 200 && postReponse?.status < 300) {
      toast.success('Réponses ajoutés avec succès', {
        position: 'top-center',
        style: {
          fontFamily: 'Poppins, sans-serif',
          borderRadius: '15px',
          textAlign: 'center',
        },
      });
      navigate(`/summary/${id}`);
    }
  }, [postReponse]);

  useEffect(() => {
    if (currentSection > totalSections) {
      navigate(`/summary/${id}`);
    }
    if (localStorage.getItem('userRole') != null) {
      setUserRole(localStorage.getItem('userRole'));
      setModalRole(false);
    } else {
      console.log('mdr6');
      setModalRole(true);
    }
  }, []);

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
      <QuestionnaireNavigation
        screenSize={screenSize}
        themeQuestions={themeQuestions}
        currentSection={currentSection}
        nextSection={nextSection}
      />
      <ProgressBar themeQuestions={themeQuestions} progression={progression} />
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
