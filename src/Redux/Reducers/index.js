import { combineReducers } from "redux";
import userReducer from "./UserState";


const allReducer = combineReducers({
    userState: userReducer,
});

export default allReducer;
