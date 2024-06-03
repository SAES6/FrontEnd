import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * Hook personnalisé : Pour toutes les requêtes PUT vers les APIs.
 * @param {*} url  Uri de l'api
 * @param {*} data Data body si nécessaire
 * @param {*} authorization Authorization headers si nécessaire
 * @param {*} api Base URL de l'API
 * @param {*} errorMessage Message d'erreur personnalisé
 */
function usePUT({ url, data, authorization, api, errorMessage }) {
  const [initialRequest, setInitialRequest] = useState({
    url: url || "",
    data: data || {},
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
            .put(
              initialRequest.url,
              initialRequest.data,
              initialRequest.authorization
            );
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

export default usePUT;
