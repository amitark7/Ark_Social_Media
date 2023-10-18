import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import postReducer from "./PostReducer";

export const reducers=combineReducers({AuthReducer,postReducer})