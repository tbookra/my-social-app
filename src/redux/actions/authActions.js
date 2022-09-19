import * as authTypes from "../constants";
import { socialServer } from "../../services";

export const loginStart = (values) => {
  return {
    type: authTypes.LOGIN_START,
  };
};
export const loginSuccess = (user) => {
  return {
    type: authTypes.FETCH_SUCCESS,
    payload: user,
  };
};
export const loginFailure = (error) => {
  return {
    type: authTypes.FETCH_ERROR,
    payload: error,
  };
};

export const submitFormLogics = (values, sentFrom) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.LOGIN_START });
    const { data } = await socialServer.post(`/auth/${sentFrom}`, values);
    if (data.error) {
      dispatch({ type: authTypes.FETCH_ERROR, payload: data.error });
      return data.error;
    }
    if (sentFrom === "register") {
      // dispatch(setWaitingForConfirm(true));
      console.log("not ready");
    } else {
      dispatch({ type: authTypes.FETCH_SUCCESS, payload: data.success });
    }
  } catch (err) {
    dispatch({ type: authTypes.FETCH_ERROR, payload: err.message });
  }
};
export const follow = (userId) => ({
  type: authTypes.FOLLOW,
  payload: userId,
});
export const unfollow = (userId) => ({
  type: authTypes.UNFOLLOW,
  payload: userId,
});