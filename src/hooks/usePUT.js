import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";

/**
 * Hook personnalisé : Pour toutes les requêtes PUT vers les APIs.
 */
function usePUT() {
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
                        .put(
                            initialRequest.url,
                            initialRequest.data,
                            initialRequest.authorization
                        );
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

export default usePUT;
