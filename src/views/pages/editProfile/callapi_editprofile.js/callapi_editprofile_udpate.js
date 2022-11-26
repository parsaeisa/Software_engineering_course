// import { connect } from 'react-redux';
import axios from 'axios' ;
// import store from '../../../../core/store/index' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';



export default function callapi_editprofile_update  (a , success , fail )  {    
    
    const ajson = JSON.stringify(a) ;
    axios.put(serverURL() + "user/" , ajson , tokenConfig())
    .then((res) => {
        console.log("updated");
        success() ;
    })
    .catch((e) => {
        console.log(e);
        fail(e.message)
    });
}