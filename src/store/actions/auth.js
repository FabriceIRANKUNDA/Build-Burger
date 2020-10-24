import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeOut = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.REACT_APP_FIREBASE_API_KEY;
      if (!isSignUp)
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.REACT_APP_FIREBASE_API_KEY;
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      const res = await axios({
        method: "POST",
        url,
        data: authData,
      });
      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeOut(res.data.expiresIn));
    } catch (error) {
      if (error.message === "Network Error") {
        const err = {
          message:
            "You are not connected, Please connect to the internet or check your cable.",
        };
        dispatch(authFail(err));
      } else {
        dispatch(authFail(error.response.data.error));
      }
    }
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) dispatch(logout());
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout);
    } else {
      dispatch(authSuccess(token, localStorage.getItem("userId")));
      dispatch(
        checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};
