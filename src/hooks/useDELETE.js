import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * Hook personnalisé : Pour toutes les requêtes DELETE vers les APIs.
 * @param {*} url  Uri de l'api
 * @param {*} authorization Authorization headers si nécessaire
 * @param {*} api Base URL de l'API
 * @param {*} errorMessage Message d'erreur personnalisé
 */
function useDELETE({ url, authorization, api, errorMessage }) {
  const [initialRequest, setInitialRequest] = useState({
    url: url || "",
    authorization: authorization || {},
    api: api,
    errorMessage: errorMessage,
  });
  const [response, setResponse] = useState();
  let result;

  useEffect(() => {
    const callApi = async () => {
      try {
        if (initialRequest.url !== "" && initialRequest.url) {
          result = await axios
            .create({
              baseURL: initialRequest.api,
            })
            .delete(initialRequest.url, initialRequest.authorization);
          setResponse(result);
        }
      } catch (error) {
        toast.error(initialRequest.errorMessage, {
          position: "top-center",
          style: {
            fontFamily: "Poppins, sans-serif",
            borderRadius: "15px",
            textAlign: "center",
          },
        });
        setResponse(error.response);
      }
    };

    callApi();
  }, [initialRequest]);

  return [response, setInitialRequest];
}

export default useDELETE;
