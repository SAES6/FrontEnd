import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * Hook personaliser : Pour tous les requete Get vers les apis.
 * @param {*} url  Uri de l'api
 * @param {*} data Data body si necessaire
 * @param {*} type Type pour
 */
function useGET({ url, data, authorization, api, errorMessage }) {
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
            .get(initialRequest.url, initialRequest.authorization);
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

export default useGET;
