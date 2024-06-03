import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import axios from "axios";

/**
 * Hook personaliser : Pour toutes les requetes POST vers les apis.
 */
const usePOST = () => {
    const [initialRequest, setInitialRequest] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const callApi = async () => {
            if (initialRequest) {
                const {id, url, data, authorization, api, errorMessage} = initialRequest;
                try {
                    if (url !== "") {
                        const result = await axios
                            .create({
                                baseURL: api,
                            })
                            .post(url, data, authorization);
                        setResponses(prev => ({...prev, [id]: result}));
                    }
                } catch (error) {
                    toast.error(errorMessage, {
                        position: "top-center",
                        style: {
                            fontFamily: "Poppins, sans-serif",
                            borderRadius: "15px",
                            textAlign: "center",
                        },
                    });
                    setResponses(prev => ({...prev, [id]: error.response}));
                }
            }
        };

        callApi();
    }, [initialRequest]);

    return [responses, setInitialRequest];
};

export default usePOST;
