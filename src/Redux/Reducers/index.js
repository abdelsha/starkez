import { combineReducers } from "redux";
import userReducer from "./UserState";
import courseReducer from "./Course";


const allReducer = combineReducers({
    userState: userReducer,
    courseState:courseReducer,
});

export default allReducer;
