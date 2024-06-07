import { createSelector, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  currentQuizId: null,
  currentSectionId: null,
  quizzesInfos: [],
  currentQuizInfos: {
    id: null,
    name: "",
    dropdownOpen: false,
    sections: [], // {id: 6494984, order: 1, name: 'Section 1', dropdownOpen: false}
  },
  currentSectionInfos: {
    quizInfos: {},
    questions: [],
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCurrentQuizId(state, action) {
      const currentQuiz = state.quizzesInfos.find(
        (quiz) => quiz.id === state.currentQuizId
      );
      if (currentQuiz) currentQuiz.id = action.payload;
      state.currentQuizInfos.id = action.payload;
      state.currentQuizId = action.payload;
    },
    updateCurrentQuiz(state, action) {
      const index = state.quizzesInfos.findIndex(quiz => quiz.id === state.currentQuizId);
      if (index !== -1) {
        state.quizzesInfos[index] = { ...state.quizzesInfos[index], ...action.payload };
      }
      state.currentQuizInfos = {
          ...state.currentQuizInfos,
          ...action.payload,
      };
    },
    setCurrentSectionInfos(state, action) {
      state.currentSectionInfos.questions = action.payload.questions;

      const sectionIndex = state.currentQuizInfos.sections.findIndex(
        (section) => section.id === state.currentSectionId
      );
      if (sectionIndex !== -1) {
        state.currentQuizInfos.sections[sectionIndex].id =
          action.payload.sectionId;
      }
      state.currentSectionId = action.payload.sectionId;
    },
    setQuizzesAndCurrentSectionInfos(state, action) {
      state.quizzesInfos = action.payload.quizzesInfos;
      state.currentQuizId = action.payload.quizzesInfos[0].id;
      state.currentQuizInfos = action.payload.quizzesInfos[0];
      state.currentSectionInfos.questions = action.payload.firstSectionDetails;
      state.currentSectionId = action.payload.firstSectionDetails[0].section_id;
    },
    setQuizzesInfos(state, action) {
      state.quizzesInfos = action.payload;
      state.currentQuizId = action.payload[0].id;
      state.currentQuizInfos = action.payload[0];
    },
    addQuiz(state) {
      const newId = uuid();
      const newSection = { id: uuid(), name: "Section 1", order: 1 };
      const newQuiz = {
        id: newId,
        name: "Questionnaire " + (state.quizzesInfos.length + 1),
        dropdownOpen: true,
        sections: [newSection],
      };

      state.quizzesInfos = state.quizzesInfos.map((quiz) => ({
        ...quiz,
        dropdownOpen: false,
      }));
      state.quizzesInfos.push(newQuiz);
      state.currentQuizInfos = newQuiz;
      state.currentQuizId = newId;
      state.currentSectionId = newSection.id;
      state.currentSectionInfos.questions = [];
    },
    addSection(state, action) {
      const newSection = {
        id: uuid(),
        name: action.payload,
        order: state.currentQuizInfos.sections.length + 1,
      };
      state.currentQuizInfos.sections.push(newSection);

      const existingQuiz = state.quizzesInfos.find(
        (item) => item.id === state.currentQuizId
      );
      if (existingQuiz) existingQuiz.sections.push(newSection);
    },
    deleteQuiz(state, action) {
      state.quizzesInfos = state.quizzesInfos.filter(
        (quiz) => quiz.id !== action.payload
      );
      if (state.currentQuizId === action.payload) state.currentQuizId = null;
    },
    deleteSection(state, action) {
      state.quizzesInfos = state.quizzesInfos.map((quiz) => {
        if (quiz.id === state.currentQuizId) {
          const updatedSections = quiz.sections.filter(
            (section) => section.id !== action.payload
          );
          return { ...quiz, sections: updatedSections };
        }
        return quiz;
      });
      if (state.currentSectionId === action.payload) {
        state.currentSectionId = null;
        state.currentSectionInfos.questions = [];
      }
    },
    toggleDropdownQuiz(state, action) {
      state.currentQuizId = action.payload;

      state.quizzesInfos = state.quizzesInfos.map((quiz) => {
        if (quiz.id === action.payload) {
          state.currentQuizInfos = quiz;
          return {
            ...quiz,
            dropdownOpen: true,
            sections: quiz.sections.map((section) => ({
              ...section,
              dropdownOpen: false,
            })),
          };
        } else {
          return {
            ...quiz,
            dropdownOpen: false,
            sections: quiz.sections.map((section) => ({
              ...section,
              dropdownOpen: false,
            })),
          };
        }
      });
    },
    toggleDropdownSection(state, action) {
      state.currentSectionId = action.payload;

      state.quizzesInfos = state.quizzesInfos.map((quiz) => {
        if (quiz.id === state.currentQuizId) {
          return {
            ...quiz,
            dropdownOpen: false,
            sections: quiz.sections.map((section) => {
              return {
                ...section,
                dropdownOpen:
                  section.id === action.payload ? !section.dropdownOpen : false,
              };
            }),
          };
        }
        return quiz;
      });
    },

    setDeployedQuiz(state, action) {
      state.currentQuizInfos.deployed = action.payload;
      state.quizzesInfos = state.quizzesInfos.map((quiz) => {
        if (quiz.id === state.currentQuizId) {
          return { ...quiz, deployed: action.payload };
        }
        return quiz;
      });
    },

    rename(state, action) {
      let isQuiz = action.payload.isQuiz;
      console.log("isQuiz", isQuiz);
      if (!isQuiz) {
        state.quizzesInfos = state.quizzesInfos.map((quiz) => {
          if (quiz.id === state.currentQuizId) {
            const updatedSections = quiz.sections.map((section) => {
              if (section.id === state.currentSectionId) {
                return { ...section, name: action.payload.name };
              }
              return section;
            });
            return { ...quiz, sections: updatedSections };
          }
          return quiz;
        });
      } else {
        state.quizzesInfos = state.quizzesInfos.map((quiz) => {
          if (quiz.id === state.currentQuizId) {
            return { ...quiz, name: action.payload.name };
          }
          return quiz;
        });
      }
    },
    reset: () => initialState,
  },
});

const selectCurrentSectionId = (state) => state.quiz.currentSectionId;

const selectCurrentQuiz = (state) => state.quiz.currentQuizInfos;

export const selectCurrentSectionDetails = createSelector(
  [selectCurrentSectionId, selectCurrentQuiz],
  (currentSectionId, currentQuiz) =>
    currentQuiz.sections.find((section) => section.id === currentSectionId)
);

export const selectCurrentSectionOrder = createSelector(
  [selectCurrentSectionId, selectCurrentQuiz],
  (currentSectionId, currentQuiz) =>
    currentQuiz.sections.find((section) => section.id === currentSectionId)
      ?.order || 0
);

export const isLastSection = createSelector(
  [selectCurrentQuiz],
  (currentQuiz) => (currentQuiz.sections.length - 1 === 0 ? currentQuiz.id : -1)
);

export const isQuizzDeployed = createSelector(
  [selectCurrentQuiz],
  (currentQuiz) => {
    return currentQuiz.deployed === 1;
  }
);

export const isReadyToDeploy = createSelector(
  [selectCurrentQuiz],
  (currentQuiz) => {
    if (!Number.isInteger(currentQuiz.id)) {
      return false;
    }
    for (let section of currentQuiz.sections) {
      if (!Number.isInteger(section.id)) {
        return false;
      }
    }

    return true;
  }
);

export const quizActions = quizSlice.actions;

export default quizSlice;
