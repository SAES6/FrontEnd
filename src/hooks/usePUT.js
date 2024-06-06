import {useState, useEffect} from "react";
import {callApiPut} from "../utils/callApi";

function usePut() {
    const [initialRequest, setInitialRequest] = useState(null);
    const [response, setResponse] = useState();

    useEffect(() => {
        const callApi = async () => {
            if (initialRequest?.url !== "") {
                try {
                    const result = await callApiPut(initialRequest);
                    setResponse(result);
                } catch (error) {
                    setResponse(error);
                }
            }
        };

        callApi();
    }, [initialRequest]);

    return [response, setInitialRequest];
}

export default usePut;
