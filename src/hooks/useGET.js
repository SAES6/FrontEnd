import {useState, useEffect} from "react";
import {callApiGet} from "../utils/callApi";

function useGET() {
    const [initialRequest, setInitialRequest] = useState(null);
    const [response, setResponse] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            if (initialRequest?.url !== "") {
                try {
                    const result = await callApiGet(initialRequest);
                    setResponse(result);
                } catch (error) {
                    setResponse(error);
                }
            }
        };

        fetchApi();
    }, [initialRequest]);

    return [response, setInitialRequest];
}

export default useGET;
