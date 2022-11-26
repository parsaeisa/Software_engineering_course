import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_analytics_get () {        
            
    const promise = axios.get(serverURL() + "userHistory/"  , tokenConfig())

    const dataPromise = promise.then((res) => res.data.userHistory )
    .catch((e) => {
        console.log(e);
    });    

    return dataPromise ;

}
