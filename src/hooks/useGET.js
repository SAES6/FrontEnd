import {useState, useEffect} from "react";
import {callApiGet} from "../utils/callApi";

function useGET({url, data, authorization, errorMessage}) {
    const [initialRequest, setInitialRequest] = useState({
        url: url || "",
        data: data || {},
        authorization: authorization || {},
        errorMessage: errorMessage,
    });
    const [response, setResponse] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (initialRequest.url !== "") {
                    const result = await callApiGet(initialRequest);
                    setResponse(result);
                }
            } catch (error) {
                setResponse(error);
            }
        };

        fetchApi();
    }, [initialRequest]);

    return [response, setInitialRequest];
}

export default useGET;
