import {UserActionTypes} from "../action/UserActionType";
import axios from 'axios';

const initialstate = { 
  firstname : "undefined" ,
  lastname : "undefined" ,
  username : "undefined" ,
  email : "undefined" ,
  password : "undefined" ,
  avatar : "undefined"
}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case UserActionTypes.SET_FIRSTNAME:
        return{
          ...state, 
          firstname : payload.firstname,
        };  
        
      case UserActionTypes.SET_STATE :
        return {
          ...state ,          
          firstname: payload.firstname ,
          lastname: payload.lastname ,
          avatar: payload.avatar ,
          username: payload.username ,
          email: payload.email           
        };

      case UserActionTypes.SET_LASTNAME:
        return{
          ...state, 
          lastname : payload.lastname,
        };    
            
      case UserActionTypes.SET_USERNAME:
        return{
          ...state, 
          username : payload.username,
        };   
        
      case UserActionTypes.SET_EMAIL:
        return{
          ...state, 
          email : payload.email,
        };   

      case UserActionTypes.SET_PASSWORD:
        return{
          ...state, 
          password : payload.password ,
        };   

      case UserActionTypes.SET_AVATAR:
        return{
          ...state, 
          avatar : payload.avatar ,
        };   
    default : return state;

    }
}