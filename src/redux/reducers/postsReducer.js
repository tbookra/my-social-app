import { initialState } from "./initialState";
import * as authTypes from "../constants";

const postReducer = (state = initialState.posts, action) => {
  switch (action.type) {
    case authTypes.POST_FETCHES:
      return {
        ...state,
        newPostId: null,
        postSending: true,
        postError: false,
      };
    case authTypes.POST_SUCCESS:
      return {
        ...state,
        newPostId: action.payload,
        postSending: false,
        postError: false,
      };
    case authTypes.POST_ERROR:
      return {
        ...state,
        newPostId: null,
        postSending: false,
        postError: action.payload,
      };
    

    default:
      return state;
  }
};

export default postReducer;
