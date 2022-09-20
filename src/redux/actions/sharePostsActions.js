import * as authTypes from "../constants";
import { socialServer } from "../../services";

export const sharePostLogics = (fileData, postData) => async (dispatch) => {
  let success, error;
  try {
    dispatch({ type: authTypes.POST_FETCHES });
    if (fileData) {
      const { data } = await socialServer.post("/upload", fileData);
      success = data.success || null;
      error = data.error || null;
      if (error) {
        dispatch({ type: authTypes.POST_ERROR, payload: error });
        return error;
      }
    }
    const {
      data: { success: postSuccess, error: postError },
    } = await socialServer.post("/posts", postData);
    if (postError) {
      dispatch({ type: authTypes.POST_ERROR, payload: postError });
      return error;
    }
    dispatch({
      type: authTypes.POST_SUCCESS,
      payload: `newPostId:${Date.now()}`,
    });
    return { success, postSuccess };
  } catch (err) {
    dispatch({ type: authTypes.POST_ERROR, payload: err.message });
  }
};
export const updateProfileImgLogics = (fileData, userData,userId) => async (dispatch) => {
  console.log(fileData, userData,userId);
  let success, error;
  try {
    dispatch({ type: authTypes.IMG_UPLOAD });
    // if (fileData) {
      const { data } = await socialServer.post("/upload", fileData);
      success = data.success || null;
      error = data.error || null;
      if (error) {
        dispatch({ type: authTypes.IMG_UPLOAD_ERROR, payload: error });
        return error;
      }
    // }
    const {
      data: { success: postSuccess, error: postError },
    } = await socialServer.put(`/users/${userId}`, userData);
    if (postError) {
      dispatch({ type: authTypes.POST_ERROR, payload: postError });
      return error;
    }
    dispatch({
      type: authTypes.IMG_UPLOAD_SUCCESS,
      payload: `newPostId:${Date.now()}`,
    });
    return { success, postSuccess };
  } catch (err) {
    dispatch({ type: authTypes.IMG_UPLOAD_ERROR, payload: err.message });
  }
};


