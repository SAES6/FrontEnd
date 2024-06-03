import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { theme } from '../../theme';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
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

const Questions = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
        const uniqueSections = [
          ...new Set(response.data.map((question) => question.section.order)),
        ];
        dispatch(
          setTotalSections({ id, totalSections: uniqueSections.length })
        );
        dispatch(
          setQuestionnaire({ id, totalSections: uniqueSections.length })
        );
      })
      .catch(() => {
        toast.error('Aucune question', {
          position: 'top-center',
          style: {
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '15px',
            textAlign: 'center',
          },
        });
      });
  };

  useEffect(() => {
    loadQuestions();
  }, [id]);

  const handleSetJournalist = () => {
    if (userRole === 'journalist') {
      setUserRole('user');
    } else {
      setUserRole('journalist');
    }
  };

  const handleValidateRole = () => {
    if (userRole === null) {
      let finalUserRole = 'user';
      localStorage.setItem('userRole', finalUserRole);
      setUserRole(finalUserRole);
      setModalRole(false);
    } else {
      localStorage.setItem('userRole', userRole);
      setUserRole(userRole);
      setModalRole(false);
    }
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
    Object.values(localResponses).forEach((response) => {
      dispatch(addResponse({ questionnaireId: id, ...response }));
    });

    if (currentSection >= totalSections) {
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection({ id, section: newSection }));
      navigate(`/summary/${id}`);
    } else {
      updateProgression(currentSection);
      const newSection = currentSection + 1;
      dispatch(setCurrentSection({ id, section: newSection }));
      setLocalResponses({});
    }
  };

  useEffect(() => {
    if (currentSection > totalSections) {
      navigate(`/summary/${id}`);
    }
    if (localStorage.getItem('userRole') != null) {
      setUserRole(localStorage.getItem('userRole'));
      setModalRole(false);
    } else {
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
