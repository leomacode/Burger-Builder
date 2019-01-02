import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_REDIRECT_PATH
} from "./actionTypes";
import axios from "axios";

const signinUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyArXwnBsjVHzOvMoG_3HLJw1u1BOPqsghQ";
const signupUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyArXwnBsjVHzOvMoG_3HLJw1u1BOPqsghQ";

export const onAuth = (email, password, isSignup) => {
  return async dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    const url = isSignup ? signinUrl : signupUrl;
    try {
      const response = await axios.post(url, authData);
      const { idToken, localId, expiresIn } = response.data;
      const expiringTime = new Date().getTime() + expiresIn * 1000;
      const expiringDate = new Date(expiringTime);
      localStorage.setItem("token", idToken);
      localStorage.setItem("expiringDate", expiringDate);
      localStorage.setItem("id", localId);
      dispatch(authSuccess(idToken, localId));
      dispatch(logOut(expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error.message));
    }
  };
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, id) => {
  return {
    type: AUTH_SUCCESS,
    token,
    id
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logOut = expireTime => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), expireTime * 1000);
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiringDate");
  localStorage.removeItem("id");
  return {
    type: AUTH_LOGOUT
  };
};

export const setRedirectPath = path => {
  return {
    type: SET_REDIRECT_PATH,
    path
  };
};

export const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const expiringDate = new Date(localStorage.getItem("expiringDate"));
  return dispatch => {
    if (token) {
      if (expiringDate > new Date()) {
        const expiringTime = (expiringDate - new Date()) / 1000;
        dispatch(authSuccess(token, id));
        dispatch(logOut(expiringTime));
      } else {
        dispatch(authLogout());
      }
    } else {
      dispatch(authLogout());
    }
  };
};
