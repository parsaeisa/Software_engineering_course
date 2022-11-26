import {UserActionTypes} from './UserActionType' ;

export function setFirstname (n){
    return {
        type : UserActionTypes.SET_FIRSTNAME ,
        payload : { firstname : n }
    }
}

export function setState (state){
    return {
        type : UserActionTypes.SET_STATE ,
        payload : {
            firstname: state.firstname ,
            lastname: state.lastname ,
            avatar: state.avatar ,
            username: state.username ,
            email: state.email 
          }
    }
}

export function setLastname (n){
    return {
        type : UserActionTypes.SET_LASTNAME ,
        payload : { lastname : n }
    }
}

export function setUsername (n){
    return {
        type : UserActionTypes.SET_USERNAME ,
        payload : { username : n }
    }
}

export function setPassword (n){
    return {
        type : UserActionTypes.SET_PASSWORD ,
        payload : { password : n }
    }
}


export function setEmail (n){
    return {
        type : UserActionTypes.SET_EMAIL ,
        payload : { email : n }
    }
}


export function setAvatar (n){
    return {
        type : UserActionTypes.SET_AVATAR ,
        payload : { avatar : n }
    }
}