import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_analytics_unblock (blocked) {        
            
    console.log(blocked);

    const a = {
        'domains' : blocked 
    }
    const AJSON = JSON.stringify(a)

    const promise = axios.put(serverURL() + "user/blockedDomains" 
            , AJSON
            ,tokenConfig());

    const dataPromise = 
    promise.then((response) => response.data.blockedDomains)    
    .catch((e) => {
        console.log(e);
    });    

    return dataPromise ;

}
