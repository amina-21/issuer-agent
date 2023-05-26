// import { SIGN_OUT_USER_START, SIGN_OUT_USER_SUCCESS } from "./const";

// export const signOutUserStart = (payload) => ({
//     type: SIGN_OUT_USER_START,
//     payload
// });

// export const signOutUserSuccess = (payload) => ({
//     type: SIGN_OUT_USER_SUCCESS,
//     payload
// });

// authActions.js

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const logout = () => ({
  type: "LOGOUT",
});
