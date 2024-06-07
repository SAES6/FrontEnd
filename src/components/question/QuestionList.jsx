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
        maxWidth: screenSize ? '1500px' : '1300px',
      }}
    >
      {currentQuestions.map((question) => (
        <React.Fragment key={question.id}>
          {question.type === 'text' && (
            <QuestionOpen
              question={question}
              onResponseChange={(value) =>
                handleResponseChange(question.id, value)
              }
              mode={'question'}
              preview={false}
            />
          )}
          {(question.type === 'single_choice' ||
            question.type === 'multiple_choice') && (
            <QuestionSimple
              question={question}
              onResponseChange={(value) =>
                handleResponseChange(question.id, value)
              }
              mode={'question'}
              preview={false}
            />
          )}
          {question.type === 'slider' && (
            <QuestionEchelle
              question={question}
              onResponseChange={(value) =>
                handleResponseChange(question.id, value)
              }
              mode={'question'}
              preview={false}
            />
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default QuestionList;
