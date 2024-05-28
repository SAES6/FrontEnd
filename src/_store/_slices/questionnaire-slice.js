import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionnaires: {},
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setQuestionnaire(state, action) {
      const { id, totalSections } = action.payload;
      if (!state.questionnaires[id]) {
        state.questionnaires[id] = {
          currentSection: 1,
          totalSections,
          progression: 0,
          responses: [],
        };
      }
    },
    setCurrentSection(state, action) {
      const { id, section } = action.payload;
      if (state.questionnaires[id]) {
        state.questionnaires[id].currentSection = section;
      }
    },
    setTotalSections(state, action) {
      const { id, totalSections } = action.payload;
      if (state.questionnaires[id]) {
        state.questionnaires[id].totalSections = totalSections;
      }
    },
    setProgression(state, action) {
      const { id, progression } = action.payload;
      if (state.questionnaires[id]) {
        state.questionnaires[id].progression = progression;
      }
    },
    addResponse(state, action) {
      const { questionnaireId, questionId, questionType, value } =
        action.payload;
      if (state.questionnaires[questionnaireId]) {
        const existingResponseIndex = state.questionnaires[
          questionnaireId
        ].responses.findIndex((response) => response.questionId === questionId);
        if (existingResponseIndex >= 0) {
          state.questionnaires[questionnaireId].responses[
            existingResponseIndex
          ] = { questionId, questionType, value };
        } else {
          state.questionnaires[questionnaireId].responses.push({
            questionId,
            questionType,
            value,
          });
        }
      }
    },
    reset: () => initialState,
  },
});

export const {
  setQuestionnaire,
  setCurrentSection,
  setTotalSections,
  setProgression,
  addResponse,
} = questionnaireSlice.actions;

export default questionnaireSlice;
