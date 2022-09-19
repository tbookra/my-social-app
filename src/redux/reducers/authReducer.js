import { initialState } from "./initialState";
import * as authTypes from "../constants";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case authTypes.LOGIN_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case authTypes.FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case authTypes.FETCH_ERROR:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case authTypes.FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case authTypes.UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter((f) => f !== action.payload),
        },
      };

    default:
      return state;
  }
};

export default authReducer;
