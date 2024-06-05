import {getCurrentFieldCoords, questionnaireActions} from '../_slices/questionnaire-slice';
import {callApiPost} from '../../utils/callApi';

export const postResponses = (localResponses, id, navigate) => {
    return async (dispatch, getState) => {
        const state = getState();
        const userToken = state.user.tokenUser;
        const userRole = state.user.roleUser;

        const responses = getCurrentFieldCoords(getState())

        const insertUserResponse = async (responses) => {
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

        dispatch(questionnaireActions.setProgression((localResponses.currentSection / localResponses.totalSections) * 100));
        dispatch(questionnaireActions.addResponse(localResponses));

        try {
            await insertUserResponse([...responses, ...localResponses]);
        } catch (e) {
            console.log(e);
        }
        navigate(`/summary/${id}`);
    };
};
