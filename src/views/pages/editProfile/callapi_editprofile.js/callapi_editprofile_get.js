import axios from 'axios' ;
import store from '../../../../core/store/index' ;
import * as actions from '../../../../core/edit_profile/action/UserAction'
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

// store.subscribe(callapi_editprofile_get);

export default function callapi_editprofile_get () {        
            
    axios.get(serverURL() + "user/"  , tokenConfig())
    .then((res) => {    
        console.log("shiiit");            
        store.dispatch(actions.setState(res.data))
    })
    .catch((e) => {
        console.log(e);
    });    

}
