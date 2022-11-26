import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_explore_search (searched , searchmode) {        
    
    let mod = "";
    if  (searchmode == 'URL')
        mod = "$url=true" ;
    if  (searchmode == 'title')
        mod = "$title=true" ;

    let query = searched + mod + "&skip=0&limit=10" ;    
    const promise = axios.get(serverURL() + "content/search?s=" + query  , tokenConfig());

    const dataPromise = 
    promise.then((response) => response.data)    
    .catch((e) => {
        console.log(e);
    });    

    return dataPromise ;

}
