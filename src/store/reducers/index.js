import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { auth } from "./auth";
import { users } from "./users";

// Using combine reducers to break up reducers into different files
export default combineReducers({
  firebase: firebaseReducer,
  auth,
  users
});
