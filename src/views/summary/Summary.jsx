import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { theme } from '../../theme';
import QuestionOpen from '../../components/question/QuestionOpen';
import QuestionSimple from '../../components/question/QuestionSimple';
import QuestionEchelle from '../../components/question/QuestionEchelle';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGET from '../../hooks/useGET';

const Summary = () => {
  const themeSummary = useTheme(theme);
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

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (response?.status >= 200 || response?.status < 300) {
      setQuestions(response?.data);
    }
    console.log(questions);
  }, [response]);

  const getResponseForQuestion = (questionId) => {
    const response = responses.find((res) => res.questionId === questionId);
    return response ? response.value : '';
  };

  const handleFinishQuestionnaire = () => {
    navigate('/');
  };

  return (
    <Grid
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '50px 0',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      <Grid>
        {Object.entries(
          questions.reduce((sections, question) => {
            const section = question.page;
            if (!sections[section]) {
              sections[section] = [];
            }
            sections[section].push(question);
            return sections;
          }, {})
        ).map(([section, sectionQuestions]) => (
          <Grid
            key={section}
            sx={{
              width: screenSize ? '1500px' : '1300px',
              padding: '20px 25px',
              border: 'solid 1px',
              borderRadius: '15px',
              borderColor: themeSummary.palette.secondary.main,
              marginBottom: '40px',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                width: '100%',
                textAlign: 'center',
                paddingBottom: '15px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                color: themeSummary.palette.text.primary,
                borderBottom: 'solid 1px',
                borderBottomColor: theme.palette.secondary.main,
                marginBottom: '10px',
              }}
            >
              Section {section}
            </Typography>
            {sectionQuestions.map((question) => {
              if (question.type === 'text') {
                return (
                  <QuestionOpen
                    key={question.questionId}
                    questionTitle={question.title}
                    imgSrc={question.img_src}
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
                    imgSrc={question.img_src}
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
                    imgSrc={question.img_src}
                    userResponse={getResponseForQuestion(question.id)}
                    mode={'summary'}
                  >
                    {question.description}
                  </QuestionEchelle>
                );
              }
            })}
          </Grid>
        ))}
        <Button onClick={handleFinishQuestionnaire} variant='contained'>
          Terminer le formulaire
        </Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
