import {useState, useEffect} from "react";
import {callApiDelete} from "../utils/callApi";

function useDELETE() {
    const [initialRequest, setInitialRequest] = useState(null);
    const [response, setResponse] = useState();

    useEffect(() => {
        const callApi = async () => {
            if (initialRequest?.url !== "") {
                try {
                    const result = await callApiDelete(initialRequest);
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

export default useDELETE;
