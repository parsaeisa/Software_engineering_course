import {ActionTypes} from "./darkModeActionTypes";

export function setDarkMode(state){
    return {
        type : ActionTypes.SET_DARKMODE,
        payload: { darkmode: state },
    };
}
