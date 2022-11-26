import {ActionTypes} from "./loginSignupActionTypes"

export function setChange(state){
    return {
        type : ActionTypes.SET_CHANGE,
        payload: { change: state },
    };
}

export function setAlertM(state){
    return {
        type : ActionTypes.SET_ALERTM,
        payload: { alertM: state },
    };
}
export function setAlertS(state){
    return {
        type : ActionTypes.SET_ALERTS,
        payload: { alertS: state },
    };
}
export function setLoginState(success){
    return {
        type : ActionTypes.SET_LOGIN_STATE,
        payload: { success },
    };
}