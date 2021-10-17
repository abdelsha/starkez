import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import thunkMiddleware from 'redux-thunk';
import allReducer from "../Reducers/index";

const store= createStore(allReducer,applyMiddleware(thunkMiddleware));

export default store;