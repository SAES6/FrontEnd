import {quizActions} from "../_slices/quiz-slice";
import {callApiGet, callApiPost} from "../../utils/callApi";

export const getSectionDetails = (quizId, sectionId, isQuiz) => {
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

        if (isQuiz) dispatch(quizActions.toggleDropdown({quizId, sectionId: null}));
        else dispatch(quizActions.toggleDropdown({quizId, sectionId}));

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

export const postSectionInfos = (sectionInfos) => {
    return async (dispatch, getState) => {
        const state = getState();
        const token = state.user.token;
        const sectionId = state.quiz.currentSectionId;

        const fetchFirstSectionDetails = async (sectionInfos) => {
            const response = await callApiPost({
                url: `questions/loadBySection?section_id=${sectionInfos.id}`,
                data: {sectionInfos},
                authorization: {headers: {Authorization: `Bearer ${token}`}},
                errorMessage: "Could not fetch data!"
            });

            return response.data;
        };
        console.log({sectionInfos, sectionId})
        try {
            //await fetchFirstSectionDetails({sectionInfos, sectionId});
        } catch (e) {
        }
    };
};