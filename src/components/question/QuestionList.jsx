import React from 'react';
import { Grid } from '@mui/material';
import QuestionOpen from '../../components/question/QuestionOpen';
import QuestionSimple from '../../components/question/QuestionSimple';
import QuestionEchelle from '../../components/question/QuestionEchelle';

const QuestionList = ({
  screenSize,
  currentQuestions,
  handleResponseChange,
}) => {
  return (
    <Grid
      sx={{
        padding: '40px 0 20px',
        width: screenSize ? '1500px' : '1300px',
      }}
    >
      {currentQuestions.map((question) => {
        if (question.type === 'text') {
          return (
            <QuestionOpen
              key={question.id}
              questionTitle={question.title}
              imgSrc={question.img_src}
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
              imgSrc={question.img_src}
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
              imgSrc={question.img_src}
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
  );
};

export default QuestionList;
