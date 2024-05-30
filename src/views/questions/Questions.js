import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  Modal,
  Checkbox,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { theme } from '../../theme';
import QuestionOpen from '../../components/QuestionOpen';
import QuestionSimple from '../../components/QuestionSimple';
import QuestionEchelle from '../../components/QuestionEchelle';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
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
  // recupere l'id du questionnaire via l'url
  const getLocalStorageKey = (id) => `currentSection_${id}`;

  const [localResponses, setLocalResponses] = useState({});
  const loadQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
        const uniqueSections = [
          ...new Set(response.data.map((question) => question.page)),
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
        .filter((question) => question.page === currentSection)
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
    console.log('mdr5555');
    console.log(localStorage.getItem('userRole'));
    if (localStorage.getItem('userRole') != null) {
      setUserRole(localStorage.getItem('userRole'));
      setModalRole(false);
    } else {
      console.log('mdr6');
      setModalRole(true);
    }
  }, []);

  useEffect(() => {
    console.log('mdr');
    console.log(currentQuestions);
  }, [currentQuestions]);

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
      <Grid
        sx={{
          padding: '40px 0 20px',
        }}
      >
        {currentQuestions.map((question) => {
          if (question.type === 'text') {
            return (
              <QuestionOpen
                key={question.id}
                questionTitle={question.title}
                onResponseChange={(value) =>
                  handleResponseChange(question.id, question.type, value)
                }
                mode={'question'}
              >
                {question.description}
              </QuestionOpen>
            );
          }
          if (
            question.type === 'single_choice' ||
            question.type === 'multiple_choice'
          ) {
            return (
              <QuestionSimple
                key={question.id}
                questionTitle={question.title}
                questionType={question.type}
                questionChoices={question.choices}
                onResponseChange={(value) =>
                  handleResponseChange(question.id, question.type, value)
                }
                mode={'question'}
              >
                {question.description}
              </QuestionSimple>
            );
          }
          if (question.type === 'slider') {
            return (
              <QuestionEchelle
                key={question.id}
                questionTitle={question.title}
                questionSliderMin={question.slider_min}
                questionSliderMax={question.slider_max}
                questionSliderGap={question.slider_gap}
                onResponseChange={(value) =>
                  handleResponseChange(question.id, question.type, value)
                }
                mode={'question'}
              >
                {question.description}
              </QuestionEchelle>
            );
          }
        })}
      </Grid>
      <Grid
        sx={{
          padding: '20px 0 40px',
          width: screenSize ? '1500px' : '1300px',
        }}
      >
        <Grid>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '24px',
              color: themeQuestions.palette.text.secondary,
            }}
          >
            Prochaine section :
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '24px',
              fontWeight: '600',
              lineHeight: '24px',
              color: themeQuestions.palette.primary.main,
            }}
          >
            Section {currentSection + 1}
          </Typography>
        </Grid>
        <Button
          type='submit'
          variant='contained'
          sx={{
            mt: 3,
            mb: 2,
          }}
          onClick={nextSection}
        >
          Valider mes réponses
        </Button>
      </Grid>
      <Grid
        sx={{
          width: '100%',
          minHeight: '10px',
          position: 'fixed',
          bottom: 0,
          backgroundColor: themeQuestions.palette.secondary.main,
        }}
      >
        <Grid
          sx={{
            transition: 'ease 0.5s',
            width: `${progression}%`,
            height: '10px',
            position: 'fixed',
            borderRadius: '0 15px 15px 0',
            backgroundColor: themeQuestions.palette.primary.main,
            bottom: 0,
          }}
        />
      </Grid>
      <Modal open={modalRole}>
        <Grid
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            bgcolor: 'background.paper',
            borderRadius: '15px',
            padding: '20px 25px',
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <Grid
            container
            alignItems='center'
            justifyContent='space-between'
            sx={{ mb: 3, width: '100%' }}
          >
            <Grid item xs={12}>
              <Typography
                variant='h6'
                component='h2'
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '36px',
                  color: '#0E1419',
                  textAlign: 'center',
                }}
              >
                Avant de commencer...
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              mt: 2,
              padding: '10px 15px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '24px',
              maxWidth: '500px',
            }}
          >
            Vous allez participer à votre premier questionnaire. Nous avons
            besoin d’en savoir plus sur votre statut.
          </Typography>
          <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            sx={{
              mt: 3,
              padding: '15px 20px',
              borderRadius: '15px',
              width: '60%',
              minWidth: '300px',
              position: 'relative',
              backgroundColor: themeQuestions.palette.primary.main,
              flexWrap: 'nowrap',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
              }}
            >
              <Checkbox
                checked={userRole === 'journalist'}
                onChange={() => handleSetJournalist()}
                icon={
                  <CheckBoxOutlineBlankIcon
                    sx={{
                      color: themeQuestions.palette.primary.contrastText,
                    }}
                  />
                }
                checkedIcon={
                  <CheckBoxIcon
                    sx={{
                      color: themeQuestions.palette.primary.contrastText,
                    }}
                  />
                }
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '36px',
                  padding: '0',
                  mr: 1,
                  color: themeQuestions.palette.primary.contrastText,
                }}
              />
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '36px',
                  color: themeQuestions.palette.primary.contrastText,
                }}
              >
                Je suis journaliste
              </Typography>
            </Grid>
            <Grid
              sx={{
                position: 'absolute',
                right: -20, // Adjust position as needed
                alignItems: 'center',
                justifyContent: 'center',
                opacity: '0.5',
                height: '100%',
              }}
            >
              <FontAwesomeIcon
                icon='fa-solid fa-user-secret'
                color={themeQuestions.palette.primary.contrastText}
                style={{ fontSize: '70px' }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '24px',
              maxWidth: '500px',
              textAlign: 'center',
              opacity: '0.5',
              color: themeQuestions.palette.text.secondary,
            }}
          >
            Nous comptons sur votre bonne foi !
          </Typography>
          <Button
            onClick={handleValidateRole}
            sx={{
              mt: 3,
            }}
            variant='contained'
          >
            Continuer
          </Button>
        </Grid>
      </Modal>
    </Grid>
  );
};

export default Questions;
