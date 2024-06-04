import {useState, useEffect} from "react";
import {callApiPost} from "../utils/callApi";

const usePOST = () => {
    const [initialRequest, setInitialRequest] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            if (initialRequest && initialRequest?.url !== "") {
                try {
                    const result = await callApiPost(initialRequest);
                    setResponses(prev => ({...prev, [initialRequest.id]: result}));
                } catch (errorResponse) {
                    setResponses(prev => ({...prev, [initialRequest.id]: errorResponse}));
                }
            }
        };

        fetchApi();
    }, [initialRequest]);

    return [responses, setInitialRequest];
};

export default usePOST;
