import {useState, useEffect} from 'react'
/**
 * Hook personaliser : Pour tous les requete post vers les apis.
 */

function usePOST({url, data, authorization, api}) {

    const [initialRequest, setInitialRequest] = useState({url : url, data: data, authorization: authorization, api: api});
    const [response, setResponse] = useState();
    let result ;

    useEffect(() => {
       
        const callApi = async ()  => {
            try {
                if((initialRequest.url).length !== 0 && Object.keys(initialRequest.data).length === 0){
                    result = await initialRequest.api.post(initialRequest.url, {}, initialRequest.authorization)
                    setResponse(result)
                }else if(initialRequest.url !== '') {
                    result = await initialRequest.api.post(initialRequest.url, initialRequest.data, initialRequest.authorization)
                    setResponse(result)
                }
            } catch (error) {
                setResponse(error)
            }
    
        }

        callApi();

    }, [initialRequest]);

    return [response, setInitialRequest];
}

export default usePOST
