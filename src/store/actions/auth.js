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

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB98uw-OI7m3aHjkrtJFLO9aCkTD9Em1R8";
      if (!isSignUp)
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB98uw-OI7m3aHjkrtJFLO9aCkTD9Em1R8";
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
      console.log(res);
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
