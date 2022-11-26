import {ActionTypes} from "../action/darkModeActionTypes";

const initialstate = { 
  darkmode: "day",
}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case ActionTypes.SET_DARKMODE:
        return{
          ...state, 
          darkmode : payload.darkmode,
      }; 
            
    default : return state;

    }
}