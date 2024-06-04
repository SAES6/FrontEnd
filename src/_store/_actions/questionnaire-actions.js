import { addResponse } from '../_slices/questionnaire-slice';
import { callApiPost } from '../../utils/callApi';

export const postResponses = (localResponses, id, navigate) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userToken = state.user.tokenUser;
    const userRole = state.user.roleUser;

    const responses = state.questionnaire.questionnaires[id].responses;

    const insertUserResponse = async (responses) => {
      console.log(responses, userRole);
      const response = await callApiPost({
        id: 'insertResponse',
        url: `/response/${userToken}/${userRole}`,
        data: {
          responses: responses,
        },
        errorMessage: "Erreur lors de l'ajout des réponses de l'utilisateur",
      });

      return response.data;
    };

    // dispatch(setCurrentSection({ id, section: localResponses }));
    console.log(responses);
    dispatch(addResponse({ questionnaireId: id, ...localResponses }));
    navigate(`/summary/${id}`);

    try {
      const unNom = await insertUserResponse([...responses, ...localResponses]);
      console.log(unNom);
    } catch (e) {
      console.log(e);
    }
  };
};
