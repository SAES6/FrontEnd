import { quizActions } from "../_slices/quiz-slice";

const get = ({ api, url, auth }) => {
  return api.get(url, auth);
};

export const getQuizOrPageDetails = (quizId, pageId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await get({
        api: "",
        url: "",
        auth: "{headers: {Authorization: `Bearer ${user.jwt}`}}",
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Could not fetch list data!");
      }

      return await response.data;
    };

    dispatch(quizActions.toggleDropdown({ quizId, pageId }));

    try {
      // const listData = await fetchData();
      // if(pageId)
      //     dispatch(quizActions.setCurrentPageInfos(listData));
      // else
      //     dispatch(quizActions.setCurrentQuizInfos(listData));
    } catch (e) {}
  };
};
