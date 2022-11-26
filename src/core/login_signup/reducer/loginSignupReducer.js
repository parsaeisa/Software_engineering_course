import {ActionTypes} from "../action/loginSignupActionTypes";

const initialstate = { 
  change: false,
  alertM: "undefined",
  alertS:false,
  logged_in:false,

}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case ActionTypes.SET_CHANGE:
        return{
          ...state, 
          change : payload.change,
      }; 
      case ActionTypes.SET_ALERTM:
        return{
          ...state, 
          alertM : payload.alertM,
      };   
      case ActionTypes.SET_ALERTS:
        return{
          ...state, 
          alertS : payload.alertS,
      };   
      case ActionTypes.SET_LOGIN_STATE:
        return{
          ...state, 
          logged_in : payload.success,
      }; 
            
    default : return state;

    }
}