import { initialState } from "./initialState";
import * as authTypes from "../constants";

const uploadProfileImgReducer = (state = initialState.updateProfileImgs, action) => {
  switch (action.type) {
    case authTypes.IMG_UPLOAD:
      return {
        ...state,
        img_uploads: true,
        uploadError: false,
        uploadSuccess : false
      };
    case authTypes.IMG_UPLOAD_SUCCESS:
      return {
        ...state,
        img_uploads: false,
        uploadError: false,
        uploadSuccess : action.payload
      };
    case authTypes.IMG_UPLOAD_ERROR:
      return {
        ...state,
        img_uploads: null,
        uploadError: false,
        uploadSuccess: action.payload,
      };
    

    default:
      return state;
  }
};

export default uploadProfileImgReducer;
