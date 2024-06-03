import {quizActions} from "../_slices/quiz-slice";
import {callApiGet} from "../../utils/callApi";

export const getQuizOrSectionDetails = (quizId, sectionId) => {
    return async (dispatch, getState) => {
        const state = getState();
        const token = state.user.token;

        const fetchFirstSectionDetails = async (sectionId) => {
            const response = await callApiGet({
                url: `questions/loadBySection?section_id=${sectionId}`,
                authorization: {headers: {Authorization: `Bearer ${token}`}},
                errorMessage: "Could not fetch data!"
            });

            return response.data;
        };

        dispatch(quizActions.toggleDropdown({quizId, sectionId}));

        try {
            const sectionDetails = await fetchFirstSectionDetails(sectionId);
                dispatch(quizActions.setCurrentSectionInfos(sectionDetails || {}));
        } catch (e) {
        }
    };
};

export const getQuizDetails = () => {
    return async (dispatch, getState) => {
        const state = getState();
        const token = state.user.token;

        const fetchQuizzesList = async () => {
            const response = await callApiGet({
                url: '/questionnaires/loadWithSections',
                authorization: {headers: {Authorization: `Bearer ${token}`}},
                errorMessage: "Could not fetch data!"
            });

            return response.data;
        };

        const fetchFirstSectionDetails = async (sectionId) => {
            const response = await callApiGet({
                url: `questions/loadBySection?section_id=${sectionId}`,
                authorization: {headers: {Authorization: `Bearer ${token}`}},
                errorMessage: "Could not fetch data!"
            });

            return response.data;
        };

        try {
            const quizzesList = await fetchQuizzesList();
            console.log(quizzesList)
            if (quizzesList && quizzesList.length > 0) {
                const firstSectionDetails = await fetchFirstSectionDetails(quizzesList[0].sections[0].id);
                    console.log(firstSectionDetails)
                dispatch(quizActions.setQuizzesAndCurrentSectionInfos({
                    quizzesInfos: quizzesList || [],
                    firstSectionDetails: firstSectionDetails || {}
                }));
            } else
                dispatch(quizActions.setQuizzesInfos(quizzesList || []));
        } catch (e) {
            console.error(e);
        }
    };
};