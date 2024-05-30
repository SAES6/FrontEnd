import {createSelector, createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";

const initialState = {
    currentQuizId: null,
    currentPageId: null,
    quizzesInfos: [],
    currentQuizInfos: {
        id: null,
        name: '',
        dropdownOpen: false,
        pages: [] // {id: 6494984, pos: 1, name: 'Section 1', dropdownOpen: false}
    },
    currentPageInfos: {},
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setCurrentQuizId(state, action) {
            state.currentQuizId = action.payload;
            state.currentPageId = initialState.currentPageId;
        },
        setCurrentPageId(state, action) {
            state.currentPageId = action.payload;
        },
        setCurrentIds(state, action) {
            state.currentQuizId = action.payload.quizId;
            state.currentPageId = action.payload.pageId;
        },
        setCurrentQuizInfos(state, action) {

        },
        setCurrentPageInfos(state, action) {

        },
        addQuiz(state) {
            const newId = uuid();
            const newQuiz = {
                id: newId,
                name: 'Questionnaire ' + (state.quizzesInfos.length + 1),
                dropdownOpen: true,
                pages: []
            };
            state.quizzesInfos = state.quizzesInfos.map(quiz => ({...quiz, dropdownOpen: false}))
            state.quizzesInfos.push(newQuiz);
            state.currentQuizInfos = newQuiz;
            state.currentQuizId = newId;
        },
        addPage(state, action) {
            const newPage = {id: uuid(), name: action.payload, pos: state.currentQuizInfos.pages.length};
            state.currentQuizInfos.pages.push(newPage);

            const existingQuiz = state.quizzesInfos.find(item => item.id === state.currentQuizId);
            if (existingQuiz) existingQuiz.pages.push(newPage);
        },
        deleteQuizOrPage(state) {
            const quizId = state.currentQuizId;
            const pageId = state.currentPageId;

            if (pageId) {
                state.quizzesInfos = state.quizzesInfos.map(quiz => {
                    if (quiz.id === quizId) {
                        const updatedPages = quiz.pages.filter(page => page.id !== pageId);
                        return {...quiz, pages: updatedPages};
                    }
                    return quiz;
                });
            } else {
                state.quizzesInfos = state.quizzesInfos.filter(quiz => quiz.id !== quizId);
            }
        },
        toggleDropdown(state, action) {
            const {quizId, pageId} = action.payload;
            state.currentQuizId = quizId;
            state.currentPageId = pageId;

            state.quizzesInfos = state.quizzesInfos.map(quiz => {
                if (quiz.id === quizId) {
                    const updatedPages = quiz.pages.map(page => ({
                        ...page,
                        dropdownOpen: pageId === page.id ? !page.dropdownOpen : false
                    }));
                    return {
                        ...quiz,
                        dropdownOpen: pageId ? false : !quiz.dropdownOpen,
                        pages: updatedPages
                    };
                } else {
                    return {
                        ...quiz,
                        dropdownOpen: false,
                        pages: quiz.pages.map(page => ({
                            ...page,
                            dropdownOpen: false
                        }))
                    };
                }
            });
        },
        updatePage(state, action) {

        },
        rename(state, action) {
            if (state.currentPageId) {
                state.quizzesInfos = state.quizzesInfos.map(quiz => {
                    if (quiz.id === state.currentQuizId) {
                        const updatedPages = quiz.pages.map(page => {
                            if (page.id === state.currentPageId) {
                                return {...page, name: action.payload};
                            }
                            return page;
                        });
                        return {...quiz, pages: updatedPages};
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

const selectCurrentPageId = state => state.quiz.currentPageId;
const selectCurrentQuizId = state => state.quiz.currentQuizId;

export const selectCurrentSelection = createSelector(
    [selectCurrentPageId, selectCurrentQuizId],
    (currentPageId, currentQuizId) => currentPageId || currentQuizId
);

export const quizActions = quizSlice.actions;

export default quizSlice;