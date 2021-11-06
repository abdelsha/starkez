
import { combineReducers } from "redux";

const INITIAL_STATE ={
    user:null,
    user_loaded:false,
    online_users:[]
    
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        user_loaded:true,
      };
    case 'SET_ONLINE_USER':
      return {
        ...state,
        online_users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;