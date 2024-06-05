import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentQuestionnaireId: null,
    questionnaires: [],
};

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        setCurrentQuestionnaireId(state, action) {
            state.currentQuestionnaireId = action.payload;
        },
        setQuestionnaire(state, action) {
            const existingQuestionnaire = state.questionnaires.find(q => q.id === parseInt(action.payload.id));
            if (!existingQuestionnaire) {
                state.currentQuestionnaireId = parseInt(action.payload.id);
                state.questionnaires = [
                    ...state.questionnaires,
                    {
                        id: parseInt(action.payload.id),
                        currentSection: 1,
                        totalSections: action.payload.totalSections,
                        progression: 0,
                        responses: [],
                    }
                ];
            }
        },
        setCurrentSection(state, action) {
            const currentQuestionnaires = state.questionnaires.find(q => q.id === state.currentQuestionnaireId);
            if (currentQuestionnaires) {
                currentQuestionnaires.currentSection = action.payload;
            }
        },
        setTotalSections(state, action) {
            const currentQuestionnaires = state.questionnaires.find(q => q.id === state.currentQuestionnaireId);
            if (currentQuestionnaires) {
                currentQuestionnaires.totalSections = action.payload;
            }
        },
        setProgression(state, action) {
            const currentQuestionnaires = state.questionnaires.find(q => q.id === state.currentQuestionnaireId);
            if (currentQuestionnaires) {
                currentQuestionnaires.progression = action.payload;
            }
        },
        addResponse(state, action) {
            const currentQuestionnaire = state.questionnaires.find(q => q.id === state.currentQuestionnaireId);
            if (currentQuestionnaire) {
                currentQuestionnaire.responses = [...currentQuestionnaire.responses, ...action.payload];
            }
        },
        nextSectionHandler(state, action) {
            const currentQuestionnaire = state.questionnaires.find(q => q.id === state.currentQuestionnaireId);
            if (currentQuestionnaire) {
                currentQuestionnaire.responses = action.payload.responses;
                currentQuestionnaire.progression = action.payload.progression;
                currentQuestionnaire.currentSection = action.payload.currentSection;
            }
        },
        reset: () => initialState,
    }
});

const selectQuestionnaires = state => state.questionnaire.questionnaires;
const selectCurrentQuestionnaireId = state => state.questionnaire.currentQuestionnaireId;

export const selectCurrentSelection = createSelector(
    [selectQuestionnaires, selectCurrentQuestionnaireId],
    (questionnaires, currentQuestionnaireId) => questionnaires.find(q => q.id === currentQuestionnaireId)
);

export const getCurrentFieldCoords = (state) => {
    if (state.questionnaire.questionnaires) {
        const existingQestionnaire = state.questionnaire.questionnaires.find(q => q.id === state.questionnaire.currentQuestionnaireId);
        if (existingQestionnaire) {
            return existingQestionnaire.responses;
        }
        return null;
    }
};

export const questionnaireActions = questionnaireSlice.actions;

export default questionnaireSlice;
