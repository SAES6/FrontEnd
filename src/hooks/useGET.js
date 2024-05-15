import {useState, useEffect} from 'react'
/**
 * Hook personaliser : Pour tous les requete Get vers les apis.
 * @param {*} url  Uri de l'api
 * @param {*} data Data body si necessaire
 * @param {*} type Type pour 
 */
function useGET({url, data, authorization, api}) {

    const [initialRequest, setInitialRequest] = useState({url : url, data: data, authorization: authorization, api: api});
    const [response, setResponse] = useState();
    let result ;

    useEffect(() => {
        const callApi = async ()  =>{
            try {
                if (initialRequest.url !== ''){
                    result = await initialRequest.api.get(initialRequest.url, initialRequest.authorization)
                    setResponse(result)
                }
            } catch (error) {
                // add smth
                console.log(error)
            }
    
        }

        callApi();

    }, [initialRequest])

    return [response, setInitialRequest];
}

export default useGET
