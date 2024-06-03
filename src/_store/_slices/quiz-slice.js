import {createSelector, createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

const initialState = {
    currentQuizId: null,
    currentSectionId: null,
    quizzesInfos: [],
    currentQuizInfos: {
        id: null,
        name: '',
        dropdownOpen: false,
        sections: [] // {id: 6494984, order: 1, name: 'Section 1', dropdownOpen: false}
    },
    currentSectionInfos: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setCurrentQuizId(state, action) {
            state.currentQuizId = action.payload;
            state.currentSectionId = initialState.currentSectionId;
        },
        setCurrentSectionId(state, action) {
            state.currentSectionId = action.payload;
        },
        setCurrentIds(state, action) {
            state.currentQuizId = action.payload.quizId;
            state.currentSectionId = action.payload.sectionId;
        },
        setCurrentQuizInfos(state, action) {

        },
        setCurrentSectionInfos(state, action) {
            state.currentSectionInfos = action.payload;
            state.currentSectionId = action.payload.id;
        },
        setQuizzesAndCurrentSectionInfos(state, action) {
            state.quizzesInfos = action.payload.quizzesInfos;
            state.currentSectionInfos = action.payload.firstSectionDetails;
            state.currentQuizId = action.payload.quizzesInfos[0].id;
            state.currentSectionId = action.payload.firstSectionDetails.id;
        },
        setQuizzesInfos(state, action) {
            state.quizzesInfos = action.payload;
        },
        addQuiz(state) {
            const newId = uuid();
            const newQuiz = {
                id: newId,
                name: 'Questionnaire ' + (state.quizzesInfos.length + 1),
                dropdownOpen: true,
                sections: []
            };
            state.quizzesInfos = state.quizzesInfos.map(quiz => ({...quiz, dropdownOpen: false}))
            state.quizzesInfos.push(newQuiz);
            state.currentQuizInfos = newQuiz;
            state.currentQuizId = newId;
        },
        addSection(state, action) {
            const newSection = {id: uuid(), name: action.payload, order: state.currentQuizInfos.sections.length};
            state.currentQuizInfos.sections.push(newSection);

            const existingQuiz = state.quizzesInfos.find(item => item.id === state.currentQuizId);
            if (existingQuiz) existingQuiz.sections.push(newSection);
        },
        deleteQuizOrSection(state) {
            const quizId = state.currentQuizId;
            const sectionId = state.currentSectionId;

            if (sectionId) {
                state.quizzesInfos = state.quizzesInfos.map(quiz => {
                    if (quiz.id === quizId) {
                        const updatedSections = quiz.sections.filter(section => section.id !== sectionId);
                        return {...quiz, sections: updatedSections};
                    }
                    return quiz;
                });
            } else {
                state.quizzesInfos = state.quizzesInfos.filter(quiz => quiz.id !== quizId);
            }
        },
        toggleDropdown(state, action) {
            const {quizId, sectionId} = action.payload;
            state.currentQuizId = quizId;
            state.currentSectionId = sectionId;

            state.quizzesInfos = state.quizzesInfos.map(quiz => {
                if (quiz.id === quizId) {
                    const updatedSections = quiz.sections.map(section => ({
                        ...section,
                        dropdownOpen: sectionId === section.id ? !section.dropdownOpen : false
                    }));
                    return {
                        ...quiz,
                        dropdownOpen: sectionId ? false : !quiz.dropdownOpen,
                        sections: updatedSections
                    };
                } else {
                    return {
                        ...quiz,
                        dropdownOpen: false,
                        sections: quiz.sections.map(section => ({
                            ...section,
                            dropdownOpen: false
                        }))
                    };
                }
            });
        },
        updateSection(state, action) {

        },
        rename(state, action) {
            if (state.currentSectionId) {
                state.quizzesInfos = state.quizzesInfos.map(quiz => {
                    if (quiz.id === state.currentQuizId) {
                        const updatedSections = quiz.sections.map(section => {
                            if (section.id === state.currentSectionId) {
                                return {...section, name: action.payload};
                            }
                            return section;
                        });
                        return {...quiz, sections: updatedSections};
                    }
                    return quiz;
                });
            } else {
                state.quizzesInfos = state.quizzesInfos.map(quiz => {
                    if (quiz.id === state.currentQuizId) {
                        return {...quiz, name: action.payload};
                    }
                    return quiz;
                });
            }
        },
        reset: () => initialState,
    },
});

const selectCurrentSectionId = state => state.quiz.currentSectionId;
const selectCurrentQuizId = state => state.quiz.currentQuizId;

export const selectCurrentSelection = createSelector(
    [selectCurrentSectionId, selectCurrentQuizId],
    (currentSectionId, currentQuizId) => currentSectionId || currentQuizId
);

export const quizActions = quizSlice.actions;

export default quizSlice;