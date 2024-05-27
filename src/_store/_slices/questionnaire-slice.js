import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionnaire: null,
    section: 1,
    totalSections: 1,
    progression: 0,
    responses: [],
};

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        setCurrentSection(state, action) {
            state.section = action.payload;
        },
        setTotalSections(state, action) {
            state.totalSections = action.payload;
        },
        setProgression(state, action) {
            state.progression = action.payload;
        },
        addResponse(state, action) {
            const { questionId, questionType, value } = action.payload;
            const existingResponseIndex = state.responses.findIndex(response => response.questionId === questionId);
            if (existingResponseIndex >= 0) {
                state.responses[existingResponseIndex] = { questionId, questionType, value };
            } else {
                state.responses.push({ questionId, questionType, value });
            }
        }
    },
});

export const { setCurrentSection, setTotalSections, setProgression, addResponse } = questionnaireSlice.actions;

export default questionnaireSlice;
