import { combineReducers } from "redux";
import userReducer from "./UserState";
import courseReducer from "./Course";
import menuReducer from "./Menu";



const allReducer = combineReducers({
    userState: userReducer,
    courseState:courseReducer,
    menuState:menuReducer,
});

export default allReducer;
