import { Grid, Button, Typography, useMediaQuery } from '@mui/material';
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
import { useDispatch, useSelector } from 'react-redux';

const Summary = () => {
  const themeQuestions = useTheme(theme);
  const screenSize = useMediaQuery('(min-width:1600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const questionnaireState = useSelector(
    (state) => state.questionnaire.questionnaires[id] || {}
  );
  const { responses = [] } = questionnaireState;

  const [questions, setQuestions] = useState([]);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transition: 'ease 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

  const loadQuestions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questionnaire/loadById?id=${id}`)
      .then((response) => {
        setQuestions(response.data);
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
    console.log(responses);
  }, [id]);

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
        {responses.map((question) => {
          if (question.questionType === 'text') {
            return (
              <QuestionOpen
                key={question.questionId}
                questionTitle={'Titre'}
                mode={'summary'}
                userResponse={'La vie de oim je suis trop fort en code'}
              >
                {
                  'Quisque porta et tortor eget suscipit. Nulla sit amet pharetra dui. Sed tristique condimentum lectus ac luctus. Cras varius sem magna, in laoreet lectus ultrices sit amet.'
                }
              </QuestionOpen>
            );
          }
          if (
            question.questionType === 'single_choice' ||
            question.questionType === 'multiple_choice'
          ) {
            return (
              <QuestionSimple
                key={question.questionId}
                questionTitle={'Titre de la question simple'}
                questionType={question.questionType}
                questionChoices={[
                  { id: 1, text: 'choix 1' },
                  { id: 2, text: 'choix 2' },
                  { id: 3, text: 'choix 3' },
                ]}
                mode={'summary'}
              >
                {
                  'Quisque porta et tortor eget suscipit. Nulla sit amet pharetra dui. Sed tristique condimentum lectus ac luctus. Cras varius sem magna, in laoreet lectus ultrices sit amet.'
                }
              </QuestionSimple>
            );
          }
          if (question.questionType === 'slider') {
            return (
              <QuestionEchelle
                key={question.questionId}
                questionTitle={'Titre mashala'}
                questionSliderMin={0}
                questionSliderMax={10}
                questionSliderGap={1}
                userResponse={5}
                mode={'summary'}
              >
                {'Lorem ipsum mala est gangx'}
              </QuestionEchelle>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default Summary;
