import { combineReducers } from "redux";
import login_signup from "../login_signup/reducer/loginSignupReducer"
import UserReducer from '../edit_profile/reducer/userReducer' ;
import dark_mode from "../dark_mode/reducer/darkModeReducer";

export default combineReducers({
    login_signup,
    UserReducer,
    dark_mode,
});

