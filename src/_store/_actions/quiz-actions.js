import { quizActions } from "../_slices/quiz-slice";
import { callApiGet, callApiPost } from "../../utils/callApi";

export const getSectionDetails = (quizId, sectionId, isQuiz, sectionOrder) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    const fetchFirstSectionDetails = async (sectionId) => {
      const response = await callApiGet({
        url: `questions/loadBySection?section_id=${sectionId}`,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      return response.data;
    };

    if (isQuiz)
      dispatch(
        quizActions.toggleDropdown({
          quizId,
          sectionId: null,
          sectionOrder: null,
        })
      );
    else
      dispatch(quizActions.toggleDropdown({ quizId, sectionId, sectionOrder }));

    try {
      const sectionDetails = await fetchFirstSectionDetails(sectionId);
      dispatch(quizActions.setCurrentSectionInfos(sectionDetails || {}));
    } catch (e) {}
  };
};

export const getQuizDetails = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    const fetchQuizzesList = async () => {
      const response = await callApiGet({
        url: "/questionnaires/loadWithSections",
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      return response.data;
    };

    const fetchFirstSectionDetails = async (sectionId) => {
      const response = await callApiGet({
        url: `questions/loadBySection?section_id=${sectionId}`,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      return response.data;
    };

    try {
      const quizzesList = await fetchQuizzesList();
      console.log(quizzesList);
      if (quizzesList && quizzesList.length > 0) {
        const firstSectionDetails = await fetchFirstSectionDetails(
          quizzesList[0].sections[0].id
        );
        console.log("firstSectionDetails", firstSectionDetails);
        dispatch(
          quizActions.setQuizzesAndCurrentSectionInfos({
            quizzesInfos: quizzesList || [],
            firstSectionDetails: firstSectionDetails || {},
          })
        );
      } else dispatch(quizActions.setQuizzesInfos(quizzesList || []));
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
    const sectionOrder = state.quiz.currentSectionOrder;
    const sectionName = state.quiz.quizzesInfos
      .find((quiz) => quiz.id === state.quiz.currentQuizId)
      .sections.find((section) => section.id === sectionId).name;

    const fetchFirstSectionDetails = async (sectionInfos) => {
      const response = await callApiGet({
        url: `questions/loadBySection?section_id=${sectionId}`,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      return response.data;
    };
    const fetchPostSectionInfos = async (
      sectionInfos,
      sectionId,
      sectionName,
      sectionOrder
    ) => {
      const formData = new FormData();
      formData.append("section_id", sectionId);
      formData.append("title", sectionName);
      formData.append("order", sectionOrder);
      formData.append("quizInfos", JSON.stringify(sectionInfos.quizInfos));

      sectionInfos.questions.forEach((question, qIndex) => {
        formData.append(`questions[${qIndex}][id]`, question.id);
        formData.append(`questions[${qIndex}][text]`, question.text);
        formData.append(`questions[${qIndex}][type]`, question.type);
        formData.append(
          `questions[${qIndex}][questionnaire_id]`,
          question.questionnaire_id
        );
        formData.append(
          `questions[${qIndex}][section_id]`,
          question.section_id
        );
        formData.append(`questions[${qIndex}][order]`, question.order);
        formData.append(`questions[${qIndex}][title]`, question.title);
        formData.append(
          `questions[${qIndex}][description]`,
          question.description
        );
        formData.append(
          `questions[${qIndex}][slider_min]`,
          question.slider_min
        );
        formData.append(
          `questions[${qIndex}][slider_max]`,
          question.slider_max
        );
        formData.append(
          `questions[${qIndex}][slider_gap]`,
          question.slider_gap
        );

        // Si la question a une image, ajoutez-la à FormData
        if (question.image && question.image.file) {
          formData.append(
            `questions[${qIndex}][image_src][file]`,
            question.image.file
          );
          formData.append(
            `questions[${qIndex}][image_src][fileName]`,
            question.image.fileName
          );
          formData.append(
            `questions[${qIndex}][image_src][fileType]`,
            question.image.fileType
          );
        }

        // Ajoutez les choix de chaque question
        question.choices.forEach((choice, cIndex) => {
          formData.append(
            `questions[${qIndex}][choices][${cIndex}][id]`,
            choice.id
          );
          formData.append(
            `questions[${qIndex}][choices][${cIndex}][text]`,
            choice.text
          );
          formData.append(
            `questions[${qIndex}][choices][${cIndex}][question_id]`,
            choice.question_id
          );
          formData.append(
            `questions[${qIndex}][choices][${cIndex}][order]`,
            choice.order
          );

          // Si le choix a une image, ajoutez-la à FormData
          if (choice.image_src && choice.image_src.file) {
            formData.append(
              `questions[${qIndex}][choices][${cIndex}][image_src][file]`,
              choice.image_src.file
            );
            formData.append(
              `questions[${qIndex}][choices][${cIndex}][image_src][fileName]`,
              choice.image_src.fileName
            );
            formData.append(
              `questions[${qIndex}][choices][${cIndex}][image_src][fileType]`,
              choice.image_src.fileType
            );
          }
        });
      });
      const response = await callApiPost({
        url: "/questions/save",
        data: formData,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Impossible de sauvegarder cette section",
      });

      return response.data;
    };

    try {
      console.log("sectionInfos", sectionInfos);
      await fetchPostSectionInfos(
        sectionInfos,
        sectionId,
        sectionName,
        sectionOrder
      );
      const firstSectionDetails = await fetchFirstSectionDetails(sectionId);
      dispatch(quizActions.setCurrentSectionInfos(firstSectionDetails || {}));
    } catch (e) {}
  };
};
