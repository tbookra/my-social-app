import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postsReducer";
import uploadProfileImgReducer from "./uploadProfileImgReducer";


export default combineReducers({
  auth: authReducer,
  newPost: postReducer,
  profileImgUpdate: uploadProfileImgReducer
});