import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_analytics_get_blockedDomains () {        
            
    const promise = axios.get(serverURL() + "user/blockedDomains"  , tokenConfig());

    const dataPromise = 
    promise.then((response) => response.data.blockedDomains)    
    .catch((e) => {
        console.log(e);
    });    

    return dataPromise ;

}
