import {
  isLastSection,
  quizActions,
  selectCurrentSectionDetails,
} from "../_slices/quiz-slice";
import {
  callApiDelete,
  callApiGet,
  callApiPost,
  callApiPut,
} from "../../utils/callApi";
import { toast } from "react-toastify";

const fetchSectionDetails = async (sectionId, token) => {
  const response = await callApiGet({
    url: `questions/loadBySection?section_id=${sectionId}`,
    authorization: { headers: { Authorization: `Bearer ${token}` } },
    errorMessage: "Could not fetch data!",
  });

  return response.data;
};

export const getFirstSectionDetails = (quizId, sectionId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const currentSectionId = state.quiz.currentSectionId;

    dispatch(quizActions.toggleDropdownQuiz(quizId));

    try {
      if (typeof quizId !== "string" && typeof sectionId !== "string" && (!currentSectionId || currentSectionId !== sectionId)) {
        console.log('t')
        const questions = await fetchSectionDetails(sectionId, token);
        dispatch(quizActions.setCurrentSectionInfos({questions: questions || [], sectionId,}));
      } else if (typeof sectionId === "string" && (!currentSectionId || currentSectionId !== sectionId))
        dispatch(quizActions.setCurrentSectionInfos({ questions: [], sectionId }));
      console.log(sectionId)
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSectionDetails = (quizId, sectionId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const currentSectionId = state.quiz.currentSectionId;

    dispatch(quizActions.toggleDropdownSection(sectionId));

    try {
      if (typeof sectionId !== "string" && (!currentSectionId || currentSectionId !== sectionId)) {
        const questions = await fetchSectionDetails(sectionId, token);
        dispatch(quizActions.setCurrentSectionInfos({questions: questions || [], sectionId,}));
      } else if (typeof sectionId === "string" && (!currentSectionId || currentSectionId !== sectionId))
        dispatch(quizActions.setCurrentSectionInfos({ questions: [], sectionId }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getQuizzesDetails = () => {
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

    try {
      const quizzesList = await fetchQuizzesList();
      if (
        quizzesList &&
        quizzesList.length > 0 &&
        quizzesList[0].sections.length > 0
      ) {
        const firstSectionDetails = await fetchSectionDetails(
          quizzesList[0].sections[0].id,
          token
        );
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

const createQuestionFormData = (
  formData,
  sectionId,
  question,
  qIndex,
  quizId
) => {
  console.log(question);
  formData.append(`questions[${qIndex}][id]`, question.id);
  formData.append(`questions[${qIndex}][type]`, question.type);
  formData.append(`questions[${qIndex}][questionnaire_id]`, quizId || 0);
  formData.append(
    `questions[${qIndex}][section_id]`,
    question.section_id || sectionId
  );
  formData.append(`questions[${qIndex}][order]`, question.order);
  formData.append(
    `questions[${qIndex}][title]`,
    question.title || `Question ${qIndex + 1}`
  );
  formData.append(
    `questions[${qIndex}][description]`,
    question.description || ""
  );
  formData.append(`questions[${qIndex}][slider_min]`, question.slider_min || 0);
  formData.append(
    `questions[${qIndex}][slider_max]`,
    question.slider_max || "null"
  );
  formData.append(
    `questions[${qIndex}][slider_gap]`,
    question.slider_gap || "null"
  );

  if (question.image && question.image.file) {
    appendFileToFormData(
      formData,
      `questions[${qIndex}][image_src]`,
      question.image
    );
  }

  question.choices.forEach((choice, cIndex) => {
    appendChoiceToFormData(
      formData,
      `questions[${qIndex}][choices][${cIndex}]`,
      choice
    );
  });
};

const appendFileToFormData = (formData, baseKey, file) => {
  formData.append(`${baseKey}[file]`, file.file);
  formData.append(`${baseKey}[fileName]`, file.fileName);
  formData.append(`${baseKey}[fileType]`, file.fileType);
};

const appendChoiceToFormData = (formData, baseKey, choice) => {
  formData.append(`${baseKey}[id]`, choice.id);
  formData.append(`${baseKey}[text]`, choice.text || "");
  formData.append(`${baseKey}[question_id]`, choice.question_id || 0);
  formData.append(`${baseKey}[order]`, choice.order);

  if (choice.image_src && choice.image_src.file) {
    appendFileToFormData(formData, `${baseKey}[image_src]`, choice.image_src);
  }
};

export const postSectionInfos =
  (creationData) => async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const sectionDetails = selectCurrentSectionDetails(state);
    const quizId = state.quiz.currentQuizId;

    const postSectionData = async (sectionInfos) => {
      const formData = new FormData();
      formData.append("section_id", sectionDetails.id);
      formData.append("title", sectionDetails.name);
      formData.append("order", sectionDetails.order);
      formData.append("quizInfos", JSON.stringify(sectionInfos.quizInfos));

      sectionInfos.questions.forEach((question, index) =>
        createQuestionFormData(
          formData,
          sectionDetails.id,
          question,
          index,
          quizId
        )
      );

      for (let [key, value] of formData.entries()) {
        console.log(key, value.toString());
      }

      return await callApiPost({
        url: "/questions/save",
        data: formData,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Impossible de sauvegarder cette section",
      });
    };

    try {
      const response = await postSectionData(creationData);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Section sauvgardé avec succès !", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });

        dispatch(
          quizActions.setCurrentSectionInfos({
            questions: creationData.questions || [],
            sectionId: response.data.id,
          })
        );

        if (quizId !== response.data.questionnaire_id)
          dispatch(
            quizActions.setCurrentQuizId(response.data.questionnaire_id)
          );

        dispatch(quizActions.updateCurrentQuiz(creationData.quizInfos));
      }
    } catch (e) {
      console.error("Failed to post section details:", e);
    }
  };

const deleteQuizApi = async (quizId, token, dispatch) => {
  const response = await callApiDelete({
    url: `questionnaire/deleteById?id=${quizId}`,
    authorization: { headers: { Authorization: `Bearer ${token}` } },
    errorMessage: "Could not fetch data!",
  });

  if (response.status >= 200 && response.status < 300) {
    toast.success("Quiz supprimé avec succès !", {
      position: "top-center",
      style: {
        fontFamily: "Poppins, sans-serif",
        borderRadius: "15px",
        textAlign: "center",
      },
    });

    dispatch(quizActions.deleteQuiz(quizId));
  }
};

export const deleteSection = (sectionId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const quizId = isLastSection(state);
    const currentQuizInfos = state.quiz.currentQuizInfos;

    const deleteSectionApi = async (sectionId, token, dispatch) => {
      const response = await callApiDelete({
        url: `section/deleteById?id=${sectionId}`,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Section supprimé avec succès !", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
        dispatch(quizActions.deleteSection(sectionId));
        if (currentQuizInfos.sections.length === 1) {
          deleteQuiz(currentQuizInfos.id);
        }
      }
    };

    try {
      if (typeof sectionId !== "string") {
        await deleteSectionApi(sectionId, token, dispatch);
        console.log(quizId);
        if (quizId !== -1) await deleteQuizApi(quizId, token, dispatch);
      } else dispatch(quizActions.deleteSection(sectionId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteQuiz = (quizId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    try {
      if (typeof quizId !== "string") await deleteQuizApi(quizId, token, dispatch);
      else dispatch(quizActions.deleteQuiz(quizId));
    } catch (e) {
      console.log(e);
    }
  };
};

export const renameQuizOrSection = (isQuiz, id, name) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;

    const putRename = async (isQuiz, id, name, token) => {
      const response = await callApiPut({
        url: isQuiz ? "questionnaire/updateName" : "section/updateName",
        data: { id: id, name: name },
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      if (response.status >= 200 && response.status < 300)
        toast.success("Entrée rennomée avec succès !", {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
    };

    dispatch(quizActions.rename({ isQuiz, name }));

    try {
      if (typeof id !== "string") await putRename(isQuiz, id, name, token);
    } catch (e) {
      console.log(e);
    }
  };
};

export const deployOrStopQuiz = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token;
    const quizId = state.quiz.currentQuizId;

    const putDeploy = async (quizId, token) => {
      const response = await callApiPut({
        url: `questionnaire/deployOrStop?id=${quizId}`,
        authorization: { headers: { Authorization: `Bearer ${token}` } },
        errorMessage: "Could not fetch data!",
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data === "deployed") {
          toast.success("Quiz déployé avec succès !", {
            position: "top-center",
            style: {
              fontFamily: "Poppins, sans-serif",
              borderRadius: "15px",
              textAlign: "center",
            },
          });
        } else {
          toast.success("Quiz arreté avec succès !", {
            position: "top-center",
            style: {
              fontFamily: "Poppins, sans-serif",
              borderRadius: "15px",
              textAlign: "center",
            },
          });
        }
        dispatch(
          quizActions.setDeployedQuiz(response.data === "deployed" ? 1 : 0)
        );
      }
    };

    try {
      await putDeploy(quizId, token);
    } catch (e) {
      console.log("voici l'erreur", e);
    }
  };
};
