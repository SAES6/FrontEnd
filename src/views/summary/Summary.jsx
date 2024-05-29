import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { theme } from '../../theme';
import QuestionOpen from '../../components/QuestionOpen';
import QuestionSimple from '../../components/QuestionSimple';
import QuestionEchelle from '../../components/QuestionEchelle';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGET from '../../hooks/useGET';

const Summary = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [response, setRequest] = useGET({
    url: `/questionnaire/loadById?id=${id}`,
    data: {},
    api: process.env.REACT_APP_API_URL,
  });

  const questionnaireState = useSelector(
    (state) => state.questionnaire.questionnaires[id] || {}
  );
  const { responses = [] } = questionnaireState;
  console.log(responses);

  const [questions, setQuestions] = useState([]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: 'ease 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

  useEffect(() => {
    if (response?.status >= 200 || response?.status < 300) {
      setQuestions(response?.data);
    }
  }, [response]);

  const getResponseForQuestion = (questionId) => {
    const response = responses.find((res) => res.questionId === questionId);
    return response ? response.value : '';
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
      <Grid
        sx={{
          padding: '40px 0 20px',
        }}
      >
        {questions.map((question) => {
          if (question.type === 'text') {
            return (
              <QuestionOpen
                key={question.questionId}
                questionTitle={question.title}
                mode={'summary'}
                userResponse={getResponseForQuestion(question.id)}
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
                key={question.questionId}
                questionTitle={question.title}
                questionType={question.questionType}
                questionChoices={question.choices}
                mode={'summary'}
                userResponse={getResponseForQuestion(question.id)}
              >
                {question.description}
              </QuestionSimple>
            );
          }
          if (question.type === 'slider') {
            return (
              <QuestionEchelle
                key={question.questionId}
                questionTitle={question.title}
                questionSliderMin={question.slider_min}
                questionSliderMax={question.slider_max}
                questionSliderGap={question.slider_gap}
                userResponse={getResponseForQuestion(question.id)}
                mode={'summary'}
              >
                {question.description}
              </QuestionEchelle>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default Summary;
