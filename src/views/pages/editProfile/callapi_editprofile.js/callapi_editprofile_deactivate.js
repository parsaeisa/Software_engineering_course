import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig'

export default function callapi_editprofile_deactivate (redirect) {        
    
    axios.delete(serverURL() + "user/"  , tokenConfig())
    .then((res) => {    
        console.log("deleted");            
        redirect() ;        
        // add a redirect
    })
    .catch((e) => {
        console.log(e);
    });    

}