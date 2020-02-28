import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { auth } from "./auth";
import { posts } from "./posts";
import { comments } from "./comments";

// Using combine reducers to break up reducers into different files
export default combineReducers({
  firebase: firebaseReducer,
  auth,
  posts,
  comments,
});
