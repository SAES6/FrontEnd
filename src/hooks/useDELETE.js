import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";

/**
 * Hook personnalisé : Pour toutes les requêtes DELETE vers les APIs.
 */
function useDELETE() {
    const [initialRequest, setInitialRequest] = useState(null);
    const [response, setResponse] = useState();
    let result;

    useEffect(() => {
        const callApi = async () => {
            if (initialRequest?.url !== "" && initialRequest?.url) {
                try {
                    result = await axios
                        .create({
                            baseURL: initialRequest.api,
                        })
                        .delete(initialRequest.url, initialRequest.authorization);
                    setResponse(result);
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
            }
        };

        callApi();
    }, [initialRequest]);

    return [response, setInitialRequest];
}

export default useDELETE;
